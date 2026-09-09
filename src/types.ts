export type ProductCategory = 
  | 'smartphones' 
  | 'laptops' 
  | 'computers' 
  | 'tablets' 
  | 'accessories' 
  | 'refurbished';

export type ProductCondition = 'New' | 'Refurbished' | 'Second-Hand';

export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export type RefurbishedGrade = 'Excellent' | 'Good' | 'Fair';

export interface RefurbishedDetails {
  conditionGrade: RefurbishedGrade;
  batteryHealth?: number; // e.g. 94%
  inspectionStatus: string; // e.g. "48-Point Diagnostic Passed"
  estimatedAge: string; // e.g. "10 Months"
  accessoriesIncluded: string; // e.g. "Original 67W Charger & Cable"
  newEquivalentPrice: number;
  savingsAmount: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory | string;
  price: number;
  originalPrice: number;
  discount: number; // percentage
  image: string;
  gallery?: string[];
  rating: number;
  reviewCount: number;
  stockStatus: StockStatus;
  stockCount: number;
  condition: ProductCondition;
  warranty: string;
  visible?: boolean; // defaults to true; admin can hide/show
  keySpecs: {
    processor?: string;
    ram?: string;
    storage?: string;
    display?: string;
    battery?: string;
    camera?: string;
    graphics?: string;
    os?: string;
    color?: string;
    connectivity?: string;
    [key: string]: string | undefined;
  };
  description: string;
  whatsIncluded?: string[];
  deliveryInfo?: string;
  returnInfo?: string;
  isFeatured?: boolean;
  refurbishedDetails?: RefurbishedDetails;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWarranty?: string;
}

export interface CustomerEnquiry {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  productName: string;
  productId?: string;
  budget: string;
  requirement: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Interested' | 'Converted' | 'Closed';
}

export interface AiChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  productSuggestions?: Product[];
  suggestedActions?: string[];
  isDemoFallback?: boolean;
}

export interface AiConversation {
  id: string;
  date: string;
  customerName: string;
  topic: string;
  status: 'Completed' | 'Active' | 'Follow-up';
  messageCount: number;
  messages: {
    role: 'user' | 'assistant';
    text: string;
    timestamp: string;
  }[];
}

export interface RecommendationCriteria {
  budget: number;
  primaryUse: string;
  preferredBrand: string;
  performanceRequirement: string;
  storageRequirement: string;
  conditionPreference: string;
}

export interface RecommendationResult {
  topPick: {
    product: Product;
    matchReason: string;
    keyHighlight: string;
    limitations: string;
  };
  alternative: {
    product: Product;
    matchReason: string;
    keyHighlight: string;
    limitations: string;
  };
  budgetOption: {
    product: Product;
    matchReason: string;
    keyHighlight: string;
    limitations: string;
  };
  aiAnalysisSummary: string;
}

export interface ProductFilterState {
  search: string;
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  condition: string;
  ram: string;
  storage: string;
  processor: string;
  rating: number;
  stockOnly: boolean;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

export interface StoreLocationInfo {
  storeName: string;
  tagline: string;
  address: string;
  landmark: string;
  city: string;
  region: string;
  country: string;
  phone: string;
  email: string;
  hours: string;
  openDays: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  visible: boolean;
}

export interface HomepageSection {
  id: string;
  title: string;
  subtitle?: string;
  productFilter?: {
    category?: string;
    maxPrice?: number;
    minPrice?: number;
    condition?: string;
    brand?: string;
    search?: string;
  };
  visible: boolean;
  order: number;
}

export interface HomepageConfig {
  heroHeadline: string;
  heroSubheadline: string;
  showRefurbishedSection: boolean;
  showCategoriesSection: boolean;
  showFeaturedProducts: boolean;
  customSections: HomepageSection[];
}

export interface BusinessInformation {
  name: string;
  tagline: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  phone: string;
  email: string;
  hours: string;
  openDays: string;
}

export interface FAQItem {
  id: string;
  q: string;
  a: string;
}

export type AdminSupportedAction =
  | 'addProduct'
  | 'updateProduct'
  | 'deleteProduct'
  | 'searchProducts'
  | 'filterProducts'
  | 'updatePrice'
  | 'updateStock'
  | 'hideProduct'
  | 'showProduct'
  | 'createCategory'
  | 'updateCategory'
  | 'deleteCategory'
  | 'createHomepageSection'
  | 'updateHomepageSection'
  | 'deleteHomepageSection'
  | 'updateHomepageContent'
  | 'updateBusinessInformation'
  | 'createFAQ'
  | 'updateFAQ';

export interface PendingConfirmation {
  id: string;
  action: AdminSupportedAction;
  targetName: string;
  targetId?: string;
  message: string;
  params: any;
}

export interface AiActivityLog {
  id: string;
  timestamp: string;
  command: string;
  action: AdminSupportedAction;
  parameters: any;
  result: string;
  status: 'Success' | 'Pending Confirmation' | 'Failed' | 'Undone';
  reversible?: boolean;
  previousState?: any;
}

export interface AdminCommandResult {
  action: AdminSupportedAction;
  success: boolean;
  message: string;
  requiresConfirmation?: boolean;
  confirmationDetails?: PendingConfirmation;
  modifiedProduct?: Product;
  searchResults?: Product[];
  canUndo?: boolean;
  activityId?: string;
}

