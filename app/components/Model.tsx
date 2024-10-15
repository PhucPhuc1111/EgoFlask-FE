import React from 'react';

interface ModelProps {
  topImage?: string;   
  bodyImage?: string; 
  strapImage?: string;   
  engrave?: string;
  engravePosition?: 'top' | 'middle' | 'bottom'; 
  width: string;       
}

export const Model: React.FC<ModelProps> = ({ topImage, bodyImage, strapImage, width, engrave, engravePosition }) => {
  const getEngravePosition = () => {
    switch (engravePosition) {
      case 'top':
        return 'top-[40%]'; 
      case 'middle':
        return 'top-[55%] transform -translate-y-1/2'; 
      case 'bottom':
        return 'top-[75%]'; 
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col items-center">
  <div className="relative" style={{ width }}>
    {/* Body of the bottle */}
    <img src={bodyImage} alt="" className="relative z-10" style={{ width }} />
    
    {engrave && (
      <div
        className={`absolute left-[48.5%] transform -translate-x-1/2 -translate-y-1/2 text-[#D4D4D4]  font-bold text-lg z-30 ${getEngravePosition()}`}
        style={{ width: '100%', textAlign: 'center', fontFamily:"Montserrat" , lineHeight:"20px"}}
      >
        {engrave}
      </div>
    )}

    {/* Strap */}
    <img src={strapImage} alt="" className="absolute top-[-18%] left-[53%] transform -translate-x-1/2 z-20" style={{ width }} />

    {/* Top of the bottle */}
    <img src={topImage} alt="" className="absolute top-[-20%] left-[49.5%] transform -translate-x-1/2 z-10" style={{ width }} />
  </div>
</div>

  );
};
