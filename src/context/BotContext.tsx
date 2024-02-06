"use client";

import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { useOrderContext } from "@/context/OrderContext";
import { useUpdateEffect } from "react-use";

interface IBotContext {
  bots: IBot[];

  increaseBot: () => void;
  decreaseBot: () => void;
  freeBot: (botId: string) => void;
}

const BotContext = createContext<IBotContext | null>(null);

export const BotContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [bots, setBots] = useState<IBot[]>([]);

  const { vip, regular, moveOrderToProcessing } = useOrderContext();

  const freeBot = useCallback((botId: string) => {
    setBots((prev) =>
      prev.map((b) => {
        if (b.id === botId) {
          return { ...b, status: "IDLE", processingOrder: null };
        }
        return b;
      }),
    );
  }, []);

  const takeBot = useCallback((bot: IBot, order: IOrder) => {
    setBots((prev) =>
      prev.map((b) => {
        if (b.id === bot.id) {
          return { ...b, status: "BUSY", processingOrder: order };
        }
        return b;
      }),
    );
  }, []);

  useUpdateEffect(() => {
    let targetOrder =
      vip.find((order) => order.status === "PENDING") ||
      regular.find((order) => order.status === "PENDING");
    if (!targetOrder) return;
    let targetBot = bots.find((bot) => bot.status === "IDLE");
    if (!targetBot) return;
    moveOrderToProcessing(targetOrder);
    takeBot(targetBot, targetOrder);
  }, [bots, vip, regular]);

  const increaseBot = useCallback(() => {
    setBots((prev) => [
      ...prev,
      {
        id: uuidv4(),
        status: "IDLE",
        processingOrder: null,
      },
    ]);
  }, []);

  const decreaseBot = useCallback(() => {
    setBots((prev) => {
      const copy = [...prev];
      copy.pop();
      return copy;
    });
  }, []);

  return (
    <BotContext.Provider
      value={{
        bots,
        increaseBot,
        decreaseBot,
        freeBot,
      }}
    >
      {children}
    </BotContext.Provider>
  );
};

export const useBotContext = () => {
  const context = React.useContext(BotContext);
  if (!context) {
    throw new Error("useBotContext must be used within a BotContextProvider");
  }
  return context;
};
