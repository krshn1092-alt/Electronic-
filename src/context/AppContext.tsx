import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  CustomerEnquiry, 
  ProductCategory,
  CategoryItem,
  HomepageConfig,
  HomepageSection,
  BusinessInformation,
  FAQItem,
  AiActivityLog,
  AdminCommandResult,
  PendingConfirmation,
  AdminSupportedAction
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ENQUIRIES,
  INITIAL_CATEGORIES,
  INITIAL_HOMEPAGE_CONFIG,
  INITIAL_BUSINESS_INFO,
  FAQS,
  INITIAL_ACTIVITY_LOGS
} from '../data/mockData';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  text: string;
}

interface AppContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  comparisonIds: string[];
  addToComparison: (productId: string) => boolean;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;

  enquiries: CustomerEnquiry[];
  addEnquiry: (enquiry: Omit<CustomerEnquiry, 'id' | 'createdAt' | 'status'>) => Promise<CustomerEnquiry>;
  updateEnquiryStatus: (id: string, status: CustomerEnquiry['status']) => void;

  activePage: string;
  setActivePage: (page: string) => void;
  selectedProductId: string | null;
  navigateToProduct: (productId: string) => void;
  
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isAiModalOpen: boolean;
  setIsAiModalOpen: (open: boolean) => void;
  isEnquiryModalOpen: boolean;
  setIsEnquiryModalOpen: (open: boolean) => void;
  enquiryTargetProduct: Product | null;
  openEnquiryForProduct: (product?: Product) => void;

  aiContextProduct: Product | null;
  openAiWithProduct: (product: Product) => void;
  openAiWithPrompt: (prompt: string) => void;
  aiInitialMessage: string | null;

  toasts: ToastMessage[];
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;

  // Admin controls
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateProductPrice: (productNameOrId: string, newPrice: number) => boolean;
  updateProductStock: (productNameOrId: string, stockStatus: Product['stockStatus']) => boolean;
  toggleProductVisibility: (productNameOrId: string, visible?: boolean) => boolean;

  // Admin Auth
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;

  // Categories
  categories: CategoryItem[];
  addCategory: (cat: Omit<CategoryItem, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<CategoryItem>) => void;
  deleteCategory: (id: string) => void;

  // Homepage Config
  homepageConfig: HomepageConfig;
  updateHomepageConfig: (updates: Partial<HomepageConfig>) => void;
  addHomepageSection: (section: Omit<HomepageSection, 'id' | 'order'>) => void;
  updateHomepageSection: (id: string, updates: Partial<HomepageSection>) => void;
  deleteHomepageSection: (id: string) => void;

  // Business Info
  businessInfo: BusinessInformation;
  updateBusinessInfo: (updates: Partial<BusinessInformation>) => void;

  // FAQs
  faqs: FAQItem[];
  addFAQ: (q: string, a: string) => void;
  updateFAQ: (id: string, a: string) => void;

  // AI Activity & Command Execution
  aiActivities: AiActivityLog[];
  addAiActivity: (log: Omit<AiActivityLog, 'id' | 'timestamp'>) => string;
  undoAiActivity: (activityId: string) => boolean;
  runAdminAiCommand: (command: string) => Promise<AdminCommandResult>;
  confirmPendingAction: (pending: PendingConfirmation) => Promise<AdminCommandResult>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('chiku_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('chiku_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('chiku_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  const [comparisonIds, setComparisonIds] = useState<string[]>([]);
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>(() => {
    const saved = localStorage.getItem('chiku_enquiries');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_ENQUIRIES;
  });

  // Navigation state - sync with hash if available
  const [activePage, setActivePageInternal] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  });

  const [selectedProductId, setSelectedProductId] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || 'prod-sp-1';
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);
  const [enquiryTargetProduct, setEnquiryTargetProduct] = useState<Product | null>(null);
  const [aiContextProduct, setAiContextProduct] = useState<Product | null>(null);
  const [aiInitialMessage, setAiInitialMessage] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Admin Authentication (password: 0000 strictly internal, never displayed)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('chiku_admin_auth') === 'true';
  });

  const loginAdmin = (password: string): boolean => {
    if (password.trim() === '0000') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('chiku_admin_auth', 'true');
      showToast('Welcome to Admin Panel', 'success');
      return true;
    }
    showToast('Invalid credentials. Please try again.', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('chiku_admin_auth');
    showToast('Logged out of Admin Panel', 'info');
  };

  // Categories
  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    const saved = localStorage.getItem('chiku_categories');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_CATEGORIES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('chiku_categories', JSON.stringify(categories));
    } catch (e) { /* ignore */ }
  }, [categories]);

  const addCategory = (cat: Omit<CategoryItem, 'id'>) => {
    const newCat: CategoryItem = {
      ...cat,
      id: `cat-${Date.now()}`
    };
    setCategories(prev => [...prev, newCat]);
    showToast(`Category "${newCat.name}" created`, 'success');
  };

  const updateCategory = (id: string, updates: Partial<CategoryItem>) => {
    setCategories(prev => prev.map(c => c.id === id || c.name.toLowerCase() === id.toLowerCase() ? { ...c, ...updates } : c));
    showToast('Category updated', 'success');
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id && c.name.toLowerCase() !== id.toLowerCase()));
    showToast('Category removed', 'info');
  };

  // Homepage Config
  const [homepageConfig, setHomepageConfig] = useState<HomepageConfig>(() => {
    const saved = localStorage.getItem('chiku_homepage_config');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_HOMEPAGE_CONFIG;
  });

  useEffect(() => {
    try {
      localStorage.setItem('chiku_homepage_config', JSON.stringify(homepageConfig));
    } catch (e) { /* ignore */ }
  }, [homepageConfig]);

  const updateHomepageConfig = (updates: Partial<HomepageConfig>) => {
    setHomepageConfig(prev => ({ ...prev, ...updates }));
    showToast('Homepage configuration updated', 'success');
  };

  const addHomepageSection = (section: Omit<HomepageSection, 'id' | 'order'>) => {
    const newSection: HomepageSection = {
      ...section,
      id: `sec-${Date.now()}`,
      order: homepageConfig.customSections.length + 1
    };
    setHomepageConfig(prev => ({
      ...prev,
      customSections: [...prev.customSections, newSection]
    }));
    showToast(`Homepage section "${newSection.title}" created`, 'success');
  };

  const updateHomepageSection = (idOrTitle: string, updates: Partial<HomepageSection>) => {
    setHomepageConfig(prev => ({
      ...prev,
      customSections: prev.customSections.map(s => 
        s.id === idOrTitle || s.title.toLowerCase() === idOrTitle.toLowerCase()
          ? { ...s, ...updates }
          : s
      )
    }));
    showToast('Homepage section updated', 'success');
  };

  const deleteHomepageSection = (idOrTitle: string) => {
    setHomepageConfig(prev => ({
      ...prev,
      customSections: prev.customSections.filter(s => 
        s.id !== idOrTitle && s.title.toLowerCase() !== idOrTitle.toLowerCase()
      )
    }));
    showToast('Homepage section removed', 'info');
  };

  // Business Info
  const [businessInfo, setBusinessInfo] = useState<BusinessInformation>(() => {
    const saved = localStorage.getItem('chiku_business_info');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_BUSINESS_INFO;
  });

  useEffect(() => {
    try {
      localStorage.setItem('chiku_business_info', JSON.stringify(businessInfo));
    } catch (e) { /* ignore */ }
  }, [businessInfo]);

  const updateBusinessInfo = (updates: Partial<BusinessInformation>) => {
    setBusinessInfo(prev => ({ ...prev, ...updates }));
    showToast('Business information updated', 'success');
  };

  // FAQs
  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem('chiku_faqs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return FAQS.map((f, i) => ({ id: `faq-${i+1}`, q: f.q, a: f.a }));
  });

  useEffect(() => {
    try {
      localStorage.setItem('chiku_faqs', JSON.stringify(faqs));
    } catch (e) { /* ignore */ }
  }, [faqs]);

  const addFAQ = (q: string, a: string) => {
    const newFaq = { id: `faq-${Date.now()}`, q, a };
    setFaqs(prev => [...prev, newFaq]);
    showToast('New FAQ added', 'success');
  };

  const updateFAQ = (idOrQ: string, a: string) => {
    setFaqs(prev => prev.map(f => f.id === idOrQ || f.q.toLowerCase().includes(idOrQ.toLowerCase()) ? { ...f, a } : f));
    showToast('FAQ updated', 'success');
  };

  // AI Activity Logs
  const [aiActivities, setAiActivities] = useState<AiActivityLog[]>(() => {
    const saved = localStorage.getItem('chiku_ai_activities');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_ACTIVITY_LOGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('chiku_ai_activities', JSON.stringify(aiActivities));
    } catch (e) { /* ignore */ }
  }, [aiActivities]);

  const addAiActivity = (logData: Omit<AiActivityLog, 'id' | 'timestamp'>): string => {
    const id = `act-${Date.now()}`;
    const newLog: AiActivityLog = {
      ...logData,
      id,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setAiActivities(prev => [newLog, ...prev]);
    return id;
  };

  // Direct Product Modification Helpers
  const updateProductPrice = (productNameOrId: string, newPrice: number): boolean => {
    const target = products.find(p => p.id === productNameOrId || p.name.toLowerCase().includes(productNameOrId.toLowerCase()));
    if (!target) return false;
    const oldPrice = target.price;
    setProducts(prev => prev.map(p => p.id === target.id ? { ...p, price: newPrice } : p));
    addAiActivity({
      command: `Update price of ${target.name} to ₹${newPrice}`,
      action: 'updatePrice',
      parameters: { id: target.id, name: target.name, oldPrice, newPrice },
      result: `Price updated from ₹${oldPrice.toLocaleString('en-IN')} to ₹${newPrice.toLocaleString('en-IN')}`,
      status: 'Success',
      reversible: true,
      previousState: { type: 'price', id: target.id, oldPrice }
    });
    showToast(`Updated ${target.name} price to ₹${newPrice.toLocaleString('en-IN')}`, 'success');
    return true;
  };

  const updateProductStock = (productNameOrId: string, stockStatus: Product['stockStatus']): boolean => {
    const target = products.find(p => p.id === productNameOrId || p.name.toLowerCase().includes(productNameOrId.toLowerCase()));
    if (!target) return false;
    const oldStock = target.stockStatus;
    setProducts(prev => prev.map(p => p.id === target.id ? { ...p, stockStatus, stockCount: stockStatus === 'Out of Stock' ? 0 : (p.stockCount || 5) } : p));
    addAiActivity({
      command: `Change stock of ${target.name} to ${stockStatus}`,
      action: 'updateStock',
      parameters: { id: target.id, name: target.name, oldStock, stockStatus },
      result: `Stock changed to ${stockStatus}`,
      status: 'Success',
      reversible: true,
      previousState: { type: 'stock', id: target.id, oldStock }
    });
    showToast(`Updated ${target.name} to ${stockStatus}`, 'success');
    return true;
  };

  const toggleProductVisibility = (productNameOrId: string, visible?: boolean): boolean => {
    const target = products.find(p => p.id === productNameOrId || p.name.toLowerCase().includes(productNameOrId.toLowerCase()));
    if (!target) return false;
    const newVisible = visible !== undefined ? visible : !(target.visible !== false);
    setProducts(prev => prev.map(p => p.id === target.id ? { ...p, visible: newVisible } : p));
    addAiActivity({
      command: `${newVisible ? 'Show' : 'Hide'} product ${target.name}`,
      action: newVisible ? 'showProduct' : 'hideProduct',
      parameters: { id: target.id, name: target.name, visible: newVisible },
      result: `${target.name} is now ${newVisible ? 'visible' : 'hidden'} on storefront`,
      status: 'Success',
      reversible: true,
      previousState: { type: 'visibility', id: target.id, oldVisible: target.visible !== false }
    });
    showToast(`${target.name} is now ${newVisible ? 'visible' : 'hidden'}`, 'info');
    return true;
  };

  // Undo Functionality
  const undoAiActivity = (activityId: string): boolean => {
    const item = aiActivities.find(a => a.id === activityId);
    if (!item || !item.reversible || !item.previousState) {
      showToast('This action cannot be undone.', 'error');
      return false;
    }

    const { previousState } = item;
    if (previousState.type === 'price') {
      setProducts(prev => prev.map(p => p.id === previousState.id ? { ...p, price: previousState.oldPrice } : p));
    } else if (previousState.type === 'stock') {
      setProducts(prev => prev.map(p => p.id === previousState.id ? { ...p, stockStatus: previousState.oldStock } : p));
    } else if (previousState.type === 'visibility') {
      setProducts(prev => prev.map(p => p.id === previousState.id ? { ...p, visible: previousState.oldVisible } : p));
    } else if (previousState.type === 'hideAllOutOfStock') {
      setProducts(prev => prev.map(p => {
        const matching = previousState.savedList.find((s: any) => s.id === p.id);
        return matching ? { ...p, visible: matching.visible } : p;
      }));
    } else if (previousState.type === 'headline') {
      setHomepageConfig(prev => ({ ...prev, heroHeadline: previousState.oldHeadline }));
    } else if (previousState.type === 'refurbishedSection') {
      setHomepageConfig(prev => ({ ...prev, showRefurbishedSection: previousState.oldVal }));
    } else if (previousState.type === 'businessTiming') {
      setBusinessInfo(prev => ({ ...prev, hours: previousState.oldHours }));
    } else if (previousState.type === 'addProduct') {
      setProducts(prev => prev.filter(p => p.id !== previousState.id));
    } else if (previousState.type === 'createCategory') {
      setCategories(prev => prev.filter(c => c.id !== previousState.id));
    } else if (previousState.type === 'createHomepageSection') {
      setHomepageConfig(prev => ({
        ...prev,
        customSections: prev.customSections.filter(s => s.id !== previousState.id)
      }));
    }

    setAiActivities(prev => prev.map(a => a.id === activityId ? { ...a, status: 'Undone', result: `${a.result} [Undone by Admin]` } : a));
    showToast('Action reversed successfully', 'success');
    return true;
  };

  // Execution Engine for Admin AI Command Center
  const runAdminAiCommand = async (command: string): Promise<AdminCommandResult> => {
    try {
      const res = await fetch('/api/admin/ai/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          command,
          products,
          categories,
          homepageConfig,
          businessInfo
        })
      });

      if (!res.ok) {
        throw new Error('Server error processing command');
      }

      const data = await res.json();

      // Check if action requires confirmation
      if (data.requiresConfirmation) {
        return {
          action: data.action,
          success: false,
          message: data.message || 'Confirmation Required',
          requiresConfirmation: true,
          confirmationDetails: data.confirmationDetails
        };
      }

      // Execute safe predefined actions
      const { action, parameters } = data;

      if (action === 'updatePrice') {
        const prodNameOrId = parameters.productNameOrId;
        const target = products.find(p => p.id === prodNameOrId || p.name.toLowerCase().includes(String(prodNameOrId).toLowerCase()));
        if (target) {
          const oldPrice = target.price;
          setProducts(prev => prev.map(p => p.id === target.id ? { ...p, price: parameters.price } : p));
          const activityId = addAiActivity({
            command,
            action: 'updatePrice',
            parameters: { ...parameters, oldPrice },
            result: `Price of ${target.name} updated from ₹${oldPrice.toLocaleString('en-IN')} to ₹${Number(parameters.price).toLocaleString('en-IN')}`,
            status: 'Success',
            reversible: true,
            previousState: { type: 'price', id: target.id, oldPrice }
          });
          showToast(data.message, 'success');
          return {
            action: 'updatePrice',
            success: true,
            message: data.message,
            modifiedProduct: { ...target, price: parameters.price },
            canUndo: true,
            activityId
          };
        } else {
          return {
            action: 'updatePrice',
            success: false,
            message: `Could not find product "${prodNameOrId}" in current inventory.`
          };
        }
      }

      if (action === 'addProduct') {
        const newProd: Product = {
          id: `prod-${Date.now()}`,
          name: parameters.name,
          brand: parameters.brand || 'General',
          category: parameters.category || 'smartphones',
          price: parameters.price,
          originalPrice: parameters.originalPrice || Math.round(parameters.price * 1.15),
          discount: Math.round(((parameters.originalPrice || parameters.price * 1.15) - parameters.price) / (parameters.originalPrice || parameters.price * 1.15) * 100),
          image: parameters.image || (
            parameters.category === 'laptops' 
              ? 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80'
              : parameters.category === 'computers'
              ? 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80'
              : 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
          ),
          gallery: [
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'
          ],
          rating: 4.8,
          reviewCount: 1,
          stockStatus: 'In Stock',
          stockCount: 8,
          condition: parameters.condition || 'New',
          warranty: parameters.warranty || '1 Year Store Warranty',
          visible: true,
          keySpecs: parameters.keySpecs || {
            ram: parameters.category === 'laptops' ? '16GB' : '8GB',
            storage: '256GB',
            warranty: '1 Year Store Warranty'
          },
          description: parameters.description || `Premium ${parameters.name} backed by Chiku Electronics guarantee.`
        };

        setProducts(prev => [newProd, ...prev]);
        const activityId = addAiActivity({
          command,
          action: 'addProduct',
          parameters: { id: newProd.id, name: newProd.name, price: newProd.price },
          result: `Added product ${newProd.name} for ₹${newProd.price.toLocaleString('en-IN')}`,
          status: 'Success',
          reversible: true,
          previousState: { type: 'addProduct', id: newProd.id }
        });
        showToast(data.message, 'success');
        return {
          action: 'addProduct',
          success: true,
          message: data.message,
          modifiedProduct: newProd,
          canUndo: true,
          activityId
        };
      }

      if (action === 'hideProduct') {
        if (parameters.target === 'out-of-stock') {
          const savedList = products.map(p => ({ id: p.id, visible: p.visible !== false }));
          setProducts(prev => prev.map(p => p.stockStatus === 'Out of Stock' ? { ...p, visible: false } : p));
          const activityId = addAiActivity({
            command,
            action: 'hideProduct',
            parameters: { target: 'out-of-stock' },
            result: 'Hidden all out-of-stock products from storefront',
            status: 'Success',
            reversible: true,
            previousState: { type: 'hideAllOutOfStock', savedList }
          });
          showToast(data.message, 'info');
          return {
            action: 'hideProduct',
            success: true,
            message: data.message,
            canUndo: true,
            activityId
          };
        } else {
          const target = products.find(p => p.id === parameters.productNameOrId || p.name.toLowerCase().includes(String(parameters.productNameOrId).toLowerCase()));
          if (target) {
            setProducts(prev => prev.map(p => p.id === target.id ? { ...p, visible: false } : p));
            const activityId = addAiActivity({
              command,
              action: 'hideProduct',
              parameters: { id: target.id, name: target.name },
              result: `Product "${target.name}" hidden from customer views`,
              status: 'Success',
              reversible: true,
              previousState: { type: 'visibility', id: target.id, oldVisible: target.visible !== false }
            });
            showToast(data.message, 'info');
            return {
              action: 'hideProduct',
              success: true,
              message: data.message,
              modifiedProduct: { ...target, visible: false },
              canUndo: true,
              activityId
            };
          }
        }
      }

      if (action === 'showProduct') {
        const target = products.find(p => p.id === parameters.productNameOrId || p.name.toLowerCase().includes(String(parameters.productNameOrId).toLowerCase()));
        if (target) {
          setProducts(prev => prev.map(p => p.id === target.id ? { ...p, visible: true } : p));
          const activityId = addAiActivity({
            command,
            action: 'showProduct',
            parameters: { id: target.id, name: target.name },
            result: `Product "${target.name}" is visible on storefront`,
            status: 'Success',
            reversible: true,
            previousState: { type: 'visibility', id: target.id, oldVisible: target.visible !== false }
          });
          showToast(data.message, 'success');
          return {
            action: 'showProduct',
            success: true,
            message: data.message,
            modifiedProduct: { ...target, visible: true },
            canUndo: true,
            activityId
          };
        }
      }

      if (action === 'createCategory') {
        const newCat: CategoryItem = {
          id: `cat-${Date.now()}`,
          name: parameters.name,
          slug: parameters.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          description: parameters.description || `Curated ${parameters.name} collection`,
          icon: 'Sparkles',
          visible: true
        };
        setCategories(prev => [...prev, newCat]);
        const activityId = addAiActivity({
          command,
          action: 'createCategory',
          parameters: { id: newCat.id, name: newCat.name },
          result: `Created category "${newCat.name}"`,
          status: 'Success',
          reversible: true,
          previousState: { type: 'createCategory', id: newCat.id }
        });
        showToast(data.message, 'success');
        return {
          action: 'createCategory',
          success: true,
          message: data.message,
          canUndo: true,
          activityId
        };
      }

      if (action === 'createHomepageSection') {
        const newSection: HomepageSection = {
          id: `sec-${Date.now()}`,
          title: parameters.title,
          subtitle: parameters.subtitle || 'Auto-curated section',
          productFilter: parameters.productFilter,
          visible: true,
          order: homepageConfig.customSections.length + 1
        };
        setHomepageConfig(prev => ({
          ...prev,
          customSections: [...prev.customSections, newSection]
        }));
        const activityId = addAiActivity({
          command,
          action: 'createHomepageSection',
          parameters: { id: newSection.id, title: newSection.title },
          result: `Added section "${newSection.title}" to homepage`,
          status: 'Success',
          reversible: true,
          previousState: { type: 'createHomepageSection', id: newSection.id }
        });
        showToast(data.message, 'success');
        return {
          action: 'createHomepageSection',
          success: true,
          message: data.message,
          canUndo: true,
          activityId
        };
      }

      if (action === 'updateHomepageContent') {
        const oldHeadline = homepageConfig.heroHeadline;
        const oldRefurbishedVal = homepageConfig.showRefurbishedSection;
        setHomepageConfig(prev => ({
          ...prev,
          ...parameters
        }));
        const activityId = addAiActivity({
          command,
          action: 'updateHomepageContent',
          parameters,
          result: data.message,
          status: 'Success',
          reversible: true,
          previousState: parameters.heroHeadline ? { type: 'headline', oldHeadline } : { type: 'refurbishedSection', oldVal: oldRefurbishedVal }
        });
        showToast(data.message, 'success');
        return {
          action: 'updateHomepageContent',
          success: true,
          message: data.message,
          canUndo: true,
          activityId
        };
      }

      if (action === 'updateBusinessInformation') {
        const oldHours = businessInfo.hours;
        setBusinessInfo(prev => ({ ...prev, ...parameters }));
        const activityId = addAiActivity({
          command,
          action: 'updateBusinessInformation',
          parameters,
          result: data.message,
          status: 'Success',
          reversible: true,
          previousState: { type: 'businessTiming', oldHours }
        });
        showToast(data.message, 'success');
        return {
          action: 'updateBusinessInformation',
          success: true,
          message: data.message,
          canUndo: true,
          activityId
        };
      }

      if (action === 'searchProducts') {
        const { category, maxPrice, minPrice, condition, brand, ram, outOfStockOnly, query } = parameters;
        const results = products.filter(p => {
          if (query && !p.name.toLowerCase().includes(String(query).toLowerCase()) && !p.description.toLowerCase().includes(String(query).toLowerCase())) return false;
          if (category && p.category.toLowerCase() !== category.toLowerCase()) return false;
          if (maxPrice && p.price > maxPrice) return false;
          if (minPrice && p.price < minPrice) return false;
          if (condition && p.condition.toLowerCase() !== condition.toLowerCase()) return false;
          if (brand && p.brand.toLowerCase() !== brand.toLowerCase()) return false;
          if (ram && p.keySpecs.ram && !p.keySpecs.ram.toLowerCase().includes(ram.toLowerCase())) return false;
          if (outOfStockOnly && p.stockStatus !== 'Out of Stock') return false;
          return true;
        });

        addAiActivity({
          command,
          action: 'searchProducts',
          parameters,
          result: `Found ${results.length} matching products in catalogue`,
          status: 'Success'
        });

        return {
          action: 'searchProducts',
          success: true,
          message: `Found ${results.length} product${results.length === 1 ? '' : 's'} matching your criteria.`,
          searchResults: results
        };
      }

      // Default fallback
      return {
        action: data.action || 'searchProducts',
        success: true,
        message: data.message || 'Action executed successfully.'
      };
    } catch (err: any) {
      console.error('runAdminAiCommand error:', err);
      showToast('Error processing AI command. Please check network.', 'error');
      return {
        action: 'searchProducts',
        success: false,
        message: 'Could not connect to AI service. Please try again.'
      };
    }
  };

  // Confirmation resolution for destructive actions
  const confirmPendingAction = async (pending: PendingConfirmation): Promise<AdminCommandResult> => {
    if (pending.action === 'deleteProduct') {
      const targetName = pending.targetName;
      const target = products.find(p => p.id === pending.targetId || p.name.toLowerCase().includes(targetName.toLowerCase()));
      if (target) {
        setProducts(prev => prev.filter(p => p.id !== target.id));
        addAiActivity({
          command: `Delete ${target.name} (Confirmed)`,
          action: 'deleteProduct',
          parameters: { id: target.id, name: target.name },
          result: `Permanently deleted product "${target.name}" from inventory`,
          status: 'Success',
          reversible: false
        });
        showToast(`Deleted ${target.name}`, 'info');
        return {
          action: 'deleteProduct',
          success: true,
          message: `Done — Permanently deleted product "${target.name}".`
        };
      } else {
        return {
          action: 'deleteProduct',
          success: false,
          message: `Product "${targetName}" not found.`
        };
      }
    }

    if (pending.action === 'deleteCategory') {
      const targetName = pending.targetName;
      setCategories(prev => prev.filter(c => c.name.toLowerCase() !== targetName.toLowerCase() && c.id !== targetName));
      addAiActivity({
        command: `Delete category ${targetName} (Confirmed)`,
        action: 'deleteCategory',
        parameters: { name: targetName },
        result: `Permanently deleted category "${targetName}"`,
        status: 'Success',
        reversible: false
      });
      showToast(`Deleted category "${targetName}"`, 'info');
      return {
        action: 'deleteCategory',
        success: true,
        message: `Done — Deleted category "${targetName}".`
      };
    }

    if (pending.action === 'deleteHomepageSection') {
      const targetName = pending.targetName;
      setHomepageConfig(prev => ({
        ...prev,
        customSections: prev.customSections.filter(s => s.title.toLowerCase() !== targetName.toLowerCase() && s.id !== targetName)
      }));
      addAiActivity({
        command: `Delete homepage section ${targetName} (Confirmed)`,
        action: 'deleteHomepageSection',
        parameters: { title: targetName },
        result: `Removed homepage section "${targetName}"`,
        status: 'Success',
        reversible: false
      });
      showToast(`Removed section "${targetName}"`, 'info');
      return {
        action: 'deleteHomepageSection',
        success: true,
        message: `Done — Removed homepage section "${targetName}".`
      };
    }

    return {
      action: pending.action,
      success: false,
      message: 'Unknown pending action'
    };
  };

  // Persist products
  useEffect(() => {
    try {
      localStorage.setItem('chiku_products', JSON.stringify(products));
    } catch (e) { /* ignore */ }
  }, [products]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('chiku_cart', JSON.stringify(cart));
    } catch (e) { /* ignore */ }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('chiku_wishlist', JSON.stringify(wishlist));
    } catch (e) { /* ignore */ }
  }, [wishlist]);

  // Persist enquiries
  useEffect(() => {
    try {
      localStorage.setItem('chiku_enquiries', JSON.stringify(enquiries));
    } catch (e) { /* ignore */ }
  }, [enquiries]);

  // Handle hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        if (hash.startsWith('product/')) {
          const pid = hash.replace('product/', '');
          setSelectedProductId(pid);
          setActivePageInternal('product-detail');
        } else {
          setActivePageInternal(hash);
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const setActivePage = (page: string) => {
    setActivePageInternal(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setActivePageInternal('product-detail');
    window.location.hash = `product/${productId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name} to Cart`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Removed item from Cart', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    showToast('Cart cleared', 'info');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const isAlready = prev.includes(productId);
      if (isAlready) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to Wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const addToComparison = (productId: string): boolean => {
    if (comparisonIds.includes(productId)) {
      showToast('Product already in comparison list', 'info');
      return true;
    }
    if (comparisonIds.length >= 3) {
      showToast('You can compare up to 3 products at a time', 'error');
      return false;
    }
    setComparisonIds(prev => [...prev, productId]);
    showToast('Added to Product Comparison', 'success');
    return true;
  };

  const removeFromComparison = (productId: string) => {
    setComparisonIds(prev => prev.filter(id => id !== productId));
  };

  const clearComparison = () => {
    setComparisonIds([]);
  };

  const addEnquiry = async (data: Omit<CustomerEnquiry, 'id' | 'createdAt' | 'status'>): Promise<CustomerEnquiry> => {
    const newEnq: CustomerEnquiry = {
      ...data,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'New'
    };

    try {
      // Also try to sync with server API
      fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEnq)
      }).catch(() => { /* offline fallback */ });
    } catch (e) { /* ignore */ }

    setEnquiries(prev => [newEnq, ...prev]);
    showToast('Your enquiry has been received! Our team will respond shortly.', 'success');
    return newEnq;
  };

  const updateEnquiryStatus = (id: string, status: CustomerEnquiry['status']) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    fetch(`/api/enquiries/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }).catch(() => { /* offline */ });
    showToast(`Enquiry status updated to ${status}`, 'info');
  };

  const openEnquiryForProduct = (product?: Product) => {
    setEnquiryTargetProduct(product || null);
    setIsEnquiryModalOpen(true);
  };

  const openAiWithProduct = (product: Product) => {
    setAiContextProduct(product);
    setAiInitialMessage(`Tell me everything about ${product.name}, its pros & cons, warranty, and how it compares to others.`);
    setIsAiModalOpen(true);
  };

  const openAiWithPrompt = (prompt: string) => {
    setAiInitialMessage(prompt);
    setIsAiModalOpen(true);
  };

  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...prodData,
      id: `prod-custom-${Date.now()}`
    };
    setProducts(prev => [newProd, ...prev]);
    showToast(`Product "${newProd.name}" added successfully`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product deleted from catalogue', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        wishlist,
        toggleWishlist,
        isWishlisted,
        comparisonIds,
        addToComparison,
        removeFromComparison,
        clearComparison,
        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        activePage,
        setActivePage,
        selectedProductId,
        navigateToProduct,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isAiModalOpen,
        setIsAiModalOpen,
        isEnquiryModalOpen,
        setIsEnquiryModalOpen,
        enquiryTargetProduct,
        openEnquiryForProduct,
        aiContextProduct,
        openAiWithProduct,
        openAiWithPrompt,
        aiInitialMessage,
        toasts,
        showToast,
        addProduct,
        updateProduct,
        deleteProduct,
        updateProductPrice,
        updateProductStock,
        toggleProductVisibility,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        homepageConfig,
        updateHomepageConfig,
        addHomepageSection,
        updateHomepageSection,
        deleteHomepageSection,
        businessInfo,
        updateBusinessInfo,
        faqs,
        addFAQ,
        updateFAQ,
        aiActivities,
        addAiActivity,
        undoAiActivity,
        runAdminAiCommand,
        confirmPendingAction
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
