import { Request, Response } from "express";
import { userExists } from "../types";
import { INR_BALANCES } from "..";

export const onrampInr = async (req: Request, res: Response) => {
    const { userId, amount } = req.body;

    if (!userId || amount === undefined) {
        res.status(400).json({
            success: false,
            message: "Missing required fields"
        })
    }

    try {
        if (!userExists(userId)) {
            res.status(400).json({
                success: false,
                message: "User not found"
            });
            return
        }

        if (!Number.isInteger(amount)) {
            res.status(400).json({
                success: false,
                message: "Amount must be integer"
            })
            return
        }

        if (amount <= 0) {
            res.status(400).json({
                success: false,
                message: "amount must greater than 0"
            })
            return
        }

        const amountInRupees = amount / 100;

        const onrampMoney = INR_BALANCES[userId].balances += amountInRupees;

        if (!onrampMoney) {
            res.status(400).json({
                success: false,
                message: "cannot onramp inr"
            })
            return
        }

        res.status(200).json({
            success: true,
            message: "successfully on ramped money",
            data: onrampMoney
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
        return
    }
}