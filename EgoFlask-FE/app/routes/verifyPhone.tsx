import { Link } from "@remix-run/react"
import SubFooter from "~/components/SubFooter"

const verifyPhone= () => {
    return (
      <main className="mt-[--m-header-top] ">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg mx-auto mt-36 space-y-12 ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 mt0">Nhập mã OTP</h2>
      
      <form className="space-y-6">
       
        <div>
          <label htmlFor="verification-code" className=" text-center block text-sm font-medium text-gray-700 mb-2">
          Mã OTP đã được gửi đến số điện thoại
          <p className=" font-semibold text-lg">087238919</p>
          </label>
          <input
            type="text"
            id="verification-code"
            name="verification-code"
            placeholder="Nhập mã OTP"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <p className="text-center">Bạn vẫn chưa nhận được? <a className="text-[#0055C3]" href="/profile">Gửi lại</a></p>
        <Link to={'/profile'}>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Xác minh
        </button></Link>
        
      </form>
    </div>
    <div><SubFooter/></div>
    </main>
    )
  }
  
  export default verifyPhone