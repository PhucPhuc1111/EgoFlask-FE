import _ from "lodash";
import { useEffect, useState } from "react";
import { IoAddCircleSharp, IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { SubFooter } from "~/components";
import request, { BASE_URL } from "~/data/request";
import { BottleComponent } from "~/data/types";
import { ReviewModal } from "~/components";
import { useGetComponentList } from "~/data/design";

const options = [
  {
    name: "Thân bình",
    value: "body",
  },
  {
    name: "Nắp bình",
    value: "top",
  },
  {
    name: "Quai bình",
    value: "strap",
  },
];

export default function Design() {
  const [active, setActive] = useState("body"); // hợp nhất search và activeOption
  const [top, setTop] = useState<BottleComponent | null>(null); // lưu component được chọn cho top
  const [body, setBody] = useState<BottleComponent | null>(null); // lưu component được chọn cho body
  const [strap, setStrap] = useState<BottleComponent | null>(null); // lưu component được chọn cho strap
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false); // state để điều khiển mở/đóng modal
  const componentList = useGetComponentList(active);

  const handleOptionClick = (value: string) => {
    setActive(value); // cập nhật active khi người dùng chọn component
  };

  const handleColorSelect = (optionValue: string, component: BottleComponent) => {
    if (optionValue === "top") {
      setTop(component);
    } else if (optionValue === "body") {
      setBody(component);
    } else if (optionValue === "strap") {
      setStrap(component);
    }
  };

  const handleReview = () => {
    // Mở ReviewModal khi người dùng click nút Review
    setIsReviewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsReviewModalOpen(false); // Đóng modal khi người dùng click Đóng
  };

  const handleReset = () => {
    setTop(null);
    setBody(null);
    setStrap(null);
  };

  // Hàm xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    if (!top || !body) {
      if (!top && !body) {
        alert("Xin lỗi, vui lòng chọn cả nắp bình và thân bình.");
      } else if (!top) {
        alert("Xin lỗi, vui lòng chọn nắp bình.");
      } else if (!body) {
        alert("Xin lỗi, vui lòng chọn thân bình.");
      }
    } else {
      alert("Thêm vào giỏ hàng thành công!");
    }
  };

  return (
    <main className="lg:mt-[--m-header-top] xl:px-8 pb-[--m-footer-bottom]">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-1 w-full items-center justify-center">
          <div className="border-[3px] border-[#0055C3] rounded-xl w-[700px] flex flex-col items-center justify-center gap-4 py-6 px-10 mr-14">
            <img src="/images/BigLogo.png" alt="Logo" className="aspect-[157/45] w-[157px] h-[45px]" />
            <div className="border-2 border-[#E6E6E0] w-full px-20" />
            <div className="self-start cursor-pointer flex flex-col gap-3 w-full">
              {_.map(options, (option, index) => (
                <div key={index} className="flex flex-col w-full">
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleOptionClick(option.value)}>
                    <IoAddCircleSharp className="w-6 h-6 text-[#0055C3]" />
                    <span className="text-base text-black">{option.name}</span>
                  </div>
                  {active === option.value && (
                    <div className="grid grid-cols-8 mt-2">
                      {_.map(componentList.data, (component, idx) => (
                        <div
                          key={idx}
                          className={`w-8 h-8 cursor-pointer rounded-full ${
                            (option.value === "top" && top?.color === component.color) ||
                            (option.value === "body" && body?.color === component.color) ||
                            (option.value === "strap" && strap?.color === component.color)
                              ? "border-2 border-black"
                              : ""
                          }`}
                          style={{ backgroundColor: component.color }}
                          onClick={() => handleColorSelect(option.value, component)} // cập nhật component khi người dùng chọn
                        />
                      ))}
                    </div>
                  )}
                  {index !== options.length - 1 && <div className="border-2 border-[#E6E6E0] w-full px-20" />}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-full items-center justify-center">
            <h4 className="text-[20px] leading-5 text-black font-bold mt-10">
              Thiết kế chiếc bình giữ nhiệt của riêng bạn
            </h4>
            <div uk-slider="sets: true; finite: true;">
              <div className="uk-position-relative">
                <div className="uk-slider-container">
                  <div className="uk-slider-items uk-child-width-1-5 uk-grid">
                    {_.map(componentList.data, (component, index) => (
                      <div
                        key={index}
                        className={`uk-position-relative cursor-pointer ${
                          (top && top.imageUrl === component.imageUrl) ||
                          (body && body.imageUrl === component.imageUrl) ||
                          (strap && strap.imageUrl === component.imageUrl)
                            ? "opacity-100"
                            : "opacity-30"
                        }`}
                        onClick={() => handleColorSelect(active, component)} // vẫn có thể thay đổi khi chọn qua slider
                      >
                        <img src={component.imageUrl} alt={component.name} className="object-cover h-[500px]" />
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  className="uk-position-center-left-out"
                  href=""
                  uk-slider-item="previous"
                >
                  <IoArrowBackCircle className="w-8 h-14 text-[#232529] cursor-pointer" />
                </a>
                <a
                  className="uk-position-center-right-out"
                  href=""
                  uk-slider-item="next"
                >
                  <IoArrowForwardCircle className="w-8 h-14 text-[#232529] cursor-pointer" />
                </a>
              </div>
            </div>
          </div>
        </div>

        
        <div className="flex justify-end mt-8 gap-10">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" 
            onClick={handleReview}
          >
            Review sản phẩm
          </button>
          <button 
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition" 
            onClick={handleReset}
          >
            Reset
          </button>
          <button 
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition" 
            onClick={handleAddToCart}
          >
            Thêm vào giỏ hàng
          </button>
        </div>

        <ReviewModal
          top={top}
          body={body}
          strap={strap}
          onClose={handleCloseModal}
          isOpen={isReviewModalOpen}
        />
        <SubFooter />
      </div>
    </main>
  );
}
