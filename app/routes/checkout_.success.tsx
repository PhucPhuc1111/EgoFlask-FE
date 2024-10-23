import { Link } from "@remix-run/react";
import { IoCheckmarkCircle } from "react-icons/io5";


export default function CheckoutSuccess() {
  return (
    <main className="mt-[--m-header-top]">
      <div className="bg-[#0055C3] w-full">
        <div className="p-12 flex space-x-16">

          <div className='w-full'>
            <div className="flex flex-col justify-center justify-items-center content-center h-auto">
              <div className="space-y-4 pt-12 flex flex-col items-center justify-center">
                <div className="">
                  <IoCheckmarkCircle className="text-white w-32" />
                </div>
                <p className="text-white text-3xl font-semibold">Thanh toán thành công</p>
                <Link to={'/orders'} className="text-white hover:text-white">
                  Xem đơn hàng
                </Link>
              </div>
            </div>
          </div>
          {/* <div className="w-1/2 ">
            <div className="bg-white h-fit  rounded-3xl p-8 ">
              <div className="border-b-2 pb-7">
                
                <div className="flex">
                  <div className="w-1/3 bg-[#dbdbcf]">
                    <div className="w-32 h-64 ml-12  flex justify-between items-center">
                      <img
                        className="w-full"
                        src="/images/products/bottle-3.png?v=1"
                        alt="Product Collection"
                      />
                    </div>
                  </div>
                  <div className="w-2/3">
                    <div className="p-3 space-y-2">
                      <div className="flex justify-between ">
                        <div>
                          <p className="text-black">
                            Bình giữ nhiệt
                            <span className="font-semibold"> GRACEFUL</span>
                          </p>
                          
                        </div>
                        <div className="flex space-x-4">
                          <p className="text-black">?VND</p>
                          <button>Sửa</button>
                          <button>Xóa</button>
                        </div>
                      </div>
                      <p className="font-semibold text-black">x1</p>
                      <div>
                        <p className="">Dịch vụ đi kèm</p>

                        <div className="flex justify-between pl-3">
                          <div>
                            <p className="">
                              Viết thư tay:{" "}
                              <span className="font-semibold">
                                Sinh nhật vui vẻ !
                              </span>
                            </p>
                            <p className="">Gói quà</p>
                          </div>
                          <div>
                            <div className="flex space-x-4">
                              <p className="text-black">?VND</p>
                              <button>Sửa</button>
                              <button>Xóa</button>
                            </div>
                            <div className="flex space-x-4">
                              <p className="text-black">?VND</p>
                              <button>Sửa</button>
                              <button>Xóa</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                </div>
              </div>
              <div className="flex space-x-3 justify-center pt-5 border-b-2 pb-5">
                <button className="w-56 h-10 border border-[#dbdbcf]   rounded-md bg-[#f9f8f7]">
                  Mã Ego Flask Voucher
                </button>
                <button className=" w-24 h-10 border border-[#dbdbcf]  rounded-md bg-[#f9f8f7]">
                  Áp dụng
                </button>
              </div>
              <div
                className="pt-5 flex justify-between border-b-2 pb-5
                "
              >
                <div className="text-black font-semibold">
                  <p>Tạm tính</p>
                  <p>Phí giao hàng</p>
                </div>

                <div className="text-black font-semibold">
                  <p>?VND</p>
                  <p>?VND</p>
                </div>
              </div>
              <div className="text-black font-semibold flex justify-between pt-5"
              >
                <p>Tổng thanh toán</p>
                <p>?VND</p>
              </div>
              
            </div>
            <button className="bg-[#0055C3] text-white pt-10 flex space-x-3 ">
                <div className="h-2 w-2 pt-1">
                  <img   src="/icons/back.png" alt="" className="w-full"/>   
                </div>
               
            <p>Trở về trang chủ</p>
            </button>
            
          </div> */}
        </div>
      </div>

    </main>
  )
}

