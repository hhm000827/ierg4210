import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import lang from "lodash/lang";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { changeAdminAction } from "../../page/admin_page/AdminActionSlice";

let modifyAction = "modify category";
let checkAction = "check category";
let deleteAction = "delete category";
let submitAction = "submit modified category";
let selectAction = "select category";

const schema = yup
  .object({
    name: yup
      .string()
      .matches(/^[A-Za-z0-9 ]*$/, "not allow special letter in name")
      .required("name is required"),
  })
  .required();

const Check = () => {
  const dispatch = useDispatch();
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

    axios({ method: "put", url: `${process.env.React_App_API}/api/updateCategory`, data: data })
      .then((res) => toast.success(res.data))
      .catch((err) => toast.error(err.response.data));

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleReset = () => {
    reset();
  };

  const handleDelete = (cid) => {
    dispatch(changeAdminAction(deleteAction));
    axios({ method: "delete", url: `${process.env.React_App_API}/api/deleteCategory`, data: { cid: cid } })
      .then((res) => toast.success(res.data))
      .catch((err) => toast.error(err.response.data));

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleSelectCategory = (category) => {
    reset();
    dispatch(changeAdminAction(selectAction));
    setSelectedCategory(category);
  };

  useEffect(() => {
    dispatch(changeAdminAction(checkAction));
    axios
      .get(`${process.env.React_App_API}/api/getAllCategory`)
      .then((res) => setCategories(res.data))
      .catch((e) => console.error(e));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl  bg-gray-800">
      <div className="card-title justify-center mt-2">Check Category</div>
      <div className="card-body flex flex-col">
        {/* dropdown for choosing category */}
        <div className="dropdown dropdown-bottom w-fit">
          <label tabIndex={0} className="btn m-1 normal-case flex justify-start w-fit">
            Choose Category
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
            {!lang.isEmpty(categories) &&
              categories.map((category) => {
                return (
                  <li key={`checkCategory-${category.name}`}>
                    <button className="text-left btn-sm" onClick={(e) => handleSelectCategory(category)}>
                      {category.name}
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
        {/* form for category */}
        {lang.isObject(selectedCategory) && (
          <div>
            <form className="form-control" onSubmit={handleSubmit((data) => onSubmit(data, selectedCategory.cid))}>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                defaultValue={selectedCategory.name}
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
              <button className="btn btn-error" onClick={() => handleDelete(selectedCategory.cid)}>
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
