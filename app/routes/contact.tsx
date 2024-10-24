// import { Link } from "@remix-run/react";
// import { SubFooter } from "~/components";

// const Contact = () => {
//   return (
//     <main className="mt-[--m-header-top] pl-24 ">
//       <div className="w-full border-[#0055C3] flex border-2 rounded-3xl px-24 py-7">
//         <div className="w-7/12 border-r-2 border-[#0055C3] ">
//           <p className="text-lg font-bold text-[#0055C3]">
//             Bạn đang gặp vấn đề về dịch vụ/sản phẩm của Ego Flask?
//           </p>
//           <p className="text-lg font-bold text-[#0055C3]">
//             Hãy liên hệ ngay với chúng tôi thông qua:
//           </p>
//           <div className="flex space-x-2 mt-4">
//             <div className="space-y-4">
//               <img src="/images/Location.png" alt="" />
//               <img src="/images/Mail.png" alt="" />
//               <img src="/images/Phone.png" alt="" />
//             </div>
//             <div className="space-y-4">
//               <p>ABC</p>
//               <p>egoflask@gmail.com</p>
//               <p>(+84)932.898.536</p>
//             </div>
//           </div>

//           <div className="p-4 space-y-3 w-[400px]">
//             <div className="space-y-4">


//               <div className="w-full">
//                 <Link target="_blank" to="https://www.facebook.com/profile.php?id=61566267320324">

//                   <div className=" p-2 flex justify-between border-4 rounded-2xl border-[#0055C3] text-white bg-[#0055C3]">

//                     <div>
//                       <p>Nhắn tin qua </p>
//                       <p className="font-semibold">Fanpage</p>
//                     </div>

//                     <div>
//                       <img className="w-12" src="/images/facebook.png" alt="" />
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//               <div className="w-full">
//                 <Link target="_blank" to="https://www.instagram.com/egoflaskvietnam/" >
//                   <div className=" p-2 flex justify-between border-4 rounded-2xl border-[#0055C3] text-white bg-[#0055C3]">

//                     <div>
//                       <p>Nhắn tin qua </p>
//                       <p className="font-semibold">Instagram</p>
//                     </div>

//                     <div>

//                       <img className="w-12" src="/images/instagram.png" alt="" />
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//               <div>
//                 <div className=" p-2 flex justify-between border-4 rounded-2xl border-[#0055C3] text-white bg-[#0055C3]">
//                   <div>
//                     <p>Hoặc gọi đến số Hotline</p>
//                     <p className="font-semibold">(+84)932.898.537</p>
//                   </div>

//                   <div>
//                     <img className="w-12" src="/images/call.png" alt="" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="w-5/12 ml-7  ">
//           <div className="mt-[130px] flex justify-center  ">
//             <img className="w-full" src="/images/BigLogo.png?v=1" alt="logo" />
//           </div>
//         </div>
//       </div>
//       <div>
//         <SubFooter />
//       </div>
//     </main>
//   );
// };

// export default Contact;
import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { SubFooter } from "~/components";

export const meta: MetaFunction = () => {
  return [
    { title: "Liên hệ" },
    {
      property: "og:title",
      content: "Thông tin liên hệ",
    },
    {
      name: "description",
      content: "Mạng xã hội và thông tin liên hệ của Ego Flask",
    },
  ];
};

const Contact = () => {
  return (
    <main className="mt-[--m-header-top] px-4 sm:pl-24">
      <div className="w-full border-[#0055C3] flex flex-col lg:flex-row border-2 rounded-3xl px-4 sm:px-24 py-7">
        {/* Left Column */}
        <div className="lg:w-7/12 lg:border-r-2 border-[#0055C3]">
          <p className="text-base sm:text-lg font-bold text-[#0055C3]">
            Bạn đang gặp vấn đề về dịch vụ/sản phẩm của Ego Flask?
          </p>
          <p className="text-base sm:text-lg font-bold text-[#0055C3]">
            Hãy liên hệ ngay với chúng tôi thông qua:
          </p>
          <div className="flex space-x-2 mt-4">
            <div className="space-y-4">
              <img src="/images/Location.png" alt="location" />
              <img src="/images/Mail.png" alt="mail" />
              <img src="/images/Phone.png" alt="phone" />
            </div>
            <div className="space-y-4 text-sm sm:text-base">
              <p>ABC</p>
              <p>egoflask@gmail.com</p>
              <p>(+84)932.898.536</p>
            </div>
          </div>

          <div className="p-4 space-y-3 lg:w-[400px]">
            <div className="space-y-4">
              <div className="w-full">
                <Link target="_blank" to="https://www.facebook.com/profile.php?id=61566267320324">
                  <div className="p-2 flex justify-between border-4 rounded-2xl border-[#0055C3] text-white bg-[#0055C3]">
                    <div>
                      <p className="text-sm sm:text-base">Nhắn tin qua</p>
                      <p className="font-semibold text-sm sm:text-base">Fanpage</p>
                    </div>
                    <div>
                      <img className="w-12" src="/images/facebook.png" alt="facebook" />
                    </div>
                  </div>
                </Link>
              </div>

              <div className="w-full">
                <Link target="_blank" to="https://www.instagram.com/egoflaskvietnam/">
                  <div className="p-2 flex justify-between border-4 rounded-2xl border-[#0055C3] text-white bg-[#0055C3]">
                    <div>
                      <p className="text-sm sm:text-base">Nhắn tin qua</p>
                      <p className="font-semibold text-sm sm:text-base">Instagram</p>
                    </div>
                    <div>
                      <img className="w-12" src="/images/instagram.png" alt="instagram" />
                    </div>
                  </div>
                </Link>
              </div>

              <div>
                <div className="p-2 flex justify-between border-4 rounded-2xl border-[#0055C3] text-white bg-[#0055C3]">
                  <div>
                    <p className="text-sm sm:text-base">Hoặc gọi đến số Hotline</p>
                    <p className="font-semibold text-sm sm:text-base">(+84)932.898.537</p>
                  </div>
                  <div>
                    <img className="w-12" src="/images/call.png" alt="call" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Logo) */}
        <div className="lg:w-5/12 lg:ml-7 mt-7 lg:mt-0">
          <div className="mt-10 lg:mt-[130px] flex justify-center">
            <img className="w-full" src="/images/BigLogo.png?v=1" alt="logo" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div>
        <SubFooter />
      </div>
    </main>
  );
};

export default Contact;
