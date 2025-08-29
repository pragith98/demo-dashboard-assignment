import { BorrowerPipelineStatus } from "@/enums/borrower.enum";

export interface BorrowerPipeline {
  id: number;
  name: string;
  loan_type: string;
  amount: number;
  status: BorrowerPipelineStatus | string;
}

export interface Borrower {
  id: string;
  name: string;
  email: string;
  phone: string;
  loan_amount: number;
  status: string;
  employment: string;
  income: number;
  existing_loan: number;
  credit_score: number;
  source_of_funds: string;
  risk_signal: string;
  ai_flags: string[];
}