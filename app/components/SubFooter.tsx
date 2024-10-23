// export const SubFooter = () => {
//   return (
//     <div className="w-full flex p-12   space-x-20" uk-scrollspy="target: > div; repeat: true; delay: 300;">
//     <div className="w-1/4 space-y-7 text-black   " uk-scrollspy-class="uk-animation-slide-bottom-small">
//       <img src='/images/like.png' alt="" />
//       <p>Độ bền cao, giữ nhiệt tốt</p>
//       <p>
//         Với công nghệ tiên tiến và vật liệu cao cấp, sản phẩm của chúng tôi
//         có độ bền vượt trội, đồng thời giữ nhiệt độ đồ uống lý tưởng trong
//         thời gian dài.
//       </p>
//     </div>
//     <div className="w-1/4 space-y-7 text-black   " uk-scrollspy-class="uk-animation-slide-top-small">
//       <img src='/images/heart.png' alt="" />
//       <p>Chất liệu an toàn cho sức khoẻ</p>
//       <p>
//         Chúng tôi cam kết sử dụng các chất liệu an toàn, thân thiện với sức
//         khoẻ người dùng, không chứa các thành phần độc hại.
//       </p>
//     </div>
//     <div className="w-1/4 space-y-7 text-black   " uk-scrollspy-class="uk-animation-slide-bottom-small">
//       <img src={'/images/light.png'} alt="" />
//       <p>Tự do sáng tạo</p>
//       <p>
//         Với tính năng Thiết kế, đây là không gian để bạn có thể thoả sức
//         sáng tạo và thể hiện cá tính riêng với chiếc bình giữ nhiệt của
//         riêng mình.
//       </p>
//     </div>
//     <div className="w-1/4 space-y-7 text-black    " uk-scrollspy-class="uk-animation-slide-top-small">
//       <img src='/images/warranty.png' alt="" />
//       <p>Bảo hành trong 30 ngày</p>
//       <p>
//         Bạn đã hài lòng với chiếc bình giữ nhiệt mới của mình chưa? Nếu
//         chưa, hãy liên hệ ngay chúng tôi trong vòng 30 ngày kể từ ngày nhận
//         hàng để được đổi trả sản phẩm nhé!
//       </p>
//     </div>
//   </div>
//   )
// }
export const SubFooter = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row p-4 sm:p-12 space-y-12 sm:space-y-0 sm:space-x-20" uk-scrollspy="target: > div; repeat: true; delay: 300;">
      <div className="w-full sm:w-1/4 space-y-4 sm:space-y-7 text-black text-center sm:text-left" uk-scrollspy-class="uk-animation-slide-bottom-small">
        <img className="mx-auto sm:mx-0" src='/images/like.png' alt="like" />
        <p className="text-base sm:text-lg font-semibold">Độ bền cao, giữ nhiệt tốt</p>
        <p className="text-sm sm:text-base">
          Với công nghệ tiên tiến và vật liệu cao cấp, sản phẩm của chúng tôi có độ bền vượt trội, đồng thời giữ nhiệt độ đồ uống lý tưởng trong thời gian dài.
        </p>
      </div>
      <div className="w-full sm:w-1/4 space-y-4 sm:space-y-7 text-black text-center sm:text-left" uk-scrollspy-class="uk-animation-slide-top-small">
        <img className="mx-auto sm:mx-0" src='/images/heart.png' alt="heart" />
        <p className="text-base sm:text-lg font-semibold">Chất liệu an toàn cho sức khoẻ</p>
        <p className="text-sm sm:text-base">
          Chúng tôi cam kết sử dụng các chất liệu an toàn, thân thiện với sức khoẻ người dùng, không chứa các thành phần độc hại.
        </p>
      </div>
      <div className="w-full sm:w-1/4 space-y-4 sm:space-y-7 text-black text-center sm:text-left" uk-scrollspy-class="uk-animation-slide-bottom-small">
        <img className="mx-auto sm:mx-0" src='/images/light.png' alt="light" />
        <p className="text-base sm:text-lg font-semibold">Tự do sáng tạo</p>
        <p className="text-sm sm:text-base">
          Với tính năng Thiết kế, đây là không gian để bạn có thể thoả sức sáng tạo và thể hiện cá tính riêng với chiếc bình giữ nhiệt của riêng mình.
        </p>
      </div>
      <div className="w-full sm:w-1/4 space-y-4 sm:space-y-7 text-black text-center sm:text-left" uk-scrollspy-class="uk-animation-slide-top-small">
        <img className="mx-auto sm:mx-0" src='/images/warranty.png' alt="warranty" />
        <p className="text-base sm:text-lg font-semibold">Bảo hành trong 30 ngày</p>
        <p className="text-sm sm:text-base">
          Bạn đã hài lòng với chiếc bình giữ nhiệt mới của mình chưa? Nếu chưa, hãy liên hệ ngay chúng tôi trong vòng 30 ngày kể từ ngày nhận hàng để được đổi trả sản phẩm nhé!
        </p>
      </div>
    </div>
  );
};
