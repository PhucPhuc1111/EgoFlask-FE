export const criteria = [
  { label: 'Mật khẩu phải có ít nhất 6 ký tự', test: (password: string) => password.length >= 6 },
  { label: 'Mật khẩu không được quá 25 ký tự', test: (password: string) => password.length > 0 && password.length <= 25 },
  { label: 'Mật khẩu phải có ít nhất một chữ in hoa', test: (password: string) => /[A-Z]/.test(password) },
  { label: 'Mật khẩu phải có ít nhất một ký tự đặc biệt', test: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password) },
];

export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(amount);
};

export function splitProductImageURLs(productImageURL: string): { top: string; body: string; strap: string } {
  const parts = productImageURL.split(',');
  if (parts.length !== 3) {
    // If not exactly 3 parts, consider it as a full image
    return {
      top: productImageURL.trim(),
      body: '',
      strap: ''
    };
  }
  return {
    top: parts[0].trim(),
    body: parts[1].trim(),
    strap: parts[2].trim()
  };
}