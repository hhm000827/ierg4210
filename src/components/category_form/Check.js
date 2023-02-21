import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import lang from "lodash/lang";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import * as yup from "yup";
import { changeAdminAction } from "../../page/admin_page/AdminActionSlice";

let modifyAction = "modify category";
let checkAction = "check category";
let deleteAction = "delete category";
let submitAction = "submit modified category";
let selectAction = "select category";

const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(/^[\w ]*$/, "not allow special letter in name")
      .required("name is required"),
  })
  .required();

const Check = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const adminAction = useSelector((state) => state.adminAction.value);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data, cid) => {
    dispatch(changeAdminAction(submitAction));
    data["cid"] = cid;

    axios
      .put(`${process.env.React_App_API}/api/updateCategory`, data, {
        headers: {
          Authorization: sessionStorage.getItem("auth"),
        },
      })
      .then((res) => {
        toast.success(res.data);
        setTimeout(() => navigate(0), 1000);
      })
      .catch((err) => toast.error(err.response.data));
  };

  const handleReset = () => {
    reset();
  };

  const handleDelete = (cid) => {
    dispatch(changeAdminAction(deleteAction));
    axios({
      method: "delete",
      url: `${process.env.React_App_API}/api/deleteCategory`,
      data: { cid: cid },
      headers: {
        Authorization: sessionStorage.getItem("auth"),
      },
    })
      .then((res) => {
        toast.success(res.data);
        setTimeout(() => navigate(0), 1000);
      })
      .catch((err) => toast.error(err.response.data));
  };

  const handleSelectCategory = (category) => {
    reset();
    dispatch(changeAdminAction(selectAction));
    setSelectedCategory(category);
  };

  useEffect(() => {
    dispatch(changeAdminAction(checkAction));
    axios
      .get(`${process.env.React_App_API}/api/getAllCategory?dropdown=true`)
      .then((res) => setCategories(res.data))
      .catch((e) => console.error(e));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl  bg-gray-800">
      <div className="card-title justify-center mt-2">Check Category</div>
      <div className="card-body flex flex-col">
        {/* dropdown for choosing category */}
        <div className="flex justify-center">
          <Select className=" text-black" placeholder="Choose a category" onChange={handleSelectCategory} options={categories} isSearchable isClearable />
        </div>
        {/* form for category */}
        {lang.isObject(selectedCategory) && (
          <div>
            <form className="form-control" onSubmit={handleSubmit((data) => onSubmit(data, selectedCategory.value))}>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                defaultValue={selectedCategory.label}
                className={`input input-bordered ${errors.name && "input-error"}`}
                disabled={!lang.isEqual(modifyAction, adminAction)}
                {...register("name")}
              />
              <p className="text-red-500 text-left">{errors.name?.message}</p>
              <div className="btn-group gap-2 mt-2 flex flex-row-reverse">
                <div className="form-control">
                  <input type="submit" className={`btn btn-success ${!lang.isEqual(modifyAction, adminAction) && "btn-disabled hidden"}`} />
                </div>
                <div className="form-control">
                  <input type="reset" className={`btn btn-info ${!lang.isEqual(modifyAction, adminAction) && "btn-disabled hidden"}`} onClick={handleReset} />
                </div>
              </div>
            </form>
            <div className="btn-group gap-2 mt-2 flex flex-row justify-end">
              <button className="btn btn-error" onClick={() => handleDelete(selectedCategory.value)}>
                Delete
              </button>
              <button className="btn btn-warning" onClick={() => dispatch(changeAdminAction(modifyAction))}>
                Modify
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Check);
