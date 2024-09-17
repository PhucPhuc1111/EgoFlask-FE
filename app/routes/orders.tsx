import { ProfileSidebar, SubFooter } from "~/components";

const Orders = () => {
  const productList = [
    {
      id: 1,
      name: "Graceful",
      img: "/images/products/bottle-1.png",
      price: "100.000",
    },
    {
      id: 2,
      name: "Gracious",
      img: "/images/products/bottle-2.png",
      price: "150.000",
    },
    {
      id: 3,
      name: "Creative",
      img: "/images/products/bottle-3.png",
      price: "200.000",
    },
    {
      id: 4,
      name: "Dynamic",
      img: "/images/products/bottle-4.png",
      price: "250.000",
    },
   
  ];
  return (
    <main className="mt-[--m-header-top] ">
      <div className="grid grid-cols-12 w-full space-x-7 pr-8">
        <div className="col-span-2  border-[#e8e8e4] border-2 rounded-r-3xl w-full  ">
          <ProfileSidebar />
        </div>
        <div className="col-span-10 border-[#0055C3] my-9 border-2   ">
          <table className="w-full">
            <thead className="bg-[#0055C3] text-white">
              <tr>
                <th>Mã đơn hàng</th>
                <th>Sản phẩm</th>
                <th>Địa chỉ nhận hàng</th>
                <th>Tình trạng</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {productList.map((product) => (
                <tr key={product.id} className="border-b-2">
                  <th>#{product.id}</th>
                  <td className="flex justify-center ">
                    <div className="1/3 p-4 ">
                     <div className="p-4  bg-[#e8e8e4]">
                     <img
                        className="w-[90px] h-[160px] relative"
                        src={product.img}
                        alt=""
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
                              </div>
                              <div className="flex space-x-4">
                                <p className="text-black">?VND</p>
                              </div>
                            </div>
                          </div>
                          <div className="border-t-2 border-[#0055C3]  flex justify-between">
                            <p className="text-[#0055C3] font-semibold pt-2">
                              Tổng tiền
                            </p>

                            <p className="text-[#0055C3] font-semibold pt-2">
                              ?VND
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>{" "}
                  <td>
                    <div className="w-[226px] h-[132px]">
                      <div className="space-y-2">
                        <p className="font-semibold text-black">Nguyễn Văn A</p>
                        <p>(+84) 234567890</p>
                        <p>
                          1/2/3/4/5 Đường ABC, phường XYZ, Quận 1, thành phố Hồ
                          Chí Minh
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>Đang chuẩn bị hàng</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <SubFooter />
      </div>
    </main>
  );
};

export default Orders;
