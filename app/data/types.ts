export type LoginRQ = {
  username: string;
  password: string;
}

export type User = {
  id: number;
  email: string;
  role: string;
}

export type Profile = {
  token: string;
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