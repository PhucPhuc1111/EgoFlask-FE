import { useEffect, useState } from "react";
import { useParams } from "@remix-run/react";
import { Account, getAccountById, useGetProfile } from "~/data";

export default function AdminCustomerDetail() {
  const { customerId } = useParams();
  const [customerDetail, setCustomerDetail] = useState<Account | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { data: profile, isLoading: profileLoading, isError } = useGetProfile();

  useEffect(() => {
    const fetchCustomerDetail = async () => {
      if (!customerId) {
        setErrorMessage("No customer ID available.");
        return;
      }

      if (!profile || !profile.user?.token) {
        setErrorMessage("No token available.");
        return;
      }

      setLoading(true);
      setErrorMessage(null);
      try {
        const account = await getAccountById(profile.user.token, Number(customerId));
        setCustomerDetail(account);
      } catch (error) {
        setErrorMessage("Error fetching customer detail.");
      } finally {
        setLoading(false);
      }
    };

    if (!profileLoading && !isError && profile?.user?.token && customerId) {
      fetchCustomerDetail();
    }
  }, [customerId, profile, profileLoading, isError]);

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  if (!customerDetail) {
    return <p>Không tìm thấy chi tiết tài khoản</p>;
  }

  return (
    <main className="flex-1 pt-32 pb-10 h-full max-h-screen overflow-auto px-8">
      <div className="col-span-10 border-[#0055C3] border-2 rounded-3xl px-7">
        <div className="p-7">
          <div className="border-[#0055C3] w-full p-7">
            <div className="flex items-center space-x-7">
              <p className="text-lg font-semibold text-[#0055C3]">Hồ sơ</p>
              <img className="h-20 w-20 rounded-full" src={customerDetail.avatar || "/images/avatar.png"} alt="avatar" />
            </div>
            <div className="flex space-x-24">
              <div className="mt-4 space-y-6 font-semibold text-[#9c9797]">
                <div>Họ và tên</div>
                <div>Email</div>
                <div>Số điện thoại</div>
                <div>Giới tính</div>
                <div>Ngày sinh</div>
                <div>Địa chỉ nhận hàng</div>
              </div>
              <div className="mt-4 ml-4 space-y-6 text-black">
                <div>{customerDetail.name}</div>
                <div>{customerDetail.email}</div>
                <div>{customerDetail.phoneNumber}</div>
                <div>{customerDetail.gender || "Chưa cập nhật"}</div>
                <div>{new Date(customerDetail.dob).toLocaleDateString()}</div>
                <div>{customerDetail.address || "Chưa cập nhật"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
