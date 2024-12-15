package worker

import (
	"context"
	"log"
	"test-test/internal/redis"
)

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

	return nil
}
