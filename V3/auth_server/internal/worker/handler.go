package worker

import "context"

func (s *Service) handleUserRegistration(ctx context.Context, payload map[string]interface{}) error {
	// username, _ := payload["username"].(string)
	// email, _ := payload["email"].(string)
	// password, _ := payload["password"].(string)
	// role, _ := payload["role"].(string)

	return nil
}

func (s *Service) handleUserLogin(ctx context.Context, payload map[string]interface{}) error {

	return nil
}

func (s *Service) handleUserLogout(ctx context.Context, payload map[string]interface{}) error {

	return nil
}
