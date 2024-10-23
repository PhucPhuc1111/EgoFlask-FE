import type { MetaFunction } from "@remix-run/node";
import { SubFooter } from "~/components";
import _ from "lodash";
import { Link, useLocation } from "@remix-run/react";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

// export const meta: MetaFunction = () => {
//   return [
//     { title: "Home" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };

const products = [
  {
    'name': 'Dependable',
    'image': '/images/products/bottle-6.png',
  },
  {
    'name': 'Optimistic',
    'image': '/images/products/bottle-7.png',
  },
  {
    'name': 'Creative',
    'image': '/images/products/bottle-3.png',
  },
  {
    'name': 'Elegant',
    'image': '/images/products/bottle-8.png',
  },
]

export default function Index() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const logout = searchParams.get("logout");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (logout) {
      queryClient.invalidateQueries({
        queryKey: ['profile']
      })
    }
  }, [location.search]);
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
            <img className="w-[1165px] max-h-full aspect-[1165/1005]" src="/images/Banner.jpg" alt="" uk-scrollspy="cls:uk-animation-scale-up; repeat: true;" />
          </div>
        </div>
        <div>
          <div className="w-full flex justify-center text-white font-bold text-3xl bg-[#0055c3] py-4">
            <span>CÂU CHUYỆN VỀ EGO FLASK</span>
          </div>
          <div className="flex" uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 100; repeat: true;">
            <div className="w-1/2" uk-scrollspy-class="uk-animation-slide-left">
              <img className="w-full aspect[733/586]" src='/images/subBanner1.jpg' alt="" />
            </div>
            <div className="w-1/2 mt-16 p-12 space-y-7 text-black text-justify px-16 " uk-scrollspy-class="uk-animation-slide-right">
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
          <div className="w-1/2" uk-scrollspy="cls:uk-animation-slide-left-medium; repeat: true;">
            <img src='/images/subBanner2.jpg' className="w-[713px] aspect-[713/729]" alt="" />
          </div>
          <div className="w-1/2 text-center">
            <div className="flex  justify-center p-12 w-full justify-items-center">
              <div className=" justify-items-center space-y-8 mt-16 text-justify" uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 500; repeat: true;">
                <div className="text-white text-center font-bold text-3xl mt-[100px]" uk-scrollspy-class="uk-animation-slide-top-medium">
                  THỂ HIỆN " CHẤT RIÊNG " QUA SẢN PHẨM
                </div>
                <div className="flex justify-center	text-justify  mt-16  " uk-scrollspy-class="uk-animation-slide-bottom-medium">
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
        <div className="w-full my-4">
          <div className="text-center text-[#0055c3] font-bold text-3xl  py-4" uk-scrollspy-class="uk-animation-fade">
            Sản phẩm nổi bật
          </div>
          <div className="flex space-x-16 p-12 text-center max-w-full overflow-y-hidden overflow-x-auto" uk-scrollspy="target: > div; cls:uk-animation-scale-up; repeat: true; delay: 300;">
            {_.map(products, (product, index) => (
              <div key={index} className="w-[320px] h-[462px] border-4 border-[#0055c3] cursor-pointer">
                <div className="flex justify-center">
                  <img src={product.image} className="w-[185px] h-[355px] relative" alt="" />
                </div>
                <p className="py-5">{product.name}</p>
              </div>
            ))}
          </div>
          <div className="w-full flex items-center pb-9">
            <Link to="/products" className="text-center text-black underline w-full">
              Mua hàng ngay
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
