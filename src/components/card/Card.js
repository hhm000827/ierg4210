import array from "lodash/array";
import lang from "lodash/lang";
import string from "lodash/string";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../shoppingCart/ShoppingCartSlice";

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

const images = importAll(require.context("../../../public/image", false, /\.(png|jpe?g|svg)$/));

const Card = (props) => {
  const shoppingCart = useSelector((state) => state.shoppingCart.value);
  const dispatch = useDispatch();

  const clickButton = (product) => {
    //use index to check if exists in cart when cart is not empty
    if (array.findIndex(shoppingCart, (o) => lang.isEqual(o.payload.name, product.name)) !== -1 && !lang.isEmpty(shoppingCart)) {
      toast.error("Product is existed in shopping cart");
      return;
    }

    let payload = {
      name: product.name,
      price: product.price,
      quantity: 1,
      inventory: product.inventory,
      subtotal: product.price,
    };
    dispatch(addToCart(payload));
    toast.success("Added to cart!");
  };

  return (
    <div className="card w-auto bg-gray-800 shadow-xl text-white">
      <Link to={`/${string.snakeCase(props.product.category)}/${string.snakeCase(props.product.name)}`}>
        <figure className="mt-4">
          <img className="w-36 h-36 mask rounded" src={images[props.product.img]} alt={props.product.name} />
        </figure>
      </Link>
      <div className="card-body">
        <div className="flex flex-row justify-center gap-2 card-title">
          <Link to={`/${string.snakeCase(props.product.category)}/${string.snakeCase(props.product.name)}`}>
            <h2>{props.product.name}</h2>
          </Link>
          {props.product.inventory <= 3 && <div className="badge badge-sm badge-secondary">{props.product.inventory}</div>}
        </div>
        <div className="flex flex-row gap-2">
          <p>${props.product.price}</p>
          <div className="card-actions">
            <button className={`btn btn-primary btn-xs ${props.product.inventory === 0 && "btn-disabled"}`} onClick={(e) => clickButton(props.product)}>
              {props.product.inventory === 0 ? "Sold Out" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductDetailCard = (props) => {
  const shoppingCart = useSelector((state) => state.shoppingCart.value);
  const dispatch = useDispatch();

  const clickButton = (product) => {
    //use index to check if exists in cart when cart is not empty
    if (array.findIndex(shoppingCart, (o) => lang.isEqual(o.payload.name, product.name)) !== -1 && !lang.isEmpty(shoppingCart)) {
      toast.error("Product is existed in shopping cart");
      return;
    }

    let payload = {
      name: product.name,
      price: product.price,
      quantity: 1,
      inventory: product.inventory,
      subtotal: product.price,
    };
    dispatch(addToCart(payload));
    toast.success("Added to cart!");
  };

  return (
    <div className="card lg:card-side lg:w-full bg-gray-800 shadow-xl text-white">
      <figure>
        <img src={images[props.product.img]} alt={props.product.name} />
      </figure>
      <div className="card-body lg:w-full">
        <h2 className="card-title justify-center">{props.product.name}</h2>
        <div className="flex flex-col gap-2 justify-start text-left">
          <div className="flex flex-row">
            <p>Category: {props.product.category}</p>
            <p>Price: ${props.product.price}</p>
          </div>
          {props.product.inventory <= 3 && <p className="text-red-600">Only {props.product.inventory} left</p>}
          <div className="card-actions justify-end">
            <button className={`btn btn-primary btn-md ${props.product.inventory === 0 && "btn-disabled"}`} onClick={(e) => clickButton(props.product)}>
              {props.product.inventory === 0 ? "Sold Out" : "Add to Cart"}
            </button>
          </div>
          <p>
            description:
            <br />
            {props.product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export { Card, ProductDetailCard };
