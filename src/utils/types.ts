import type { ReactNode } from "react";

export const ADMIN = "super";
export const FINANCE = "cfo";
export const DG = "dg";
export const COO = "coo";
export const ASS = "ass";

export type Router = {
  path: string;
  element: ReactNode;
};

export type User = {
  id: string;
  name: string;
  phone: string;
  passcode: string;
  role: string;
  adress: string;
  matricul: string;
  nin: string;
  email: string;
  is_active: number;
};

export type LoginData = {
  email: string;
  passcode: string;
};

export type Role = {
  id: string;
  name: string;
};

export type Session = {
  id: string;
  name: string;
  email: string;
  phone: string;
  token: string;
  start: string;
  end: string;
};

export type Visitor = {
  id: string;
  visitor: string;
  work: string;
  motif: string;
  user: string;
  statut: string;
  hour: string;
};

export type CashMovement = {
  id: string;
  reference_type: string;
  reference_id: number;
  movement_type: string;
  amount: number;
  currency: string;
  piece_number: string;
  voucher_number: string;
  beneficiary: string;
  description: string;
  created_at: string;
};

export type Expense = {
  id: number;
  expense_number: string;
  category_id: number;
  beneficiary: string;
  amount: number;
  currency: string;
  payment_method: string;
  description: string;
  created_at?: string;
};

export type Deposit = {
  id: number;
  deposit_number: string;
  source: string;
  amount: number;
  currency: string;
  description: string;
  created_at?: string;
};

export type Withdrawal = {
  id: number;
  withdrawal_number: string;
  beneficiary: string;
  reason: string;
  user_id: number;
  amount: number;
  currency: string;
  created_at?: string;
}

export type ExpenseCategory = { id: number; name: string };

export type Balance = { id: number; currency: string; balance: number };
