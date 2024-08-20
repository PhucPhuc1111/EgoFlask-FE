import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "@remix-run/react";
import { useForm } from "react-hook-form";

import { InferType, number, object } from "yup";
import { SubFooter } from "~/components";

let schema = object({
  emailCode: number().required("Vui lòng nhập mã xác nhận"),
});
const resolver = yupResolver(schema);
type EmailCodeForm = InferType<typeof schema>;

export default function verifyEmail() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<EmailCodeForm>({
    resolver,
    mode: "onChange",
  });

  const onSubmit = (data: EmailCodeForm) => {
    console.log("data", data);
  };

  return (
    <main className="mt-[--m-header-top]">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg mx-auto mt-36">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Nhập mã xác minh
        </h2>

        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          method="post"
        >
          <span className="block text-sm font-medium text-center text-gray-700 mb-2">
            Mã xác minh đã được gửi đến Email
            <p className=" font-semibold">nguyenvanA@gmail.com</p>
          </span>
          <input
            type="number"
            {...register("emailCode")}
            placeholder="Nhập mã xác minh"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <p className="text-center">
            Bạn vẫn chưa nhận được?{" "}
            <a className="text-[#0055C3]" href="/profile">
              Gửi lại
            </a>
          </p>
          {/* <Link to={'/profile'}> */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Xác minh
          </button>
          {/* </Link> */}
        </form>
      </div>
      <div>
        <SubFooter />
      </div>
    </main>
  );
}
