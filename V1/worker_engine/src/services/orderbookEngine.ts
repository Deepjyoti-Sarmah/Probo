import { ORDERBOOKS } from "../db/model";

export const getOrderbook = async (data: any) => {
  const { type, symbol } = JSON.parse(data);

  switch (type) {
    case "orderBook":
      return ({
        error: false,
        msg: ORDERBOOKS
      })

    case "orderBookBySymbol":
      const orders = ORDERBOOKS[symbol];
      if (!orders) {
        return ({ error: true, msg: `Orderbook with ${symbol} not found` })
      }
      return ({ error: false, msg: orders })
  }
}
