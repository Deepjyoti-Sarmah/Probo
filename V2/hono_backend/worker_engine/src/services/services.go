package services

import (
	"worker_engine/src/model"
)

func HandleGetMarket(request model.MessageFromQueue) (model.MessageToPubSub, error) {
	return model.MessageToPubSub{
		StatusCode: 200,
		Type:       "getMarket",
		Payload:    nil,
	}, nil
}

func HandleGetCategories(request model.MessageFromQueue) (model.MessageToPubSub, error) {
	return model.MessageToPubSub{
		StatusCode: 200,
		Type:       "getCategories",
		Payload:    nil,
	}, nil
}

func HandleCreateMarket(request model.MessageFromQueue) (model.MessageToPubSub, error) {
	return model.MessageToPubSub{
		StatusCode: 200,
		Type:       "createMarket",
		Payload:    nil,
	}, nil
}

func HandleOnrampInr(request model.MessageFromQueue) (model.MessageToPubSub, error) {
	return model.MessageToPubSub{
		StatusCode: 200,
		Type:       "onRampInr",
		Payload:    nil,
	}, nil
}

func HandleBuyOrder(request model.MessageFromQueue) (model.MessageToPubSub, error) {
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
	return model.MessageToPubSub{
		StatusCode: 200,
		Type:       "mint",
		Payload:    nil,
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
