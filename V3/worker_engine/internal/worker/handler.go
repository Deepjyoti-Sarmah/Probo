package worker

import (
	"context"
	"fmt"
)

func (s *Service) handleUserRegistration(ctx context.Context, payload map[string]interface{}) error {
	username, _ := payload["username"].(string)
	email, _ := payload["email"].(string)
	role, _ := payload["role"].(string)

	response := map[string]interface{}{
		"success": true,
		"message": "User registered successfully",
		"userId":  "random",
		username:  username,
		email:     email,
		role:      role,
	}

	fmt.Println(response)

	return nil
}
