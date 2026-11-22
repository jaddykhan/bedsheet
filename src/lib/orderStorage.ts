export interface StoredOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  province: string;
  city: string;
  address: string;
  landmark?: string;
  paymentMethod: "COD" | "JazzCash" | "Easypaisa" | "Card";
  paymentStatus: "PENDING" | "PAID";
  fulfillmentStatus: "PLACED" | "PROCESSING" | "DISPATCHED" | "DELIVERED";
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  courier: string;
  trackingNumber: string;
  createdAt: string;
  items: {
    productId: string;
    title: string;
    image: string;
    size: string;
    fabric: string;
    quantity: number;
    price: number;
  }[];
}

// In-memory demo store pre-populated with realistic orders for tracking & admin testing
export const INITIAL_ORDERS: StoredOrder[] = [
  {
    id: "ord-10491",
    orderNumber: "LL-PK-10491",
    customerName: "Zubair Ahmed",
    customerEmail: "zubair.ahmed@example.com",
    customerPhone: "03001234567",
    province: "Punjab",
    city: "Lahore",
    address: "House 42, Street 7, Phase 5 DHA",
    landmark: "Near Jalal Sons",
    paymentMethod: "COD",
    paymentStatus: "PENDING",
    fulfillmentStatus: "DISPATCHED",
    subtotal: 6780,
    shippingFee: 0,
    discount: 0,
    total: 6780,
    courier: "TCS Express",
    trackingNumber: "TCS-928410291",
    createdAt: "2026-11-20T10:14:00Z",
    items: [
      {
        productId: "prod-1",
        title: "Meadow Bloom Bedsheet Set",
        image: "/images/products/meadow-bloom.jpg",
        size: "King",
        fabric: "Pure Cotton",
        quantity: 1,
        price: 3290,
      },
      {
        productId: "prod-2",
        title: "Urban Stripe Bedsheet Set",
        image: "/images/products/urban-stripe.jpg",
        size: "Double",
        fabric: "Cambric",
        quantity: 1,
        price: 3490,
      },
    ],
  },
  {
    id: "ord-10492",
    orderNumber: "LL-PK-10492",
    customerName: "Ayesha Malik",
    customerEmail: "ayesha.malik@example.com",
    customerPhone: "03218765432",
    province: "Sindh",
    city: "Karachi",
    address: "Flat 4-B, Ocean View Apartments, Block 4 Clifton",
    paymentMethod: "JazzCash",
    paymentStatus: "PAID",
    fulfillmentStatus: "PROCESSING",
    subtotal: 8990,
    shippingFee: 0,
    discount: 899,
    total: 8091,
    courier: "Leopards Courier",
    trackingNumber: "LEO-48192031",
    createdAt: "2026-11-21T08:30:00Z",
    items: [
      {
        productId: "prod-6",
        title: "Royal Damask Embroidered Bridal Set",
        image: "/images/categories/bridal-collection.jpg",
        size: "King",
        fabric: "Satin",
        quantity: 1,
        price: 8990,
      },
    ],
  },
];
