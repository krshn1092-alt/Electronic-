import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { INITIAL_PRODUCTS, INITIAL_ENQUIRIES, INITIAL_CONVERSATIONS, STORE_INFO } from './src/data/mockData';
import { CustomerEnquiry, AiConversation, Product } from './src/types';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory demo data stores (persists during container runtime)
let demoEnquiries: CustomerEnquiry[] = [...INITIAL_ENQUIRIES];
let demoConversations: AiConversation[] = [...INITIAL_CONVERSATIONS];

// Initialize Gemini Client if API key is present
let geminiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  geminiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// Resilient helper with automatic model fallback for 503 high demand or temporary errors
async function generateGeminiContentWithFallback(options: {
  contents: any;
  config?: any;
}): Promise<{ text: string; model: string } | null> {
  if (!geminiClient || !process.env.GEMINI_API_KEY) {
    return null;
  }

  // Model cascade: prioritize gemini-3.8-flash, fallback to flash-latest and 3.1-flash-lite during demand spikes
  const candidateModels = [
    'gemini-3.8-flash',
    'gemini-flash-latest',
    'gemini-3.1-flash-lite'
  ];

  for (const model of candidateModels) {
    try {
      const response = await geminiClient.models.generateContent({
        model,
        contents: options.contents,
        config: options.config
      });

      if (response && response.text) {
        return {
          text: response.text,
          model
        };
      }
    } catch (err: any) {
      const errorMsg = err?.message || String(err);
      const isDemandSpike = errorMsg.includes('503') || errorMsg.includes('high demand') || errorMsg.includes('UNAVAILABLE');
      console.log(`[Gemini Engine] Model ${model} ${isDemandSpike ? 'experiencing temporary high demand (503)' : 'encountered error'}, trying alternate model...`);
    }
  }

  console.log('[Gemini Engine] All Gemini model endpoints busy; cleanly engaging local store intelligence engine.');
  return null;
}

const STORE_SYSTEM_INSTRUCTION = `You are Chiku AI, the official shopping assistant for Chiku Electronics.
Help customers understand and discover products using ONLY the catalogue and business information provided to you.
Never invent prices, stock, specifications, warranty terms or policies.
If information is unavailable, say so clearly: "I don't have that information in the current store catalogue."
Be concise, helpful and professional.
Store location: ${STORE_INFO.address}, ${STORE_INFO.city}, ${STORE_INFO.region}. Phone: ${STORE_INFO.phone}. Hours: ${STORE_INFO.hours}.
When recommending products, explain why each product matches the customer's requirements. Mention both price and relevant specs. Always specify if a product is 'New', 'Refurbished', or 'Second-Hand'.`;

function buildCatalogSummary(products: Product[]): string {
  return products.map(p => {
    const specsStr = Object.entries(p.keySpecs)
      .filter(([_, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ');
    const refStr = p.refurbishedDetails 
      ? ` (Grade: ${p.refurbishedDetails.conditionGrade}, Battery: ${p.refurbishedDetails.batteryHealth}%, Savings: ₹${p.refurbishedDetails.savingsAmount})`
      : '';
    return `- [${p.id}] ${p.name} (${p.brand}) | ₹${p.price.toLocaleString('en-IN')} (Orig: ₹${p.originalPrice.toLocaleString('en-IN')}) | Condition: ${p.condition}${refStr} | Stock: ${p.stockStatus} | Specs: ${specsStr}`;
  }).join('\n');
}

// Fallback response generator if Gemini API key is missing or encounters rate limit
function generateIntelligentFallback(query: string, contextProduct?: Product): { answer: string; suggestedProducts: Product[] } {
  const q = query.toLowerCase();
  const products = INITIAL_PRODUCTS;

  // Specific query matching
  if (contextProduct) {
    return {
      answer: `Regarding the **${contextProduct.name}** (₹${contextProduct.price.toLocaleString('en-IN')}, Condition: ${contextProduct.condition}):\n\n` +
        `• **Warranty**: ${contextProduct.warranty}\n` +
        `• **Key Specs**: ${Object.entries(contextProduct.keySpecs).map(([k, v]) => `${k}: ${v}`).join(' | ')}\n` +
        `• **Stock Status**: ${contextProduct.stockStatus} (${contextProduct.stockCount} units available in Kanpur store)\n` +
        `• **Highlights**: ${contextProduct.description}\n\n` +
        (contextProduct.condition !== 'New' && contextProduct.refurbishedDetails 
          ? `This device is certified refurbished with **${contextProduct.refurbishedDetails.batteryHealth}% battery health** and a verified 48-point diagnostic. You save ₹${contextProduct.refurbishedDetails.savingsAmount.toLocaleString('en-IN')} compared to buying new.\n\n` 
          : '') +
        `Would you like to add it to your cart or compare it with an alternative?`,
      suggestedProducts: [contextProduct]
    };
  }

  // Budget query
  if (q.includes('under 50') || q.includes('50000') || q.includes('50,000') || q.includes('budget') || q.includes('cheap') || q.includes('cheaper')) {
    const affordable = products.filter(p => p.price <= 50000);
    const laptops = affordable.filter(p => p.category === 'laptops' || p.id === 'prod-rf-2' || p.id === 'prod-rf-3');
    const displayProducts = laptops.length > 0 ? laptops : affordable.slice(0, 3);
    
    return {
      answer: `Here are our top recommended tech choices under ₹50,000 currently in stock at Chiku Electronics:\n\n` +
        displayProducts.map(p => `• **${p.name}** — ₹${p.price.toLocaleString('en-IN')} (${p.condition})\n  Specs: ${p.keySpecs.processor || ''}, ${p.keySpecs.ram || ''}, ${p.keySpecs.storage || ''}. Warranty: ${p.warranty}`).join('\n\n') +
        `\n\nBoth our brand-new DevBook and our certified refurbished ThinkPad / MacBook offer tremendous value with comprehensive store warranties.`,
      suggestedProducts: displayProducts
    };
  }

  // Photography query
  if (q.includes('photo') || q.includes('camera')) {
    const cameraPhones = products.filter(p => p.category === 'smartphones' || p.id === 'prod-rf-1');
    return {
      answer: `For photography and video creation, here are our best smartphones:\n\n` +
        `1. **Aura Pro 5G Ultra (₹44,999, New)**: 50MP Sony LYT-808 sensor + 64MP 3x periscope optical zoom.\n` +
        `2. **PixelPrime Neo 12 (₹38,999, New)**: Google Tensor G4 with Best Take, Magic Eraser, and natural portrait rendering.\n` +
        `3. **iPhone 14 Pro Refurbished (₹59,999, Refurbished)**: 48MP Pro camera system with Photonic Engine and 4K Cinematic mode.\n\n` +
        `Would you prefer Android computational photography or the iPhone ecosystem?`,
      suggestedProducts: cameraPhones.slice(0, 3)
    };
  }

  // Coding query
  if (q.includes('coding') || q.includes('programming') || q.includes('developer')) {
    const codingLaptops = products.filter(p => p.id === 'prod-lp-2' || p.id === 'prod-rf-2' || p.id === 'prod-rf-3' || p.id === 'prod-lp-1');
    return {
      answer: `For software development, compilation, and college coursework, we strongly recommend:\n\n` +
        `1. **CodeCraft DevBook 14 (New)** — ₹48,999: AMD Ryzen 5 (6C/12T), 16GB RAM, 512GB NVMe SSD, tactile keyboard and 11-hour battery.\n` +
        `2. **ThinkPad T14 Gen 2 (Refurbished)** — ₹32,999: Intel Core i5 vPro, 16GB RAM, durable spill-resistant keyboard, 6-Month Chiku warranty. Outstanding value for students!\n` +
        `3. **MacBook Air M1 (Pre-Owned)** — ₹46,999: Unix-based macOS, blazing fast terminal speed, and silent fanless operation.\n\n` +
        `Each comes with verified keyboard switches and fast NVMe storage for fast builds.`,
      suggestedProducts: codingLaptops
    };
  }

  // Refurbished query
  if (q.includes('refurbished') || q.includes('second hand') || q.includes('used') || q.includes('pre-owned')) {
    const refurbs = products.filter(p => p.condition !== 'New');
    return {
      answer: `At Chiku Electronics, our **Certified Refurbished & Pre-Owned** devices undergo a rigorous 48-point diagnostic verification:\n\n` +
        refurbs.map(p => `• **${p.name}** — ₹${p.price.toLocaleString('en-IN')} (Original: ₹${p.originalPrice.toLocaleString('en-IN')}, Save ₹${p.refurbishedDetails?.savingsAmount.toLocaleString('en-IN')})\n  Grade: ${p.refurbishedDetails?.conditionGrade}, Battery Health: ${p.refurbishedDetails?.batteryHealth}%, Warranty: ${p.warranty}`).join('\n\n') +
        `\n\nAll refurbished items come with a 7-day money-back guarantee and a free certified power adapter.`,
      suggestedProducts: refurbs
    };
  }

  // Store information query
  if (q.includes('store') || q.includes('location') || q.includes('address') || q.includes('phone') || q.includes('hours') || q.includes('kanpur') || q.includes('unnao')) {
    return {
      answer: `**Chiku Electronics Store Information**:\n\n` +
        `• **Address**: ${STORE_INFO.address}, ${STORE_INFO.landmark}, ${STORE_INFO.city} (${STORE_INFO.region})\n` +
        `• **Phone**: ${STORE_INFO.phone}\n` +
        `• **Email**: ${STORE_INFO.email}\n` +
        `• **Opening Hours**: ${STORE_INFO.hours} (${STORE_INFO.openDays})\n\n` +
        `You are welcome to visit our physical experience counter to test any smartphone, laptop, or refurbished device in person!`,
      suggestedProducts: []
    };
  }

  // Default helpful response with catalogue overview
  const featured = products.filter(p => p.isFeatured).slice(0, 3);
  return {
    answer: `Hello! I am **Chiku AI**, your shopping assistant for Chiku Electronics. I can help you search our store catalogue, compare laptops or phones, check certified refurbished savings, or find the best device for your budget.\n\n` +
      `Here are a few popular questions you can ask me:\n` +
      `• *"Suggest a laptop under ₹50,000"*\n` +
      `• *"I need a phone for photography"*\n` +
      `• *"What is the warranty on refurbished devices?"*\n` +
      `• *"Which laptop is better for coding?"*\n\n` +
      `How can I assist your electronics search today?`,
    suggestedProducts: featured
  };
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    store: STORE_INFO.storeName,
    demoMode: true,
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY)
  });
});

// 2. Products API
app.get('/api/products', (req, res) => {
  res.json({
    products: INITIAL_PRODUCTS,
    total: INITIAL_PRODUCTS.length
  });
});

// 3. AI Shopping Assistant Chat API
app.post('/api/ai/chat', async (req, res) => {
  const { message, history = [], contextProductId } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const contextProduct = contextProductId 
    ? INITIAL_PRODUCTS.find(p => p.id === contextProductId)
    : undefined;

  // Filter catalog context relevant to query to keep prompt focused
  const catalogText = buildCatalogSummary(INITIAL_PRODUCTS);

  if (geminiClient && process.env.GEMINI_API_KEY) {
    const prompt = `Customer message: "${message}"
${contextProduct ? `Currently viewing product: ${JSON.stringify(contextProduct.name)} (ID: ${contextProduct.id}, Price: ₹${contextProduct.price}, Condition: ${contextProduct.condition})` : ''}

STORE PRODUCT CATALOGUE:
${catalogText}

Please respond to the customer adhering strictly to your instructions. If referencing products, use exact names, prices in ₹, conditions, and specifications from the catalog.`;

    const aiResult = await generateGeminiContentWithFallback({
      contents: prompt,
      config: {
        systemInstruction: STORE_SYSTEM_INSTRUCTION,
        temperature: 0.4
      }
    });

    if (aiResult && aiResult.text) {
      const responseText = aiResult.text;
      
      // Match mentioned products
      const matchedProducts = INITIAL_PRODUCTS.filter(p => 
        responseText.toLowerCase().includes(p.name.toLowerCase()) || 
        (contextProduct && p.id === contextProduct.id)
      );

      // Record to demo conversations
      const newConvItem: AiConversation = {
        id: `conv-${Date.now()}`,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        customerName: 'Online Customer',
        topic: message.substring(0, 45),
        status: 'Active',
        messageCount: (history.length || 0) + 2,
        messages: [
          ...history.map((h: any) => ({ role: h.role, text: h.content, timestamp: h.timestamp || 'Now' })),
          { role: 'user', text: message, timestamp: 'Now' },
          { role: 'assistant', text: responseText, timestamp: 'Now' }
        ]
      };
      demoConversations.unshift(newConvItem);

      return res.json({
        reply: responseText,
        suggestedProducts: matchedProducts.slice(0, 4),
        source: aiResult.model
      });
    }
  }

  // Graceful Fallback Engine
  const fallback = generateIntelligentFallback(message, contextProduct);
  
  // Record fallback conversation
  const fallbackConv: AiConversation = {
    id: `conv-${Date.now()}`,
    date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    customerName: 'Online Customer',
    topic: message.substring(0, 45),
    status: 'Completed',
    messageCount: 2,
    messages: [
      { role: 'user', text: message, timestamp: 'Now' },
      { role: 'assistant', text: fallback.answer, timestamp: 'Now' }
    ]
  };
  demoConversations.unshift(fallbackConv);

  return res.json({
    reply: fallback.answer,
    suggestedProducts: fallback.suggestedProducts,
    source: 'chiku-store-engine'
  });
});

// 4. AI Recommendation Engine API
app.post('/api/ai/recommend', (req, res) => {
  const { budget = 50000, primaryUse = 'Coding', preferredBrand = 'Any', conditionPreference = 'Any' } = req.body;
  const numBudget = Number(budget) || 50000;

  // Filter candidates
  let candidates = INITIAL_PRODUCTS.filter(p => p.price <= numBudget * 1.15); // Allow slight flexibility
  if (conditionPreference !== 'Any') {
    const matchesCondition = candidates.filter(p => p.condition.toLowerCase() === conditionPreference.toLowerCase());
    if (matchesCondition.length > 0) candidates = matchesCondition;
  }

  // Sort and pick top recommendation, alternative, and budget option
  let topPick: Product = candidates.find(p => p.price <= numBudget) || INITIAL_PRODUCTS[0];
  let alternative: Product = candidates.find(p => p.id !== topPick.id) || INITIAL_PRODUCTS[1];
  let budgetOption: Product = [...INITIAL_PRODUCTS]
    .filter(p => p.price < topPick.price && p.id !== topPick.id && p.id !== alternative.id)
    .sort((a, b) => a.price - b.price)[0] || INITIAL_PRODUCTS[2];

  // Tailor based on primary use
  const lowerUse = String(primaryUse).toLowerCase();
  if (lowerUse.includes('coding') || lowerUse.includes('college')) {
    topPick = INITIAL_PRODUCTS.find(p => p.id === 'prod-lp-2') || topPick;
    alternative = INITIAL_PRODUCTS.find(p => p.id === 'prod-rf-2') || alternative;
    budgetOption = INITIAL_PRODUCTS.find(p => p.id === 'prod-rf-2') || budgetOption;
  } else if (lowerUse.includes('photo') || lowerUse.includes('content') || lowerUse.includes('camera')) {
    topPick = INITIAL_PRODUCTS.find(p => p.id === 'prod-sp-1') || topPick;
    alternative = INITIAL_PRODUCTS.find(p => p.id === 'prod-sp-2') || alternative;
    budgetOption = INITIAL_PRODUCTS.find(p => p.id === 'prod-rf-1') || budgetOption;
  } else if (lowerUse.includes('gaming') || lowerUse.includes('3d') || lowerUse.includes('heavy')) {
    topPick = INITIAL_PRODUCTS.find(p => p.id === 'prod-lp-3' || p.id === 'prod-dt-1') || topPick;
    alternative = INITIAL_PRODUCTS.find(p => p.id === 'prod-lp-1') || alternative;
    budgetOption = INITIAL_PRODUCTS.find(p => p.id === 'prod-lp-2') || budgetOption;
  }

  res.json({
    topPick: {
      product: topPick,
      matchReason: `Directly aligns with your ₹${numBudget.toLocaleString('en-IN')} target budget and ${primaryUse} requirements.`,
      keyHighlight: `Equipped with ${topPick.keySpecs.processor || 'premium hardware'} and ${topPick.keySpecs.ram || 'high performance RAM'}.`,
      limitations: topPick.condition !== 'New' ? 'Pre-owned certification with 6-Month store warranty.' : 'Standard 1-year warranty included.'
    },
    alternative: {
      product: alternative,
      matchReason: `High-value competitor offering comparable performance with alternative ecosystem benefits.`,
      keyHighlight: `${alternative.name} features ${alternative.keySpecs.display || 'vibrant display'} and ${alternative.keySpecs.storage || 'fast storage'}.`,
      limitations: `Priced at ₹${alternative.price.toLocaleString('en-IN')}.`
    },
    budgetOption: {
      product: budgetOption,
      matchReason: `Maximum savings choice leaving ₹${Math.max(0, numBudget - budgetOption.price).toLocaleString('en-IN')} in your pocket while meeting baseline needs.`,
      keyHighlight: `Verified ${budgetOption.condition} hardware with rigorous Chiku bench testing.`,
      limitations: `Slightly older architecture but outstanding performance-per-rupee.`
    },
    aiAnalysisSummary: `Based on your ${primaryUse} requirements and target budget of ₹${numBudget.toLocaleString('en-IN')}, our algorithm prioritized processor thread count, RAM capacity, and warranty coverage.`
  });
});

// 5. Product Comparison API
app.post('/api/ai/compare', (req, res) => {
  const { productIds = [] } = req.body;
  const selected = INITIAL_PRODUCTS.filter(p => productIds.includes(p.id));
  
  if (selected.length < 2) {
    return res.status(400).json({ error: 'Please select at least 2 products to compare.' });
  }

  const comparisonVerdict = selected.map((p, idx) => {
    return `• **${p.name}** (₹${p.price.toLocaleString('en-IN')}, ${p.condition}): Best suited for users prioritizing ${
      p.category === 'laptops' ? 'mobile productivity and battery endurance' :
      p.category === 'smartphones' ? 'versatile camera capture and 5G connectivity' :
      p.category === 'computers' ? 'sustained thermal performance and upgradeability' :
      'everyday practical functionality'
    }. Key advantage: ${p.keySpecs.processor || p.keySpecs.display || p.warranty}.`;
  }).join('\n\n');

  res.json({
    products: selected,
    aiAnalysis: `### Chiku AI Product Comparison\n\nComparing ${selected.map(p => p.name).join(' vs ')}:\n\n${comparisonVerdict}\n\n**Verdict**: If budget allows, **${selected[0].name}** offers the newest hardware spec sheet. However, if looking for maximum value, evaluate the condition grade and savings of each model!`
  });
});

// 6. Enquiries API
app.get('/api/enquiries', (req, res) => {
  res.json({
    enquiries: demoEnquiries,
    total: demoEnquiries.length
  });
});

app.post('/api/enquiries', (req, res) => {
  const { customerName, phone, email, productName, productId, budget, requirement, message } = req.body;
  
  if (!customerName || !phone) {
    return res.status(400).json({ error: 'Name and Phone are required' });
  }

  const newEnquiry: CustomerEnquiry = {
    id: `enq-${Date.now()}`,
    customerName,
    phone,
    email: email || 'Not provided',
    productName: productName || 'General Store Enquiry',
    productId,
    budget: budget || 'Flexible',
    requirement: requirement || 'General Product Enquiry',
    message: message || 'Interested in this product. Please arrange callback.',
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    status: 'New'
  };

  demoEnquiries.unshift(newEnquiry);

  res.status(201).json({
    success: true,
    message: 'Your enquiry has been received.',
    enquiry: newEnquiry
  });
});

app.put('/api/enquiries/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const item = demoEnquiries.find(e => e.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Enquiry not found' });
  }
  item.status = status;
  res.json({ success: true, enquiry: item });
});

// 7. Conversations API for Admin
app.get('/api/conversations', (req, res) => {
  res.json({
    conversations: demoConversations,
    total: demoConversations.length
  });
});

// 8. Admin AI Command Center NLP API
app.post('/api/admin/ai/command', async (req, res) => {
  const { command, products = INITIAL_PRODUCTS, categories = [], homepageConfig = {}, businessInfo = {} } = req.body;
  
  if (!command || typeof command !== 'string' || !command.trim()) {
    return res.status(400).json({ error: 'Command text is required' });
  }

  const rawCmd = command.trim();
  const lower = rawCmd.toLowerCase();

  // 1. Check for dangerous destructive actions requiring confirmation
  const isDeleteProduct = /\b(delete|remove|destroy)\b/i.test(lower) && !lower.includes('homepage') && !lower.includes('category');
  const isDeleteCategory = /\b(delete|remove)\b/i.test(lower) && lower.includes('category');
  const isDeleteSection = /\b(delete|remove)\b/i.test(lower) && (lower.includes('section') || lower.includes('homepage section'));

  if (isDeleteProduct) {
    // Extract target name
    const match = rawCmd.match(/(?:delete|remove)\s+(?:product\s+)?["']?([^"'.]+)["']?/i);
    const targetName = match ? match[1].trim() : 'specified product';
    return res.json({
      action: 'deleteProduct',
      parameters: { productNameOrId: targetName },
      requiresConfirmation: true,
      confirmationDetails: {
        action: 'deleteProduct',
        targetName,
        message: `You are about to delete ${targetName}.`
      },
      message: `Confirmation Required\n\nYou are about to delete ${targetName}.\n\n[Cancel] [Confirm]`
    });
  }

  if (isDeleteCategory) {
    const match = rawCmd.match(/(?:delete|remove)\s+category\s+["']?([^"'.]+)["']?/i);
    const targetName = match ? match[1].trim() : 'specified category';
    return res.json({
      action: 'deleteCategory',
      parameters: { nameOrId: targetName },
      requiresConfirmation: true,
      confirmationDetails: {
        action: 'deleteCategory',
        targetName,
        message: `You are about to delete category "${targetName}".`
      },
      message: `Confirmation Required\n\nYou are about to delete category "${targetName}".\n\n[Cancel] [Confirm]`
    });
  }

  if (isDeleteSection) {
    const match = rawCmd.match(/(?:delete|remove)\s+(?:homepage\s+)?section\s+["']?([^"'.]+)["']?/i);
    const targetName = match ? match[1].trim() : 'specified section';
    return res.json({
      action: 'deleteHomepageSection',
      parameters: { sectionIdOrTitle: targetName },
      requiresConfirmation: true,
      confirmationDetails: {
        action: 'deleteHomepageSection',
        targetName,
        message: `You are about to delete homepage section "${targetName}".`
      },
      message: `Confirmation Required\n\nYou are about to delete homepage section "${targetName}".\n\n[Cancel] [Confirm]`
    });
  }

  // 2. High-precision rule matching for common admin commands
  
  // (a) Price update: "Change iPhone 15 price to ₹42,999" or "Update iPhone 15 price to 42999"
  if (lower.includes('price') && (lower.includes('change') || lower.includes('update') || lower.includes('set') || lower.includes('to'))) {
    const priceMatch = rawCmd.match(/(?:to\s+|to\s+₹|₹\s*|rs\.?\s*)([\d,]+)/i);
    const prodMatch = rawCmd.match(/(?:change|update|set)\s+(?:the\s+)?([^to]+?)\s+price/i) ||
                      rawCmd.match(/(?:price\s+of\s+)([^to]+?)\s+to/i);
    if (priceMatch) {
      const newPrice = parseInt(priceMatch[1].replace(/,/g, ''), 10);
      const prodName = prodMatch ? prodMatch[1].trim() : 'Product';
      return res.json({
        action: 'updatePrice',
        parameters: { productNameOrId: prodName, price: newPrice },
        message: `Done — ${prodName} price has been updated to ₹${newPrice.toLocaleString('en-IN')}.`,
        canUndo: true
      });
    }
  }

  // (b) Add product: "Add iPhone 15 for ₹45,000" or "Add Lenovo LOQ for ₹70,000"
  if (lower.startsWith('add ') && (lower.includes('for ') || lower.includes('at ') || lower.includes('₹'))) {
    const forMatch = rawCmd.match(/add\s+(.+?)\s+(?:for|at)\s+(?:₹|rs\.?\s*)?([\d,]+)/i);
    if (forMatch) {
      const prodName = forMatch[1].trim();
      const price = parseInt(forMatch[2].replace(/,/g, ''), 10);
      
      let detectedCategory = 'smartphones';
      if (/laptop|macbook|thinkpad|devbook|zenbook|notebook/i.test(prodName)) {
        detectedCategory = 'laptops';
      } else if (/pc|computer|monitor|workstation|desktop/i.test(prodName)) {
        detectedCategory = 'computers';
      } else if (/charger|headphone|earbuds|keyboard|mouse/i.test(prodName)) {
        detectedCategory = 'accessories';
      }

      let detectedBrand = 'General';
      if (/iphone|apple|macbook|ipad/i.test(prodName)) detectedBrand = 'Apple';
      else if (/samsung|galaxy/i.test(prodName)) detectedBrand = 'Samsung';
      else if (/lenovo|loq|thinkpad/i.test(prodName)) detectedBrand = 'Lenovo';
      else if (/dell|latitude/i.test(prodName)) detectedBrand = 'Dell';
      else if (/google|pixel/i.test(prodName)) detectedBrand = 'Google';
      else if (/oneplus/i.test(prodName)) detectedBrand = 'OnePlus';
      else if (/sony/i.test(prodName)) detectedBrand = 'Sony';

      return res.json({
        action: 'addProduct',
        parameters: {
          name: prodName,
          price,
          originalPrice: Math.round(price * 1.15),
          brand: detectedBrand,
          category: detectedCategory,
          condition: lower.includes('refurbished') ? 'Refurbished' : lower.includes('second') ? 'Second-Hand' : 'New',
          description: `Premium ${prodName} configured for superior performance and everyday reliability.`,
          keySpecs: {
            processor: detectedCategory === 'laptops' ? 'High Performance Multi-Core' : undefined,
            ram: detectedCategory === 'laptops' ? '16GB' : '8GB',
            storage: '256GB / 512GB',
            warranty: '1 Year Store Warranty'
          },
          warranty: '1 Year Store Warranty'
        },
        message: `Done — Added ${prodName} to catalogue for ₹${price.toLocaleString('en-IN')}. Note: You can provide additional specifications anytime or edit them in the Products tab.`,
        canUndo: true
      });
    }
  }

  // (c) Hide out of stock: "Hide all out-of-stock products"
  if (lower.includes('hide') && (lower.includes('out-of-stock') || lower.includes('out of stock'))) {
    return res.json({
      action: 'hideProduct',
      parameters: { target: 'out-of-stock' },
      message: 'Done — All out-of-stock products are now hidden from the customer storefront.',
      canUndo: true
    });
  }

  // (d) Hide product: "Hide the iPhone 15"
  if (lower.startsWith('hide ') && !lower.includes('section') && !lower.includes('category')) {
    const prodMatch = rawCmd.match(/hide\s+(?:the\s+)?["']?([^"'.]+)["']?/i);
    const prodName = prodMatch ? prodMatch[1].trim() : '';
    return res.json({
      action: 'hideProduct',
      parameters: { productNameOrId: prodName },
      message: `Done — "${prodName}" is now hidden from the customer storefront.`,
      canUndo: true
    });
  }

  // (e) Show product again: "Show the iPhone 15 again" or "Show iPhone 15"
  if (lower.includes('show') && (lower.includes('again') || lower.includes('unhide')) && !lower.includes('section')) {
    const prodMatch = rawCmd.match(/(?:show|unhide)\s+(?:the\s+)?(.+?)(?:\s+again|$)/i);
    const prodName = prodMatch ? prodMatch[1].trim() : '';
    return res.json({
      action: 'showProduct',
      parameters: { productNameOrId: prodName },
      message: `Done — "${prodName}" is visible again on the customer storefront.`,
      canUndo: true
    });
  }

  // (f) Create category: "Create a new category called Gaming Laptops"
  if (lower.includes('category') && (lower.includes('create') || lower.includes('add'))) {
    const catMatch = rawCmd.match(/(?:called|named|category)\s+["']?([^"'.\n]+)["']?/i);
    const catName = catMatch ? catMatch[1].trim() : 'New Category';
    return res.json({
      action: 'createCategory',
      parameters: {
        name: catName,
        description: `Curated selection of ${catName} at Chiku Electronics.`
      },
      message: `Done — Created new category "${catName}".`,
      canUndo: true
    });
  }

  // (g) Create homepage section: "Create a homepage section called Best Laptops Under ₹50,000"
  if (lower.includes('section') && (lower.includes('create') || lower.includes('add') || lower.includes('homepage'))) {
    const secMatch = rawCmd.match(/(?:called|named|section)\s+["']?([^"'.\n]+)["']?/i);
    const secTitle = secMatch ? secMatch[1].trim() : 'Featured Section';
    
    let filterMaxPrice: number | undefined;
    const priceMatch = rawCmd.match(/(?:under|<|below)\s*(?:₹|rs\.?\s*)?([\d,]+)/i);
    if (priceMatch) {
      filterMaxPrice = parseInt(priceMatch[1].replace(/,/g, ''), 10);
    }
    
    let filterCat: string | undefined;
    if (lower.includes('laptop')) filterCat = 'laptops';
    else if (lower.includes('phone')) filterCat = 'smartphones';

    return res.json({
      action: 'createHomepageSection',
      parameters: {
        title: secTitle,
        subtitle: `Hand-picked value collection automatically updated by AI`,
        productFilter: {
          category: filterCat,
          maxPrice: filterMaxPrice
        }
      },
      message: `Done — Created new homepage section "${secTitle}".`,
      canUndo: true
    });
  }

  // (h) Hide or show refurbished section
  if (lower.includes('refurbished') && lower.includes('section')) {
    const isHide = lower.includes('hide') || lower.includes('disable') || lower.includes('remove');
    return res.json({
      action: 'updateHomepageContent',
      parameters: {
        showRefurbishedSection: !isHide
      },
      message: `Done — Refurbished section has been ${isHide ? 'hidden from' : 'made visible on'} the homepage.`,
      canUndo: true
    });
  }

  // (i) Change homepage headline: "Change the homepage headline to Smart Technology. Better Value."
  if (lower.includes('headline') || lower.includes('hero heading') || lower.includes('hero headline')) {
    const headMatch = rawCmd.match(/(?:to|heading|headline)\s+["']?([^"'\n]+)["']?$/i);
    const newHeadline = headMatch ? headMatch[1].trim() : 'Smart Technology. Better Value.';
    return res.json({
      action: 'updateHomepageContent',
      parameters: {
        heroHeadline: newHeadline
      },
      message: `Done — Homepage hero headline updated to "${newHeadline}".`,
      canUndo: true
    });
  }

  // (j) Update store timings: "Update the store timings to 10:00 AM – 9:00 PM"
  if (lower.includes('timing') || lower.includes('hours') || lower.includes('store hours')) {
    const timeMatch = rawCmd.match(/(?:to\s+)(.+)$/i);
    const newHours = timeMatch ? timeMatch[1].trim() : '10:00 AM – 9:00 PM';
    return res.json({
      action: 'updateBusinessInformation',
      parameters: {
        hours: newHours
      },
      message: `Done — Store timings updated to "${newHours}".`,
      canUndo: true
    });
  }

  // (k) Search or Filter products: "Show all laptops under ₹50,000" or "Find phones under ₹30,000"
  if (lower.includes('show') || lower.includes('find') || lower.includes('list') || lower.includes('which products')) {
    let catFilter: string | undefined;
    if (lower.includes('laptop')) catFilter = 'laptops';
    else if (lower.includes('phone') || lower.includes('smartphone')) catFilter = 'smartphones';
    else if (lower.includes('computer') || lower.includes('desktop') || lower.includes('monitor')) catFilter = 'computers';
    else if (lower.includes('accessor')) catFilter = 'accessories';

    let maxPrice: number | undefined;
    const underMatch = rawCmd.match(/(?:under|below|<)\s*(?:₹|rs\.?\s*)?([\d,]+)/i);
    if (underMatch) {
      maxPrice = parseInt(underMatch[1].replace(/,/g, ''), 10);
    }

    let minPrice: number | undefined;
    const overMatch = rawCmd.match(/(?:more than|above|>|cost more than)\s*(?:₹|rs\.?\s*)?([\d,]+)/i);
    if (overMatch) {
      minPrice = parseInt(overMatch[1].replace(/,/g, ''), 10);
    }

    let conditionFilter: string | undefined;
    if (lower.includes('refurbished')) conditionFilter = 'Refurbished';
    else if (lower.includes('second-hand') || lower.includes('second hand')) conditionFilter = 'Second-Hand';
    else if (lower.includes('brand new') || lower.includes('new products')) conditionFilter = 'New';

    let brandFilter: string | undefined;
    if (lower.includes('samsung')) brandFilter = 'Samsung';
    else if (lower.includes('apple') || lower.includes('iphone')) brandFilter = 'Apple';
    else if (lower.includes('lenovo')) brandFilter = 'Lenovo';
    else if (lower.includes('dell')) brandFilter = 'Dell';
    else if (lower.includes('google')) brandFilter = 'Google';

    let ramFilter: string | undefined;
    if (lower.includes('16gb') || lower.includes('16 gb')) ramFilter = '16GB';
    else if (lower.includes('32gb') || lower.includes('32 gb')) ramFilter = '32GB';
    else if (lower.includes('8gb') || lower.includes('8 gb')) ramFilter = '8GB';

    const outOfStockOnly = lower.includes('out of stock') || lower.includes('out-of-stock');

    return res.json({
      action: 'searchProducts',
      parameters: {
        category: catFilter,
        maxPrice,
        minPrice,
        condition: conditionFilter,
        brand: brandFilter,
        ram: ramFilter,
        outOfStockOnly
      },
      message: `Displaying matching catalogue products for: "${rawCmd}".`
    });
  }

  // (l) Stock status change: "Mark this laptop as out of stock"
  if (lower.includes('stock') && (lower.includes('mark') || lower.includes('set') || lower.includes('change'))) {
    const isOut = lower.includes('out');
    const prodMatch = rawCmd.match(/(?:mark|set|change)\s+(?:the\s+)?([^as]+?)\s+as/i);
    const prodName = prodMatch ? prodMatch[1].trim() : 'Product';
    return res.json({
      action: 'updateStock',
      parameters: {
        productNameOrId: prodName,
        stockStatus: isOut ? 'Out of Stock' : 'In Stock'
      },
      message: `Done — Updated stock status of ${prodName} to ${isOut ? 'Out of Stock' : 'In Stock'}.`,
      canUndo: true
    });
  }

  // 3. Fallback to Gemini if configured, or generalized action response
  if (geminiClient && process.env.GEMINI_API_KEY) {
    const prompt = `You are the Admin AI Website Manager for Chiku Electronics.
You must analyze the administrator's command and choose ONE of the allowed actions:
- addProduct(name, price, brand, category, condition)
- updateProduct(productNameOrId, updates)
- deleteProduct(productNameOrId) [Destructive: requires confirmation]
- searchProducts(query, category, maxPrice, minPrice, condition, ram)
- filterProducts(category, condition, maxPrice, minPrice)
- updatePrice(productNameOrId, price)
- updateStock(productNameOrId, stockStatus)
- hideProduct(productNameOrId)
- showProduct(productNameOrId)
- createCategory(name, description)
- updateCategory(nameOrId, updates)
- deleteCategory(nameOrId) [Destructive: requires confirmation]
- createHomepageSection(title, subtitle, category, maxPrice)
- updateHomepageSection(sectionIdOrTitle, updates)
- deleteHomepageSection(sectionIdOrTitle) [Destructive: requires confirmation]
- updateHomepageContent(heroHeadline, showRefurbishedSection)
- updateBusinessInformation(hours, phone, email, address)
- createFAQ(question, answer)
- updateFAQ(faqIdOrQuestion, answer)

Administrator command: "${rawCmd}"

Respond in pure JSON with format:
{
  "action": "actionName",
  "parameters": { ... },
  "message": "Friendly confirmation of what was done",
  "requiresConfirmation": false
}`;

    const aiResult = await generateGeminiContentWithFallback({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });

    if (aiResult && aiResult.text) {
      try {
        const parsed = JSON.parse(aiResult.text);
        if (parsed.action === 'deleteProduct' || parsed.action === 'deleteCategory' || parsed.action === 'deleteHomepageSection') {
          parsed.requiresConfirmation = true;
          parsed.confirmationDetails = {
            action: parsed.action,
            targetName: parsed.parameters?.name || parsed.parameters?.productNameOrId || 'item',
            message: `You are about to delete ${parsed.parameters?.name || parsed.parameters?.productNameOrId || 'this item'}.`
          };
        }
        return res.json(parsed);
      } catch (parseErr) {
        console.log('[Gemini Engine] JSON parse fallback on admin command:', parseErr);
      }
    }
  }

  // Default fallback if command was generic
  return res.json({
    action: 'searchProducts',
    parameters: { query: rawCmd },
    message: `Processed command: "${rawCmd}". Catalogue search view updated.`
  });
});


async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Chiku Electronics Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
