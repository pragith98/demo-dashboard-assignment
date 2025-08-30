import { formatCurrency } from "@/lib/utils";
import type { Borrower } from "@/type/borrower.type";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";
import { useAppState } from "@/hooks/useAppState";

interface LoanSummaryCardProps {
  borrower: Borrower;
}

function LoanSummaryCard({ borrower }: LoanSummaryCardProps) {
  const { escalate } = useAppState();

  const onClickEscalate = () => {
    escalate(borrower.id);
    console.debug("Escalate clicked!");
  };

  const isDisableButton = (): boolean => {
    // logic here
    return false;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Loan Summary</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Employment</p>
          <p className="mt-1">{borrower.employment}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Existing Loan</p>
          <p className="mt-1">{formatCurrency(borrower.existing_loan)}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Credit Score</p>
          <p className="mt-1 text-lg font-semibold text-green-600">
            {borrower.credit_score}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Source of Funds</p>
          <p className="mt-1">{borrower.source_of_funds}</p>
        </div>
      </div>

      {/* Risk signal */}
      {borrower.risk_signal.length > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" color="#ED8936" />
          <AlertTitle className="text-orange-500">Risk Signals: </AlertTitle>
          <AlertDescription className="flex items-center gap-2">
            <span className="font-medium text-orange-500">
              {borrower.risk_signal}
            </span>
          </AlertDescription>
        </Alert>
      )}

      <Button
        className="w-full"
        size="lg"
        onClick={onClickEscalate}
        disabled={isDisableButton()}
      >
        Escalate to Credit Committee
      </Button>
    </div>
  );
}

export default LoanSummaryCard;
