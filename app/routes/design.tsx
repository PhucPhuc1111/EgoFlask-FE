import _ from "lodash";
import { useEffect, useState } from "react";
import { IoAddCircleSharp, IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { SubFooter } from "~/components";
import request, { BASE_URL } from "~/data/request";
import { Component } from "~/data/types";

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
  const [componentList, setComponentList] = useState<Component[]>([]);
  const [search, setSearch] = useState("body");
  const [activeComponentIndex, setActiveComponentIndex] = useState<number>(2); 
  const [selectedColors, setSelectedColors] = useState<{ [key: string]: string }>({
    body: "",
    top: "",
    strap: "",
  }); 
  const [activeOption, setActiveOption] = useState("body"); 

  useEffect(() => {
    const fetchComponentList = async () => {
      try {
        const data = await request.get(`${BASE_URL}/api/component?search=${search}`);
        setComponentList(data);
      } catch (error) {
        console.log("Error fetching component list:", error);
      }
    };

    if (activeOption) {
      fetchComponentList();
    }
  }, [search, activeOption]);

  const handleOptionClick = (value: string) => {
    setSearch(value);
    setActiveOption(value); 
  };


  const handleColorSelect = (optionValue: string, color: string) => {
    setSelectedColors((prev) => ({
      ...prev,
      [optionValue]: color,
    }));
    setActiveComponentIndex(componentList.findIndex((comp) => comp.color === color)); 
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
                  {activeOption === option.value && (
                    <div className="grid grid-cols-8 mt-2">
                      {componentList.map((component, idx) => (
                        <div
                          key={idx}
                          className={`w-8 h-8 cursor-pointer rounded-full ${
                            selectedColors[option.value] === component.color ? "border-2 border-black" : ""
                          }`}
                          style={{ backgroundColor: component.color }}
                          onClick={() => handleColorSelect(option.value, component.color)} 
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
                    {_.map(componentList, (component, index) => (
                      <div
                        key={index}
                        className={`uk-position-relative cursor-pointer ${
                          index === activeComponentIndex ? "opacity-100" : "opacity-30"
                        }`}
                        onClick={() => setActiveComponentIndex(index)} 
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
        <SubFooter />
      </div>
    </main>
  );
}
