
export const INR_BALANCES: any = {}
export const STOCK_BALANCE: any = {}

export const userExists = (userId: string) => {
  return INR_BALANCES.hasOwnProperty(userId);
}

export const symbolExists = (stockSymbol: string) => {
  return Object.keys(STOCK_BALANCE).some(userId => {
    STOCK_BALANCE[userId].hasOwnProperty(stockSymbol)
  })
}
