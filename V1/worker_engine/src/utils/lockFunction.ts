import { INR_BALANCES, STOCK_BALANCES } from "../db/model"

export const lockFunds = (userId: string, totalCost: number) => {
  INR_BALANCES[userId].balance -= totalCost;
  INR_BALANCES[userId].locked += totalCost;
}

export const unlockFund = (userId: string, amount: number) => {
  INR_BALANCES[userId].locked -= amount;
}

export const lockStocks = (userId: string, stockSymbol: string, stockType: "yes" | "no", quantity: number) => {
  STOCK_BALANCES[userId][stockSymbol][stockType].quantity -= quantity;
  STOCK_BALANCES[userId][stockSymbol][stockType].locked += quantity;
}

