import { format } from "date-fns";
import _ from "lodash";
import { useMemo } from "react";
import { useGetProfile, useGetStock } from "~/data"

export const handle = {
  hideHeader: true,
  hideFooter: true,
}

export default function AdminStock() {
  const profile = useGetProfile();
  const stock = useGetStock(profile.data?.user?.token || '');

  const stockData = useMemo(() => {
    if (!stock.data) return [];
    return _(stock.data)
      .orderBy(it => it.stockDate, 'desc')
      .value();
  }, [stock.data]);
  return (
    <main className="flex-1 pt-32 pb-10 h-full max-h-screen overflow-auto pl-8">
      <table className="w-full table-auto border-collapse border-2 border-[#0055C3] border-opacity-70">
        <thead className="bg-[#0055C3] text-white">
          <tr className="w-full">
            <th rowSpan={2} className="row-span-2 border border-white">Tên sản phẩm</th>
            <th rowSpan={2} className="row-span-2 border border-white">Số lượng hàng tồn kho</th>
            <th rowSpan={2} className="row-span-2 border border-white">Tình trạng tồn kho</th>
            <th rowSpan={2} className="row-span-2 border border-white">Sản phẩm bán chạy</th>
            <th colSpan={2} className="col-span-2 border border-white">Lịch sử nhập kho</th>
          </tr>
          <tr className="w-full">
            <th className="p-2 border border-white">Số lượng</th>
            <th className="p-2 border border-white">Ngày nhập</th>
          </tr>
        </thead>
        <tbody>
          {_.map(stockData, (item, index) => (
            <tr key={index} className="text-center">
              <td className="border-2 border-[#0055C3] border-opacity-70">{item.notes}</td>
              <td className="border-2 border-[#0055C3] border-opacity-70">{item.quantity}</td>
              <td className="border-2 border-[#0055C3] border-opacity-70 py-2">
                <select name="" className="border-1 border-[#0055C3] w-fit h-fit rounded-md">
                  <option value="new">Mới nhập</option>
                  <option value="new">Tồn kho lâu</option>
                  <option value="new">Tồn kho thấp</option>
                </select>
              </td>
              <td className="border-2 border-[#0055C3] border-opacity-70"><input type="checkbox" className="w-[26px] h-[26px] rounded-md focus:ring-0" /></td>
              <td className="border-2 border-[#0055C3] border-opacity-70">{item.quantity}</td>
              <td className="border-2 border-[#0055C3] border-opacity-70">{format(item.stockDate, 'HH:mm dd/MM/yyyy')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}