import React from "react";
import { BottleComponent } from "~/data/types";
import { Model } from "./Model";

interface ReviewModalProps {
  top: BottleComponent | null;
  body: BottleComponent | null;
  strap: BottleComponent | null;
  engrave: string;
  engravePosition: string;
  onClose: () => void;
  isOpen: boolean;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  top,
  body,
  strap,
  engrave,
  engravePosition,
  onClose,
  isOpen,
}) => {
  if (!isOpen) return null;

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={handleClickOutside}>
      <div className="bg-white rounded-lg p-6 min-w-[500px] relative"
        style={{
          height: 'calc(100vh - 120px)',
        }}
      >
        <h2 className="flex justify-center text-lg font-bold mb-4">
          Xem trước thiết kế
        </h2>

        <div className="absolute inset-0">
          <Model
            topImage={top?.imageUrl}
            bodyImage={body?.imageUrl}
            strapImage={strap?.imageUrl}
            engrave={engrave}
            engravePosition={engravePosition}
            width="500px"
          />
        </div>
      </div>
    </div>
  );
};
