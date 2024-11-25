import { INR_BALANCES, STOCK_BALANCES } from "../db/model";

export const doBalance = async (data: any) => {
  const { type, userId } = JSON.parse(data);
  const user = INR_BALANCES[userId];

  switch (type) {
    case "getBalance":
      const response = INR_BALANCES;
      if (!response) {
        return { error: true, msg: `Balance not found` }
      }
      return { error: false, msg: response };

    case "getInrBalance":
      const inrResponse = INR_BALANCES[userId];
      if (!inrResponse) {
        return { error: true, msg: `User ${userId} not found` }
      }
      return { error: false, msg: inrResponse }

    case "getStockBalance":
      const stockResponse = STOCK_BALANCES;
      if (!stockResponse) {
        return { error: true, msg: `Stock Balance not found` }
      }
      return { error: false, msg: stockResponse }

    case "getUserStockBalance":
      const userResponse = STOCK_BALANCES[userId];
      if (!userResponse) {
        return { error: true, msg: `User not found or no stock balance` }
      }
      return { error: false, msg: userResponse }
  }

}
