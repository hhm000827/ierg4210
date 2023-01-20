import lang from "lodash/lang";
import math from "lodash/math";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeQuantity } from "./ShoppingCartSlice";

const Table = (props) => {
  const shoppingCart = useSelector((state) => state.shoppingCart.value);
  const dispatch = useDispatch();
  const ref = useRef({});

  useEffect(() => {
    shoppingCart.map((item) => {
      return (ref.current[item.payload.name].value = null);
    });
    // eslint-disable-next-line
  }, []);

  const handleChangeQuantity = (input) => {
    let payload = {
      name: input.name,
      price: input.price,
      quantity: Number(ref.current[input.name].value),
      inventory: input.inventory,
      subtotal: input.price * Number(ref.current[input.name].value),
    };

    dispatch(changeQuantity(payload));
  };

  return !lang.isEmpty(shoppingCart) ? (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <p>Shopping List (Total: ${props.total})</p>
        <table className="table w-full">
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
                <tr key={item.payload.name}>
                  <td>{item.payload.name}</td>
                  <td>
                    <input
                      type="number"
                      min={0}
                      max={item.payload.inventory}
                      ref={(el) => (ref.current[item.payload.name] = el)}
                      defaultValue={1}
                      onChange={(e) => handleChangeQuantity(item.payload)}
                    />
                  </td>
                  <td>@$ {item.payload.subtotal}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <button className="btn btn-xs btn-info">checkout</button>
      </div>
    </div>
  ) : (
    <p>Add something into Cart</p>
  );
};

const ShoppingCart = () => {
  const shoppingCart = useSelector((state) => state.shoppingCart.value);
  const [totalMoney, setTotalMoney] = useState(0);

  //calculate total money
  useEffect(() => {
    lang.isEmpty(shoppingCart) ? setTotalMoney(0) : setTotalMoney(math.sumBy(shoppingCart, "payload.subtotal"));
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
