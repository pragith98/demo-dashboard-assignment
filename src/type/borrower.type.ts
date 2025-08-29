import { BorrowerPipelineStatus } from "@/enums/borrower.enum";

export interface BorrowerPipeline {
  id: number;
  name: string;
  loan_type: string;
  amount: number;
  status: BorrowerPipelineStatus | string;
}