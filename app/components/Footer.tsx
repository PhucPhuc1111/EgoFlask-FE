// import { Link, useMatches } from "@remix-run/react";
// import { getYear } from "date-fns";
// import _ from "lodash";

// export const Footer = () => {
//   const matches = useMatches();
//   const last = (_.last(matches) as any)?.handle;  

//   if (last?.hideFooter) return;
//   return (
//     <footer className="w-full">
    
//       <div className="w-full border-8 border-[#0055C3] py-3">
//         <div className="grid grid-cols-12">
//           <div className="col-span-4 w-full ">
            
//               <div className="">
//                 <div className="px-12 mt-16">
//                      <img className="w-11/12 " src='/images/BigLogo.png?v=1' alt="logo" />
//                      <div className="text-center ">
//                   Refresh your vibe, express your side
//                 </div>
//                 </div>
               
               
             
//             </div>
           
//           </div>
//           <div className="col-span-8 px-20 ">
//             <div className="w-full flex p-12 text-black      ">
//               <div className="w-1/3 space-y-12 ">
//                 <div className="text-lg w-[150px] pb-4  border-b-2 text-black font-semibold">Chính sách</div>
//                 <div className="space-y-3">
//                   <div>
//                     <Link className="text-black" to="#">Chính sách bảo mật</Link>
//                   </div>
//                   <div>
//                     <Link className="text-black" to="#">Chính sách bảo hành</Link>
//                   </div>
//                   <div>
//                     <Link className="text-black" to="#">Chính sách đổi trả</Link>
//                   </div>
//                   <div>
//                     <Link className="text-black" to="#">Chính sách vận chuyển</Link>
//                   </div>
//                 </div>
//               </div>
//               <div className="w-1/3 space-y-12">
//               <div className="text-lg w-[150px] pb-4  border-b-2 text-black font-semibold">Liên hệ</div>
//                 <div className="space-y-3">
//                   <p>Email: egoflask@gmail.com</p>
//                   <p>Phone: (+84)932.898.536</p>
//                 </div>
//               </div>
//               <div className="w-1/3 space-y-12">
//               <div className="text-lg w-[150px] pb-4  border-b-2 text-black font-semibold">Social</div>

//                 <div className="space-y-3">
//                   <div>
//                     <Link target="_blank" className="text-black" to="https://www.facebook.com/profile.php?id=61566267320324">Facebook</Link>
//                   </div>
//                   <div>
//                     <Link target="_blank" to="https://www.instagram.com/egoflaskvietnam/" className="text-black">Instagram</Link>
//                   </div>
//                   {/* <div>
//                     <Link className="text-black" to="/shopee">Shopee</Link>
//                   </div>
//                   <div>
//                     <Link className="text-black" to="/tiktok">Tiktok</Link>
//                   </div> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//           <div className="flex justify-center text-center mt-4 text-md w-full text-black  ">
//             <div className=" w-5/6 border-t-2  ">
//               <p className="mt-4">
//                  Copyright ©{getYear(new Date())} Ego Flask All rights reserved
//             </p>   
//             </div>
           
           
//           </div>

//       </div>
//     </footer>
//   );
// };
import { Link, useMatches } from "@remix-run/react";
import { getYear } from "date-fns";
import _ from "lodash";

export const Footer = () => {
  const matches = useMatches();
  const last = (_.last(matches) as any)?.handle;

  if (last?.hideFooter) return;
  return (
    <footer className="w-full">
      <div className="w-full border-8 border-[#0055C3] py-3">
        <div className="grid grid-cols-1 sm:grid-cols-12">
          <div className="col-span-4 w-full text-center sm:text-left">
            <div className="px-4 sm:px-12 mt-4 sm:mt-16">
              <img className="w-11/12 mx-auto" src="/images/BigLogo.png?v=1" alt="logo" />
              <div className="text-center sm:text-left text-sm sm:text-base mt-2 sm:mt-0">
                Refresh your vibe, express your side
              </div>
            </div>
          </div>

          <div className="col-span-8 px-8 sm:px-20">
            <div className="w-full flex flex-col sm:flex-row p-4 sm:p-12 text-black space-y-8 sm:space-y-0 sm:space-x-8">
              <div className="w-full sm:w-1/3 space-y-4 sm:space-y-12">
                <div className="text-lg w-[150px] pb-2 sm:pb-4 border-b-2 text-black font-semibold text-sm sm:text-lg">Chính sách</div>
                <div className="space-y-3 text-xs sm:text-base">
                  <div>
                    <Link className="text-black" to="#">Chính sách bảo mật</Link>
                  </div>
                  <div>
                    <Link className="text-black" to="#">Chính sách bảo hành</Link>
                  </div>
                  <div>
                    <Link className="text-black" to="#">Chính sách đổi trả</Link>
                  </div>
                  <div>
                    <Link className="text-black" to="#">Chính sách vận chuyển</Link>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-1/3 space-y-4 sm:space-y-12">
                <div className="text-lg w-[150px] pb-2 sm:pb-4 border-b-2 text-black font-semibold text-sm sm:text-lg">Liên hệ</div>
                <div className="space-y-3 text-xs sm:text-base">
                  <p>Email: egoflask@gmail.com</p>
                  <p>Phone: (+84)932.898.536</p>
                </div>
              </div>

              <div className="w-full sm:w-1/3 space-y-4 sm:space-y-12">
                <div className="text-lg w-[150px] pb-2 sm:pb-4 border-b-2 text-black font-semibold text-sm sm:text-lg">Social</div>
                <div className="space-y-3 text-xs sm:text-base">
                  <div>
                    <Link target="_blank" className="text-black" to="https://www.facebook.com/profile.php?id=61566267320324">Facebook</Link>
                  </div>
                  <div>
                    <Link target="_blank" to="https://www.instagram.com/egoflaskvietnam/" className="text-black">Instagram</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center text-center mt-4 text-md w-full text-black">
          <div className="w-11/12 sm:w-5/6 border-t-2">
            <p className="mt-4 text-xs sm:text-base">
              Copyright ©{getYear(new Date())} Ego Flask All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
