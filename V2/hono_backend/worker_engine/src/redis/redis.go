package redis

import (
	"context"
	"fmt"
	"worker_engine/src/model"
	"worker_engine/src/utils"

	"github.com/redis/go-redis/v9"
)

var ctx = context.Background()
var Rdb *redis.Client

func RedisConnect() error {
	Rdb = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})

	err := Rdb.Set(ctx, "key", "value", 0).Err()
	if err != nil {
		panic(err)
	}
	fmt.Println("Connect to Redis")
	return nil
}

// PushToQueue pushes a message to the queue
func PushToQueue(queue string, message string) error {
	return Rdb.LPush(ctx, queue, message).Err()
}

// PopFromQueue pops a message from the queue
func PopFromQueue(queue string) (model.MessageFromQueue, error) {
	result, err := Rdb.BRPop(ctx, 0, queue).Result()
	if err != nil {
		panic(err)
	}

	MessageFromQueue, err := utils.ParseQueueMessage(result[1])
	if err != nil {
		panic(err)
	}
	return MessageFromQueue, nil
}
