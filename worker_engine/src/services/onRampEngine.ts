import { INR_BALANCES } from "../db/model";

export const doOnRamp = async (data: any) => {
  const { userId, amount } = JSON.parse(data);
  const user = INR_BALANCES[userId];

  if (!user) {
    return {
      error: true,
      msg: `User ${userId} doesn't exist`
    }
  }

  user.balance += amount;
  return {
    errror: false,
    msg: user
  }

}
