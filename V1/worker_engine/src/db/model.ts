interface UserBalance {
  balance: number;
  locked: number;
}

export interface InrBalance {
  [userId: string]: UserBalance;
}

interface IndividualEntry {
  quantity: number;
  type: "sell" | "reverted";
}

interface Order {
  [userId: string]: IndividualEntry;
}

interface PriceLeve {
  total: number;
  orders: Order;
}

export interface PriceOutcome {
  [price: string]: PriceLeve
}

interface Contract {
  "yes": PriceOutcome;
  "no": PriceOutcome;
}

interface OrderBook {
  [contract: string]: Contract
}

interface StockPosition {
  quantity: number;
  locked: number;
}

interface StockType {
  [key: string]: StockPosition;
  "yes": StockPosition;
  "no": StockPosition;
}

interface UserStockBalance {
  [StockSymbol: string]: StockType;
}

export interface StockBalance {
  [userId: string]: UserStockBalance;
}

export let INR_BALANCES: InrBalance = {};

export let ORDERBOOKS: OrderBook = {};

export let STOCK_BALANCES: StockBalance = {};



export const resetStockBalance = () => {
  STOCK_BALANCES = {};
}

export const resetInrBalance = () => {
  INR_BALANCES = {};
}

export const resetOrderBook = () => {
  ORDERBOOKS = {}
}
