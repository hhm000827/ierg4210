import { yupResolver } from "@hookform/resolvers/yup";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { setIsLogin } from "./LoginSlice";

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("must be a valid email")
      .matches(/^[\w%+-.@]*$/, "must be a valid email")
      .required("email is required"),
    password: yup.string().min(8, "password is too short - should be 8 chars minimum.").required("password is required"),
  })
  .required();

const LoginForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    document.getElementById("loginForm").checked = false;
    dispatch(setIsLogin());
    toast.success("Login successfully");
    reset();
  };

  return (
    <>
      <input type="checkbox" id="loginForm" className="modal-toggle" onClick={() => reset()} />
      <label htmlFor="loginForm" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label htmlFor="loginForm" className="btn btn-sm btn-circle btn-error absolute right-2 top-2">
            ✕
          </label>
          <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="Email" className={`input input-bordered ${errors.email && "input-error"}`} {...register("email")} />
              <p className="text-red-500 text-left">{errors.email?.message}</p>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="Password" className={`input input-bordered ${errors.password && "input-error"}`} {...register("password")} />
              <p className="text-red-500 text-left">{errors.password?.message}</p>
            </div>
            <div className="form-control mt-6">
              <input type="submit" className="btn btn-primary" value="Login" />
            </div>
          </form>
        </label>
      </label>
    </>
  );
};

export default memo(LoginForm);
