export const sortOrder = (
  orders: Array<IOrder>,
  sortBy: keyof IOrder = "createdAt",
) => {
  return orders.sort((a, b) => {
    if (typeof a[sortBy] === "string") {
      return (a[sortBy] as string).localeCompare(b[sortBy] as string);
    } else if (typeof a[sortBy] === "number") {
      return (
        (a[sortBy] as unknown as number) - (b[sortBy] as unknown as number)
      );
    } else if (typeof a[sortBy] === "boolean") {
      return (
        (a[sortBy] as unknown as number) - (b[sortBy] as unknown as number)
      );
    } else if (a[sortBy] instanceof Date) {
      return (a[sortBy] as Date).getTime() - (b[sortBy] as Date).getTime();
    } else {
      return 0;
    }
  });
};
