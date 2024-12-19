package worker

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"time"

	"github.com/Deepjyoti-Sarmah/auth-engine/internal/auth"
	"github.com/Deepjyoti-Sarmah/auth-engine/internal/model"
)

func (s *Service) handleUserRegistration(ctx context.Context, payload map[string]interface{}) error {
	username, _ := payload["username"].(string)
	email, _ := payload["email"].(string)
	password, _ := payload["password"].(string)
	role, _ := payload["role"].(string)

	hashedPassword, err := auth.HashPassword(password)
	if err != nil {
		return fmt.Errorf("failed to hash passord: %w", err)
	}

	_, err = s.db.ExecContext(
		ctx,
		"INSERT INTO users (username, email, password, role) VALUE ($1, $2, $3, $4)",
		username,
		email,
		hashedPassword,
		role,
	)

	if err != nil {
		return fmt.Errorf("failed to save user: %w", err)
	}

	response := map[string]interface{}{
		"data": map[string]interface{}{
			"username": username,
			"email":    email,
			"role":     role,
		},
	}

	if err := s.publishResponse(ctx, "responseAuthQueue", response); err != nil {
		return fmt.Errorf("failed to publish registration response: %w", err)
	}

	log.Printf("Registered user: %s", username)
	return nil
}

func (s *Service) handleUserLogin(ctx context.Context, payload map[string]interface{}) error {
	email, _ := payload["email"].(string)
	password, _ := payload["password"].(string)

	if email == "" || password == "" {
		return fmt.Errorf("missing required fields")
	}

	var user model.User

	err := s.db.QueryRowContext(ctx,
		"SELECT id, username, password, role FROM users WHERE email = $1",
		email,
	).Scan(
		&user.ID,
		&user.Username,
		&user.Password,
		&user.Role,
	)

	if err == sql.ErrNoRows {
		return fmt.Errorf("invalid email or password")
	}

	if err != nil {
		return fmt.Errorf("failed to query user: %w", err)
	}

	if auth.CheckPasswordHash(user.Password, password) {
		return fmt.Errorf("invalid email or password")
	}

	token, err := auth.GenerateToken(user.Username, user.Role)
	if err != nil {
		return fmt.Errorf("failed to generate token: %w", err)
	}

	response := map[string]interface{}{
		"status": "success",
		"data": map[string]interface{}{
			"id":       user.ID,
			"username": user.Username,
			"email":    user.Email,
			"role":     user.Role,
			"token":    token,
		},
	}

	if err := s.publishResponse(ctx, "responseAuthQueue", response); err != nil {
		return fmt.Errorf("failed to publish login response: %w", err)
	}

	log.Printf("User logged in successfully: %s", email)
	return nil
}

func (s *Service) handleUserLogout(ctx context.Context, payload map[string]interface{}) error {

	userId, ok := payload["userId"].(string)
	if !ok || userId == "" {
		return fmt.Errorf("invalid or missing userId")
	}

	var user model.User

	err := s.db.QueryRowContext(ctx,
		"SELECT username, email FROM users WHERE id = $1",
		userId,
	).Scan(&user.Username, &user.Email)
	if err != nil {
		if err == sql.ErrNoRows {
			return fmt.Errorf("user not found")
		}
		return fmt.Errorf("failed to query user: %w", err)
	}

	//Add the token to a blacklist in Redis with an expiration time
	//the expiration time should match your JWT token expiration
	tokenBlacklistKey := fmt.Sprintf("token:blacklist:%s", userId)
	err = s.redisClient.Set(ctx, tokenBlacklistKey, "logged_out", 24*time.Hour).Err()
	if err != nil {
		return fmt.Errorf("failed to blacklist token: %w", err)
	}

	response := map[string]interface{}{
		"status": "success",
		"data": map[string]interface{}{
			"message":  "Successfully logged out",
			"userId":   userId,
			"email":    user.Email,
			"username": user.Username,
		},
	}

	if err := s.publishResponse(ctx, "responseAuthQueue", response); err != nil {
		return fmt.Errorf("failed to publish logout response: %w", err)
	}

	log.Printf("User logged out successfully: %s", userId)
	return nil
}
