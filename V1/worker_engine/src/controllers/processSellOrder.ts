import { INR_BALANCES, ORDERBOOKS, STOCK_BALANCES } from "../db/model"

export const processSellOrder = (userId: string, stockSymbol: string, quantity: number, price: number, stockType: "yes" | "no") => {
  const orderBook = ORDERBOOKS[stockSymbol][stockType];
  const priceLevel = orderBook[price];

  if (!priceLevel || priceLevel.total === 0) {
    if (!orderBook[price]) {
      orderBook[price] = {
        total: 0,
        orders: {}
      }
    }

    orderBook[price].total += quantity;
    orderBook[price].orders[userId] = { quantity, type: "sell" }
    return {
      error: false,
      msg: "Order added to sell order book"
    }
  }

  let remainingQuantity = quantity;
  for (const buyer in priceLevel.orders) {
    const available = priceLevel.orders[buyer].quantity;
    const matchedQuantity = Math.min(remainingQuantity, available);

    INR_BALANCES[buyer].locked -= matchedQuantity * price * 100;
    INR_BALANCES[buyer].balance += matchedQuantity * price * 100;

    STOCK_BALANCES[userId][stockSymbol][stockType].locked -= matchedQuantity;
    INR_BALANCES[userId].balance += matchedQuantity * price * 100;

    priceLevel.orders[buyer].quantity -= matchedQuantity;
    priceLevel.total -= matchedQuantity;
    remainingQuantity -= matchedQuantity;

    if (priceLevel.orders[buyer].quantity === 0) {
      delete priceLevel.orders[buyer];
    }

    if (remainingQuantity === 0) break;
  }

  if (remainingQuantity > 0) {
    orderBook[price].total += remainingQuantity;
    orderBook[price].orders[userId] = {
      quantity: remainingQuantity,
      type: "sell"
    }
  }

  return {
    error: false,
    msg: "Sell order processed successfully"
  }
}
