import { ORDERBOOKS, STOCK_BALANCES } from "../db/model";
import { unlockFund } from "../utils/lockFunction";

export const processOrder = (userId: string, stockSymbol: string, quantity: number, price: number, stockType: string) => {

  const reverseType = stockType === "yes" ? "no" : "yes";

  const reversePrice = (10 - price).toString();

  const reverseOrder = ORDERBOOKS[stockSymbol][reverseType][reversePrice];

  if (!reverseOrder) {
    ORDERBOOKS[stockSymbol][reverseType] = {
      ...ORDERBOOKS[stockSymbol][reverseType],
      [reversePrice]: {
        total: quantity,
        orders: {
          [userId]: {
            quantity,
            type: "reverted"
          }
        }
      }
    }
  }

  if (reverseOrder.total < quantity) {

    for (const [orderId, order] of Object.entries(reverseOrder.orders)) {
      if (quantity <= 0)
        break;

      const fillQuantity = Math.min(order.quantity, quantity);

      order.quantity -= fillQuantity;
      reverseOrder.total -= fillQuantity;
      quantity -= fillQuantity;

      STOCK_BALANCES[userId][stockSymbol][stockType].quantity += fillQuantity;
      const fillCost = price * 100 * fillQuantity;
      unlockFund(userId, fillCost);

      const priceLevel = ORDERBOOKS[stockSymbol][stockType][price];

      if (priceLevel.total === 0) {
        delete ORDERBOOKS[stockSymbol][stockType][price];
      } else if (priceLevel.order[orderId].quantity === 0) {
        delete priceLevel.orders[orderId];
      }
    }
  }


}
