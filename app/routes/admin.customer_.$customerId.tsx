

const adminCustomerCustomerId = () => {
  return (
    <main className="flex-1 pt-32 pb-10 h-full max-h-screen overflow-auto px-8">
      <div className="col-span-10 border-[#0055C3] my-9 border-2 rounded-3xl px-7  ">
        <div className="p-7">
          <div className="">
            <div className="border-[#0055C3] w-full p-7 ">
            <div className="flex items-center space-x-7">
                    <p className="text-lg font-semibold text-[#0055C3]  ">
                      Hồ sơ
                    </p>
                    <img
                      className="h-20 w-20"
                      src="/images/avatar.png"
                      alt=""
                    />
                  </div>
              <div className="flex space-x-24">
                <div className="mt-4 space-y-6  font-semibold text-[#9c9797]">
                  
                  <div className="">Họ và tên</div>
                  <div className="">Email</div>
                  <div className="">Số điện thoại</div>
                  <div className="">Giới tính</div>
                  <div className="">Ngày sinh</div>
                  <div className="">Địa chỉ nhận hàng</div>
                </div>
                <div className=" mt-4 ml-4 space-y-6   text-black">
                  <div className="flex space-x-9">
                    <span className="">Nguyễn Văn A </span>
                  </div>
                  <div className="flex space-x-9">
                    <span>ng************9@gmail.com</span>
                  </div>
                  <div className="flex space-x-9">
                    <span>*********90</span>
                  </div>

                  <div className="flex space-x-9">
                    <span>Nam</span>
                  </div>

                  <div className="flex space-x-9">
                    <span>**/10/20**</span>
                  </div>
                  <div className="flex space-x-9">
                    <span>à</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default adminCustomerCustomerId;
