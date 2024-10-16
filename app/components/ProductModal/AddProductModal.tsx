import { Button, Input, Modal, Upload } from "antd";
import { useState } from "react";
import { InferType, number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

let schema = object({
  name: string().required("Vui lòng chọn tên"),
  imageUrl: string().required(),
  description: string(),
  guides: string(),
  price: number().required(),
  inventory: number().required("Vui lòng nhập số lượng"),
  engrave: string(),
  createAt: string(),
  status: string(),
});

const resolver = yupResolver(schema);

export type AddProductForm = InferType<typeof schema>;

const handleUpload = (info: any) => {
  if (info.file.status === "done") {
    console.log("File uploaded successfully:", info.file);
  }
};

const AddProductModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        onClick={showModal}
        className="rounded-md w-48 h-12 bg-[#0055C3] hover:bg-white hover:text-[#0055C3] border-2 border-[#0055C3] text-white "
      >
        Thêm
      </Button>
      <Modal
        width={800}
        title="Thêm sản phẩm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex">
          <div className="w-3/4 border-r-2 border-[#0055C3] p-4  ">
            <div className="w-full">
              <div className="w-full">
                <p>Tên sản phẩm</p>
                <input
                  type="text"
                  name=""
                  id=""
                  className="w-full border-[#0055C3] rounded-md "
                />
              </div>

              <div className="flex justify-between w-full">
                <div className="w-1/2">
                  <p>Giá tiền</p>
                  <input
                    type="number"
                    name=""
                    id=""
                    className="border-[#0055C3] rounded-md w-[200px] "
                  />
                </div>
                <div className="w-1/2">
                  <p>Số lượng</p>
                  <input
                    type="number"
                    name=""
                    id=""
                    className="border-[#0055C3] rounded-md "
                  />
                </div>
              </div>

             
            </div>
          </div>
          <div className="w-1/4 p-4">
            <p>Hình ảnh</p>
            <Upload
              accept="image/*"
              beforeUpload={() => false}
              onChange={handleUpload}
            >
              <Button className="bg-[#0055C3] text-white">Chọn ảnh</Button>
            </Upload>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddProductModal;
