import { yupResolver } from "@hookform/resolvers/yup";
import lang from "lodash/lang";
import { memo, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import * as yup from "yup";
import { changeAdminAction } from "../../page/admin_page/AdminActionSlice";
import { Axios } from "../axios/Axios";

let modifyAction = "modify product";
let checkAction = "check product";
let deleteAction = "delete product";
let submitAction = "submit modified product";
let selectAction = "select product";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const FILE_SIZE = 5000000; //5MB

const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(/^[\w ]*$/, "not allow special letter in name")
      .trim()
      .required("name is required"),
    cid: yup
      .object()
      .shape({
        label: yup.string().required("category is required"),
        value: yup.number().required("category is required"),
      })
      .nullable()
      .required("category is required"),
    price: yup.number().min(0.001, "price must be greater than 0").typeError("price is required").required("price is required"),
    inventory: yup.number().min(1, "inventory must be greater than 0").typeError("inventory is required").required("inventory is required"),
    description: yup
      .string()
      .matches(/^[\w\s,.]*$/, "not allow special letter in description")
      .trim()
      .required("description is required"),
  })
  .required();

const Check = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [uploadedFile, setUploadedFile] = useState();
  const [fileError, setFileError] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState();
  const adminAction = useSelector((state) => state.adminAction.value);

  const {
    register,
    handleSubmit,
    reset,
    control,
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

  const onSubmit = (data, selectedProduct, file) => {
    dispatch(changeAdminAction(submitAction));

    data["cid"] = data.cid.value;
    data["pid"] = selectedProduct.pid;
    data["img"] = selectedProduct.img;
    data["oldName"] = selectedProduct.name;
    if (!lang.isNil(file)) data["file"] = file;

    let formData = new FormData();
    for (let key in data) formData.append(key, data[key]);

    Axios.put(`/api/updateProduct`, formData, { headers: { "Content-Type": "multipart/form-data" } })
      .then((res) => {
        toast.success(res.data);
        setUploadedFile(null);
        setFileError(null);
        setFileDataURL(null);
        setTimeout(() => navigate(0), 1000);
      })
      .catch((err) => toast.error(err.response.data));
  };

  const handleReset = () => {
    setUploadedFile(null);
    setFileError(null);
    setFileDataURL(null);
    reset();
  };

  const handleDelete = (pid, img) => {
    dispatch(changeAdminAction(deleteAction));
    Axios({
      method: "delete",
      url: `/api/deleteProduct`,
      data: { pid: pid, img: img },
    })
      .then((res) => {
        toast.success(res.data);
        setTimeout(() => navigate(0), 1000);
      })
      .catch((err) => toast.error(err.response.data));
  };

  const handleSelectProduct = (product) => {
    dispatch(changeAdminAction(selectAction));
    setUploadedFile(null);
    setFileError(null);
    setFileDataURL(null);
    if (!lang.isNil(product))
      Axios.get(`/api/getFilteredProducts?pid=${product.value}`)
        .then((res) => setSelectedProduct(res.data))
        .catch((e) => console.error(e));
    else setSelectedProduct(null);
    reset();
  };

  useEffect(() => {
    dispatch(changeAdminAction(checkAction));
    Axios.get(`/api/getAllProductNameAndPid`)
      .then((res) => setProducts(res.data))
      .catch((e) => console.error(e));
    Axios.get(`/api/getAllCategory?dropdown=true`)
      .then((res) => setCategories(res.data))
      .catch((e) => console.error(e));
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
      <div className="card-title justify-center mt-2">Check Product</div>
      <div className="card-body flex flex-col">
        {/* dropdown for choosing category */}
        <div className="flex justify-center">
          <Select className="text-black" placeholder="Choose a product" onChange={handleSelectProduct} options={products} isSearchable isClearable />
        </div>
        {/* form for category */}
        {lang.isObject(selectedProduct) && (
          <div>
            <form className="form-control" onSubmit={handleSubmit((data) => onSubmit(data, selectedProduct, uploadedFile))}>
              <div className="grid grid-rows-4 grid-cols-2 gap-x-5">
                <div className="flex flex-col h-fit">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedProduct.name}
                    className={`input input-bordered ${errors.name && "input-error"}`}
                    disabled={!lang.isEqual(modifyAction, adminAction)}
                    {...register("name")}
                  />
                  <p className="text-red-500 text-left">{errors.name?.message}</p>
                </div>
                <div className="flex flex-col h-fit">
                  <label className="label">
                    <span className="label-text">Category (current: {selectedProduct.category})</span>
                  </label>
                  <Controller
                    name="cid"
                    control={control}
                    defaultValue="not yet choose category"
                    render={({ field }) => <Select {...field} className="text-black" options={categories} isSearchable isClearable isDisabled={!lang.isEqual(modifyAction, adminAction)} />}
                  />
                  <p className="text-red-500 text-left">{errors.cid?.message}</p>
                </div>
                <div className="flex flex-col h-fit">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={selectedProduct.price}
                    className={`${errors.price && "input-error"}`}
                    disabled={!lang.isEqual(modifyAction, adminAction)}
                    {...register("price")}
                  />
                  <p className="text-red-500 text-left">{errors.price?.message}</p>
                </div>
                <div className="flex flex-col h-fit">
                  <label className="label">
                    <span className="label-text">Inventory</span>
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedProduct.inventory}
                    className={`${errors.inventory && "input-error"}`}
                    disabled={!lang.isEqual(modifyAction, adminAction)}
                    {...register("inventory")}
                  />
                  <p className="text-red-500 text-left">{errors.inventory?.message}</p>
                </div>
                <div className="flex flex-col h-fit">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    className={`textarea textarea-bordered ${errors.description && "textarea-error"}`}
                    disabled={!lang.isEqual(modifyAction, adminAction)}
                    {...register("description")}
                    defaultValue={selectedProduct.description}
                  ></textarea>
                  <p className={`text-red-500 text-left`}>{errors.description?.message}</p>
                </div>
                <div className="flex flex-col h-fit">
                  <label className="label">
                    <span className="label-text">Drag & Drop or Click to upload image (max: 5MB)</span>
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                    onChange={(e) => {
                      handleFileUpload(e);
                    }}
                    accept="image/jpg,image/jpeg,image/gif,image/png"
                    disabled={!lang.isEqual(modifyAction, adminAction)}
                  />
                  <p className={`text-red-500 text-left`}>{!lang.isNil(fileError) && fileError}</p>
                </div>
                {lang.isObject(selectedProduct) && (
                  <p className="text-left w-fit h-fit">
                    current image:
                    <img className="w-36 h-36" src={`${process.env.React_App_API}/images/${selectedProduct.img}`} alt={selectedProduct.name} />
                  </p>
                )}
                {fileDataURL ? (
                  <p className="text-left w-fit h-fit">
                    image preview:
                    <img className="w-36 h-36" src={fileDataURL} alt="preview" />
                  </p>
                ) : null}
              </div>
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
              <button className="btn btn-error" onClick={() => handleDelete(selectedProduct.pid, selectedProduct.img)}>
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
