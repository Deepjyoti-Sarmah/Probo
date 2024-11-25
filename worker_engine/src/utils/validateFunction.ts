import { INR_BALANCES, STOCK_BALANCES } from "../db/model"

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

export const validateUserExists = (userId: string) => {
  if (!(userId in INR_BALANCES)) {
    return {
      error: true,
      msg: "User doesn't exist"
    }
  }
  return {
    error: false,
    msg: ""
  }
}

export const validateStockBalance = (userId: string, stockSymbol: string, stockType: "yes" | "no", quantity: number) => {

  if (!STOCK_BALANCES[userId] || !STOCK_BALANCES[userId][stockSymbol] || STOCK_BALANCES[userId][stockSymbol][stockType].quantity < quantity) {
    return {
      error: true,
      msg: "Insufficient stock balance"
    }
  }
  return {
    error: false,
    msg: ""
  }
}
