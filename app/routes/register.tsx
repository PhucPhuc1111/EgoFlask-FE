import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { InferType, number, object, ref, string } from "yup";
import { LoginNavbar } from "~/components";
import { registerAccount } from "~/data/user";

let schema = object({
  firstName: string().required(),
  lastName: string().required("Vui lòng nhập họ của bạn"),
  email: string().email("Email chưa hợp lệ").required("Vui lòng nhập email của bạn"),
  phone: number().required(),
  password: string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(25, "Mật khẩu không được quá 25 ký tự")
    .matches(/[A-Z]/, 'Mật khẩu phải có ít nhất một chữ in hoa')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu phải có ít nhất một ký tự đặc biệt')
    .required(),
  confirmPassword: string()
    .oneOf([ref('password')], 'Mật khẩu xác nhận không khớp')
    .required(),
})

const resolver = yupResolver(schema)

export type RegisterForm = InferType<typeof schema>

export default function Register() {
  const { register, formState: { errors, isSubmitting }, handleSubmit, setError } = useForm<RegisterForm>({
    resolver,
    mode: 'onChange',
  })
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    try {
      let response = await registerAccount(data);
      if (response) {
        navigate('/login');
      }
    } catch (error: any) {
      console.log('error', error);
      if (error.response.status == 409) {
        setError('email', {
          message: error.response.data
        })
      }
    }
  }

  return (
    <main className="mt-[--m-header-top] xl:px-[500px] pb-[--m-footer-bottom]">
      <div className="w-full flex flex-col items-center justify-center gap-9 pt-20 mx-auto">
        <LoginNavbar />
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="post"
          className="flex flex-col gap-8 w-[450px] max-[350px]:px-10">
          <input type="text"
            {...register('lastName')}
            placeholder="Họ"
            className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
          />
          {errors.lastName && <span className="text-red-500 font-bold">{errors.lastName.message}</span>}
          <input type="text"
            placeholder="Tên"
            className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
            {...register('firstName')}
          />
          <input type="email"
            placeholder="Email"
            className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
            {...register('email')}
          />
          {errors.email && <span className="text-red-500 font-bold">{errors.email.message}</span>}
          <input type="tel"
            placeholder="Số điện thoại"
            inputMode="tel"
            className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
            {...register('phone')}
          />
          {errors.phone && <span className="text-red-500 font-bold">{errors.phone.message}</span>}
          <input
            type="password"
            placeholder="Mật khẩu"
            required
            className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
            {...register('password')}
          />
          {errors.password && <span className="text-red-500 font-bold">{errors.password.message}</span>}
          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            required
            className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <span className="text-red-500 font-bold">{errors.confirmPassword.message}</span>}
          <button type="submit" disabled={isSubmitting} className="flex items-center justify-center uppercase active:bg-blue-800 hover:bg-blue-900 disabled:bg-blue-900 bg-[#0055C3] w-[450px] py-4 rounded-lg text-white font-semibold text-xl">
            {isSubmitting && <img src="/icons/loading.svg" alt="" className="w-10 h-10" />}
            <span>
              Tạo tài khoản
            </span>
          </button>
        </form>
      </div>
    </main>
  )
}
