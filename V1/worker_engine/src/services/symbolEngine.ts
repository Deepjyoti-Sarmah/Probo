import { ORDERBOOKS, STOCK_BALANCES } from "../db/model"
import { getJsonStringifyData } from "../utils"

export const doSymbolCreate = async (data: any) => {
  const { symbol } = JSON.parse(data)

  ORDERBOOKS[symbol] = {
    yes: {},
    no: {}
  }

  Object.keys(STOCK_BALANCES).forEach((userId) => {
    STOCK_BALANCES[userId][symbol] = {
      yes: {
        quantity: 0,
        locked: 0
      },
      no: {
        quantity: 0,
        locked: 0,
      }
    }
  })

  const response = getJsonStringifyData(ORDERBOOKS[symbol]);
  return {
    error: false,
    msg: `symbol ${symbol} created successfully ${response}`
  }
}
