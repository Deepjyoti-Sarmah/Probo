package main

import (
	"fmt"
	"worker_engine/src/redis"
	"worker_engine/src/utils"
)

func main() {
	startEngine()
}

func startEngine() {
	redis.RedisConnect()

	for {
		message, err := redis.PopFromQueue("taskQueue")
		if err != nil {
			fmt.Println("Error while popping from queue:", err)
		}

		info := utils.RedisConnect(message)
		m, err := utils.StringifyPubSubMessage(info)
		if err != nil {
			fmt.Println("Error while stringifying: ", err)
		}
		pubsub.Publish(redis.Rdb, "pubsub", m)
	}
}
