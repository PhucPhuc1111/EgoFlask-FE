import { useQueryClient } from '@tanstack/react-query';
import { Button, message, Modal } from 'antd';
import { useState } from 'react';
import { deleteProductById, useGetProfile } from '~/data'; // Thêm hàm xóa sản phẩm từ API

const DeleteProductModal = ({ productId }: { productId: string }) => {
    const profile = useGetProfile();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleOk = async () => {
      setLoading(true);
      try {
        await deleteProductById(productId, profile.data?.user?.token || '');
        
        queryClient.invalidateQueries({
          queryKey: ['products'],
        });
        message.success("Xóa sản phẩm thành công");
        setIsModalOpen(false);
      } catch (error: any) {
        console.error("Error deleting product:", error);
        message.error(`Lỗi khi xóa sản phẩm: ${error?.message}`);
      } finally {
        setLoading(false);
      }
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    return (
      <>
        <Button onClick={showModal} className="hover:underline border-none">
          Xóa
        </Button>
        <Modal
          title="Xóa sản phẩm"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          confirmLoading={loading}
        >
          <p>Bạn chắc chắn muốn xóa sản phẩm này không?</p>
        </Modal>
      </>
    );
};

export default DeleteProductModal;
