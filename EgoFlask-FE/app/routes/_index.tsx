import type { MetaFunction } from "@remix-run/node";
import Banner from "/images/Banner.png";
import subBanner1 from "/images/subBanner1.png";
import subBanner2 from "/images/subBanner2.png";
import binh1 from "/images/binh1.png";
import { SubFooter } from "~/components";

export const meta: MetaFunction = () => {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main className="mt-[--m-header-top]">
      <div className="mx-auto">
        {/* <ul className="list-disc mt-4 pl-6 space-y-2">
          <li>
            <a
              className="text-blue-700 underline visited:text-purple-900"
              target="_blank"
              href="https://remix.run/start/quickstart"
              rel="noreferrer"
            >
              5m Quick Start
            </a>
          </li>
          <li>
            <a
              className="text-blue-700 underline visited:text-purple-900"
              target="_blank"
              href="https://remix.run/start/tutorial"
              rel="noreferrer"
            >
              30m Tutorial
            </a>
          </li>
          <li>
            <a
              className="text-blue-700 underline visited:text-purple-900"
              target="_blank"
              href="https://remix.run/docs"
              rel="noreferrer"
            >
              Remix Docs
            </a>
          </li>
        </ul> */}
        <div className="flex justify-center">
          <div className="">
            <img className="max-h-full  " src={Banner} alt="" />
          </div>
        </div>
        <div>
          <div className="w-full flex justify-center text-white font-bold text-3xl bg-[#0055c3] py-4">
            <span>CÂU CHUYỆN VỀ EGO FLASK</span>
          </div>
          <div className="flex">
            <div className="w-1/2">
              <img className="w-full" src={subBanner1} alt="" />
            </div>
            <div className="w-1/2 mt-16 p-12 space-y-7 text-black text-justify px-16 ">
              <p>
                Ngày nay, yếu tố cá nhân hóa đang ngày một phổ biến trong những
                sản phẩm và dịch vụ, Ego Flask đã ra đời với mục tiêu mang đến
                cơ hội cho mọi người sáng tạo và sở hữu chiếc bình giữ nhiệt thể
                hiện rõ cá tính của từng người. Chúng tôi tin rằng mọi người đều
                xứng đáng được nổi bật và được làm mới theo cách đặc biệt của
                riêng mình thông qua trải nghiệm cá nhân hóa hoàn toàn với sản
                phẩm bình giữ nhiệt tại Ego Flask.
              </p>
              <p>
                Quá trình thiết kế không chỉ đơn thuần là việc chọn màu sắc và
                bộ phận, mà nó trở thành một cuộc phiêu lưu sáng tạo, một khám
                phá về chính bản thân. Khách hàng có thể xem trước và tùy chỉnh
                thiết kế của mình, tạo nên một chiếc bình giữ nhiệt hoàn toàn
                độc đáo và phản ánh cá nhân. EgoFlask cam kết rằng mỗi sản phẩm
                được đặt hàng sẽ được chọn từng bộ phận một, đóng gói và giao
                đến tận tay khách hàng. Điều này đảm bảo rằng mỗi chiếc bình giữ
                nhiệt EgoFlask là duy nhất và đáp ứng đúng yêu cầu của từng
                khách hàng.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full flex justify-center text-[#0055c3] font-bold text-3xl  py-4 ">
            <span>VÌ SAO BẠN NÊN CHỌN EGO FLASK ?</span>
          </div>
          <div>
            <SubFooter />
          </div>
        </div>
        <div className="w-full bg-[#0055c3] text-white flex">
          <div className="w-1/2">
            <img src={subBanner2} className="w-full h-[700px] " alt="" />
          </div>
          <div className="w-1/2 text-center">
            <div className="flex  justify-center p-12 w-full justify-items-center">
              <div className=" justify-items-center space-y-8 mt-16 text-justify    ">
                <div className="text-white text-center font-bold text-3xl mt-[100px]">
                  THỂ HIỆN " CHẤT RIÊNG " QUA SẢN PHẨM
                </div>
                <div className="flex justify-center	text-justify  mt-16  ">
                  Với EgoFlask, khách hàng không chỉ đơn thuần là người mua
                  hàng, mà họ được trở thành những người sáng tạo, những nhà
                  thiết kế tài ba. Từ việc truy cập trang web hoặc ứng dụng của
                  EgoFlask, khách hàng có thể bước vào một thế giới của sự tùy
                  chỉnh và sáng tạo. Họ được tự do lựa chọn từ một loạt màu sắc
                  tinh tế và tùy chỉnh các bộ phận của bình giữ nhiệt, từ
                  cap-nắp, loop-dây quai đeo đến bottle-thân bình. Không chỉ
                  vậy, khách hàng còn có khả năng khắc laser tên, thông điệp
                  hoặc kí tự đặc biệt lên trên bình của mình, tạo nên một sản
                  phẩm cá nhân hóa độc đáo, thể hiện phong cách và cá nhân của
                  mỗi người.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full  my-4 ">
          <div className="text-center text-[#0055c3] font-bold text-3xl  py-4">
            Sản phẩm nổi bật
          </div>
          <div className="flex space-x-16 p-12 text-center">
            <div className="w-1/4 border-4 border-[#0055c3] ">
              <div className="flex justify-center">
                <img src={binh1} className="w-fit relative" alt="" />
              </div>

              <p className="py-5">Graceful</p>
            </div>
            
            <div className="w-1/4 border-4 border-[#0055c3] ">
              <div className="flex justify-center">
                <img src={binh1} className="w-fit relative" alt="" />
              </div>
              <p className="py-5">Graceful</p>
            </div>
            
            <div className="w-1/4 border-4 border-[#0055c3] ">
              <div className="flex justify-center">
                <img src={binh1} className="w-fit" alt="" />
              </div>

              <p className="py-5">Graceful</p>
            </div>
            
            <div className="w-1/4 border-4 border-[#0055c3] ">
              <div className="flex justify-center">
                <img src={binh1} className="w-fit" alt="" />
              </div>

              <p className="py-5">Graceful</p>
            </div>
            
          </div>

          <a href="/product" ><p className="text-center underline pb-9">Mua hàng ngay</p></a>
        </div>
      </div>
    </main>
  );
}
