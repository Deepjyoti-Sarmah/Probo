import { Request, Response } from "express";
import { userExists } from "../types";
import { INR_BALANCES } from "..";

export const getUserInrBalance = async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId) {
        res.status(400).json({
            success: false,
            message: "userId not found"
        })
        return
    }

    try {
        if (!userExists(userId)) {
            res.status(400).json({
                success: false,
                message: "UserId does not exists"
            });
            return
        }

        const userInr = INR_BALANCES[userId];

        if (!userInr) {
            res.status(400).json({
                success: false,
                message: "User Balance does not exists"
            })
            return
        }

        res.status(200).json({
            success: true,
            message: "Balance of user",
            data: userInr
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
        return
    }
}