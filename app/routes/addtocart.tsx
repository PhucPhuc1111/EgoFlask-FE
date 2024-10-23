const addtocart = () => {
  return (
    <main className="mt-[--m-header-top]">
      <div className="p-12">
        
       <div className="flex space-x-2 ">
       <div className="h-2 w-2 pt-1">
                  <img src="/icons/back_2.png" alt="" className="w-full" />
                </div>
                <div className="text-md text-[#0055C3] font-bold">Tiếp tục mua hàng</div>
       </div>
        
        <p className="text-xl text-black font-semibold  mt-2">
          Giỏ hàng của bạn
        </p>

        <div className="flex p-10 space-x-14">
          <div className="w-1/2 border-b-2 border-t-2 py-24 border-black ">
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
                  <div>
                    <p className="">Dịch vụ đi kèm</p>

                    <div className="flex justify-between pl-3">
                      <div>
                        <p>Khắc lazer: <span className="font-semibold">FPT</span></p>
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
          <div className="w-1/2  space-y-4">
            <div className="bg-[#0055C3] p-10 space-y-12">

         
            <div className="text-lg pb-5 font-bold text-white border-b-2">Tóm tắt đơn hàng</div>
            <div className="flex justify-between text-white border-b-2 pb-5">
              <p>Tạm tính</p>
              <p>?VND</p>
            </div>
            <div className="flex justify-between text-white border-b-2 pb-5">
              <p>Phí giao hàng</p>
              <p>?VND</p>
            </div>
            <div className="flex justify-between text-white  ">
              <p>Tổng thanh toán</p>
              <p>?VND</p>
            </div>
            <div className="flex justify-center ">
                <button
                  type="submit"
                  className="w-48 border-2 rounded-md h-10 text-[#0055c3] bg-white font-semibold"
                >
                 <p className="text-lg font-semibold">Tiếp tục thanh toán</p>
                </button>
              </div>
              </div>
              <div className="bg-[#0055C3] p-3 flex justify-center text-white">
                <p>Miễn phí vận chuyển cho đơn hàng trên 1.000.000 VND</p>
              </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default addtocart;
