package services

import (
	"errors"
	"worker_engine/src/model"

	"golang.org/x/crypto/bcrypt"
)

func HandleSignUp(request model.MessageFromQueue) (model.MessageToPubSub, error) {
	payload, ok := request.Payload.(map[string]interface{})
	if !ok {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "signup",
			Payload:    map[string]string{"error": "Invalid payload"},
		}, errors.New("Invalid payload")
	}

	username, _ := payload["username"].(string)
	email, _ := payload["email"].(string)
	password, _ := payload["password"].(string)
	role, _ := payload["role"].(string)

	//validate inputs
	if username == "" || email == "" || password == "" || role == "" {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "signup",
			Payload:    map[string]string{"error": "Missing required fields"},
		}, errors.New("missing required fields")
	}

	//hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return model.MessageToPubSub{
			StatusCode: 500,
			Type:       "signup",
			Payload:    map[string]string{"error": "password hashing failed"},
		}, err
	}

	newUser := &model.User{
		Username: username,
		Email:    email,
		Password: string(hashedPassword),
		Role:     role,
	}

	err = database.CreateUser(newUser)
	if err != nil {
		return model.MessageToPubSub{
			StatusCode: 500,
			Type:       "singup",
			Payload:    map[string]string{"error": "User creation failed"},
		}, err
	}

	return model.MessageToPubSub{
		StatusCode: 200,
		Type:       "signup",
		Payload: map[string]interface{}{
			"userId":   newUser.ID,
			"username": newUser.Username,
			"email":    newUser.Email,
			"role":     newUser.Role,
		},
	}, nil
}

func HandleLogin(request model.MessageFromQueue) (model.MessageToPubSub, error) {
	return model.MessageToPubSub{
		StatusCode: 200,
		Type:       "login",
		Payload:    nil,
	}, nil
}
