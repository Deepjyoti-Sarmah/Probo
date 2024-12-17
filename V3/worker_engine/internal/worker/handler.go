package worker

import (
	"context"
	"fmt"
)

func (s *Service) handleUserRegistration(ctx context.Context, payload map[string]interface{}) error {
	username, _ := payload["username"].(string)
	email, _ := payload["email"].(string)
	password, _ := payload["password"].(string)
	role, _ := payload["role"].(string)

	response := map[string]interface{}{
		"success": true,
		"message": "User registered successfully",
		"userId":  "random",
		username:  username,
		email:     email,
		password:  password,
		role:      role,
	}

	fmt.Println(response)

	return nil
}

func (s *Service) handleUserLogin(ctx context.Context, payload map[string]interface{}) error {
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

func (s *Service) handleUserLogout(ctx context.Context, payload map[string]interface{}) error {
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

func (s *Service) handleCreateCategory(ctx context.Context, payload map[string]interface{}) error {
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

func (s *Service) handleCreateMarket(ctx context.Context, payload map[string]interface{}) error {
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

func (s *Service) handleCreateMint(ctx context.Context, payload map[string]interface{}) error {
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

func (s *Service) handleOnrampAmount(ctx context.Context, payload map[string]interface{}) error {
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

func (s *Service) handleBuyStocks(ctx context.Context, payload map[string]interface{}) error {
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

func (s *Service) handleSellStocks(ctx context.Context, payload map[string]interface{}) error {
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

func (s *Service) handleCancelBuyOrder(ctx context.Context, payload map[string]interface{}) error {
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

func (s *Service) handleCancelSellOrder(ctx context.Context, payload map[string]interface{}) error {
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
