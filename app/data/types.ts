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
   token: string;
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