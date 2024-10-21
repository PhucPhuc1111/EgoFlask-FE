import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { payOsCallBack } from "~/data";

export async function loader({ request }: LoaderFunctionArgs) {
  let url = new URL(request.url);
  let params = new URLSearchParams(url.search);
  let code = params.get("code");
  let id = params.get("id");
  let cancel = params.get("cancel");
  let status = params.get("status");
  let orderCode = params.get("orderCode");

  try {
    let response = await payOsCallBack({
      orderId: id || "",
      status: status || "",
      transactionId: Number(orderCode),
      transactionStatus: status || ""
    })
    console.log('====response', response);
    
    if (response) {
      if (cancel === "true") {
        return redirect(`/checkout?message=${encodeURIComponent("Bạn đã hủy thanh toán thành công")}&type=error`);
      }
      return redirect('/checkout/success')
    }
  } catch (error: any) {
    console.log('====error', error);
    
    return redirect(`/checkout?message=${encodeURIComponent(`Có lỗi trong quá trình xử lý thanh toán: Status: ${error.status}`)}&type=error`);
  }
}