import { Link } from "@remix-run/react";
import { SubFooter } from "~/components";

const Contact = () => {
  return (
    <main className="mt-[--m-header-top] pl-24 ">
      <div className="w-full border-[#0055C3] flex border-2 rounded-3xl px-24 py-7">
        <div className="w-7/12 border-r-2 border-[#0055C3] ">
          <p className="text-lg font-bold text-[#0055C3]">
            Bạn đang gặp vấn đề về dịch vụ/sản phẩm của Ego Flask?
          </p>
          <p className="text-lg font-bold text-[#0055C3]">
            Hãy liên hệ ngay với chúng tôi thông qua:
          </p>
          <div className="flex space-x-2 mt-4">
            <div className="space-y-4">
              <img src="/images/Location.png" alt="" />
              <img src="/images/Mail.png" alt="" />
              <img src="/images/Phone.png" alt="" />
            </div>
            <div className="space-y-4">
              <p>ABC</p>
              <p>egoflask@gmail.com</p>
              <p>(+84)932.898.536</p>
            </div>
          </div>

          <div className="p-4 space-y-3 w-[400px]">
            <div className="space-y-4">


              <div className="w-full">
                <Link target="_blank" to="https://www.facebook.com/profile.php?id=61566267320324">

                  <div className=" p-2 flex justify-between border-4 rounded-2xl border-[#0055C3] text-white bg-[#0055C3]">

                    <div>
                      <p>Nhắn tin qua </p>
                      <p className="font-semibold">Fanpage</p>
                    </div>

                    <div>
                      <img className="w-12" src="/images/facebook.png" alt="" />
                    </div>
                  </div>
                </Link>
              </div>
              <div className="w-full">
                <Link target="_blank" to="https://www.instagram.com/egoflaskvietnam/" >
                  <div className=" p-2 flex justify-between border-4 rounded-2xl border-[#0055C3] text-white bg-[#0055C3]">

                    <div>
                      <p>Nhắn tin qua </p>
                      <p className="font-semibold">Instagram</p>
                    </div>

                    <div>

                      <img className="w-12" src="/images/instagram.png" alt="" />
                    </div>
                  </div>
                </Link>
              </div>
              <div>
                <div className=" p-2 flex justify-between border-4 rounded-2xl border-[#0055C3] text-white bg-[#0055C3]">
                  <div>
                    <p>Hoặc gọi đến số Hotline</p>
                    <p className="font-semibold">(+84)932.898.537</p>
                  </div>

                  <div>
                    <img className="w-12" src="/images/call.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-5/12 ml-7  ">
          <div className="mt-[130px] flex justify-center  ">
            <img className="w-full" src="/images/BigLogo.png" alt="" />
          </div>
        </div>
      </div>
      <div>
        <SubFooter />
      </div>
    </main>
  );
};

export default Contact;
