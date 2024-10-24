// import { yupResolver } from "@hookform/resolvers/yup";
// import { useNavigate } from "@remix-run/react";
// import _ from "lodash";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { IoCheckmarkCircle, IoCloseCircle, IoEye, IoEyeOff } from "react-icons/io5";
// import { InferType, number, object, ref, string } from "yup";
// import { LoginNavbar } from "~/components";
// import { criteria } from "~/components/utils";
// import { registerAccount } from "~/data/user";

// let schema = object({
//   firstName: string().required(),
//   lastName: string().required("Vui lòng nhập họ của bạn"),
//   email: string().email("Email chưa hợp lệ").required("Vui lòng nhập email của bạn"),
//   phone: number().required(),
//   password: string()
//     .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
//     .max(25, "Mật khẩu không được quá 25 ký tự")
//     .matches(/[A-Z]/, 'Mật khẩu phải có ít nhất một chữ in hoa')
//     .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu phải có ít nhất một ký tự đặc biệt')
//     .required(),
//   confirmPassword: string()
//     .oneOf([ref('password')], 'Mật khẩu xác nhận không khớp')
//     .required(),
// })

// const resolver = yupResolver(schema)

// export type RegisterForm = InferType<typeof schema>

// export default function Register() {
//   const { register, formState: { errors, isSubmitting }, handleSubmit, setError, watch } = useForm<RegisterForm>({
//     resolver,
//     mode: 'onChange',
//   })
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
//   const password = watch('password', '');

//   const onSubmit = async (data: RegisterForm) => {
//     try {
//       let response = await registerAccount(data);
//       if (response) {
//         navigate('/login');
//       }
//     } catch (error: any) {
//       console.log('error', error);
//       if (error.response.status == 409) {
//         setError('email', {
//           message: error.response.data.message
//         })
//       }
//     }
//   }

//   return (
//     <main className="mt-[--m-header-top] xl:px-[500px] pb-[--m-footer-bottom]">
//       <div className="w-full flex flex-col items-center justify-center gap-2 pt-20 mx-auto">
//         <LoginNavbar />
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           method="post"
//           className="flex flex-col gap-8 w-[450px] max-[350px]:px-10 mt-8">
//           <input type="text"
//             {...register('lastName')}
//             placeholder="Họ"
//             className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
//           />
//           {errors.lastName && <span className="text-red-500 font-bold">{errors.lastName.message}</span>}
//           <input type="text"
//             placeholder="Tên"
//             className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
//             {...register('firstName')}
//           />
//           <input type="email"
//             placeholder="Email"
//             className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
//             {...register('email')}
//           />
//           {errors.email && <span className="text-red-500 font-bold">{errors.email.message}</span>}
//           <input type="tel"
//             placeholder="Số điện thoại"
//             inputMode="tel"
//             className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
//             {...register('phone')}
//           />
//           {errors.phone && <span className="text-red-500 font-bold">{errors.phone.message}</span>}
//           <div className="relative w-full">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               placeholder="Mật khẩu"
//               required
//               className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
//               {...register('password')}
//             />
//             {showPassword ? (
//               <IoEyeOff onClick={() => setShowPassword(!showPassword)} className='transition-opacity duration-300 ease-in-out opacity-100 absolute right-3 top-0 mt-3 cursor-pointer size-6 text-[#465166] hover:text-black' />
//             ) : (
//               <IoEye onClick={() => setShowPassword(!showPassword)} className='transition-opacity duration-300 ease-in-out opacity-100 absolute right-3 top-0 mt-3 cursor-pointer size-6 text-[#465166] hover:text-black' />
//             )}
//           </div>
//           {/* {errors.password && <span className="text-red-500 font-bold">{errors.password.message}</span>} */}
//           <div>
//             {_.map(criteria, (criterion, index) => {
//               return (
//                 <>
//                   {criterion.test(password) ? (
//                     <div className="flex items-center gap-2">
//                       <IoCheckmarkCircle className="w-5 h-5 text-green-500" />
//                       <p key={index} className={`text-green-500 font-bold`}>
//                         {criterion.label}
//                       </p>
//                     </div>
//                   ) : (
//                     <div className="flex items-center gap-2">
//                       <IoCloseCircle className="w-5 h-5 text-red-500" />
//                       <p key={index} className={`text-red-500 font-bold`}>
//                         {criterion.label}
//                       </p>
//                     </div>
//                   )}
//                 </>
//               )
//             })}
//           </div>
//           <div className="relative w-full">
//             <input
//               type={showConfirmPassword ? 'text' : 'password'}
//               placeholder="Xác nhận mật khẩu"
//               required
//               className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
//               {...register('confirmPassword')}
//             />
//             {showConfirmPassword ? (
//               <IoEyeOff onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='transition-opacity duration-300 ease-in-out opacity-100 absolute right-3 top-0 mt-3 cursor-pointer size-6 text-[#465166] hover:text-black' />
//             ) : (
//               <IoEye onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='transition-opacity duration-300 ease-in-out opacity-100 absolute right-3 top-0 mt-3 cursor-pointer size-6 text-[#465166] hover:text-black' />
//             )}
//           </div>
//           {errors.confirmPassword && <span className="text-red-500 font-bold">{errors.confirmPassword.message}</span>}
//           <button type="submit" disabled={isSubmitting} className="flex items-center justify-center uppercase active:bg-blue-800 hover:bg-blue-900 disabled:bg-blue-900 bg-[#0055C3] w-[450px] py-4 rounded-lg text-white font-semibold text-xl">
//             {isSubmitting && <img src="/icons/loading.svg" alt="" className="w-10 h-10" />}
//             <span>
//               Tạo tài khoản
//             </span>
//           </button>
//         </form>
//       </div>
//     </main>
//   )
// }
import { yupResolver } from "@hookform/resolvers/yup";
import { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import _ from "lodash";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoCheckmarkCircle, IoCloseCircle, IoEye, IoEyeOff } from "react-icons/io5";
import { InferType, number, object, ref, string } from "yup";
import { LoginNavbar } from "~/components";
import { criteria } from "~/components/utils";
import { registerAccount } from "~/data/user";

export const meta: MetaFunction = () => {
  return [
    { title: "Đăng ký" },
    {
      property: "og:title",
      content: "Đăng ký để nhận nhiều ưu đãi hơn",
    },
    {
      name: "description",
      content: "Đăng ký để nhận nhiều ưu đãi hơn",
    },
  ];
};

let schema = object({
  firstName: string().required("Vui lòng nhập tên của bạn"),
  lastName: string().required("Vui lòng nhập họ của bạn"),
  email: string().email("Email chưa hợp lệ").required("Vui lòng nhập email của bạn"),
  phone: number().required("Vui lòng nhập số điện thoại của bạn"),
  password: string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(25, "Mật khẩu không được quá 25 ký tự")
    .matches(/[A-Z]/, 'Mật khẩu phải có ít nhất một chữ in hoa')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu phải có ít nhất một ký tự đặc biệt')
    .required(),
  confirmPassword: string()
    .oneOf([ref('password')], 'Mật khẩu xác nhận không khớp')
    .required(),
});

const resolver = yupResolver(schema);

export type RegisterForm = InferType<typeof schema>;

export default function Register() {
  const { register, formState: { errors, isSubmitting }, handleSubmit, setError, watch } = useForm<RegisterForm>({
    resolver,
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const password = watch('password', '');

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
          message: error.response.data.message
        });
      }
    }
  };

  return (
    <main className="mt-[--m-header-top] xl:px-[500px] pb-[--m-footer-bottom] px-4 sm:px-0">
    <div className="w-full flex flex-col items-center justify-center gap-2 pt-5 mx-auto">
        <LoginNavbar />
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="post"
          className="flex flex-col gap-8 w-full max-w-[450px] mt-8">
          
          <input type="text"
            {...register('lastName')}
            placeholder="Họ"
            className="w-full focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
          />
          {errors.lastName && <span className="text-red-500 font-bold text-xs sm:text-sm">{errors.lastName.message}</span>}

          <input type="text"
            placeholder="Tên"
            className="w-full focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
            {...register('firstName')}
          />
          {errors.firstName && <span className="text-red-500 font-bold text-xs sm:text-sm">{errors.firstName.message}</span>}

          <input type="email"
            placeholder="Email"
            className="w-full focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
            {...register('email')}
          />
          {errors.email && <span className="text-red-500 font-bold text-xs sm:text-sm">{errors.email.message}</span>}

          <input type="tel"
            placeholder="Số điện thoại"
            inputMode="tel"
            className="w-full focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
            {...register('phone')}
          />
          {errors.phone && <span className="text-red-500 font-bold text-xs sm:text-sm">{errors.phone.message}</span>}

          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Mật khẩu"
              required
              className="w-full focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
              {...register('password')}
            />
            {showPassword ? (
              <IoEyeOff onClick={() => setShowPassword(!showPassword)} className='transition-opacity duration-300 ease-in-out opacity-100 absolute right-3 top-0 mt-3 cursor-pointer size-6 text-[#465166] hover:text-black' />
            ) : (
              <IoEye onClick={() => setShowPassword(!showPassword)} className='transition-opacity duration-300 ease-in-out opacity-100 absolute right-3 top-0 mt-3 cursor-pointer size-6 text-[#465166] hover:text-black' />
            )}
          </div>

          <div>
            {_.map(criteria, (criterion, index) => {
              return (
                <>
                  {criterion.test(password) ? (
                    <div className="flex items-center gap-2" key={index}>
                      <IoCheckmarkCircle className="w-5 h-5 text-green-500" />
                      <p className={`text-green-500 font-bold text-xs sm:text-sm`}>
                        {criterion.label}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2" key={index}>
                      <IoCloseCircle className="w-5 h-5 text-gray-500" />
                      <p className={`text-gray-500 font-bold text-xs sm:text-sm`}>
                        {criterion.label}
                      </p>
                    </div>
                  )}
                </>
              );
            })}
          </div>

          <div className="relative w-full">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Xác nhận mật khẩu"
              className="w-full focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
              {...register('confirmPassword')}
            />
            {showConfirmPassword ? (
              <IoEyeOff onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='transition-opacity duration-300 ease-in-out opacity-100 absolute right-3 top-0 mt-3 cursor-pointer size-6 text-[#465166] hover:text-black' />
            ) : (
              <IoEye onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='transition-opacity duration-300 ease-in-out opacity-100 absolute right-3 top-0 mt-3 cursor-pointer size-6 text-[#465166] hover:text-black' />
            )}
          </div>
          {errors.confirmPassword && <span className="text-red-500 font-bold text-xs sm:text-sm">{errors.confirmPassword.message}</span>}

          <button type="submit" disabled={isSubmitting} className="flex items-center justify-center uppercase active:bg-blue-800 hover:bg-blue-900 disabled:bg-blue-900 bg-[#0055C3] w-full py-2 sm:py-4 rounded-lg text-white font-semibold text-lg sm:text-xl">
            {isSubmitting && <img src="/icons/loading.svg" alt="" className="w-5 h-5 sm:w-10 sm:h-10" />}
            <span className="text-sm sm:text-xl">
              Tạo tài khoản
            </span>
          </button>
        </form>
      </div>
    </main>
  );
}
