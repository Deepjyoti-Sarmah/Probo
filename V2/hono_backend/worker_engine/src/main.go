package main

import (
	"fmt"
	"worker_engine/src/pubsub"
	"worker_engine/src/redis"
	"worker_engine/src/utils"
)

func main() {
	startEngine()
}

func startEngine() {
	err := redis.RedisConnect()
	if err != nil {
		fmt.Println("Failed to connect to Redis:", err)
		return
	}

	for {
		message, err := redis.PopFromQueue("taskQueue")
		if err != nil {
			fmt.Println("Error while popping from queue:", err)
			continue
		}

		info := utils.Redirection(message)

		m, err := utils.StringifyPubSubMessage(info)
		if err != nil {
			fmt.Println("Error while stringifying: ", err)
		}

		err = pubsub.Publish(redis.Rdb, "pubsub", m)
		if err != nil {
			fmt.Println("Error publishing message:", err)
		}
	}
}
