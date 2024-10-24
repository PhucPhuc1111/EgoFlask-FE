import { useQueryClient } from '@tanstack/react-query';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import { deleteProductById } from '~/data'; // Thêm hàm xóa sản phẩm từ API

const DeleteProductModal = ({ productId }: { productId: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleOk = async () => {
      setLoading(true);
      try {
        await deleteProductById(productId);
        
        queryClient.invalidateQueries({
          queryKey: ['products'],
        });
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error deleting product:", error);
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
