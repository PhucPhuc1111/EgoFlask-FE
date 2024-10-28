import { Button, Modal, Upload, Image, Spin, GetProp, UploadProps, UploadFile, message } from "antd";
import { useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import { InferType, mixed, number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"; 
import { addProduct, useGetProfile } from "~/data"; 
import { useQueryClient } from "@tanstack/react-query";

let schema = object({
  productKey: string(),
  name: string().required("Vui lòng nhập tên sản phẩm"),
  imageUrl: mixed().required("Vui lòng thêm tệp hình ảnh sản phẩm"),
  description: string(),
  guides: string(),
  price: number().required("Vui lòng nhập giá sản phẩm"),
  inventory: number().required("Vui lòng nhập số lượng sản phẩm"),
  engrave: string(),
  createAt: string(),
  status: string(),
});
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];


const resolver = yupResolver(schema);
export type AddProductForm = InferType<typeof schema>;

const AddProductModal = () => {
  const profile = useGetProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]); 
  const [previewImage, setPreviewImage] = useState(''); 
  const [previewOpen, setPreviewOpen] = useState(false); 
  const [loading, setLoading] = useState(false); // Loading state
  const { register, handleSubmit, setValue, formState: { errors }, trigger } = useForm<AddProductForm>({
    resolver,
  });
  const queryClient = useQueryClient();

  const showModal = () => {
    setIsModalOpen(true);
    setFileList([]); 
  };

  const handleOk = async (data: AddProductForm) => {
    try {
      setLoading(true); 
      if (fileList.length === 0) {
        await trigger("imageUrl");
        setLoading(false); 
        return;
      }

      const file = fileList[0]?.originFileObj;

      await addProduct({
        ...data,
        imageUrl: file as any, 
      }, profile.data?.user?.token || '');

      setIsModalOpen(false);
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      message.success("Thêm sản phẩm thành công");
    } catch (error: any) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      message.error(`Lỗi khi thêm sản phẩm: ${error?.message}`);
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
    setPreviewImage(file.url || (file.preview as string));
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

  return (
    <>
      <Button
        onClick={showModal}
        className="rounded-md w-48 h-12 bg-[#0055C3] hover:bg-white hover:text-[#0055C3] border-2 border-[#0055C3] text-white"
      >
        Thêm
      </Button>
      <Modal
        width={800}
        title="Thêm sản phẩm"
        open={isModalOpen}
        footer={null} 
        onCancel={handleCancel}
      >
        <form onSubmit={handleSubmit(handleOk)}>
          <div className="flex">
            <div className="w-3/4 border-r-2 border-[#0055C3] p-4">
              <div className="w-full">
                <div className="w-full">
                  <p>Tên sản phẩm</p>
                  <input
                    type="text"
                    {...register("name")}
                    className="w-full border-[#0055C3] rounded-md"
                  />
                  {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                </div>

                <div className="flex justify-between w-full">
                  <div className="w-1/2">
                    <p>Giá tiền</p>
                    <input
                      type="number"
                      {...register("price")}
                      className="border-[#0055C3] rounded-md w-[200px]"
                    />
                    {errors.price && <span className="text-red-500">{errors.price.message}</span>}
                  </div>
                  <div className="w-1/2">
                    <p>Số lượng</p>
                    <input
                      type="number"
                      {...register("inventory")}
                      className="border-[#0055C3] rounded-md"
                    />
                    {errors.inventory && <span className="text-red-500">{errors.inventory.message}</span>}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/4 p-4">
              <p>Hình ảnh</p>
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
              {errors.imageUrl && <span className="text-red-500">{errors.imageUrl.message}</span>}
            </div>
          </div>
          <Button type="primary" htmlType="submit" className="mt-4" loading={loading}>
            {loading ? <Spin /> : 'Thêm sản phẩm'}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AddProductModal;
