import lang from "lodash/lang";
import math from "lodash/math";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import PaypalButtonWrapper from "../paypal/PaypalAction";
import { changeAction } from "../paypal/PaypalActionSlice";
import { changeQuantity } from "./ShoppingCartSlice";

const Table = (props) => {
  const shoppingCart = useSelector((state) => state.shoppingCart.value);
  const paypalAction = useSelector((state) => state.paypalAction.value);
  const isLogin = useSelector((state) => state.isLogin.value);
  const dispatch = useDispatch();
  const ref = useRef({});

  useEffect(() => {
    shoppingCart.map((item) => {
      return (ref.current[item.name].value = null);
    });
    // eslint-disable-next-line
  }, []);

  const handleChangeQuantity = (input) => {
    if (Number(ref.current[input.name].value) > input.inventory) ref.current[input.name].value = input.inventory;

    let payload = {
      pid: input.pid,
      name: input.name,
      price: input.price,
      quantity: Number(ref.current[input.name].value),
      inventory: input.inventory,
      subtotal: input.price * Number(ref.current[input.name].value),
    };

    dispatch(changeQuantity(payload));
  };

  const onClickCheckoutButton = () => (isLogin ? dispatch(changeAction({ showPayPalButton: true })) : toast.error("You need to login before checkout"));

  return !lang.isEmpty(shoppingCart) ? (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <p className="text-white">Shopping List (Total: ${props.total})</p>
        <table className="table w-full text-white">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>subtotal</th>
            </tr>
          </thead>
          <tbody>
            {shoppingCart.map((item) => {
              return (
                <tr key={item.pid}>
                  <td>{item.name}</td>
                  <td>
                    <input type="number" min={0} max={item.inventory} ref={(el) => (ref.current[item.name] = el)} value={item.quantity} onChange={(e) => handleChangeQuantity(item)} />
                  </td>
                  <td>@$ {item.subtotal}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <button className="btn btn-xs btn-info mb-2" onClick={onClickCheckoutButton}>
          checkout
        </button>
      </div>
      {paypalAction.showPayPalButton && <PaypalButtonWrapper />}
    </div>
  ) : (
    <p className="text-white">Add something into Cart</p>
  );
};

const ShoppingCart = () => {
  const shoppingCart = useSelector((state) => state.shoppingCart.value);
  const [totalMoney, setTotalMoney] = useState(0);

  //calculate total money
  useEffect(() => {
    lang.isEmpty(shoppingCart) ? setTotalMoney(0) : setTotalMoney(math.sumBy(shoppingCart, "subtotal"));
  }, [shoppingCart]);

  return (
    <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
      <label tabIndex={0} className="btn m-1 normal-case bg-gray-800 hover">
        Shopping List ${totalMoney}
      </label>
      <div tabIndex={0} className="dropdown-content card card-compact p-2 shadow bg-base-100 text-primary-content">
        <Table total={totalMoney} />
      </div>
    </div>
  );
};

export default ShoppingCart;
