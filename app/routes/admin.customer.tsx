import React, { useEffect, useMemo, useState } from "react";
import { useGetProfile, Account, useGetAllAccount } from "~/data";
import { Link } from "@remix-run/react";
import { format } from "date-fns";
import { Pagination, PaginationProps } from 'antd';
import _ from "lodash";

export const handle = {
  hideHeader: true,
  hideFooter: true,
};

export default function AdminCustomer() {
  const { data: profile, isLoading: profileLoading, isError } = useGetProfile();
  // const [customerList, setCustomerList] = useState<Account[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const accounts = useGetAllAccount(profile?.user?.token || "", currentPage, pageSize);

  const accountData = useMemo(() => {
    if (!accounts.data) return [];
    return _(accounts.data)
      .orderBy(it => it.createAt, 'desc')
      .value();
  }, [accounts.data, pageSize, currentPage]);

  // useEffect(() => {
  //   const fetchAccounts = async () => {
  //     if (profile?.user?.token) {
  //       setLoading(true);
  //       try {
  //         const accounts = await getAllAccount(profile.user.token, currentPage, accountsPerPage);
  //         setCustomerList(accounts);
  //       } catch (error) {
  //         console.error("Failed to fetch accounts:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     } else {
  //       console.warn("No token available.");
  //     }
  //   };

  //   if (!profileLoading && !isError) {
  //     fetchAccounts();
  //   }
  // }, [profile, profileLoading, isError, currentPage]);

  // const handlePageChange = (newPage: number) => {
  //   if (newPage > 0 && newPage <= totalPages) {
  //     setCurrentPage(newPage);
  //   }
  // };

  // const renderPageNumbers = () => {
  //   const pageNumbers = [];
  //   const startPage = Math.max(1, currentPage - 2);
  //   const endPage = Math.min(totalPages, currentPage + 2);

  //   if (startPage > 1) {
  //     pageNumbers.push(1);
  //     if (startPage > 2) pageNumbers.push("...");
  //   }

  //   for (let i = startPage; i <= endPage; i++) {
  //     pageNumbers.push(i);
  //   }

  //   if (endPage < totalPages) {
  //     if (endPage < totalPages - 1) pageNumbers.push("...");
  //     pageNumbers.push(totalPages);
  //   }

  //   return pageNumbers.map((number, index) => (
  //     <button
  //       key={index}
  //       onClick={() => handlePageChange(number)}
  //       className={`mx-1 px-2 py-1 w-8 h-8 border rounded-full ${currentPage === number ? "bg-[#0055C3] text-white" : "text-[#0055C3]"}`}
  //       disabled={typeof number === "string"}
  //     >
  //       {number}
  //     </button>
  //   ));
  // };

  // if (profileLoading) {
  //   return <div> <ClipLoader color="#0055C3" loading={loading} size={50} />
  //       <p className="text-[#0055C3]">Loading...</p></div>;
  // }


  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setCurrentPage(current);
    setPageSize(pageSize);
  };

  const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
    console.log('Page: ', pageNumber);
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };

  if (isError) {
    return <div>Error loading profile data.</div>;
  }

  return (
    <main className="flex-1 pt-32 pb-10 h-full max-h-screen overflow-auto px-8">
      <div className="my-9">
        <table className="w-full border-2">
          <thead className="bg-[#0055C3] text-white text-center border-2">
            <tr>
              <th className="border-2 border-[#0055C3]">#ID</th>
              <th className="border-2 border-[#0055C3]">Tên</th>
              <th className="border-2 border-[#0055C3]">Email</th>
              <th className="border-2 border-[#0055C3]">Ngày tạo</th>
              <th className="border-2 border-[#0055C3]">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="text-black text-center border-2">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-3">
                  {/* <ClipLoader color="#0055C3" loading={loading} size={50} /> */}
                  <p className="text-[#0055C3]">Loading...</p>
                </td>
              </tr>
            ) : (
              _.map(accountData, (customer) => (
                <tr key={customer.accountId}>
                  <th className="border-2 border-[#0055C3] py-3">#{customer.accountId}</th>
                  <td className="border-2 border-[#0055C3]">{customer.name}</td>
                  <td className="border-2 border-[#0055C3]">{customer.email}</td>
                  <td className="border-2 border-[#0055C3]">{format(customer.createAt, 'HH:mm dd/MM/yyyy')}</td>
                  <td className="border-2 border-[#0055C3]">
                    <Link to={`/admin/customer/${customer.accountId}`}>
                      <button className="border rounded-md w-24 h-8 bg-[#0055C3] text-white hover:bg-white hover:text-[#0055C3]">
                        Chi tiết
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Phân trang */}
        {/* <div className="flex justify-center mt-4">
          <button className="text-[#0055C3]" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            &lt;
          </button>
          {renderPageNumbers()}
          <button className="text-[#0055C3]" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            &gt;
          </button>
        </div> */}
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
    </main>
  );
}
