import React from "react";

const Order: React.FC<IOrder> = ({ id, status }) => {
  return (
    <li>
      <div className={"flex space-x-3"}>
        <div>{id}</div>
        <div>{status}</div>
      </div>
    </li>
  );
};

export default Order;
