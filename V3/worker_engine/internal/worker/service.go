package worker

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"github.com/Deepjyoti-Sarmah/worker-engine/internal/redis"
)

type TaskType string

const (
	TaskRegistet       TaskType = "register"
	TaskLogin          TaskType = "login"
	TaskCreateCategory TaskType = "logout"
	TaskCreateMarket   TaskType = "create_market"
	TaskCreateMint     TaskType = "create_mint"
	TaskOnrampAmount   TaskType = "create_amount"
	TaskBuyStocks      TaskType = "buy_stocks"
	TaskSellStocks     TaskType = "sell_stocks"
	TaskCancelBuy      TaskType = "cancel_buy"
	TaskCancelSell     TaskType = "cancel_sell"
)

type TaskPayload struct {
	Type    TaskType               `json:"type"`
	Payload map[string]interface{} `json:"payload"`
}

type Service struct {
	redisClient *redis.Client
	taskQueue   string
}

func NewService(client *redis.Client, taskQueue string) *Service {
	return &Service{
		redisClient: client,
		taskQueue:   taskQueue,
	}
}

func (s *Service) ProcessTasks(ctx context.Context) {
	log.Println("Starting task processing...")

	for {
		select {
		case <-ctx.Done():
			return

		default:
			result, err := s.redisClient.BRPop(ctx, 0, s.taskQueue).Result()
			if err != nil {
				log.Printf("Error popping task: %v", err)
				continue
			}

			taskData := result[1]

			if err := s.processTask(ctx, taskData); err != nil {
				log.Printf("Task processing error:%v", err)
			}
		}
	}
}

func (s *Service) processTask(ctx context.Context, taskData string) error {
	var task TaskPayload
	if err := json.Unmarshal([]byte(taskData), &task); err != nil {
		return fmt.Errorf("failed to Unmarshal task: %w", err)
	}

	log.Printf("Processing task: %s", task.Type)

	switch task.Type {
	case TaskRegistet:
		return s.handleUserRegistration(ctx, task.Payload)
	}

	return nil
}

func (s *Service) publishResponse(ctx context.Context, channel string, response interface{}) error {
	responseJSON, err := json.Marshal(response)
	if err != nil {
		return fmt.Errorf("failed to marshal response: %w", err)
	}

	return s.redisClient.Publish(ctx, channel, string(responseJSON)).Err()
}
