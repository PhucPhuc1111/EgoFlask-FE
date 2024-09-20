import { ChangeEvent, useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';


function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLetterChecked, setIsLetterChecked] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLetterCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsLetterChecked(e.target.checked);
  };

  return (
    <div>
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-between items-center w-56 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        Dịch vụ đi kèm
        {isOpen ? (
          <IoChevronUp className="w-5 h-5 ml-2" />
        ) : (
          <IoChevronDown className="w-5 h-5 ml-2" />
        )}
      </button>

      {isOpen && (
        <div className="relative left-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="p-4">
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
                onChange={handleLetterCheckboxChange}
              />
              Viết thư tay
            </label>
           
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Gói quà
            </label>
          </div>
        </div>
      )}
      
    </div>
    {isLetterChecked && (
    <input className="absolute text-left  ml-20 h-[63px] w-[450px] mt-14  bg-white border border-gray-200 rounded-xl text-black shadow-lg" placeholder='Vui lòng nhập nội dung'>
        
    </input>  )}
    </div>
  
  );
}

export default Dropdown;
