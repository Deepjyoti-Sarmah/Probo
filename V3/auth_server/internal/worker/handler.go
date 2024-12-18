package worker

import (
	"context"
	"fmt"
	"log"

	"github.com/Deepjyoti-Sarmah/auth-engine/internal/auth"
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

	token, err := auth.GenerateToken(username, role)
	if err != nil {
		return fmt.Errorf("failed to generate token: %w", err)
	}

	response := map[string]interface{}{
		"data": map[string]interface{}{
			"username": username,
			"email":    email,
			"role":     role,
			"token":    token,
			//TODO: remove this
			"password": hashedPassword,
		},
	}

	if err := s.publishResponse(ctx, "responseAuthQueue", response); err != nil {
		return fmt.Errorf("failed to publish registration response: %w", err)
	}

	log.Printf("Registered user: %s", username)
	return nil
}

func (s *Service) handleUserLogin(ctx context.Context, payload map[string]interface{}) error {

	return nil
}

func (s *Service) handleUserLogout(ctx context.Context, payload map[string]interface{}) error {

	return nil
}
