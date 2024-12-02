import { initializeOrderBook, initializeStockBalance } from "../utils/initializeFunction";
import { lockFunds, lockStocks } from "../utils/lockFunction";
import { validateFunds, validateStockBalance, validateUserExists } from "../utils/validateFunction";
import { processSellOrder } from "./processSellOrder";

export const sellOrder = async (userId: string, quantity: number, price: number, stockSymbol: string, stockType: "yes" | "no") => {
  const totalEarning = price * 100 * quantity;

  try {
    const userValidation = validateUserExists(userId);
    if (userValidation.error) return userValidation;

    const stockValidation = validateStockBalance(userId, stockSymbol, stockType, quantity);

    initializeStockBalance(userId, stockSymbol);
    initializeOrderBook(stockSymbol);

    lockStocks(userId, stockSymbol, stockType, quantity);

    return processSellOrder(userId, stockSymbol, quantity, price, stockType);
  } catch (error: any) {
    return {
      error: true,
      msg: error.message || "Error sellign stocks"
    }
  }
}
