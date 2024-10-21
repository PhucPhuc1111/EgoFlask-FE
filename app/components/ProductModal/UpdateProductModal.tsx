import { Button, Modal, Upload, Image, Spin } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { InferType, number, object, string, mixed } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { updateProduct } from "~/data";
import { useQueryClient } from "@tanstack/react-query";

let schema = object({
  name: string().required("Vui lòng chọn tên sản phẩm"),
  imageUrl: mixed().required("Vui lòng thêm tệp hình ảnh sản phẩm"),
  description: string(),
  guides: string(),
  price: number().required("Vui lòng nhập giá sản phẩm"),
  inventory: number().required("Vui lòng nhập số lượng sản phẩm"),
  engrave: string(),
  createAt: string(),
  status: string(),
});

const resolver = yupResolver(schema);
export type UpdateProductForm = InferType<typeof schema>;

const UpdateProductModal = ({ productId, productData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    trigger,
  } = useForm<UpdateProductForm>({
    resolver,
  });

  const showModal = () => {
    setIsModalOpen(true);
    setFileList([]);
  };

  const handleOk = async (data: UpdateProductForm) => {
    try {
      setLoading(true);
  
      const formData = new FormData();
  
      // Thu thập dữ liệu từ form và giữ lại ảnh cũ nếu không có ảnh mới
      formData.append("ProductKey", productData.productKey || "null");
      formData.append("Name", data.name);
      
      // Nếu có ảnh mới, thêm vào FormData. Nếu không, giữ lại ảnh cũ.
      if (fileList.length > 0) {
        formData.append("ImageUrl", fileList[0]?.originFileObj);
      } else {
        formData.append("ImageUrl", productData.imageUrl); // Giữ lại ảnh cũ
      }
  
      formData.append("Description", data.description || "null");
      formData.append("Guides", data.guides || "null");
      formData.append("Price", String(data.price));
      formData.append("Inventory", String(data.inventory));
      formData.append("Engrave", data.engrave || "null");
      formData.append("Status", data.status || "ACTIVE");
  
      // Log FormData để kiểm tra
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
  
      // Gọi hàm updateProduct và truyền formData
      await updateProduct(productId, formData);
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      const lastFile = newFileList[newFileList.length - 1];
      setValue("imageUrl", lastFile.originFileObj);
      trigger("imageUrl");
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    if (productData) {
      reset(productData);
      if (productData.imageUrl) {
        setFileList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: productData.imageUrl,
          },
        ]);
        setPreviewImage(productData.imageUrl);
      }
    }
  }, [productData, reset]);

  return (
    <>
      <Button onClick={showModal} className="hover:underline border-none">
        Sửa
      </Button>
      <Modal
        width={800}
        title="Cập nhật sản phẩm"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <form onSubmit={handleSubmit(handleOk)}>
          <div className="flex">
            <div className="w-3/4 border-r-2 border-[#0055C3] p-4">
              <div className="w-full">
                <p>Tên sản phẩm</p>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full border-[#0055C3] rounded-md"
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
                <div className="flex justify-between w-full mt-4">
                  <div className="w-1/2">
                    <p>Giá tiền</p>
                    <input
                      type="number"
                      {...register("price")}
                      className="border-[#0055C3] rounded-md w-[200px]"
                    />
                    {errors.price && (
                      <span className="text-red-500">
                        {errors.price.message}
                      </span>
                    )}
                  </div>
                  <div className="w-1/2">
                    <p>Số lượng</p>
                    <input
                      type="number"
                      {...register("inventory")}
                      className="border-[#0055C3] rounded-md"
                    />
                    {errors.inventory && (
                      <span className="text-red-500">
                        {errors.inventory.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/4 p-4">
              <p>Hình ảnh sản phẩm</p>
              <Upload
                accept="image/*"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={() => false}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                  }}
                  src={previewImage}
                  width={90}
                  height={152}
                  style={{ objectFit: "cover" }}
                />
              )}
              {errors.imageUrl && (
                <span className="text-red-500">{errors.imageUrl.message}</span>
              )}
            </div>
          </div>
          <Button type="primary" htmlType="submit" className="mt-4" loading={loading}>
            {loading ? <Spin /> : "Cập nhật sản phẩm"}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default UpdateProductModal;
