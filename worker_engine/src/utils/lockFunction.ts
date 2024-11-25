import { INR_BALANCES } from "../db/model"

export const lockFunds = (userId: string, totalCost: number) => {
  INR_BALANCES[userId].balance -= totalCost;
  INR_BALANCES[userId].locked += totalCost;
}

export const unlockFund = (userId: string, amount: number) => {
  INR_BALANCES[userId].locked -= amount;
}
