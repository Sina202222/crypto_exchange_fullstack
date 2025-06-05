export interface User {
  id: number;
  username: string;
  email: string;
  role: string; // اضافه کردن فیلد role که در AuthContext نیاز است
}

export interface Currency {
  id: number;
  symbol: string;
  name: string;
  current_price: number;
  last_updated: string;
}

export interface Wallet {
  id: number;
  user: User;
  currency: Currency;
  balance: number;
}

export interface Transaction {
  id: number;
  user: User;
  currency: Currency;
  amount: number;
  price_at_transaction: number;
  transaction_type: 'BUY' | 'SELL';
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  created_at: string;
  updated_at: string;
}