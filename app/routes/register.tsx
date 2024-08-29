import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { InferType, number, object, ref, string } from "yup";
import { LoginNavbar } from "~/components";

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

type RegisterForm = InferType<typeof schema>

export default function Register() {
  const { register, formState: { errors }, handleSubmit } = useForm<RegisterForm>({
    resolver,
    mode: 'onChange',
  })

  const onSubmit = (data: RegisterForm) => {
    console.log('data', data);
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
            className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0]"
          />
          {errors.lastName && <span className="text-red-500 font-bold">{errors.lastName.message}</span>}
          <input type="text"
            placeholder="Tên"
            className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0]"
            {...register('firstName')}
          />
          <input type="email"
            placeholder="Email"
            className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0]"
            {...register('email')}
          />
          {errors.email && <span className="text-red-500 font-bold">{errors.email.message}</span>}
          <input type="tel"
            placeholder="Số điện thoại"
            className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0]"
            {...register('phone')}
          />
          {errors.phone && <span className="text-red-500 font-bold">{errors.phone.message}</span>}
          <input
            type="password"
            placeholder="Mật khẩu"
            required
            className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0]"
            {...register('password')}
          />
          {errors.password && <span className="text-red-500 font-bold">{errors.password.message}</span>}
          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            required
            className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0]"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <span className="text-red-500 font-bold">{errors.confirmPassword.message}</span>}
          <button type="submit" className="uppercase active:bg-blue-800 bg-[#0055C3] w-[450px] py-4 rounded-lg text-white font-semibold text-xl">
            Tạo tài khoản
          </button>
        </form>
      </div>
    </main>
  )
}
