import { ORDERBOOKS, STOCK_BALANCES } from "../db/model"

export const initializeStockBalance = (userId: string, stockSymbol: string) => {
  if (!STOCK_BALANCES[userId]) {
    STOCK_BALANCES[userId] = {};
  }

  if (!STOCK_BALANCES[userId][stockSymbol]) {
    STOCK_BALANCES[userId][stockSymbol] = {
      yes: { quantity: 0, locked: 0 },
      no: { quantity: 0, locked: 0 }
    }
  }
}

export const initializeOrderBook = (stockSymbol: string) => {
  if (!ORDERBOOKS[stockSymbol]) {
    ORDERBOOKS[stockSymbol] = {
      yes: {},
      no: {}
    }
  }
}
