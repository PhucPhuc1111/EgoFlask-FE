import likeImg from "../../public/images/like.png";
import lightImg from "../../public/images/light.png";
import heartImg from "../../public/images/heart.png";
import warrantyImg from "../../public/images/warranty.png";
import BigLogo from "../../public/images/BigLogo.png";

const Footer = () => {
  return (
    <div className="w-full">
      <div className="w-full flex p-12   space-x-14">
        <div className="w-1/4 space-y-7 text-black ">
          <img src={likeImg} alt="" />
          <p>Độ bền cao, giữ nhiệt tốt</p>
          <p>
            Với công nghệ tiên tiến và vật liệu cao cấp, sản phẩm của chúng tôi
            có độ bền vượt trội, đồng thời giữ nhiệt độ đồ uống lý tưởng trong
            thời gian dài.
          </p>
        </div>
        <div className="w-1/4 space-y-7 text-black ">
          <img src={heartImg} alt="" />
          <p>Chất liệu an toàn cho sức khoẻ</p>
          <p>
            Chúng tôi cam kết sử dụng các chất liệu an toàn, thân thiện với sức
            khoẻ người dùng, không chứa các thành phần độc hại.
          </p>
        </div>
        <div className="w-1/4 space-y-7 text-black ">
          <img src={lightImg} alt="" />
          <p>Tự do sáng tạo</p>
          <p>
            Với tính năng Thiết kế, đây là không gian để bạn có thể thoả sức
            sáng tạo và thể hiện cá tính riêng với chiếc bình giữ nhiệt của
            riêng mình.
          </p>
        </div>
        <div className="w-1/4 space-y-7 text-black ">
          <img src={warrantyImg} alt="" />
          <p>Bảo hành trong 30 ngày</p>
          <p>
            Bạn đã hài lòng với chiếc bình giữ nhiệt mới của mình chưa? Nếu
            chưa, hãy liên hệ ngay chúng tôi trong vòng 30 ngày kể từ ngày nhận
            hàng để được đổi trả sản phẩm nhé!
          </p>
        </div>
      </div>
      <div className="w-full border-8 border-[#0055C3] py-7">
        <div className="grid grid-cols-12">
          <div className="col-span-4 w-full ">
            
              <div className="">
                <div className="px-12 mt-16">
                     <img className="w-11/12 " src={BigLogo} alt="" />
                     <div className="text-center text-lg">
                  Refresh your vibe, express your side
                </div>
                </div>
               
               
             
            </div>
           
          </div>
          <div className="col-span-8 px-20 ">
            <div className="w-full flex p-12 text-black      ">
              <div className="w-1/3 space-y-12 ">
                <div className="text-xl w-[150px] pb-4  border-b-2 text-black font-semibold">Chính sách</div>
                <div className="space-y-3">
                  <div>
                    <a href="/chinhhsachbaomat">Chính sách bảo mật</a>
                  </div>
                  <div>
                    <a href="/chinhhsachbaohanh">Chính sách bảo hành</a>
                  </div>
                  <div>
                    <a href="/chinhhsachdoitra">Chính sách đổi trả</a>
                  </div>
                  <div>
                    <a href="/chinhhsachvanchuyen">Chính sách vận chuyển</a>
                  </div>
                </div>
              </div>
              <div className="w-1/3 space-y-12">
              <div className="text-xl w-[150px] pb-4  border-b-2 text-black font-semibold">Liên hệ</div>
                <div className="space-y-3">
                  <p>Email: egoflask@gmail.com</p>
                  <p>Phone: (+84)932.898.536</p>
                </div>
              </div>
              <div className="w-1/3 space-y-12">
              <div className="text-xl w-[150px] pb-4  border-b-2 text-black font-semibold">Social</div>

                <div className="space-y-3">
                  <div>
                    <a href="/facebook">Facebook</a>
                  </div>
                  <div>
                    <a href="/instagram">Instagram</a>
                  </div>
                  <div>
                    <a href="/shopee">Shopee</a>
                  </div>
                  <div>
                    <a href="/tiktok">Tiktok</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
          <div className="flex justify-center text-center mt-4 text-md w-full text-black  ">
            <div className=" w-5/6 border-t-2  ">
              <p className="mt-4">
                 Copyright ©2024 Ego Flask All rights reserved
            </p>   
            </div>
           
           
          </div>

      </div>
    </div>
  );
};

export default Footer;
