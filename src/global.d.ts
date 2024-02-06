export global {
  type IOrderStatus = "PENDING" | "PROCESSING" | "COMPLETE";
  type IBotStatus = "IDLE" | "BUSY";

  interface IBot {
    id: string;
    status: IBotStatus;
    processingOrder: IOrder | null;
  }

  interface IOrder {
    id: string;
    status: IOrderStatus;
    createdAt: Date;
    updatedAt: Date;
    isVip: boolean;
  }
}
