package services

import (
	"errors"
	"runtime/trace"
	"time"
	"worker_engine/src/model"

	"github.com/docker/distribution/uuid"
	"github.com/golang-migrate/migrate/database"
	"go.mongodb.org/mongo-driver/mongo/integration"
)

//	func HandleGetMarket(request model.MessageFromQueue) (model.MessageToPubSub, error) {
//		return model.MessageToPubSub{
//			StatusCode: 200,
//			Type:       "getMarket",
//			Payload:    nil,
//		}, nil
//	}

//	func HandleGetCategories(request model.MessageFromQueue) (model.MessageToPubSub, error) {
//		return model.MessageToPubSub{
//			StatusCode: 200,
//			Type:       "getCategories",
//			Payload:    nil,
//		}, nil
//	}

func HandleCreateMarket(request model.MessageFromQueue) (model.MessageToPubSub, error) {

	payload, ok := request.Payload.(map[string]interface{})
	if !ok {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "createMarket",
			Payload:    map[string]string{"error": "Invalid payload"},
		}, errors.New("Invalid payload")
	}

	symbol, ok := payload["symbol"].(string)
	if !ok || symbol == "" {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "createMarket",
			Payload:    map[string]string{"error": "Missing market symbol"},
		}, errors.New("missing market symbol")
	}

	description, _ := payload["description"].(string)
	categoryTitle, _ := payload["categoryTitle"].(string)
	sourceOfTruth, _ := payload["sourceOfTruth"].(string)

	endTimeStr, ok := payload["endTime"].(string)
	if !ok {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "createMarket",
			Payload:    map[string]string{"error": "Invalid end time"},
		}, errors.New("Invalid end time")
	}

	endTime, err := time.Parse(time.RFC3339, endTimeStr)
	if err != nil {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "createMarket",
			Payload:    map[string]string{"error": "Invalid end time format"},
		}, errors.New("Invalid end time format")
	}

	//create market in database
	market := &model.Market{
		Symbol:        symbol,
		Description:   description,
		EndTime:       endTime,
		SourceOfTruth: sourceOfTruth,
		CategoryTitle: categoryTitle,
		Status:        model.ACTIVE,
		TimeStamp:     time.Now(),
		LastYesPrice:  0,
		LastNoPrice:   0,
		TotalVolume:   0,
	}

	createdMarket, err := database.createMarket(market)
	if err != nil {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "createMarket",
			Payload:    map[string]string{"error": "Failed to create Market"},
		}, errors.New("failed to create market")
	}

	return model.MessageToPubSub{
		StatusCode: 200,
		Type:       "createMarket",
		Payload: map[string]interface{}{
			"success": true,
			"market":  createdMarket,
		},
	}, nil
}

func HandleCreateCategory(request model.MessageFromQueue) (model.MessageToPubSub, error) {
	payload, ok := request.Payload.(map[string]interface{})
	if !ok {
		return model.MessageToPubSub{
			StatusCode: 200,
			Type:       "createCategory",
			Payload:    map[string]string{"error": "Invalid payload"},
		}, errors.New("invalid payload")
	}

	title, ok := payload["title"].(string)
	if !ok || title == "" {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "createCategory",
			Payload:    map[string]string{"error": "Missing caategory title"},
		}, errors.New("missing category title")
	}

	icon, _ := payload["icon"].(string)
	description, _ := payload["description"].(string)

	category := &model.Category{
		ID:          generateUniqueID(),
		Title:       title,
		Icon:        icon,
		Description: description,
	}

	createCategory, err := database.CreateCategory(category)
	if err != nil {
		return model.MessageToPubSub{
			StatusCode: 500,
			Type:       "createCategory",
			Payload:    map[string]string{"error": "Failed to create category"},
		}, errors.New("failed to create category")
	}

	return model.MessageToPubSub{
		StatusCode: 200,
		Type:       "createCategory",
		Payload: map[string]interface{}{
			"success":  true,
			"category": createCategory,
		},
	}, nil
}

func generateUniqueID() string {
	return uuid.New().String()
}

func HandleOnrampInr(request model.MessageFromQueue) (model.MessageToPubSub, error) {
	payload, ok := request.Payload.(map[string]interface{})
	if !ok {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "onRampInr",
			Payload:    map[string]string{"error": "Invalid payload"},
		}, errors.New("invalid payload")
	}

	amountFloat, ok := payload["amount"].(float64)
	if !ok || amountFloat <= 0 {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "onRampInr",
			Payload:    map[string]string{"error": "Invalid amount"},
		}, errors.New("invalid amount")
	}

	amount := int32(amountFloat)

	userId, ok := payload["userId"].(string)
	if !ok || userId == "" {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "onRampInr",
			Payload:    map[string]string{"error": "Missing user ID"},
		}, errors.New("missing user ID")
	}

	onRampResult, err := database.onRampInr(userId, amount)
	if err != nil {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "onRampInr",
			Payload:    map[string]string{"error": "Failed to on-ramp INR"},
		}, errors.New("Failed to on-ramp INR")
	}

	return model.MessageToPubSub{
		StatusCode: 200,
		Type:       "onRampInr",
		Payload: map[string]interface{}{
			"success":      true,
			"userId":       userId,
			"amount":       amount,
			"onRampResult": onRampResult,
		},
	}, nil
}

func HandleBuyOrder(request model.MessageFromQueue) (model.MessageToPubSub, error) {

	payload, ok := request.Payload.(map[string]interface{})
	if !ok {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "buy",
			Payload:    map[string]string{"error": "Invalid payload format"},
		}, errors.New("Invalid payload format")
	}

	symbol, ok := payload["symbol"].(string)
	if !ok {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "buy",
			Payload:    map[string]string{"error": "Missing or invalid symbol"},
		}, errors.New("missing or invalid symbol")
	}

	quantity, ok := payload["quantity"].(float64)
	if !ok {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "buy",
			Payload:    map[string]string{"error": "Missing or invalid quantity"},
		}, errors.New("missing or invalid quantity")
	}

	price, ok := payload["price"].(float64)
	if !ok {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "buy",
			Payload:    map[string]string{"error": "Missing or invalid price"},
		}, errors.New("missing or invalid price")
	}

	stockType, ok := payload["stockType"].(string)
	if !ok {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "buy",
			Payload:    map[string]string{"error": "Missing or invalid stock type"},
		}, errors.New("missing or invalid stock type")
	}

	side := model.Side(stockType)
	if side != model.NO && side != model.YES {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "buy",
			Payload:    map[string]string{"error": "Missing or invalid stock type"},
		}, errors.New("missing or invalid stock type")
	}

	buyOrder := model.Order{
		ID:           uuid.New().String(),
		MarketSymbol: symbol,
		Side:         side,
		Quantity:     int32(quantity),
		RemainingQty: int32(quantity),
		Price:        float32(price),
		Status:       model.PENDING,
		TimeStamp:    time.Now(),
	}

	return model.MessageToPubSub{
		StatusCode: 200,
		Type:       "buyOrder",
		Payload:    nil,
	}, nil
}

func HandleSellOrder(request model.MessageFromQueue) (model.MessageToPubSub, error) {
	return model.MessageToPubSub{
		StatusCode: 200,
		Type:       "sellOrder",
		Payload:    nil,
	}, nil
}

func HandleGetOrderbook(request model.MessageFromQueue) (model.MessageToPubSub, error) {
	return model.MessageToPubSub{
		StatusCode: 200,
		Type:       "getOrderbook",
		Payload:    nil,
	}, nil
}

func HandleMint(request model.MessageFromQueue) (model.MessageToPubSub, error) {
	payload, ok := request.Payload.(map[string]interface{})
	if !ok {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "mint",
			Payload:    map[string]string{"error": "Invalid payload"},
		}, errors.New("invalid payload")
	}

	symbol, ok := payload["symbol"].(string)
	if !ok || symbol == "" {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "mint",
			Payload:    map[string]string{"error": "Missing market symbol"},
		}, errors.New("missing market symbol")
	}

	quantityFloat, ok := payload["quantity"].(float64)
	if !ok || quantityFloat <= 0 {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "mint",
			Payload:    map[string]string{"error": "Invalid quantity"},
		}, errors.New("invalid quantity")
	}

	quantity := int32(quantityFloat)

	price, ok := payload["price"].(float64)
	if !ok || price < 0 {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "mint",
			Payload:    map[string]string{"error": "Invalid price"},
		}, errors.New("invalid price")
	}

	mintResult, err := database.MintMarketShares(symbol, quantity, float32(price))
	if err != nil {
		return model.MessageToPubSub{
			StatusCode: 400,
			Type:       "mint",
			Payload:    map[string]string{"error": "Failed to mint shares"},
		}, errors.New("Failed to mint shares")
	}

	return model.MessageToPubSub{
		StatusCode: 200,
		Type:       "mint",
		Payload: map[string]interface{}{
			"success":    true,
			"symbol":     symbol,
			"quantity":   quantity,
			"price":      price,
			"mintResult": mintResult,
		},
	}, nil
}

func HandleGetUser(request model.MessageFromQueue) (model.MessageToPubSub, error) {
	return model.MessageToPubSub{
		StatusCode: 200,
		Type:       "getUser",
		Payload:    nil,
	}, nil
}

func HandleCancelBuyOrder(request model.MessageFromQueue) (model.MessageToPubSub, error) {
	return model.MessageToPubSub{
		StatusCode: 200,
		Type:       "cancelBuyOrder",
		Payload:    nil,
	}, nil
}

func HandleCancelSellOrder(request model.MessageFromQueue) (model.MessageToPubSub, error) {
	return model.MessageToPubSub{
		StatusCode: 200,
		Type:       "cancelSellOrder",
		Payload:    nil,
	}, nil
}

func HandleGetUserOrders(request model.MessageFromQueue) (model.MessageToPubSub, error) {
	return model.MessageToPubSub{
		StatusCode: 200,
		Type:       "getUserOrders",
		Payload:    nil,
	}, nil
}

func HandleGetMarketTrades(request model.MessageFromQueue) (model.MessageToPubSub, error) {
	return model.MessageToPubSub{
		StatusCode: 200,
		Type:       "getMarketTrades",
		Payload:    nil,
	}, nil
}
