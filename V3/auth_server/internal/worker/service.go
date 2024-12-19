package worker

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"

	"github.com/Deepjyoti-Sarmah/auth-engine/internal/redis"
)

type TaskType string

const (
	TaskRegister TaskType = "register"
	TaskLogin    TaskType = "login"
	TaskLogout   TaskType = "logout"
)

type TaskPayload struct {
	Type    TaskType               `json:"type"`
	Payload map[string]interface{} `json:"payload"`
}

type Service struct {
	redisClient *redis.Client
	taskQueue   string
	db          *sql.DB
}

func NewService(client *redis.Client, taskQueue string, db *sql.DB) *Service {
	return &Service{
		redisClient: client,
		taskQueue:   taskQueue,
		db:          db,
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
				log.Printf("Task processing error: %v", err)
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
	case TaskRegister:
		return s.handleUserRegistration(ctx, task.Payload)
	case TaskLogin:
		return s.handleUserLogin(ctx, task.Payload)
	case TaskLogout:
		return s.handleUserLogout(ctx, task.Payload)

	default:
		return fmt.Errorf("unknown task type: %s", task.Type)
	}
}

func (s *Service) publishResponse(ctx context.Context, channel string, response interface{}) error {
	responseJSON, err := json.Marshal(response)
	if err != nil {
		return fmt.Errorf("falied to marshal response: %w", err)
	}

	return s.redisClient.Publish(ctx, channel, string(responseJSON)).Err()
}
