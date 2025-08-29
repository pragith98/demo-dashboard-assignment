import { Card, CardContent } from "@/components/ui/card";
import { BorrowerPipelineStatus } from "@/enums/borrower.enum";
import type { BorrowerPipeline } from "@/type/borrower.type";
import { Badge } from "../ui/badge";
import { cn, formatCurrency } from "@/lib/utils";

interface BorrowerCardProps {
  borrower: BorrowerPipeline;
  isActive: boolean;
  onClick: (id: number) => void;
}

function BorrowerCard({ borrower, isActive, onClick }: BorrowerCardProps) {
  const getStatusColor = (status: BorrowerPipelineStatus) => {
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

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md border",
        isActive ? "ring-1" : ""
      )}
      onClick={() => onClick(borrower.id)}
    >
      <CardContent>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900">{borrower.name}</h3>
          <Badge
            className={getStatusColor(
              borrower.status as BorrowerPipelineStatus
            )}
          >
            {borrower.status}
          </Badge>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-600">{borrower.loan_type}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Amount:</span>
            <span className="font-medium text-gray-900">
              {formatCurrency(borrower.amount)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default BorrowerCard;
