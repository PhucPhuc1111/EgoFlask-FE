import SubFooter from "~/components/SubFooter";
import Location from "../../public/images/Location.png";
import Mail from "../../public/images/Mail.png";
import Phone from "../../public/images/Phone.png";
import Facebook from "../../public/images/facebook.png";
import Instagram from "../../public/images/instagram.png";
import Call from "../../public/images/call.png";
import BigLogo from "../../public/images/BigLogo.png";
const Contact = () => {
  return (
    <main className="mt-[--m-header-top] pl-24 ">
      <div className="w-full border-[#0055C3] flex border-2 rounded-3xl px-24 py-7">
        <div className="w-7/12 border-r-2 border-[#0055C3] ">
          <p className="text-lg font-bold text-[#0055C3]">Bạn đang gặp vấn đề về dịch vụ/sản phẩm của Ego Flask?</p>
          <p className="text-lg font-bold text-[#0055C3]">Hãy liên hệ ngay với chúng tôi thông qua:</p>
          <div className="flex space-x-2 mt-4">
            <div className="space-y-4">
              <img src={Location} alt="" />
              <img src={Mail} alt="" />
              <img src={Phone} alt="" />
            </div>
            <div className="space-y-4">
              <p>ABC</p>
              <p>egoflask@gmail.com</p>
              <p>(+84)932.898.536</p>
            </div>
          </div>
          <div className="p-4 space-y-2 w-[400px]">
             <div className=" p-2 flex justify-between border-4 rounded-2xl border-[#0055C3] text-white bg-[#0055C3]">
           <div>
            <p>Nhắn tin qua </p> 
             <p className="font-semibold">Fanpage</p>
           </div>
              
             <div>
                <img className="w-full" src={Facebook} alt="" />
             </div>
          </div>
          <div className=" p-2 flex justify-between border-4 rounded-2xl border-[#0055C3] text-white bg-[#0055C3]">
          <div>
            <p>Nhắn tin qua </p> 
             <p className="font-semibold">Instagram</p>
           </div>
              
             <div>
             <img className="w-full" src={Instagram} alt="" />
             </div>
          </div>
          <div className=" p-2 flex justify-between border-4 rounded-2xl border-[#0055C3] text-white bg-[#0055C3]">
              <div>
            <p>Hoặc gọi đến số Hotline</p> 
             <p className="font-semibold">(+84)932.898.537</p>
           </div>
              
             <div>
              <img className="w-full" src={Call} alt="" />
             </div>
          </div>
          </div>
         
          
        </div>
        <div className="w-5/12 ml-7  ">
        <div className="mt-[130px] flex justify-center  ">
        <img className="w-full" src={BigLogo} alt="" />   
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
