import { memo, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Axios } from "../../components/axios/Axios";
import { changeAdminAction } from "./AdminActionSlice";

function AdminRecord() {
  const [records, setRecords] = useState([]);
  const dispatch = useDispatch();
  const checkOrderAction = "check order";

  useEffect(() => {
    dispatch(changeAdminAction(checkOrderAction));
    Axios.get(`/api/getAllRecord`)
      .then((res) => {
        let data = res.data.map((item) => {
          return { email: item.email, records: JSON.parse(item.record), products: JSON.parse(item.products), customId: item.customId, invoiceId: item.invoiceId };
        });
        setRecords(data);
      })
      .catch((e) => toast.error(e.response.data));
    // eslint-disable-next-line
  }, []);

  return (
    <table className="table w-full text-xs">
      <thead>
        <tr>
          <th></th>
          <th>Order ID</th>
          <th>Custom ID</th>
          <th>Invoice ID</th>
          <th>Buyer</th>
          <th>Product</th>
          <th>Total</th>
          <th>status</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {records &&
          records.map((record, index) => {
            return (
              <tr key={`AdminOrderRecord-${index + 1}`} className="hover">
                <td>{index + 1}</td>
                <td>{record.records.id}</td>
                <td>
                  <p className="overflow-auto w-60">{record.customId}</p>
                </td>
                <td>
                  <p className="overflow-auto w-60">{record.invoiceId}</p>
                </td>
                <td>{record.email}</td>
                <td>
                  {record.products.map((product, index) => (
                    <p key={`productRecord-${index}`}>
                      {product.name} x {product.quantity}
                    </p>
                  ))}
                </td>
                <td>
                  {record.records.payments.captures[0].amount.value} {record.records.payments.captures[0].amount.currency_code}
                </td>
                <td>{record.records.status}</td>
                <td>{record.records.payments.captures[0].update_time}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default memo(AdminRecord);
