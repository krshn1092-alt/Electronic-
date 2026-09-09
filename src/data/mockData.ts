import { 
  Product, 
  CustomerEnquiry, 
  AiConversation, 
  StoreLocationInfo,
  CategoryItem,
  HomepageConfig,
  BusinessInformation,
  FAQItem,
  AiActivityLog
} from '../types';

export const STORE_INFO: StoreLocationInfo = {
  storeName: 'CHIKU ELECTRONICS',
  tagline: 'Smart Technology. Better Value.',
  address: 'Shop 14-16, Tech Horizon Galleria, Mall Road',
  landmark: 'Near Central Bridge Crossing',
  city: 'Kanpur',
  region: 'Kanpur / Unnao Region, Uttar Pradesh',
  country: 'India',
  phone: '+91 90000 00000',
  email: 'demo@chikuelectronics.example',
  hours: '10:00 AM – 8:00 PM',
  openDays: 'Monday – Saturday (Sunday: Support Online)',
  coordinates: {
    lat: 26.4499,
    lng: 80.3319
  }
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-sp-1',
    name: 'Aura Pro 5G Ultra',
    brand: 'AuraTech',
    category: 'smartphones',
    price: 44999,
    originalPrice: 52999,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 124,
    stockStatus: 'In Stock',
    stockCount: 18,
    condition: 'New',
    warranty: '1 Year Manufacturer Warranty with Free Screen Damage Cover (Demo)',
    keySpecs: {
      processor: 'Snapdragon 8 Gen 3 (Octa-core 3.3 GHz)',
      ram: '12 GB LPDDR5X',
      storage: '256 GB UFS 4.0',
      display: '6.78" 1.5K LTPO AMOLED 144Hz 3000 nits',
      battery: '5400 mAh with 100W HyperCharge',
      camera: '50MP Sony LYT-808 (OIS) + 50MP Ultra-wide + 64MP 3x Periscope',
      os: 'Android 15 (Chiku Certified OS)',
      color: 'Titanium Slate'
    },
    description: 'Flagship tier smartphone engineered for pro photographers and demanding multi-taskers. Features Sony LYT periscope optical zoom, aerospace titanium alloy frame, and AI scene optimizer.',
    whatsIncluded: [
      'Aura Pro 5G Ultra Device',
      '100W HyperCharge GaN Power Adapter',
      'Braided Type-C to Type-C Cable',
      'Matte Frosted Protective Case',
      'SIM Ejector Tool & Documentation'
    ],
    deliveryInfo: 'Free express shipping across Kanpur-Unnao corridor within 24 hours. Nationwide 2-4 days.',
    returnInfo: '7-Day replacement guarantee for manufacturing defects. Hassle-free return policy.',
    isFeatured: true
  },
  {
    id: 'prod-sp-2',
    name: 'PixelPrime Neo 12',
    brand: 'Google Pixel',
    category: 'smartphones',
    price: 38999,
    originalPrice: 45999,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 96,
    stockStatus: 'In Stock',
    stockCount: 12,
    condition: 'New',
    warranty: '1 Year Brand Warranty (Demo)',
    keySpecs: {
      processor: 'Google Tensor G4 AI Processor',
      ram: '8 GB LPDDR5',
      storage: '128 GB NVMe',
      display: '6.4" Actua OLED 120Hz HDR10+',
      battery: '4800 mAh with 30W Fast Charge & Qi Wireless',
      camera: '50MP Primary Quad-PD + 12MP Ultra-wide with Macro Focus',
      os: 'Android 15 Pure Edition',
      color: 'Obsidian Black'
    },
    description: 'Unmatched computational photography with Magic Eraser, Best Take, and 7 years of direct security updates. Compact form factor with IP68 water & dust resistance.',
    whatsIncluded: [
      'PixelPrime Neo 12 Phone',
      '1m USB-C to USB-C Cable (USB 2.0)',
      'Quick Switch OTG Adapter',
      'Documentation & SIM Pin'
    ],
    deliveryInfo: 'Dispatched same-day from Kanpur Central hub.',
    returnInfo: '7-Day demo replacement policy.',
    isFeatured: true
  },
  {
    id: 'prod-lp-1',
    name: 'ZenithBook Pro 15 AI',
    brand: 'Zenith',
    category: 'laptops',
    price: 68999,
    originalPrice: 84999,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 88,
    stockStatus: 'In Stock',
    stockCount: 9,
    condition: 'New',
    warranty: '2 Years Comprehensive On-site Warranty (Demo)',
    keySpecs: {
      processor: 'Intel Core Ultra 7 155H (16 Cores, 22 Threads, NPU AI Engine)',
      ram: '16 GB LPDDR5X 7467MHz Dual Channel',
      storage: '1 TB Gen 4 NVMe M.2 SSD',
      display: '15.6" 3K OLED 120Hz 100% DCI-P3 600 nits DisplayHDR',
      battery: '75 Whr (Up to 14 Hours Battery Backup)',
      graphics: 'Intel Arc Integrated 8-Xe Cores',
      os: 'Windows 11 Home + Lifetime MS Office 2024 (Demo)',
      color: 'Aerospace Gray'
    },
    description: 'Ultra-slim high performance laptop with dedicated neural processing unit (NPU) for local AI, 3K cinema OLED display, glass trackpad, and quad Harman Kardon tuned speakers.',
    whatsIncluded: [
      'ZenithBook Pro 15 AI Laptop',
      '100W Type-C Compact GaN Fast Charger',
      'Velvet Sleeve Bag',
      'Warranty Document & Setup Guide'
    ],
    deliveryInfo: 'Delivered in tamper-proof reinforced courier packaging.',
    returnInfo: '10-Day return window for defects with instant inspection verification.',
    isFeatured: true
  },
  {
    id: 'prod-lp-2',
    name: 'CodeCraft DevBook 14',
    brand: 'Lenovo',
    category: 'laptops',
    price: 48999,
    originalPrice: 59999,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 64,
    stockStatus: 'In Stock',
    stockCount: 15,
    condition: 'New',
    warranty: '1 Year On-site Warranty + Accidental Protection (Demo)',
    keySpecs: {
      processor: 'AMD Ryzen 5 7530U (6 Cores, 12 Threads, up to 4.5 GHz)',
      ram: '16 GB DDR4 3200MHz (Dual Channel, Expandable to 24GB)',
      storage: '512 GB PCIe 4.0 NVMe SSD',
      display: '14" FHD IPS Anti-Glare 300 nits 100% sRGB',
      battery: '57 Whr (Up to 11 Hours Battery with Rapid Charge 80% in 1 hr)',
      graphics: 'AMD Radeon Graphics',
      os: 'Windows 11 Home',
      color: 'Arctic Silver'
    },
    description: 'The coder and engineering student favorite! Tactile ergonomic keyboard with 1.5mm travel, physical webcam privacy shutter, dual full-function USB-C ports, and silent cooling.',
    whatsIncluded: [
      'Lenovo DevBook 14 Laptop',
      '65W USB-C Power Adapter',
      'Quick Start Guide & Regulatory Flyers'
    ],
    deliveryInfo: 'Available for in-store pickup or 24-hr express delivery in Kanpur & Unnao.',
    returnInfo: '7-Day replacement warranty on all new demo units.',
    isFeatured: true
  },
  {
    id: 'prod-lp-3',
    name: 'Predator Titan G16 Gaming',
    brand: 'Asus ROG',
    category: 'laptops',
    price: 92999,
    originalPrice: 114999,
    discount: 19,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 42,
    stockStatus: 'Low Stock',
    stockCount: 3,
    condition: 'New',
    warranty: '2 Years Manufacturer International Warranty (Demo)',
    keySpecs: {
      processor: 'Intel Core i7-14650HX (16 Cores, 24 Threads, up to 5.2 GHz)',
      ram: '16 GB DDR5 5600MHz (Dual slot, expandable to 64GB)',
      storage: '1 TB PCIe Gen 4 SSD (Additional M.2 slot free)',
      display: '16" QHD+ 240Hz 3ms G-Sync 100% DCI-P3',
      battery: '90 Whr with 280W Rapid Adapter',
      graphics: 'NVIDIA GeForce RTX 4060 8GB GDDR6 (140W Full TGP with MUX Switch)',
      os: 'Windows 11 Home',
      color: 'Eclipse Gray with RGB Aura Lighting'
    },
    description: 'Heavyweight esports machine with liquid metal cooling, vapor chamber, per-key RGB mechanical-feel keyboard, and full TGP RTX 4060 for AAA gaming and 4K video rendering.',
    whatsIncluded: [
      'Predator Titan G16 Gaming Laptop',
      '280W Heavy Duty Power Brick',
      'ROG Strix Gaming Mouse (Demo Bundle)',
      'Documentation'
    ],
    deliveryInfo: 'Special hand-delivered courier with verified unboxing.',
    returnInfo: '7-Day replacement with stress-test verification.',
    isFeatured: false
  },
  {
    id: 'prod-dt-1',
    name: 'WorkStation Core Studio X',
    brand: 'Chiku Custom',
    category: 'computers',
    price: 76999,
    originalPrice: 92000,
    discount: 16,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 38,
    stockStatus: 'In Stock',
    stockCount: 6,
    condition: 'New',
    warranty: '3 Years Comprehensive Hardware Warranty (Demo)',
    keySpecs: {
      processor: 'AMD Ryzen 7 7700X (8 Cores, 16 Threads, 5.4 GHz Turbo)',
      ram: '32 GB DDR5 6000MHz Corsair Vengeance',
      storage: '1 TB Samsung 990 Pro Gen 4 NVMe + 2TB Seagate Barracuda HDD',
      graphics: 'NVIDIA GeForce RTX 4070 Super 12GB GDDR6X',
      motherboard: 'MSI B650 Tomahawk WiFi (Bluetooth 5.3 + 2.5GbE LAN)',
      powerSupply: '750W 80-Plus Gold Fully Modular PSU',
      cabinet: 'Lian Li Tempered Glass Airflow Tower with 4 ARGB Fans',
      os: 'Windows 11 Pro Genuine'
    },
    description: 'Custom assembled professional desktop workstation built for 3D architects, video colorists, and AI researchers. Rigorously stress-tested for 72 continuous hours at Chiku Electronics lab.',
    whatsIncluded: [
      'WorkStation Core Studio X Tower Unit',
      'Power Cable & WiFi 6E Magnetic Antenna',
      'Driver USB Drive & Benchmark Report Certificate',
      'Accessories Pack with Extra Screws & Cable Ties'
    ],
    deliveryInfo: 'Delivered in triple-padded shockproof crate. Free local on-site installation in Kanpur/Unnao.',
    returnInfo: '14-Day money back demo guarantee for hardware instability.',
    isFeatured: true
  },
  {
    id: 'prod-dt-2',
    name: 'ViewMaster 27" 4K IPS Monitor',
    brand: 'ViewSonic',
    category: 'computers',
    price: 24999,
    originalPrice: 31999,
    discount: 21,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 52,
    stockStatus: 'In Stock',
    stockCount: 14,
    condition: 'New',
    warranty: '3 Years On-site Brand Warranty with Zero Bright Dot Guarantee (Demo)',
    keySpecs: {
      display: '27" 4K UHD (3840 x 2160) IPS 10-bit Panel',
      refreshRate: '75Hz with AMD FreeSync',
      colorAccuracy: 'Delta E < 1, 99% sRGB, 95% DCI-P3 Factory Calibrated',
      connectivity: '1x USB-C 65W Power Delivery, 2x HDMI 2.0, 1x DisplayPort 1.4, USB 3.2 Hub',
      stand: 'Fully Ergonomic (Height, Pivot 90°, Swivel, Tilt)',
      speakers: 'Built-in 2x 3W Stereo Speakers'
    },
    description: 'Razor sharp 4K creator monitor with single-cable USB-C connectivity that charges your laptop while transmitting 4K video. Anti-glare coating and TÜV Rheinland certified low blue light.',
    whatsIncluded: [
      'ViewMaster 27" 4K Monitor',
      'Ergonomic Quick-Release Stand',
      'High-Speed HDMI 2.0 Cable',
      'USB Type-C 10Gbps Cable',
      'Power Adapter & Factory Color Calibration Report'
    ],
    deliveryInfo: 'Double-boxed padded delivery.',
    returnInfo: '7-Day replacement for zero dead pixel guarantee.',
    isFeatured: false
  },
  {
    id: 'prod-tb-1',
    name: 'ProTab Vision 11 with Stylus',
    brand: 'Galaxy Tab',
    category: 'tablets',
    price: 32999,
    originalPrice: 39999,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 71,
    stockStatus: 'In Stock',
    stockCount: 8,
    condition: 'New',
    warranty: '1 Year Brand Warranty (Demo)',
    keySpecs: {
      processor: 'Snapdragon 8s Gen 3 (Octa-core 3.0 GHz)',
      ram: '8 GB RAM',
      storage: '128 GB (microSD expandable up to 1TB)',
      display: '11" 2.8K 120Hz IPS LCD with Stylus Pen Support (4096 pressure levels)',
      battery: '8840 mAh with 45W Fast Charging (Up to 16h video playback)',
      audio: 'Quad Dolby Atmos Speakers',
      os: 'Android 14 with Desktop PC Mode Support',
      color: 'Mist Green'
    },
    description: 'Versatile student and artist tablet bundled with pressure-sensitive precision stylus. Seamlessly transforms into a mini laptop with optional magnetic keyboard cover.',
    whatsIncluded: [
      'ProTab Vision 11 Tablet',
      'Active Low-Latency Magnetic Stylus Pen',
      '33W Power Adapter',
      'USB-C Charging Cable'
    ],
    deliveryInfo: 'Express delivery within 24-48 hours.',
    returnInfo: '7-Day replacement policy on demo units.',
    isFeatured: false
  },
  {
    id: 'prod-rf-1',
    name: 'iPhone 14 Pro — Certified Refurbished',
    brand: 'Apple',
    category: 'refurbished',
    price: 59999,
    originalPrice: 129900,
    discount: 53,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 142,
    stockStatus: 'In Stock',
    stockCount: 5,
    condition: 'Refurbished',
    warranty: '6 Months Chiku Certified Warranty + Free Battery Checkup (Demo)',
    keySpecs: {
      processor: 'Apple A16 Bionic 4nm Chip',
      ram: '6 GB LPDDR5',
      storage: '128 GB NVMe',
      display: '6.1" Super Retina XDR OLED 120Hz ProMotion with Dynamic Island',
      battery: '3200 mAh (Tested 94% Original Battery Health)',
      camera: '48MP Main + 12MP Ultra Wide + 12MP 3x Telephoto + Photonic Engine',
      os: 'iOS 18 Compatible',
      color: 'Deep Purple'
    },
    refurbishedDetails: {
      conditionGrade: 'Excellent',
      batteryHealth: 94,
      inspectionStatus: '48-Point Diagnostic Passed (Chiku Certified)',
      estimatedAge: '14 Months Pre-owned',
      accessoriesIncluded: 'Certified MFi Braided Lightning Cable & 20W Fast Charger',
      newEquivalentPrice: 129900,
      savingsAmount: 69901
    },
    description: 'Chiku Certified Pre-Owned flagship with zero screen scratches, pristine stainless steel body, and verified 94% battery health. Thoroughly cleaned, sanitized, and software-verified by master technicians.',
    whatsIncluded: [
      'iPhone 14 Pro Certified Device',
      'Chiku Eco-Safe Retail Packaging Box',
      'Brand New 20W PD Fast Adapter (Chiku Certified)',
      '1.2m Braided Fast Cable',
      'Official Chiku Refurbished Certificate of Authenticity'
    ],
    deliveryInfo: 'Includes insured tamper-evident security seal.',
    returnInfo: '7-Day no-questions-asked return with full refund on refurbished products.',
    isFeatured: true
  },
  {
    id: 'prod-rf-2',
    name: 'ThinkPad T14 Gen 2 — Certified Business Edition',
    brand: 'Lenovo',
    category: 'refurbished',
    price: 32999,
    originalPrice: 89000,
    discount: 63,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 97,
    stockStatus: 'In Stock',
    stockCount: 8,
    condition: 'Refurbished',
    warranty: '6 Months Chiku Hardware Warranty + 1 Year Free Remote Support (Demo)',
    keySpecs: {
      processor: 'Intel Core i5-1145G7 vPro (4 Cores, 8 Threads, up to 4.4 GHz)',
      ram: '16 GB DDR4 3200MHz',
      storage: '512 GB NVMe M.2 SSD',
      display: '14" FHD IPS Anti-Glare 300 nits',
      battery: '50 Whr (Tested 91% Original Capacity, 7+ Hours Battery Life)',
      graphics: 'Intel Iris Xe Graphics',
      os: 'Windows 11 Pro Genuine Certified',
      color: 'Matte Corporate Black'
    },
    refurbishedDetails: {
      conditionGrade: 'Excellent',
      batteryHealth: 91,
      inspectionStatus: 'Full Keyboard, Thermal Paste & Motherboard Audit Done',
      estimatedAge: '2 Years Enterprise Lease Return',
      accessoriesIncluded: 'Original Lenovo 65W Type-C AC Adapter',
      newEquivalentPrice: 89000,
      savingsAmount: 56001
    },
    description: 'Legendary enterprise reliability at an accessible student & professional price. Ex-corporate lease return from multinational IT firm with spill-resistant keyboard and MIL-STD 810H durability.',
    whatsIncluded: [
      'ThinkPad T14 Gen 2 Refurbished Laptop',
      'Original 65W USB-C Charger',
      'Chiku Laptop Carry Bag',
      'Diagnostic Quality Report Card'
    ],
    deliveryInfo: 'Ships within 12 hours from Kanpur Central hub.',
    returnInfo: '7-Day replacement or full return policy.',
    isFeatured: true
  },
  {
    id: 'prod-rf-3',
    name: 'MacBook Air M1 2020 — Pre-Owned Value',
    brand: 'Apple',
    category: 'refurbished',
    price: 46999,
    originalPrice: 99900,
    discount: 53,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 168,
    stockStatus: 'In Stock',
    stockCount: 4,
    condition: 'Second-Hand',
    warranty: '3 Months Chiku Store Warranty (Demo)',
    keySpecs: {
      processor: 'Apple Silicon M1 (8-core CPU, 7-core GPU, 16-core Neural Engine)',
      ram: '8 GB Unified Memory',
      storage: '256 GB Ultra-Fast SSD',
      display: '13.3" Retina Display with True Tone 2560x1600',
      battery: 'Tested 89% Battery Health (Cycle count: 215)',
      graphics: 'Integrated Apple 7-Core GPU',
      os: 'macOS Sequoia Ready',
      color: 'Space Gray'
    },
    refurbishedDetails: {
      conditionGrade: 'Good',
      batteryHealth: 89,
      inspectionStatus: 'Tested & Cleaned (Minor cosmetic scuff on bottom edge)',
      estimatedAge: '2.5 Years Pre-owned',
      accessoriesIncluded: '30W USB-C Power Adapter & 2m USB-C Charge Cable',
      newEquivalentPrice: 99900,
      savingsAmount: 52901
    },
    description: 'Iconic fanless MacBook Air with revolutionary battery longevity and silent operation. Inspected in-house with certified genuine logic board and display. Ideal for coding, college, and content editing.',
    whatsIncluded: [
      'MacBook Air M1 Laptop',
      '30W USB-C Power Adapter',
      'Chiku Eco-Padded Sleeve',
      'Chiku Inspection Checklist'
    ],
    deliveryInfo: 'Safe insured delivery with OTP validation upon receipt.',
    returnInfo: '7-Day testing period with zero-friction refund guarantee.',
    isFeatured: true
  },
  {
    id: 'prod-ac-1',
    name: 'PulseFlow ANC Wireless Headphones',
    brand: 'SoundCraft',
    category: 'accessories',
    price: 4999,
    originalPrice: 8999,
    discount: 44,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 110,
    stockStatus: 'In Stock',
    stockCount: 25,
    condition: 'New',
    warranty: '1 Year Brand Replacement Warranty (Demo)',
    keySpecs: {
      audio: '40mm Neodymium Drivers with 42dB Hybrid Active Noise Cancellation',
      battery: '65 Hours Playtime (45 Hours with ANC on), Fast Charge 10 mins = 5 hrs',
      connectivity: 'Bluetooth 5.3 + Dual Device Multi-point Pairing + 3.5mm Aux',
      microphones: 'Quad ENC Mics with Wind Noise Reduction Algorithm',
      comfort: 'Protein Leather Memory Foam Ear cushions, Foldable Design'
    },
    description: 'Studio-grade acoustics with hybrid noise cancellation that silences office and transit chatter. Dual device connection lets you switch between laptop Zoom call and phone music instantly.',
    whatsIncluded: [
      'PulseFlow ANC Headphones',
      'Hard Shell Travel Carrying Case',
      'Type-C Braided Charging Cable',
      '3.5mm Audio Cable for Zero Latency'
    ],
    deliveryInfo: 'Same day dispatch.',
    returnInfo: '7-Day replacement warranty.',
    isFeatured: false
  },
  {
    id: 'prod-ac-2',
    name: 'GaN Ultra 100W 4-Port Fast Hub',
    brand: 'Chiku Gear',
    category: 'accessories',
    price: 2799,
    originalPrice: 4299,
    discount: 35,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 82,
    stockStatus: 'In Stock',
    stockCount: 30,
    condition: 'New',
    warranty: '1 Year Replacement Warranty (Demo)',
    keySpecs: {
      powerOutput: '100W Max Total (Supports PD 3.0, PPS, QC 4.0+, SuperVOOC)',
      ports: '3x USB-C (up to 100W) + 1x USB-A (up to 22.5W)',
      technology: 'Gallium Nitride (GaN III) with Smart Temperature Control',
      compatibility: 'MacBook, Windows Laptops, iPhone, iPad, Android Phones, Smartwatches'
    },
    description: 'One pocket-sized charger to power your entire tech ecosystem. Simultaneously charges your laptop at 65W, smartphone at 30W, and accessories safely without overheating.',
    whatsIncluded: [
      'GaN Ultra 100W Charger',
      '100W 5A E-Marker USB-C to USB-C Cable (1.5m)',
      'User Manual'
    ],
    deliveryInfo: 'Fast dispatch from local store warehouse.',
    returnInfo: '7-Day replacement guarantee.',
    isFeatured: false
  },
  {
    id: 'prod-ac-3',
    name: 'Apex Precision RGB Mechanical Keyboard',
    brand: 'KeyVortex',
    category: 'accessories',
    price: 3999,
    originalPrice: 5999,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 47,
    stockStatus: 'In Stock',
    stockCount: 16,
    condition: 'New',
    warranty: '1 Year Warranty (Demo)',
    keySpecs: {
      switches: 'Hot-Swappable Pre-Lubed Linear Red Mechanical Switches',
      layout: '75% Compact 82-Key Layout with CNC Aluminum Rotary Volume Knob',
      connectivity: 'Tri-Mode: 2.4GHz Wireless, Bluetooth 5.0 (3 devices), Type-C Wired',
      battery: '4000 mAh Rechargeable (up to 200 hours backlight off)',
      keycaps: 'Double-Shot PBT Cherry Profile Keycaps'
    },
    description: 'Satisfying mechanical keystroke sound with double silicone sound-dampening foam. Custom hot-swappable sockets let you replace switches without soldering.',
    whatsIncluded: [
      'Apex Mechanical Keyboard',
      '2.4GHz Wireless USB Dongle',
      'Braided Type-C Coiled Cable',
      '2-in-1 Keycap & Switch Puller',
      '4 Extra Replacement Switches'
    ],
    deliveryInfo: 'Carefully packaged in bubble-wrap sleeve.',
    returnInfo: '7-Day warranty on all switches and circuitry.',
    isFeatured: false
  }
];

export const INITIAL_ENQUIRIES: CustomerEnquiry[] = [
  {
    id: 'enq-101',
    customerName: 'Rahul Verma',
    phone: '+91 98765 43210',
    email: 'rahul.v@example.com',
    productName: 'ThinkPad T14 Gen 2 — Certified Business Edition',
    productId: 'prod-rf-2',
    budget: '₹35,000',
    requirement: 'Need for Python data science and college projects. Want to know if battery backup can support 6 continuous hours in class.',
    message: 'Can I visit the Kanpur Mall Road store today to inspect this ThinkPad in person?',
    createdAt: '2026-09-08 14:32',
    status: 'Interested'
  },
  {
    id: 'enq-102',
    customerName: 'Sneha Srivastava',
    phone: '+91 98230 11223',
    email: 'sneha.s@example.com',
    productName: 'Aura Pro 5G Ultra',
    productId: 'prod-sp-1',
    budget: '₹45,000',
    requirement: 'Interested in phone photography and low-light portrait video. Checking exchange value for old OnePlus 8T.',
    message: 'Do you offer instant trade-in value deduction at the store counter in Unnao/Kanpur?',
    createdAt: '2026-09-08 17:15',
    status: 'New'
  },
  {
    id: 'enq-103',
    customerName: 'Amitabh Mishra',
    phone: '+91 97112 34567',
    email: 'amitabh.m@example.com',
    productName: 'WorkStation Core Studio X',
    productId: 'prod-dt-1',
    budget: '₹80,000',
    requirement: 'Architecture rendering in Revit & Lumion. Need 64GB RAM upgrade quote.',
    message: 'Please send quotation with 64GB DDR5 upgrade and invoice for GST claiming.',
    createdAt: '2026-09-07 11:20',
    status: 'Contacted'
  },
  {
    id: 'enq-104',
    customerName: 'Pooja Agarwal',
    phone: '+91 99345 67890',
    email: 'pooja.a@example.com',
    productName: 'MacBook Air M1 2020 — Pre-Owned Value',
    productId: 'prod-rf-3',
    budget: '₹50,000',
    requirement: 'Graphic design, Figma & Illustrator workflow for startup work.',
    message: 'Purchased and picked up yesterday from Mall Road store. Excellent condition!',
    createdAt: '2026-09-06 16:45',
    status: 'Converted'
  }
];

export const INITIAL_CONVERSATIONS: AiConversation[] = [
  {
    id: 'conv-801',
    date: '2026-09-09 11:15',
    customerName: 'Visitor #4829 (Kanpur)',
    topic: 'Coding Laptop under ₹50,000',
    status: 'Completed',
    messageCount: 4,
    messages: [
      {
        role: 'user',
        text: 'Suggest a laptop under ₹50,000 for web development and college coursework.',
        timestamp: '11:15'
      },
      {
        role: 'assistant',
        text: 'For web development under ₹50,000, here are our two best verified options from the Chiku Electronics catalogue:\n\n1. **CodeCraft DevBook 14 (New)** — ₹48,999: Ryzen 5 7530U (6 Cores, 12 Threads), 16 GB Dual-Channel RAM, 512 GB NVMe SSD, and 11-hour battery life. Perfect for running VS Code, Node.js servers, and Docker containers.\n\n2. **ThinkPad T14 Gen 2 (Certified Refurbished)** — ₹32,999: Intel Core i5 vPro, 16 GB RAM, 512 GB SSD, legendary tactile ThinkPad keyboard, and 6-Month warranty. Saves you ₹16,000 while offering enterprise build quality.\n\nWould you prefer a brand-new model with full 1-year brand warranty, or a certified refurbished ThinkPad to maximize your savings?',
        timestamp: '11:15'
      },
      {
        role: 'user',
        text: 'What is the difference in battery health between the two?',
        timestamp: '11:16'
      },
      {
        role: 'assistant',
        text: 'The brand-new **CodeCraft DevBook 14** comes with a 100% factory battery yielding roughly 10–11 hours of runtime. The certified refurbished **ThinkPad T14 Gen 2** has been bench-tested at 91% original capacity (yielding ~7+ hours of coding time). Both support rapid USB-C charging!',
        timestamp: '11:16'
      }
    ]
  },
  {
    id: 'conv-802',
    date: '2026-09-09 09:40',
    customerName: 'Visitor #4812 (Unnao)',
    topic: 'Phone for photography under ₹45,000',
    status: 'Completed',
    messageCount: 2,
    messages: [
      {
        role: 'user',
        text: 'I need a phone for photography around ₹40,000 - ₹45,000. Which one has better camera, Pixel or Aura?',
        timestamp: '09:40'
      },
      {
        role: 'assistant',
        text: 'Great question! In our store catalogue, we feature:\n\n- **PixelPrime Neo 12 (₹38,999)**: Outstanding computational photography, natural skin tones, and Google Real Tone & Magic Eraser. Best for effortless point-and-shoot portraits and HDR.\n- **Aura Pro 5G Ultra (₹44,999)**: Superior hardware versatility with a 64MP 3x periscope optical zoom lens, 50MP Sony sensor, and 100W fast charging.\n\nRecommendation: If zoom range and rapid charging matter, choose the Aura Pro. If natural portraits and nighttime street shots are your priority, the PixelPrime is hard to beat at ₹38,999.',
        timestamp: '09:41'
      }
    ]
  },
  {
    id: 'conv-803',
    date: '2026-09-08 19:22',
    customerName: 'Visitor #4790 (Lucknow)',
    topic: 'Warranty on Refurbished iPhones',
    status: 'Completed',
    messageCount: 2,
    messages: [
      {
        role: 'user',
        text: 'What warranty do refurbished iPhones have at Chiku Electronics?',
        timestamp: '19:22'
      },
      {
        role: 'assistant',
        text: 'At Chiku Electronics, every certified refurbished iPhone (such as our iPhone 14 Pro at ₹59,999) includes:\n\n1. **6 Months Hardware Warranty** backed directly by our store service team.\n2. **48-Point Diagnostic Certification** confirming 100% genuine display, logic board, and cameras.\n3. **Minimum 85%+ Battery Health Guarantee** (the iPhone 14 Pro is verified at 94%).\n4. **7-Day No-Questions-Asked Return Window**.\n5. Includes brand-new certified 20W PD charger and braided cable.\n\nAll details are documented in the Certificate of Authenticity provided with your device.',
        timestamp: '19:23'
      }
    ]
  }
];

export const FAQS = [
  {
    q: 'Do you sell refurbished and second-hand products?',
    a: 'Yes! Chiku Electronics operates a dedicated "Certified Refurbished & Pre-Owned" division. We source enterprise-lease returns and lightly pre-owned devices, subject each to a strict 48-point hardware & battery diagnostic inspection, clean and re-paste thermals, and provide our store warranty.'
  },
  {
    q: 'What warranty do refurbished products have?',
    a: 'Certified refurbished devices come with 6 Months of Chiku Hardware Warranty plus lifetime technical advice. Second-hand devices come with a 3-month store warranty and a 7-day trial return policy.'
  },
  {
    q: 'Can I compare laptops before purchasing?',
    a: 'Yes! You can select up to 3 products across any category on our website and click "Compare" to view a side-by-side spec sheet, or click "Ask Chiku AI to Compare" to get tailored recommendations based on your specific use case.'
  },
  {
    q: 'Can AI help me choose a product based on my budget?',
    a: 'Yes! Our built-in Chiku AI assistant and Recommendation Engine analyze your budget, primary use (e.g. college, coding, gaming, office), and condition preference to recommend the Top Pick, an Alternative, and a Budget-saving option.'
  },
  {
    q: 'Can I send an enquiry and inspect the device in-store?',
    a: 'Absolutely. You can submit an enquiry form directly from any product page. Our store representative will hold the device for up to 48 hours for your hands-on inspection at our Kanpur Mall Road store.'
  }
];

export const INITIAL_CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-1',
    name: 'Smartphones',
    slug: 'smartphones',
    description: 'Flagship & budget 5G smartphones from Apple, Samsung, Google & OnePlus',
    icon: 'Smartphone',
    visible: true
  },
  {
    id: 'cat-2',
    name: 'Laptops',
    slug: 'laptops',
    description: 'Productivity ultrabooks, coding laptops, and creator workstations',
    icon: 'Laptop',
    visible: true
  },
  {
    id: 'cat-3',
    name: 'Computers',
    slug: 'computers',
    description: 'Custom desktop rigs, 4K monitors, and studio workstations',
    icon: 'Monitor',
    visible: true
  },
  {
    id: 'cat-4',
    name: 'Accessories',
    slug: 'accessories',
    description: 'GaN multi-port chargers, mechanical keyboards & ANC headphones',
    icon: 'Headphones',
    visible: true
  },
  {
    id: 'cat-5',
    name: 'Refurbished',
    slug: 'refurbished',
    description: '48-point certified refurbished tech with 85%+ battery health guarantee',
    icon: 'RotateCcw',
    visible: true
  }
];

export const INITIAL_HOMEPAGE_CONFIG: HomepageConfig = {
  heroHeadline: 'Smart Technology. Better Value.',
  heroSubheadline: 'Explore premium new, certified refurbished, and second-hand electronics backed by transparent 48-point testing and instant AI assistance.',
  showRefurbishedSection: true,
  showCategoriesSection: true,
  showFeaturedProducts: true,
  customSections: []
};

export const INITIAL_BUSINESS_INFO: BusinessInformation = {
  name: 'CHIKU ELECTRONICS',
  tagline: 'Smart Technology. Better Value.',
  address: 'Shop 14-16, Tech Horizon Galleria, Mall Road',
  city: 'Kanpur',
  region: 'Uttar Pradesh',
  postalCode: '208001',
  phone: '+91 90000 00000',
  email: 'demo@chikuelectronics.example',
  hours: '10:00 AM – 8:00 PM',
  openDays: 'Monday – Saturday'
};

export const INITIAL_ACTIVITY_LOGS: AiActivityLog[] = [
  {
    id: 'act-101',
    timestamp: '2026-09-09 10:14',
    command: 'System initialized with demo electronics inventory',
    action: 'updateStock',
    parameters: { totalProducts: 10 },
    result: 'Loaded 10 premium electronics products into catalogue',
    status: 'Success',
    reversible: false
  }
];

