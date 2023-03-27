import { memo, useEffect, useState } from "react";
import { Axios } from "../components/axios/Axios";

function Record() {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    Axios.get(`/api/getUserRecord`)
      .then((res) => {
        let data = res.data.map((item) => {
          return { records: JSON.parse(item.record), products: JSON.parse(item.products) };
        });
        console.log(data);
        setRecords(data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Order ID</th>
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

export default memo(Record);
