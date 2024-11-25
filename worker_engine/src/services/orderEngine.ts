import { buyOption } from "../controllers/buyOrder";
import { sellOrder } from "../controllers/sellOrder";

export const doOrder = async (data: any) => {

  const { userId, quantity, actualPrice, stockType, type, stockSymbol } = JSON.parse(data);
  const price = actualPrice;

  switch (type) {
    case "buyOrderOption":
      const buyResponse = await buyOption(userId, quantity, price, stockType, stockSymbol);
      if (!buyResponse) {
        return ({
          error: true,
          msg: buyResponse
        })
      }
      return ({
        error: false,
        msg: buyResponse
      })

    case "sellOrderOption":
      const sellResponse = await sellOrder(userId, quantity, price, stockSymbol, stockType);
      if (!sellResponse) {
        return ({
          error: true,
          msg: sellResponse
        })
      }
      return ({
        error: false,
        msg: sellResponse
      })
  }

}
