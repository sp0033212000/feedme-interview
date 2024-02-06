"use client";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { sortOrder } from "@/utils";

interface IOrderContext {
  vip: Array<IOrder>;
  regular: Array<IOrder>;

  createVipOrder: () => void;
  createRegularOrder: () => void;
  moveOrderToProcessing: (order: IOrder) => void;
  returnOrderToPending: (order: IOrder) => void;
  completeOrder: (order: IOrder) => void;
}

const OrderContext = createContext<IOrderContext | null>(null);

export const OrderContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [vip, setVip] = useState<Array<IOrder>>([]);
  const [regular, setRegular] = useState<Array<IOrder>>([]);

  const createOrder = useCallback((isVip: boolean): IOrder => {
    return {
      id: uuidv4(),
      status: "PENDING",
      createdAt: new Date(),
      updatedAt: new Date(),
      isVip,
    };
  }, []);

  const createVipOrder = useCallback(() => {
    setVip((prev) => sortOrder([...prev, createOrder(true)]));
  }, [createOrder]);

  const createRegularOrder = useCallback(() => {
    setRegular((prev) => sortOrder([...prev, createOrder(false)]));
  }, [createOrder]);

  const updateOrderStatus = useCallback(
    (orders: IOrder[], order: IOrder, status: IOrderStatus) => {
      return sortOrder(
        orders.map((o) => {
          if (o.id === order.id) {
            return { ...o, status, updatedAt: new Date() };
          }
          return o;
        }),
      );
    },
    [],
  );

  const moveOrderToProcessing = useCallback(
    (order: IOrder) => {
      let handler = order.isVip ? setVip : setRegular;
      handler((prev) => updateOrderStatus(prev, order, "PROCESSING"));
    },
    [updateOrderStatus],
  );

  const returnOrderToPending = useCallback(
    (order: IOrder) => {
      let handler = order.isVip ? setVip : setRegular;
      handler((prev) => updateOrderStatus(prev, order, "PENDING"));
    },
    [updateOrderStatus],
  );

  const completeOrder = useCallback(
    (order: IOrder) => {
      let handler = order.isVip ? setVip : setRegular;
      handler((prev) => updateOrderStatus(prev, order, "COMPLETE"));
    },
    [updateOrderStatus],
  );

  return (
    <OrderContext.Provider
      value={{
        vip,
        regular,
        createVipOrder,
        createRegularOrder,
        moveOrderToProcessing,
        returnOrderToPending,
        completeOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error(
      "useOrderContext must be used within a OrderContextProvider",
    );
  }
  return context;
};
