import _ from "lodash";
import { IoAddCircleSharp, IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { SubFooter } from "~/components";
import {Model} from "~/components";

const options = [
  {
    "name": "Thân bình",
  },
  {
    "name": "Nắp bình",
  },
  {
    "name": "Quai bình",
  },
  {
    "name": "Khắc laser",
  },
  {
    "name": "Viết thư tay",
  },
  {
    "name": "Gói quà",
  },
]

const productList = [
  {
    name: "Graceful",
    img: "/images/design/top/36",
  },
  {
    name: "Gracious",
    img: "/images/design/body/bottle-2.png",
  },
  {
    name: "Creative",
    img: "/images/design/body/bottle-3.png",
  },
  {
    name: "Dynamic",
    img: "/images/design/body/bottle-4.png",
  },
  {
    name: "Rational",
    img: "/images/design/body/bottle-5.png",
  },
  {
    name: "Dependable",
    img: "/images/design/body/bottle-6.png",
  },
];

export default function Design() {
  return (
    <main className="lg:mt-[--m-header-top] xl:px-8 pb-[--m-footer-bottom]">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-1 w-full items-center justify-center">
          <div className="border-[3px] border-[#0055C3] rounded-xl w-[700px] flex flex-col items-center justify-center gap-4 py-6 px-10">
            <img src="/images/BigLogo.png" alt="" className="aspect-[157/45] w-[157px] h-[45px]" />
            <div className="border-2 border-[#E6E6E0] w-full px-20" />
            <div className="self-start cursor-pointer flex flex-col gap-3 w-full">
              {_.map(options, (option, index) => (
                <>
                  <div key={index} className="flex items-center gap-2">
                    <IoAddCircleSharp className="w-6 h-6 text-[#0055C3]" />
                    <span className="text-base text-black">
                      {option.name}
                    </span>
                  </div>
                  {index !== options.length - 1 && <div className="border-2 border-[#E6E6E0] w-full px-20" />}
                </>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full items-center justify-center">
            <h4 className="text-[20px] leading-5 text-black font-bold">
              Thiết kế chiếc bình giữ nhiệt của riêng bạn
            </h4>
            <div uk-slider="sets: true; finite: true;">

              <div className="uk-position-relative">

                <div className="uk-slider-container">
                  <div className="uk-slider-items uk-child-width-1-5 uk-grid">
                    {_.map(productList, (product, index) => (
                      <div key={index} className="uk-position-relative">
                        <img src={product.img} alt={product.name} className="aspect-[300/774] w-[136px] h-[365px]" />
                      </div>
                    ))}
                  </div>
                </div>

                <a className="uk-position-center-left-out" href="" uk-slider-item="previous">
                  <IoArrowBackCircle className="w-14 h-14 text-[#0055C3] cursor-pointer" />
                </a>
                <a className="uk-position-center-right-out" href="" uk-slider-item="next">
                  <IoArrowForwardCircle className="w-14 h-14 text-[#0055C3] cursor-pointer" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <SubFooter />
      </div>
    </main>
  )
}