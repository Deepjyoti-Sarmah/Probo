package controllers

import (
	"fmt"
	"worker_engine/src/model"
	"worker_engine/src/services"
)

func ProcessRequest(request model.MessageFromQueue) (model.MessageToPubSub, error) {
	switch request.Type {
	case "signup":
		return services.HandleSignUp(request)

	case "login":
		return services.HandleLogin(request)

	case "logout":
		return services.HandleLogout(request)

	// case "get_all_markets":
	// 	return services.HandleAllMarket(request)
	//
	// case "get_all_categories":
	// 	return services.HandleGetAllCategories(request)

	// case "getMarket":
	// 	return services.HandleGetMarket(request)

	case "createMarket":
		return services.HandleCreateMarket(request)

	// case "createCategory":
	// 	return services.HandleGetCategories(request)

	case "onrampInr":
		return services.HandleOnrampInr(request)

	case "buy":
		return services.HandleBuyOrder(request)

	case "sell":
		return services.HandleSellOrder(request)

	case "getOrderbook":
		return services.HandleGetOrderbook(request)

	case "mint":
		return services.HandleMint(request)

	// case "get_me":
	// 	return services.HandleGetMe(request)
	//
	case "cancelBuyOrder":
		return services.HandleCancelBuyOrder(request)

	case "cancelSellOrder":
		return services.HandleCancelSellOrder(request)

	// case "get_user_market_orders":
	// 	return services.HandleGetUserMarketOrder(request)
	//
	case "getMarketTrades":
		return services.HandleGetMarketTrades(request)

	default:
		return model.MessageToPubSub{}, fmt.Errorf("unsupported request type: %s", request.Type)
	}
	// return model.MessageToPubSub{}, nil
}
