import { Request, Response } from "express";
import { INR_BALANCES } from "..";
import { userExists } from "../types";

export const createUserEntry = async (req: Request, res: Response) => {

    const { userId } = req.params;

    if (!userId) {
        res.status(400).json({
            message: "userId not defined"
        })
        return
    }

    try {
        if (userExists(userId)) {
            res.status(400).json({
                success: false,
                message: "User already exists"
            });
            return;
        }

        const user = INR_BALANCES[userId] = {
            balance: 0,
            locked: 0
        };

        res.status(200).json({
            success: true,
            message: "User created successfully",
            data: user
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
        return
    }
}