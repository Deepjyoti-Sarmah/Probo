package worker

import (
	"context"
	"fmt"
)

func (s *Service) handleCreateCategory(ctx context.Context, payload map[string]interface{}) error {
	title, _ := payload["title"].(string)
	description, _ := payload["description"].(string)
	icon, _ := payload["icon"].(string)
	userId, _ := payload["userId"].(string)

	response := map[string]interface{}{
		"success":   true,
		"message":   "creating category",
		"userId":    userId,
		title:       title,
		description: description,
		icon:        icon,
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
