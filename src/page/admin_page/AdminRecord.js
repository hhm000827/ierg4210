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
          return { email: item.email, records: JSON.parse(item.record), products: JSON.parse(item.products) };
        });
        setRecords(data);
      })
      .catch((e) => toast.error(e.response.data));
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Order ID</th>
            <th>Buyer</th>
            <th>Product</th>
            <th>Total</th>
            <th>Order status</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {records &&
            records.map((record, index) => {
              return (
                <tr key={`userRecord-${index + 1}`} className="hover">
                  <td>{index + 1}</td>
                  <td>{record.records.id}</td>
                  <td>{record.email}</td>
                  <td>
                    {record.products.map((product) => (
                      <p>
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
    </div>
  );
}

export default memo(AdminRecord);
