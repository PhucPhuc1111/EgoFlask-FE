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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 min-h-[650px] min-w-[500px] relative">
        <h2 className="flex justify-center text-lg font-bold mb-4">Xem trước thiết kế</h2>

        <Model topImage={top?.imageUrl} bodyImage={body?.imageUrl} strapImage={strap?.imageUrl} engrave={engrave} engravePosition={engravePosition} width="500px" />


        <button
          className="absolute bottom-2 right-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={onClose}
        >
          Đóng
        </button>
      </div>
    </div>
  );
};
