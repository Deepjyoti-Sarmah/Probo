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


app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
