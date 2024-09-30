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

export type Component = {
  componentId: string;
  name: string;
  color: string;
  imageUrl: string
  status: string
}