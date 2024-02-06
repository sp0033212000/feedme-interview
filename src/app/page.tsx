"use client";
import { useOrderContext } from "@/context/OrderContext";
import { Button } from "@/components/common/Button";
import classNames from "classnames";
import React, { PropsWithChildren, useMemo } from "react";
import Bot from "@/components/feature/Bot";
import Order from "@/components/feature/Order";
import { useBotContext } from "@/context/BotContext";

export default function Home() {
  return (
    <main className={"p-6 flex w-screen h-screen"}>
      <RegularOrder />
      <div className={"flex flex-col flex-[0.8_0.8_0%] px-4 space-y-2"}>
        <Actions />
        <BotList />
        <CompleteOrder />
      </div>
      <VipOrder />
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

const RegularOrder: React.FC = () => {
  const { regular } = useOrderContext();

  const uncompletedRegular = useMemo(
    () => regular.filter((order) => order.status !== "COMPLETE"),
    [regular],
  );

  return (
    <Block>
      <h2 className={"text-2xl font-bold"}>Common Order</h2>
      <ul className={"space-y-3"}>
        {uncompletedRegular.map((order) => (
          <Order key={order.id} {...order} />
        ))}
      </ul>
    </Block>
  );
};

const VipOrder: React.FC = () => {
  const { vip } = useOrderContext();

  const uncompletedVip = useMemo(
    () => vip.filter((order) => order.status !== "COMPLETE"),
    [vip],
  );

  return (
    <Block>
      <h2 className={"text-2xl font-bold"}>VIP Order</h2>
      <ul className={"space-y-3"}>
        {uncompletedVip.map((order) => (
          <Order key={order.id} {...order} />
        ))}
      </ul>
    </Block>
  );
};

const Actions: React.FC = () => {
  const { createRegularOrder, createVipOrder } = useOrderContext();
  const { increaseBot, decreaseBot } = useBotContext();

  return (
    <div className={"space-y-3"}>
      <div className={"flex space-x-3"}>
        <Button className={"flex-1 bg-yellow-400"} onClick={createRegularOrder}>
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
  );
};

const BotList = () => {
  const { bots } = useBotContext();

  return (
    <div className={"flex-1 overflow-hidden"}>
      <Block className={"flex flex-col h-full overflow-hidden"}>
        <h2 className={"text-2xl font-bold"}>Bot</h2>
        <ul
          className={
            "flex-1 overflow-scroll space-y-2 divide-y divide-gray-300"
          }
        >
          {bots.map((bot) => (
            <Bot key={bot.id} {...bot} />
          ))}
        </ul>
      </Block>
    </div>
  );
};

const CompleteOrder: React.FC = () => {
  const { vip, regular } = useOrderContext();

  const completedOrder = useMemo(
    () => vip.concat(regular).filter((order) => order.status === "COMPLETE"),
    [vip, regular],
  );

  return (
    <div className={"flex-1 overflow-hidden"}>
      <Block className={"h-full overflow-hidden"}>
        <h2 className={"text-2xl font-bold"}>Complete Order</h2>
        <ul className={"h-full space-y-2 overflow-scroll"}>
          {completedOrder.map((order, index) => (
            <p key={order.id}>
              {index + 1}: {order.id}
            </p>
          ))}
        </ul>
      </Block>
    </div>
  );
};
