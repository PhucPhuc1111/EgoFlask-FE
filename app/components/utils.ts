export const criteria = [
  { label: 'Mật khẩu phải có ít nhất 6 ký tự', test: (password: string) => password.length >= 6 },
  { label: 'Mật khẩu không được quá 25 ký tự', test: (password: string) => password.length > 0 && password.length <= 25 },
  { label: 'Mật khẩu phải có ít nhất một chữ in hoa', test: (password: string) => /[A-Z]/.test(password) },
  { label: 'Mật khẩu phải có ít nhất một ký tự đặc biệt', test: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password) },
];