import { Response } from "express";
import { subscriber } from "../redis";

export function handlePubSubWithTimeout(channel: string, timeouts: number) {
    return new Promise((resolve, reject) => {
        const timeOut = setTimeout(() => {
            subscriber.unsubscribe(channel);
            reject(new Error("Response timed out"));
        }, timeouts);

        subscriber.subscriber(channel, (message: any) => {
            clearTimeout(timeOut);
            subscriber.unsubscribe(channel);
            resolve(message);
        });
    });
}

export function sendResponse(res: Response, payload: any) {
    try {
        const { error, ...data } = JSON.parse(payload);

        if (error) {
            res.status(400).json(data)
        } else {
            res.status(200).json(data)
        }
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Invalid response from the server"
        })
    }
}

export const getJsonStringifyData = (data: any) => {
    const stringifiedData = JSON.stringify(data);
    return stringifiedData;
}