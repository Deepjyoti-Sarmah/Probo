import { initializeOrderBook, initializeStockBalance } from "../utils/initializeFunction";
import { lockFunds } from "../utils/lockFunction";
import { validateFunds, validateUserExists } from "../utils/validateFunction";
import { processBuyOrder } from "./processBuyOrder";

export const buyOption = async (userId: string, quantity: number, price: number, stockSymbol: string, stockType: "yes" | "no") => {

  const toalCost = price * 100 * quantity;

  try {
    const userValidation = validateUserExists(userId);
    if (userValidation.error)
      return userValidation

    const fundsValidation = validateFunds(userId, toalCost);
    if (fundsValidation.error)
      return fundsValidation;

    initializeStockBalance(userId, stockSymbol);
    initializeOrderBook(stockSymbol);

    lockFunds(userId, toalCost);

    return processBuyOrder(userId, stockSymbol, quantity, price, stockType);

  } catch (error: any) {
    return {
      error: true,
      msg: error.message || "Error buying stocks"
    }
  }
}
