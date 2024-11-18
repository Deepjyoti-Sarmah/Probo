import { INR_BALANCES } from "..";

export const userExists = (userId: string) => {
    return INR_BALANCES.hasOwnProperty(userId);
}
