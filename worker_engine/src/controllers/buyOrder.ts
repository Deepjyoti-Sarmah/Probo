import { initializeOrderBook, initializeStockBalance } from "../utils/initializeFunction";
import { lockFunds } from "../utils/lockFunction";
import { validateFunds } from "../utils/validateFunds";
import { validateUserExists } from "../utils/validateUserExists";

export const buyOption = async (userId: string, quantity: number, price: number, stockSymbol: string, stockType: string) => {

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

    return processOrder(userId, stockSymbol, quantity, price, stockType);

  } catch (error: any) {
    return {
      error: true,
      msg: error.message || "Error buying stocks"
    }
  }
}
