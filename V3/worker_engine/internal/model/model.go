package model

import "time"

type Side string

const (
	YES Side = "YES"
	NO  Side = "NO"
)

type OrderStatus string

const (
	PENDING          OrderStatus = "PENDING"
	FILLED           OrderStatus = "FILLED"
	PARTIALLY_FILLED OrderStatus = "PARTIALLY_FILLED"
	CANCELLED        OrderStatus = "CANCELLED"
)

type MarketStatus string

const (
	ACTIVE   MarketStatus = "ACTIVE"
	CLOSED   MarketStatus = "CLOSED"
	RESOLVED MarketStatus = "RESOLVED"
)

type Position struct {
	Quantity int64 `json:"quantity"`
	Locked   int64 `json:"locked"`
}

type StockBalance map[string]map[Side]*Position

type BalanceStore struct {
	Stocks StockBalance `json:"stocks"`
	INR    struct {
		Available int64 `json:"available"`
		Locked    int64 `json:"locked"`
	} `json:"INR"`
}

type Order struct {
	ID           string      `json:"id"`
	UserID       string      `json:"userId"`
	MarketSymbol string      `json:"marketStatus"`
	Side         Side        `json:"side"`
	Quantity     int64       `json:"quantity"`
	RemainingQty int64       `json:"remainingQty"`
	Price        float64     `json:"price"`
	Status       OrderStatus `json:"status"`
	Timestamp    time.Time   `json:"timestamp"`
}

type Market struct {
	ID              string       `json:"id"`
	Symbol          string       `json:"symbol"`
	Description     string       `json:"description"`
	EndTime         time.Time    `json:"endTime"`
	SourceOfTruth   string       `json:"sourceOfTruth"`
	CategoryID      string       `json:"categoryId"`
	CategoryTitle   string       `json:"categoryTitle"`
	Status          MarketStatus `json:"status"`
	LastYesPrice    float64      `json:"lastYesPrice"`
	LastNoPrice     float64      `json:"lastNoPrice"`
	TotalVolume     float64      `json:"totalVolume"`
	ResolvedOutcome *Side        `json:"resolvedOutcome,omitempty"`
	Timestamp       time.Time    `json:"timestamp"`
	CreatedBy       string       `json:"createdBy"`
}

type Category struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Icon        string `json:"icon"`
	Description string `json:"description"`
}

type Trade struct {
	Seller       string    `json:"seller"`
	Buyer        string    `json:"buyer"`
	Quantity     string    `json:"quantity"`
	Price        float64   `json:"price"`
	Timestamp    time.Time `json:"timestamp"`
	MarketSymbol string    `json:"marketSymbol"`
}

type Orderbook map[float64]struct {
	Quantity int64 `json:"quantity"`
}
