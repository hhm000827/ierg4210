import { yupResolver } from "@hookform/resolvers/yup";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Axios } from "../axios/Axios";

const schema = yup
  .object()
  .shape({
    email: yup.string().email("must be a valid email").trim().required("email is required"),
    password: yup
      .string()
      .matches(/^[^<>]+$/, "empty password or special letters are not allowed: < >")
      .trim()
      .required("password is required"),
    newPassword: yup
      .string()
      .min(5, "password is too short - should be 5 chars minimum.")
      .matches(/^[^<>]+$/, "empty password or special letters are not allowed: < >")
      .notOneOf([yup.ref("password"), null], "New Password must not same as old password")
      .trim()
      .required("new password is required"),
  })
  .required();

const PasswordForm = () => {
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
    Axios.post(`/api/changePassword`, data)
      .then((res) => {
        reset();
        document.getElementById("passwordForm").checked = false;
        toast.success(res.data);
        dispatch({ type: "logout" });
        setTimeout(() => window.location.assign("/"), "1000");
      })
      .catch((err) => toast.error(err.response.data));
  };

  return (
    <>
      <input type="checkbox" id="passwordForm" className="modal-toggle" onClick={() => reset()} />
      <label htmlFor="passwordForm" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label htmlFor="passwordForm" className="btn btn-sm btn-circle btn-error absolute right-2 top-2">
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
                <span className="label-text">Old Password</span>
              </label>
              <input type="password" placeholder="Old Password" className={`input input-bordered ${errors.password && "input-error"}`} {...register("password")} />
              <p className="text-red-500 text-left">{errors.password?.message}</p>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">New Password</span>
              </label>
              <input type="password" placeholder="New Password" className={`input input-bordered ${errors.newPassword && "input-error"}`} {...register("newPassword")} />
              <p className="text-red-500 text-left">{errors.newPassword?.message}</p>
            </div>
            <div className="form-control mt-6">
              <input type="submit" className="btn btn-primary" value="Change Password" />
            </div>
          </form>
        </label>
      </label>
    </>
  );
};

export default memo(PasswordForm);
