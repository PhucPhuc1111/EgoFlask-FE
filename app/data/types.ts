export type LoginRQ = {
  username: string;
  password: string;
}

export type User = {
  id: number;
  email: string;
  role: string;
  avatar:string;
  name: string;
  gender: string;
  birthday: string;
  phoneNumber: string;
  address?: string;
}

export type Profile = {
  token: string;
  role?: string;
  avatar?: {
    value?: string;
  }[];
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
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAvatar: string;
  customerAddress: string;
  accountId: number;
  supplierId: number;
  totalAmount: number;
  discountAmount?: number | null;
  finalAmount?: number | null;
  status?: "PENDING" | "SHIPPING" | "COMPLETED" | "CANCELLED";
  transactionId?: string | null;
  transactionStatus?: 'PAID' | 'CANCELLED' | null;
  createdAt: string;
  updatedAt: string;
  couponId?: string | null;
  orderDetails?: OrderDetail[]; // Add this line to include order details in the Order type
};

export type ComponentDetail = {
  name: string;
  color: string;
  imageUrl: string;
};

export type OrderDetail = {
  orderDetailId: string;
  productId: string;
  productName: string;
  isCustom: boolean;
  productImageURL: string;
  engrave?: string;
  engravePosition?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  head?: ComponentDetail;
  body?: ComponentDetail;
  strap?: ComponentDetail;
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
  isCustom: boolean;
  productImageURL: string;
  engrave?: string | null;
  engravePosition?: string | null;
  letter?: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  isGift: boolean;
  head?: ComponentDetail;
  body?: ComponentDetail;
  strap?: ComponentDetail;
};

export type CheckoutRQ = {
  paymentMethod: string;
  returnUrl: string;
  cancelUrl: string;
}

export type PaymentUrl = {
  bin: string;
  accountNumber: string;
  amount: number;
  description: string;
  orderCode: number;
  currency: string;
  paymentLinkId: string;
  status: string;
  expiredAt?: string | null;
  checkoutUrl: string;
  qrCode: string;
};

export type PaymentResponse = {
  status: string;
  url: PaymentUrl;
  message: string;
};

export type WhiteListClient = {
  From: any[];
  To: any[];
  Return: any[];
};

export type WhiteListDistrict = {
  From: any | null;
  To: any | null;
};

export type District = {
  DistrictID: number;
  ProvinceID: number;
  DistrictName: string;
  Type: number;
  SupportType: number;
  NameExtension: string[];
  CanUpdateCOD: boolean;
  Status: number;
  PickType: number;
  DeliverType: number;
  WhiteListClient: WhiteListClient;
  WhiteListDistrict: WhiteListDistrict;
  ReasonCode: string;
  ReasonMessage: string;
  OnDates: any | null;
  CreatedIP: string;
  CreatedEmployee: number;
  CreatedSource: string;
  CreatedDate: string;
  UpdatedIP: string;
  UpdatedEmployee: number;
  UpdatedSource: string;
  UpdatedDate: string;
};

export type DistrictResponse = {
  code: number;
  message: string;
  data: District[];
};

export type WhiteListWard = {
  From: any | null;
  To: any | null;
};

export type Ward = {
  WardCode: string;
  DistrictID: number;
  WardName: string;
  NameExtension: string[];
  IsEnable: number;
  CanUpdateCOD: boolean;
  UpdatedBy: number;
  CreatedAt: string;
  UpdatedAt: string;
  SupportType: number;
  PickType: number;
  DeliverType: number;
  WhiteListClient: WhiteListClient;
  WhiteListWard: WhiteListWard;
  Status: number;
  ReasonCode: string;
  ReasonMessage: string;
  OnDates: any | null;
  UpdatedEmployee: number;
  UpdatedDate: string;
};

export type WardResponse = {
  code: number;
  message: string;
  data: Ward[];
};

export type Province = {
  ProvinceID: number;
  ProvinceName: string;
  CountryID: number;
  Code: string;
  NameExtension: string[];
  IsEnable: number;
  RegionID: number;
  RegionCPN: number;
  UpdatedBy: number;
  CreatedAt: string;
  UpdatedAt: string;
  AreaID: number;
  CanUpdateCOD: boolean;
  Status: number;
  UpdatedIP: string;
  UpdatedEmployee: number;
  UpdatedSource: string;
  UpdatedDate: string;
};

export type ProvinceResponse = {
  code: number;
  message: string;
  data: Province[];
};

export type OrderTransaction = {
  orderId: string;
  status: string;
  transactionId: number;
  transactionStatus: string;
};

export type DashboardResponse = {
  totalProductsSold: number;
  totalProductsSoldYesterday:number;
  totalCustomer: number;
  totalOrders: number;
  totalOrdersYesterday: number;
  commission: number;
  commissionYesterday: number;
  revenue: number;
  revenueYesterday: number;
  visiter: number; 
};
