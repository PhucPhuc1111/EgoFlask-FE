export type LoginRQ = {
  username: string;
  password: string;
}

export type LoginRS = {
  token: string;
}