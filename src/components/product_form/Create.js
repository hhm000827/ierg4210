import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import lang from "lodash/lang";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { changeAdminAction } from "../../page/admin_page/AdminActionSlice";

let submitAction = "submit create product form";
let createAction = "create product";

const SUPPORTED_FORMATS = [("image/jpg", "image/jpeg", "image/gif", "image/png")];
const FILE_SIZE = 5242880; //5MB

const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(/^[A-Za-z0-9 ]*$/, "not allow special letter in name")
      .required("name is required"),
    cid: yup.number().min(1, "category is required").typeError("category is required").required("category is required"),
    price: yup.number().min(0.001, "price must be greater than 0").typeError("price is required").required("price is required"),
    inventory: yup.number().min(1, "inventory must be greater than 0").typeError("inventory is required").required("inventory is required"),
    description: yup
      .string()
      .matches(/^[A-Za-z0-9 ]*$/, "not allow special letter in description")
      .required("description is required"),
  })
  .required();

const Create = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState();
  const [uploadedFile, setUploadedFile] = useState();
  const [fileError, setFileError] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let handleFileUpload = (e) => {
    if (!SUPPORTED_FORMATS.includes(e.target.files[0].type)) setFileError("Unsupported File Format");
    else if (e.target.files[0].size > FILE_SIZE) setFileError("File Size is too large");
    else {
      setUploadedFile(e.target.files[0]);
      setFileError(null);
    }
  };

  const onSubmit = (data, file) => {
    dispatch(changeAdminAction(submitAction));
    if (lang.isNil(file) || lang.isNaN(file) || file.size <= 0) setFileError("image is required");
    else {
      data["file"] = file;
      console.log(data);
    }

    // axios({ method: "post", url: `${process.env.React_App_API}/api/createCategory`, data: data })
    //   .then((res) => toast.success(res.data))
    //   .catch((err) => toast.error(err.response.data));
    // reset();
  };

  const handleReset = () => {
    reset();
  };

  useEffect(() => {
    dispatch(changeAdminAction(createAction));
    axios
      .get(`${process.env.React_App_API}/api/getAllCategory`)
      .then((res) => setCategories(res.data))
      .catch((err) => toast.error(err.response.data));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (uploadedFile) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(uploadedFile);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [uploadedFile]);

  return (
    <div className="card flex-shrink-0 w-fit shadow-2xl  bg-gray-800">
      <div className="card-title justify-center mt-2">Create Product</div>
      <div className="card-body">
        <form className="form-control" onSubmit={handleSubmit((data) => onSubmit(data, uploadedFile))}>
          <div className="grid grid-rows-4 grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" placeholder="Name" className={`input input-bordered ${errors.name && "input-error"}`} {...register("name")} />
              <p className="text-red-500 text-left">{errors.name?.message}</p>
            </div>
            <div className="flex flex-col">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select defaultValue="Choose a category" className={`select select-bordered w-full max-w-xs  ${errors.cid && "select-error"}`} {...register("cid")}>
                <option disabled>Choose a category</option>
                {!lang.isEmpty(categories) &&
                  categories.map((category) => (
                    <option key={`createProduct-${category.cid}`} value={category.cid}>
                      {category.name}
                    </option>
                  ))}
              </select>
              <p className="text-red-500 text-left">{errors.cid?.message}</p>
            </div>
            <div className="flex flex-col">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input type="number" step="0.01" defaultValue={0} className={`${errors.price && "input-error"}`} {...register("price")} />
              <p className="text-red-500 text-left">{errors.price?.message}</p>
            </div>
            <div className="flex flex-col">
              <label className="label">
                <span className="label-text">Inventory</span>
              </label>
              <input type="number" defaultValue={0} className={`${errors.inventory && "input-error"}`} {...register("inventory")} />
              <p className="text-red-500 text-left">{errors.inventory?.message}</p>
            </div>
            <div className="flex flex-col">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea className={`textarea textarea-bordered ${errors.description && "textarea-error"}`} {...register("description")} placeholder="Product Description"></textarea>
              <p className={`text-red-500 text-left`}>{errors.description?.message}</p>
            </div>
            <div className="flex flex-col">
              <label className="label">
                <span className="label-text">Drag & Drop or Click the box to upload image</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                onChange={(e) => {
                  handleFileUpload(e);
                }}
                accept="image/jpg,image/jpeg,image/gif,image/png"
              />
              <p className={`text-red-500 text-left`}>{!lang.isNil(fileError) && fileError}</p>
            </div>
            {fileDataURL ? <p className="img-preview-wrapper">{<img src={fileDataURL} alt="preview" />}</p> : null}
          </div>

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
//https://blog.logrocket.com/using-filereader-api-preview-images-react/
export default memo(Create);
