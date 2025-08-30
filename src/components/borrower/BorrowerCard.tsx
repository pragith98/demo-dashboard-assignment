import { Card, CardContent } from "@/components/ui/card";
import { BorrowerPipelineStatus } from "@/enums/borrower.enum";
import type { BorrowerPipeline } from "@/type/borrower.type";
import { Badge } from "../ui/badge";
import { cn, formatCurrency } from "@/lib/utils";
import { getBorrowerStatusColor } from "@/lib/borrower.helper";

interface BorrowerCardProps {
  borrower: BorrowerPipeline;
  isActive: boolean;
  onClick: (borrower: BorrowerPipeline) => void;
}

function BorrowerCard({ borrower, isActive, onClick }: BorrowerCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md border",
        isActive ? "ring-1" : ""
      )}
      onClick={() => onClick(borrower)}
    >
      <CardContent>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900">{borrower.name}</h3>
          <Badge
            className={getBorrowerStatusColor(
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
