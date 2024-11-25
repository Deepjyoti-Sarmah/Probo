import { INR_BALANCES } from "../db/model"

export const validateFunds = (userId: string, totalCost: number) => {
  if (INR_BALANCES[userId].balance < totalCost) {
    return {
      error: true,
      msg: "Insufficient funds"
    }
  }
  return {
    error: false,
    msg: ""
  }
}
