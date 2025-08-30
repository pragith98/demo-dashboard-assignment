import { BorrowerPipelineStatus } from "@/enums/borrower.enum";

export function getBorrowerStatusColor(status: BorrowerPipelineStatus): string {
  switch (status) {
    case BorrowerPipelineStatus.NEW:
      return "bg-blue-100 text-blue-800";
    case BorrowerPipelineStatus.IN_REVIEW:
      return "bg-yellow-100 text-yellow-800";
    case BorrowerPipelineStatus.RENEW:
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};