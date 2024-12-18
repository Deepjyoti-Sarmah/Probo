package server

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/Deepjyoti-Sarmah/auth-engine/internal/redis"
	_ "github.com/joho/godotenv/autoload"
)

type Server struct {
	port        int
	redisClient *redis.Client
}

func NewServer() *http.Server {

	redisClient, err := redis.NewClient()
	if err != nil {
		log.Fatalf("Failed to connect to Redis: %v", err)
	}

	port, _ := strconv.Atoi(os.Getenv("PORT"))
	NewServer := &Server{
		port:        port,
		redisClient: redisClient,
	}

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
