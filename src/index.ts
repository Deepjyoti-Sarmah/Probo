import express from "express";
import { router } from "./router/api/v1";

const app = express();
app.use(express.json());

const port = process.env.PORT || 8080;

export const INR_BALANCES: any = {};
export const ORDERBOOK: any = {};
export const STOCK_BALANCE: any = {}



// interface Balance {
//   balance: number;
//   locked: number;
// }

// const INR_BALANCES: { [key: string]: Balance } = {
//   "user1": {
//     balance: 10,
//     locked: 0
//   },
//   "user2": {
//     balance: 20,
//     locked: 10
//   }
// };

// interface Order {
//   total: number;
//   orders: {
//     [userId: string]: number
//   };
// }

// interface OrderEntry {
//   [price: string]: Order;
// }

// interface SymbolOrders {
//   yes?: OrderEntry,
//   no?: OrderEntry;
// }

// interface Orderbook {
//   [symbol: string]: SymbolOrders;
// }

// const ORDERBOOK: Orderbook = {
//   "BTC_USDT_10_Oct_2024_9_30": {
//     "yes": {
//       "9.5": {
//         "total": 12,
//         "orders": {
//           "user1": 2,
//           "user2": 10
//         }
//       },
//       "8.5": {
//         "total": 12,
//         "orders": {
//           "user1": 3,
//           "user2": 3,
//           "user3": 6
//         }
//       },
//     },
//     "no": {

//     }
//   }
// }

// interface StockEntry {
//   quantity: number;
//   locked: number;
// }

// interface SymbolData {
//   yes?: StockEntry;
//   no?: StockEntry;
// }

// interface stockBalance {
//   [userId: string]: {
//     [symbol: string]: SymbolData;
//   };
// }

// const STOCK_BALANCE: stockBalance = {
//   "user1": {
//     "BTC_USDT_10_Oct_2024_9_30": {
//       "yes": {
//         "quantity": 1,
//         "locked": 0
//       }
//     }
//   },
//   "user2": {
//     "BTC_USDT_10_Oct_2024_9_30": {
//       "no": {
//         "quantity": 3,
//         "locked": 4
//       }
//     }
//   }
// }

// app.post("/user/create/:userId", (req: any, res: any) => {
//   const { userId } = req.params;

//   if (INR_BALANCES[userId]) {
//     return res.status(400).json({
//       error: "User already exists"
//     });
//   }

//   INR_BALANCES[userId] = { balance: 0, locked: 0 };

//   res.status(201).json({
//     message: `User ${userId} created successfully`,
//     userId: INR_BALANCES[userId]
//   });
// });

// app.post("/symbol/create/:stockSymbol", (req: any, res: any) => {
//   const { stockSymbol } = req.params;

//   for (const userId in STOCK_BALANCE) {
//     if (STOCK_BALANCE[userId][stockSymbol]) {
//       return res.status(400).json({
//         error: `Symbol ${stockSymbol} already exists for user ${userId}`
//       });
//     }

//     STOCK_BALANCE[userId][stockSymbol] = {
//       yes: { quantity: 0, locked: 0 },
//       no: { quantity: 0, locked: 0 }
//     };
//   }

//   res.status(201).json({
//     message: `Symbol ${stockSymbol} created successfully for all user`,
//     symbol: stockSymbol,
//     stockBalance: STOCK_BALANCE
//   });
// });

// app.get("/orderbook", (req, res) => {
//   res.status(200).json({
//     orderBook: ORDERBOOK
//   });
// });

// app.get("/balance/inr", (req, res) => {
//   res.status(200).json({
//     inrBalance: INR_BALANCES
//   });
// });

// app.get("/balance/stock", (req, res) => {
//   res.status(200).json({
//     STOCK_BALANCE: STOCK_BALANCE
//   });
// });

// app.post("/reset", (req, res) => {
//   Object.keys(INR_BALANCES).forEach(key => delete INR_BALANCES[key]);
//   Object.keys(STOCK_BALANCE).forEach(key => delete STOCK_BALANCE[key]);
//   Object.keys(ORDERBOOK).forEach(key => delete ORDERBOOK[key]);

//   res.status(200).json({
//     message: "All in-memory data structures have been reset."
//   });
// });

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
