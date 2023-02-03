import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { changeAdminAction } from "../../page/admin_page/AdminActionSlice";

let submitAction = "submit create category form";
let createAction = "create category";

const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(/^[A-Za-z0-9 ]*$/, "not allow special letter in name")
      .required("name is required"),
  })
  .required();

const Create = () => {
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
    dispatch(changeAdminAction(submitAction));

    axios({ method: "post", url: `${process.env.React_App_API}/api/createCategory`, data: data })
      .then((res) => toast.success(res.data))
      .catch((err) => toast.error(err.response.data));
    reset();
  };

  const handleReset = () => {
    reset();
  };

  useEffect(() => {
    dispatch(changeAdminAction(createAction));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl  bg-gray-800">
      <div className="card-title justify-center mt-2">Create Category</div>
      <div className="card-body">
        <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Name" className={`input input-bordered ${errors.name && "input-error"}`} {...register("name")} />
          <p className="text-red-500 text-left">{errors.name?.message}</p>

          <div className="btn-group gap-2 mt-2 flex flex-row-reverse">
            <div className="form-control">
              <input type="submit" className="btn btn-success" />
            </div>
            <div className="form-control">
              <input type="reset" className="btn btn-info" onClick={handleReset} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(Create);
