import { ORDERBOOKS, STOCK_BALANCES } from "../db/model";
import { unlockFund } from "../utils/lockFunction";

export const processBuyOrder = (userId: string, stockSymbol: string, quantity: number, price: number, stockType: "yes" | "no") => {
  const reverseType = stockType === "yes" ? "no" : "yes";

  const reversePrice = (10 - price).toString();

  const reverseOrder = ORDERBOOKS[stockSymbol]?.[reverseType]?.[reversePrice];

  if (!reverseOrder) {
    ORDERBOOKS[stockSymbol] = {
      ...ORDERBOOKS[stockSymbol],
      [reverseType]: {
        ...ORDERBOOKS[stockSymbol]?.[reverseType],
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
    };
    return;
  }

  if (reverseOrder.total < quantity) {
    const remainingQuantity = quantity - reverseOrder.total;

    if (!STOCK_BALANCES[userId]?.[stockSymbol]?.[stockType]) {
      STOCK_BALANCES[userId] = {
        ...STOCK_BALANCES[userId],
        [stockSymbol]: {
          ...STOCK_BALANCES[userId]?.[stockSymbol],
          [stockType]: { quantity: 0, locked: 0 }
        }
      };
    }

    STOCK_BALANCES[userId][stockSymbol][stockType].quantity += reverseOrder.total;

    const fillCost = price * 100 * reverseOrder.total;
    unlockFund(userId, fillCost);

    ORDERBOOKS[stockSymbol][reverseType][reversePrice] = {
      total: remainingQuantity,
      orders: {
        [userId]: {
          quantity: remainingQuantity,
          type: "reverted"
        }
      }
    };
  }

  for (const [orderId, order] of Object.entries(reverseOrder.orders)) {
    if (quantity <= 0) break;

    const fillQuantity = Math.min(order.quantity, quantity);

    order.quantity -= fillQuantity;
    reverseOrder.total -= fillQuantity;
    quantity -= fillQuantity;

    if (!STOCK_BALANCES[userId]?.[stockSymbol]?.[stockType]) {
      STOCK_BALANCES[userId] = {
        ...STOCK_BALANCES[userId],
        [stockSymbol]: {
          ...STOCK_BALANCES[userId]?.[stockSymbol],
          [stockType]: { quantity: 0, locked: 0 }
        }
      };
    }

    STOCK_BALANCES[userId][stockSymbol][stockType].quantity += fillQuantity;
    const fillCost = price * 100 * fillQuantity;
    unlockFund(userId, fillCost);

    const priceLevel = ORDERBOOKS[stockSymbol]?.[stockType]?.[price.toString()];

    if (priceLevel?.total === 0) {
      delete ORDERBOOKS[stockSymbol][stockType][price.toString()];
    } else if (priceLevel?.orders[orderId]?.quantity === 0) {
      delete priceLevel.orders[orderId];
    }
  }
};
