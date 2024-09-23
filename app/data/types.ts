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