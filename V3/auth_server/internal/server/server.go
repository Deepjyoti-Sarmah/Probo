package server

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/Deepjyoti-Sarmah/auth-engine/internal/database"
	"github.com/Deepjyoti-Sarmah/auth-engine/internal/redis"
	"github.com/Deepjyoti-Sarmah/auth-engine/internal/worker"
	_ "github.com/joho/godotenv/autoload"
)

type Server struct {
	port        int
	redisClient *redis.Client
	workerSvc   *worker.Service
	db          *sql.DB
}

func NewServer() *http.Server {

	redisClient, err := redis.NewClient()
	if err != nil {
		log.Fatalf("Failed to connect to Redis: %v", err)
	}

	workerSvc := worker.NewService(redisClient, "authQueue")

	db, err := database.New(
		os.Getenv("DATABASE_URL"),
		10,
		5,
		"5m",
	)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	port, _ := strconv.Atoi(os.Getenv("PORT"))
	NewServer := &Server{
		port:        port,
		redisClient: redisClient,
		workerSvc:   workerSvc,
		db:          db,
	}

	go func() {
		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()
		workerSvc.ProcessTasks(ctx)
	}()

	// Declare Server config
	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", NewServer.port),
		Handler:      NewServer.RegisterRoutes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	return server
}

func (s *Server) RedisClient() *redis.Client {
	return s.redisClient
}

func (s *Server) DB() *sql.DB {
	return s.db
}
