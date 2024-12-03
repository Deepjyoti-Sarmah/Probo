package model

import (
	"time"
)

type Order struct {
	ID           string      `json:"id"`
	UserID       string      `json:"userId"`
	MarketSymbol string      `json:"MarketSymbol"`
	Side         Side        `json:"side"`
	Quantity     int32       `json:"quantity"`
	RemainingQty int32       `json:"remainingQty"`
	Price        float32     `json:"price"`
	Status       OrderStatus `json:"status"`
	TimeStamp    time.Time   `json:"timestamp"`
}

type OrderStatus string

const (
	PENDING          OrderStatus = "PANDING"
	FILLED           OrderStatus = "FILLED"
	PARTIALLY_FILLED OrderStatus = "PARTIALLY_FILLED"
	CANCELLED        OrderStatus = "CANCELLED"
)

type OrderBook map[float64]OrderbookEntry

type OrderbookEntry struct {
	Quantity int32 `json:"quantity"`
}

type User struct {
	ID       string       `json:"id"`
	Username string       `json:"username"`
	Email    string       `json:"email"`
	Password string       `json:"password"`
	Role     string       `json:"role"`
	Balance  BalanceStore `json:"balance"`
}

type Market struct {
	ID             string       `json:"id"`
	Symbol         string       `json:"symbol"`
	Description    string       `json:"description"`
	EndTime        time.Time    `json:"endTime"`
	SourceOfTruth  string       `json:"sourceOfTruth"`
	CategoryID     string       `json:"categoryId"`
	CategoryTitle  string       `json:"categoryTitle"`
	Status         MarketStatus `json:"status"`
	LastYesPrice   float64      `json:"lastYesPrice"`
	LastNoPrice    float64      `json:"lastNoPrice"`
	TotalVolume    float64      `json:"totalVolume"`
	ResolveOutcome *Side        `json:"resolveOutcome,omitenpty"`
	TimeStamp      time.Time    `json:"timestamp"`
	CreatedBy      string       `json:"createdBy"`
}

type Category struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Icon        string `json:"icon"`
	Description string `json:"description"`
}

type Position struct {
	Quantity int32 `json:"quantity"`
	Locked   int32 `json:"locked"`
}

type StockBalance map[string]StockType

type StockType struct {
	Yes *Position `json:"YES, omitenpty"`
	No  *Position `json:"NO, omitenpty"`
}

type BalanceStore struct {
	Stocks StockBalance `json:"stocks"`
	INR    INRBalance   `json:"INR"`
}

type INRBalance struct {
	Available int32 `json:"available"`
	Locked    int32 `json:"locked"`
}

type Side string

const (
	YES Side = "YES"
	NO  Side = "NO"
)

type MarketStatus string

const (
	ACTIVE   MarketStatus = "ACTIVE"
	CLOSED   MarketStatus = "CLOSED"
	RESOLVED MarketStatus = "RESOLVED"
)

type Trade struct {
	Seller       string    `json:"seller"`
	Buyer        string    `json:"buyer"`
	Quantity     int32     `json:"quantity"`
	Price        float64   `json:"price"`
	Timestamp    time.Time `json:"timestamp"`
	MarketSymbol string    `json:"marketSymbol"`
}

type MessageFromQueue struct {
	Type    string      `json:"type"`
	Payload interface{} `json:"payload"`
}

type MessageToPubSub struct {
	StatusCode int32       `json:"statusCode"`
	Type       string      `json:"type"`
	Payload    interface{} `json:"payload"`
}
