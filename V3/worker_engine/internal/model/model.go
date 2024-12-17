package model

type User struct {
	Username  string
	Email     string
	Password  string
	Role      string
	Balance   float64
	Stocks    map[string]int
	Available int
	Locked    int
}

type Order struct {
	UserId       string
	MarkerSymbol string
	Side         bool
	Quantity     int
	RemainingQty int
	Price        float64
	Status       string
	Timestamp    string
}

type Market struct {
	Symbol         string
	Description    string
	CategoryTitle  string
	EndTime        string
	SourceOfTrust  string
	LastYesPrice   float64
	LastNoPrice    float64
	TotalVolume    float64
	ResolveOutcome float64
	Timestamp      string
	CreatedBy      string
}

type Trade struct {
	Seller       string
	Buyer        string
	Quantity     int
	Price        float64
	Timestamp    string
	MarketSymbol string
}
