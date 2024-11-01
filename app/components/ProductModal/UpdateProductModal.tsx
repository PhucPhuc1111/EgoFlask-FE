import { Button, Modal, Upload, Image, Spin, UploadFile, GetProp, UploadProps, message } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { InferType, number, object, string, mixed } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Product, updateProduct, useGetProfile } from "~/data";
import { useQueryClient } from "@tanstack/react-query";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

let schema = object({
  name: string().required("Vui lòng chọn tên sản phẩm").trim(),
  imageUrl: mixed().required("Vui lòng thêm tệp hình ảnh sản phẩm"),
  description: string().trim(),
  guides: string().trim(),
  price: number().required("Vui lòng nhập giá sản phẩm"),
  inventory: number().required("Vui lòng nhập số lượng sản phẩm"),
  engrave: string().trim(),
  createAt: string().trim(),
  status: string().trim(),
});

const resolver = yupResolver(schema);
export type UpdateProductForm = InferType<typeof schema>;

type UpdateProductModalProps = {
  productId: string;
  productData: Product;
}

const UpdateProductModal = ({ productId, productData }: UpdateProductModalProps) => {
  const profile = useGetProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string | undefined>("");
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
      if (fileList.length > 0 && fileList[0]?.originFileObj) {
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
  
      // Gọi hàm updateProduct và truyền formData
      await updateProduct(productId, formData, profile.data?.user?.token || "");
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      message.success("Cập nhật sản phẩm thành công");
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      message.error(`Lỗi khi cập nhật sản phẩm: ${error?.message}`);
    } finally {
      setLoading(false);
    }
  };
  

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || file.preview);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      const lastFile = newFileList[newFileList.length - 1];
      setValue("imageUrl", lastFile.originFileObj as any);
      trigger("imageUrl");
    }
  };

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
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
