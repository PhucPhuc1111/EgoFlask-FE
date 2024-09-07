import _ from "lodash";
import { IoAddCircleSharp } from "react-icons/io5";
import { SubFooter } from "~/components";

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

export default function Design() {
  return (
    <main className="lg:mt-[--m-header-top] xl:px-8 pb-[--m-footer-bottom]">
      <div className="flex flex-col items-center justify-center">
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
        <SubFooter />
      </div>
    </main>
  )
}