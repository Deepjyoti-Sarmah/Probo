import { buyOption } from "../utils/buyOrder";

export const doOrder = async (data: any) => {

  const { userId, quantity, actualPrice, stockType, type, stockSymbol } = JSON.parse(data);
  const price = actualPrice;

  switch (type) {
    case "buyOrderOption":
      const response = await buyOption(userId, quantity, price, stockType, stockSymbol);
      if (!response) {
        return ({
          error: true,
          msg: response
        })
      }
      return ({
        error: false,
        msg: response
      })

    case "sellOrderOption":
      const response = await sellOption(userId, quantity, price, stockSymbol);
      if (!response) {
        return ({
          error: true,
          msg: response
        })
      }
      return ({
        error: false,
        msg: response
      })
  }

}
