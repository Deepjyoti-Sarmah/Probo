import { INR_BALANCES } from "../db/model"

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
