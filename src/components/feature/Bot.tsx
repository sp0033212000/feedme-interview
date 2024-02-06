import React, { useRef } from "react";
import {
  useCounter,
  useInterval,
  useUnmount,
  useUpdateEffect,
} from "react-use";
import { useBotContext } from "@/context/BotContext";
import { useOrderContext } from "@/context/OrderContext";

const MAX_INTERVAL = 10;
const MIN_INTERVAL = 0;

const Bot: React.FC<IBot> = ({ id, processingOrder }) => {
  const { freeBot } = useBotContext();
  const { completeOrder, returnOrderToPending } = useOrderContext();
  const orderRef = useRef(processingOrder);

  const [count, counterAction] = useCounter(
    MAX_INTERVAL,
    MAX_INTERVAL,
    MIN_INTERVAL,
  );
  useInterval(() => counterAction.dec(), processingOrder ? 1000 : null);

  useUnmount(() => {
    if (orderRef.current) returnOrderToPending(orderRef.current);
  });

  useUpdateEffect(() => {
    if (processingOrder) {
      orderRef.current = processingOrder;
    }
  }, [processingOrder]);

  useUpdateEffect(() => {
    if (processingOrder) {
      counterAction.reset(MAX_INTERVAL);
    }
  }, [processingOrder]);

  useUpdateEffect(() => {
    if (!processingOrder) return;
    if (count === MIN_INTERVAL) {
      freeBot(id);
      completeOrder(processingOrder);
      orderRef.current = null;
    }
  }, [count]);

  return (
    <li className={"space-y-1 pt-2"}>
      <p className={"font-bold"}>{id}</p>
      <p className={"text-gray-700 text-sm"}>{processingOrder?.id ?? "IDLE"}</p>
      <p className={"text-gray-700 text-sm"}>Left: {count} sec</p>
    </li>
  );
};

export default Bot;
