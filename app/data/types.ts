export type LoginRQ = {
  username: string;
  password: string;
}

export type User = {
  id: number;
  email: string;
  role: string;
  name: string;
  gender: string;
  birthday: string;
  phoneNumber: string;
}

export type Profile = {
  token: string;
}
export type Account = {
 
  accountId:number;
  name: string;
  password: string;
  avatar: string;
  gender:string
  dob:string;
  email:string;
  roleId: number
  address:string;
  phoneNumber:string;
  createAt:string;
  status:string;
  orders:[];
  productStocks:[];
  role:string;
}
export type BottleComponent = {
  componentId: string;
  name: string;
  color: string;
  imageUrl: string;
  createAt: string;
  status: string;
  products: any[]; // Adjust the type of products if you have a more specific structure
}

export type Stock = {
  stockId: string;
  productId: string;
  quantity: number;
  stockDate: string;
  createdBy: number;
  notes: string;
  createdByNavigation?: any; // Adjust the type if you have a more specific structure
  product?: any; // Adjust the type if you have a more specific structure
};

export type Order = {
  orderId: string;
  accountId: number;
  supplierId: number;
  totalAmount: number;
  discountAmount?: number | null;
  finalAmount: number;
  status: "PENDING" | "DELIVERING" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
  couponId?: string | null;
};

export type ApproveOrder = {
  supplierId: number;
  orderId: string;
}

export type AddToCartRQ = {
  productId: string;
  quantity: number;
}

export type Product = {
  productId: string;
  productKey: string | null;
  name: string;
  isBestSeller: boolean | null;
  imageUrl: string;
  description: string;
  guides: string;
  price: number;
  inventory: number;
  sold: number;
  engrave: string;
  isCustom: boolean;
  createAt: string;
  status: "ACTIVE" | "INACTIVE";
};

export type Customization = {
  topComponentId: string;
  bodyComponentId: string;
  strapComponentId?: string | null;
  engrave?: string | null;
  engravePosition?: string | null;
  isGift: boolean;
};

export type CartRS = {
  orderDetailId: string;
  productId: string;
  productName: string;
  productImageURL: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type CheckoutRQ = {
  paymentMethod: 'CashOnDelivery' | 'VNPay' | 'PayOS';
  returnUrl: string;
  cancelUrl: string;
}