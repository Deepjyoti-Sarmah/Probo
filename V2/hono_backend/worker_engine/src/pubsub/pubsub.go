package pubsub

import (
	"context"
	"fmt"

	"github.com/redis/go-redis/v9"
)

var ctx = context.Background()

// Publish sends a message to a specified channel
func Publish(client *redis.Client, channel string, message string) error {
	return client.Publish(ctx, channel, message).Err()
}

func Subscriber(client *redis.Client, channel string) {
	pubsub := client.Subscribe(ctx, channel)
	defer pubsub.Close()

	for {
		msg, err := pubsub.ReceiveMessage(ctx)
		if err != nil {
			break
		}
		// handleMessage(msg.Payload)
		fmt.Println("Received message:", msg.Payload)
	}
}
