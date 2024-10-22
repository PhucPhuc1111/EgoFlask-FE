import { useQueryClient } from "@tanstack/react-query";
import { Image, Modal, Pagination, PaginationProps } from "antd";
import _ from "lodash";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCheckmarkCircleOutline, IoSearchOutline } from "react-icons/io5"
import { approveOrder, ApproveOrder, useGetAllOrder, useGetProfile } from "~/data";

export const handle = {
  hideHeader: true,
  hideFooter: true,
}

export default function AdminOrder() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const profile = useGetProfile();
  const order = useGetAllOrder(profile.data?.user?.token || '');
  const [open, setOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>('Content of the modal');
  const queryClient = useQueryClient();
  const { setValue, getValues } = useForm<ApproveOrder>();

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setCurrentPage(current);
    setPageSize(pageSize);
  };

  const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
    console.log('Page: ', pageNumber);
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };

  const filteredOrder = useMemo(() => {
    return _(order.data)
      .orderBy(it => it.updatedAt, 'desc')
      .value();
  }, [order.data, searchValue, currentPage, pageSize]);

  const debouncedSetSearchValue = useCallback(
    _.debounce((value: string) => {
      setSearchValue(value);
    }, 500), // Adjust the debounce delay as needed
    []
  );

  const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let search = e.target.value.trim();
    // setSearchValue(search);
    debouncedSetSearchValue(search);
    console.log('Search: ', search);
  }

  const ProductCard = () => {
    return (
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="bg-[#E8E8E4] self-center">
          <Image src="/images/products/bottle-1.png" alt="bottle" width={89} height={122} className="w-[89px] h-[122px]" />
        </div>
        <div className="flex flex-1 flex-col justify-between text-sm">
          <div className="flex flex-row justify-between">
            <div className="">Bình giữ nhiệt <span className="font-bold">Graceful</span></div>
            <div>10000 VND</div>
          </div>
          <span className="self-start">x1</span>
          <div className="flex flex-col items-start">
            Dịch vụ đi kèm:
            <div className="w-full flex flex-row items-center justify-between gap-2">
              <span>Viết thư tay: <span className="font-bold">Sinh nhật vui vẻ</span></span>
              <span>10000 VND</span>
            </div>
            <div className="w-full flex flex-row items-center justify-between gap-2">
              <span>Gói quà</span>
              <span>10000 VND</span>
            </div>
          </div>
          <div className="border-2 border-[#0055C3] rounded-full my-2" />
          <div className="w-full flex flex-row items-center justify-between">
            <span className="text-[#0055C3] font-bold">Tổng tiền: </span>
            <span className="text-[#0055C3] font-bold">100000 VND </span>
          </div>
        </div>
      </div>
    )
  }

  const AddressCard = () => {
    return (
      <div className="flex flex-col items-start justify-start text-start gap-4">
        <h4 className="text-black">
          Nguyễn Văn A
        </h4>
        <span className="text-[#7D7474]">
          (+84) 905 245 344
        </span>
        <span className="text-[#7D7474]">
          1472 Đ. Võ Văn Kiệt, Phường 3, Quận 6, Hồ Chí Minh
        </span>
      </div>
    )
  }

  const ProfileCard = ({ email, name }: { name: string, email: string }) => {
    return (
      <div className="flex items-center justify-center gap-2">
        <Image src="/images/avatar.png" alt="avatar" width={32} height={32} className="w-8 h-8 self-start" />
        <div className="flex flex-col items-start gap-1">
          <span>
            {name}
          </span>
          <span>
            ({email})
          </span>
        </div>
      </div>
    )
  }

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let data: ApproveOrder = {
      supplierId: profile.data?.detail.id || 0,
      orderId: getValues('orderId'),
    }
    try {
      let response = await approveOrder(profile.data?.user?.token || '', data);
      if (response) {
        setModalText('Duyệt đơn hàng thành công');
        queryClient.invalidateQueries({
          queryKey: ['order']
        })
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
        }, 1000);
      }
    } catch (error) {
      setConfirmLoading(false);
    } finally {
      setConfirmLoading(false);
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ['order']
      })
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <main className="flex-1 pt-32 pb-10 h-full max-h-screen overflow-auto pl-8">
      <div className="space-y-3 pr-4">
        <div className="flex flex-row items-center justify-between">
          <div>
            {order.data?.length.toLocaleString() || 0} đơn hàng
          </div>
          <div className="relative">
            <IoSearchOutline className="absolute top-4 left-2 w-6 h-6" />
            <input type="search" className="rounded-md w-[463px] h-[57px] placeholder:pl-0 pl-10" placeholder="Tìm kiếm" name="Search"
              onChange={searchOnChange}
            />
          </div>
        </div>
        <table className="w-full table-auto border-collapse border-2 border-[#0055C3] border-opacity-70">
          <thead className="bg-[#0055C3] text-white">
            <tr className="w-full">
              <th className="border border-white">Mã đơn hàng</th>
              <th className="border border-white w-1/3">Tên</th>
              <th className="border border-white w-1/3">Sản phẩm</th>
              <th className="border border-white">Địa chỉ nhận hàng</th>
              <th className="border border-white">Tình trạng</th>
              <th className="border border-white">Duyệt đơn</th>
            </tr>
          </thead>
          <tbody>
            {_.isEmpty(filteredOrder) && (
              <tr className="text-center">
                <td colSpan={6}>Không có đơn hàng cần duyệt</td>
              </tr>
            )}
            {_.map(filteredOrder, (item, index) => (
              <tr key={index} className="text-center">
                <td className="border-2 border-[#0055C3] border-opacity-70">{item.orderId}</td>
                <td className="border-2 border-[#0055C3] border-opacity-70 w-1/3 overflow-auto">
                  <ProfileCard name={"Ngô Quang Thắng"} email="thangnqse173445@fpt.edu.vn" />
                </td>
                <td className="border-2 border-[#0055C3] border-opacity-70 w-1/3 p-2">
                  <ProductCard />
                </td>
                <td className="border-2 border-[#0055C3] border-opacity-70 p-2">
                  <AddressCard />
                </td>
                <td className="border-2 border-[#0055C3] border-opacity-70 py-2 px-4">
                  <select name="" className="border-1 border-[#0055C3] w-fit h-fit rounded-md">
                    <option selected={item.status === "CANCELLED"} value="PENDING">Đã hủy</option>
                    <option selected={item.status === "PENDING"} value="PENDING">Đang chờ thanh toán</option>
                    <option selected={item.status === "SHIPPING"} value="DELIVERING">Đang vận chuyển</option>
                    <option selected={item.status === "COMPLETED"} value="COMPLETED">Đã thanh toán</option>
                  </select>
                </td>
                <td className="border-2 border-[#0055C3] border-opacity-70">
                  <div className="flex items-center justify-center">
                    <IoCheckmarkCircleOutline className="w-6 h-6 cursor-pointer hover:text-green-400"
                      onClick={() => {
                        setModalText(`Đơn hàng ${item.orderId} cần được duyệt bởi nhà cung cấp (Supplier). \n
                          Bạn có chắc chắn muốn duyệt đơn này không?`);
                        setValue('orderId', item.orderId);
                        showModal();
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          className="mt-4"
          align="center"
          showSizeChanger
          onChange={onChange}
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={currentPage}
          total={500}
        />
      </div>
      <Modal
        title="Duyệt đơn hàng"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        centered
      >
        <p>{modalText}</p>
      </Modal>
    </main>
  )
}