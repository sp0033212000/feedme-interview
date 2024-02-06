"use client";
import { useOrderContext } from "@/context/OrderContext";
import { Button } from "@/components/common/Button";
import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import Order from "@/components/feature/Order";
import { useBotContext } from "@/context/BotContext";

export default function Home() {
  const { regular, vip, createVipOrder, createRegularOrder } =
    useOrderContext();
  const { increaseBot, decreaseBot } = useBotContext();

  return (
    <main className={"p-6 flex w-screen h-screen"}>
      <Block>
        <h2 className={"text-2xl font-bold"}>Common Order</h2>
        <ul className={"space-y-3"}>
          {regular.map((order) => (
            <Order key={order.id} {...order} />
          ))}
        </ul>
      </Block>
      <div className={"flex flex-col flex-[0.8_0.8_0%] px-4 space-y-2"}>
        <div className={"space-y-3"}>
          <div className={"flex space-x-3"}>
            <Button
              className={"flex-1 bg-yellow-400"}
              onClick={createRegularOrder}
            >
              Create Order
            </Button>
            <Button className={"flex-1 bg-amber-600"} onClick={createVipOrder}>
              Create VIP Order
            </Button>
          </div>
          <div className={"flex space-x-3"}>
            <Button className={"flex-1 bg-blue-400"} onClick={increaseBot}>
              Add Bot
            </Button>
            <Button className={"flex-1 bg-red-400"} onClick={decreaseBot}>
              Remove Bot
            </Button>
          </div>
        </div>
      </div>
      <Block>
        <h2 className={"text-2xl font-bold"}>VIP Order</h2>
        <ul className={"space-y-3"}>
          {vip.map((order) => (
            <Order key={order.id} {...order} />
          ))}
        </ul>
      </Block>
    </main>
  );
}

const Block: React.FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classNames(
        "flex-1",
        "h-full",
        "border border-solid border-gray-300 rounded-xl",
      )}
    >
      <div className={classNames(className, "p-6 space-y-3")}>{children}</div>
    </div>
  );
};
