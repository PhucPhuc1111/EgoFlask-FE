import React from 'react';

interface ModelProps {
  topImage?: string;   
  bodyImage?: string; 
  strapImage?: string;   
  width: string;       
}

export const Model: React.FC<ModelProps> = ({ topImage, bodyImage, strapImage, width }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width }}>
        <img src={bodyImage} alt="Thân bình" className="relative" style={{ width }} />
        
        <img src={strapImage} alt="Quai bình" className="absolute top-[-18%] left-[53%] transform -translate-x-1/2 z-20" style={{ width }} />
        
        <img src={topImage} alt="Nắp bình" className="absolute top-[-20%] left-[50%] transform -translate-x-1/2 z-10" style={{ width }} />
      </div>
    </div>
  );
};