import { resetInrBalance, resetOrderBook, resetStockBalance } from "../db/model"

export const doReset = async () => {
  resetInrBalance();
  resetStockBalance();
  resetOrderBook();

  const response = "Reset Successfull";
  return ({
    error: false,
    msg: response
  })
}
