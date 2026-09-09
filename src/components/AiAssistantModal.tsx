import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Product, AiChatMessage } from '../types';
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  Loader2, 
  ShoppingBag, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle,
  Maximize2,
  Minimize2,
  RefreshCw
} from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  'Suggest a laptop under ₹50,000.',
  'I need a phone for photography.',
  'Which laptop is better for coding?',
  'Do you have refurbished laptops?',
  'Show me cheaper alternatives.',
  'What warranty do refurbished products have?'
];

export const AiAssistantModal: React.FC = () => {
  const { 
    isAiModalOpen, 
    setIsAiModalOpen, 
    aiContextProduct, 
    aiInitialMessage,
    navigateToProduct,
    addToCart
  } = useApp();

  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: 'Hello! I am **Chiku AI**, your personal shopping assistant for Chiku Electronics. Ask me to find products within your budget, compare specs, or discover certified refurbished bargains!',
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle initial prompt when opened
  useEffect(() => {
    if (isAiModalOpen && aiInitialMessage) {
      handleSendMessage(aiInitialMessage);
    }
  }, [isAiModalOpen, aiInitialMessage]);

  if (!isAiModalOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    setErrorNotice(null);
    const userMsg: AiChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-4), // recent context
          contextProductId: aiContextProduct?.id
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      const botMsg: AiChatMessage = {
        id: `msg-bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Here is what I found in our store catalogue.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        productSuggestions: data.suggestedProducts || [],
        isDemoFallback: !data.source || !data.source.startsWith('gemini')
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      console.log('AI Chat request notice, using store fallback message:', err?.message || err);
      setErrorNotice('Store engine active (Network or offline fallback)');
      
      const fallbackBotMsg: AiChatMessage = {
        id: `msg-bot-${Date.now()}`,
        role: 'assistant',
        content: `I reviewed your query about "${query}". In our Chiku Electronics catalogue, you can browse verified options across new smartphones, laptops, custom desktops, and certified refurbished devices with store warranties. How can I assist your search further?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDemoFallback: true
      };
      setMessages(prev => [...prev, fallbackBotMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: 'Chat refreshed. How can I assist you with electronics today?',
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-w-4xl h-[92vh]' : 'max-w-2xl h-[80vh]'
        }`}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">Chiku AI</h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Live Assistant
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Your personal electronics shopping assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <button
              onClick={handleResetChat}
              className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Reset conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors hidden sm:block"
              title={isExpanded ? 'Minimize view' : 'Expand view'}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsAiModalOpen(false)}
              className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Current Product Context Bar (if launched from a product) */}
        {aiContextProduct && (
          <div className="px-5 py-2.5 bg-cyan-950/40 border-b border-cyan-500/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 text-cyan-200">
              <span className="text-slate-400">Product Context:</span>
              <strong className="text-white font-medium">{aiContextProduct.name}</strong>
              <span className="text-cyan-400 font-bold">₹{aiContextProduct.price.toLocaleString('en-IN')}</span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-[10px]">
                {aiContextProduct.condition}
              </span>
            </div>
          </div>
        )}

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs leading-relaxed ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 space-y-3 ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-xs'
                    : 'bg-slate-950/70 border border-slate-800 text-slate-200 rounded-bl-xs'
                }`}
              >
                {/* Message text with formatting */}
                <div className="whitespace-pre-line prose prose-invert prose-xs">
                  {msg.content}
                </div>

                {/* Product Suggestion Cards in Chat */}
                {msg.productSuggestions && msg.productSuggestions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="text-[10px] font-semibold text-cyan-400 tracking-wide uppercase">
                      Relevant Store Products:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.productSuggestions.map((prod) => (
                        <div
                          key={prod.id}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-colors"
                        >
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-12 h-12 rounded-lg object-cover bg-slate-950 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-white truncate text-[11px]">
                              {prod.name}
                            </div>
                            <div className="text-cyan-400 font-bold text-[11px]">
                              ₹{prod.price.toLocaleString('en-IN')}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <button
                                onClick={() => {
                                  setIsAiModalOpen(false);
                                  navigateToProduct(prod.id);
                                }}
                                className="text-[10px] text-cyan-400 hover:text-cyan-300 font-medium"
                              >
                                View Specs
                              </button>
                              <span className="text-slate-600">•</span>
                              <button
                                onClick={() => addToCart(prod)}
                                className="text-[10px] text-emerald-400 hover:text-emerald-300 font-medium"
                              >
                                + Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-[10px] text-slate-400 text-right">
                  {msg.timestamp}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-300 shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-slate-400 text-xs pl-2">
              <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>Chiku AI is analyzing the store catalogue...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-5 py-2 bg-slate-950/50 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
              Suggestions:
            </span>
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-cyan-500/20 hover:text-cyan-300 border border-slate-700/60 hover:border-cyan-500/40 text-slate-300 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about laptops, cameras, coding specs, refurbished savings..."
              disabled={isLoading}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="mt-1.5 text-[10px] text-slate-500 text-center">
            Chiku AI uses real store inventory data. Prices in INR (₹). Demo Mode Active.
          </div>
        </div>

      </div>
    </div>
  );
};
