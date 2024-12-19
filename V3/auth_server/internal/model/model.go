package model

type Side string

const (
	YES Side = "YES"
	NO  Side = "NO"
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

type User struct {
	ID       string       `json:"id"`
	Username string       `json:"username"`
	Email    string       `json:"email"`
	Password string       `json:"password"`
	Role     string       `json:"role"`
	Balance  BalanceStore `json:"balance"`
}
