import { PayPalButtons } from "@paypal/react-paypal-js";
import math from "lodash/math";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Axios } from "../axios/Axios";
import { clearCart } from "../shoppingCart/ShoppingCartSlice";
import { changeAction } from "./PaypalActionSlice";

const PaypalButtonWrapper = () => {
  const shoppingCart = useSelector((state) => state.shoppingCart.value);
  const paypalAction = useSelector((state) => state.paypalAction.value);
  const dispatch = useDispatch();

  const createOrder = async (data, actions) => {
    let totalPrice = math.sumBy(shoppingCart, "payload.subtotal");
    let currency = "USD";
    const response = await Axios.post(`/api/createCustomId`, { shoppingCart: JSON.stringify(shoppingCart), totalPrice: totalPrice, currency: currency });
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: totalPrice.toString(),
            },
          },
        ],
        invoice_id: uuidv4(),
        custom_id: response.data.digest,
        items: shoppingCart.map((item) => {
          return { name: item.payload.name, quantity: item.payload.quantity.toString(), unit_amount: { value: item.payload.price } };
        }),
      })
      .then((orderID) => {
        dispatch(changeAction({ orderID: orderID }));
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      Axios.post(`/api/storeRecord`, { shoppingCart: JSON.stringify(shoppingCart), record: JSON.stringify(details) })
        .then((res) => {
          dispatch(changeAction({ checkoutSuccess: true }));
        })
        .catch((err) => err.response.data);
    });
  };

  const onPaypalError = (data, actions) => dispatch(changeAction({ errorMessage: "An Error occured with your payment" }));

  useEffect(
    () => {
      if (paypalAction.checkoutSuccess) {
        dispatch(clearCart());
        toast.success("Order successful. Please check in Record Page");
        dispatch(changeAction({ checkoutSuccess: false, showPayPalButton: false }));
      }
    }, // eslint-disable-next-line
    [paypalAction.checkoutSuccess, paypalAction.orderID]
  );

  useEffect(
    () => {
      if (paypalAction.errorMessage !== "") {
        toast.error(paypalAction.errorMessage);
        dispatch(changeAction({ checkoutSuccess: false, showPayPalButton: false }));
      }
    }, // eslint-disable-next-line
    [paypalAction.errorMessage]
  );

  return <PayPalButtons style={{ layout: "horizontal" }} createOrder={createOrder} onApprove={onApprove} onError={onPaypalError} />;
};

export default PaypalButtonWrapper;