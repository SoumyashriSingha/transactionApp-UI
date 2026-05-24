export const getLoginUser = () => ({
  user_id: "U001",
  name: "Rahul Sharma",
  bank: "HDFC Bank • **** 1234",
  balance: 24500,
});

export const initialTransactions = [
  { transaction_id: "T1001", merchant_name: "Zomato", amount: 1311.15, currency: "INR", txn_ts: "10:30 AM", channel: "Online", method: "Card", card_id: "**** 1234", user_id: "U001", mcc: "5812" },
  { transaction_id: "T1002", merchant_name: "Amazon", amount: 2999, currency: "INR", txn_ts: "09:15 AM", channel: "Online", method: "UPI", card_id: "N/A", user_id: "U001", mcc: "5310" },
  { transaction_id: "T1003", merchant_name: "Electricity Bill", amount: 1200, currency: "INR", txn_ts: "06:45 PM", channel: "App", method: "AutoPay", card_id: "N/A", user_id: "U001", mcc: "4900" },
  { transaction_id: "T1004", merchant_name: "Swiggy", amount: 450, currency: "INR", txn_ts: "01:30 PM", channel: "Online", method: "Card", card_id: "**** 1234", user_id: "U001", mcc: "5812" },
  { transaction_id: "T1005", merchant_name: "Netflix", amount: 499, currency: "INR", txn_ts: "11:00 PM", channel: "Online", method: "Card", card_id: "**** 1234", user_id: "U001", mcc: "5815" },
];
