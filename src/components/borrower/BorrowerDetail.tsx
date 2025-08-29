import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { getBorrowerStatusColor } from "@/lib/borrower.helper";
import type { BorrowerPipelineStatus } from "@/enums/borrower.enum";
import { AlertTriangle, Mail, Phone } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LoanSummaryCard from "./LoanSummaryCard";

function BorrowerDetail() {
  const onClickRequestDocuments = () => {
    console.debug("Request Documents clicked!");
  };

  const onClickSendToValuer = () => {
    console.debug("Send to Valuer clicked!");
  };

  const onClickApprove = () => {
    console.debug("Approve clicked!");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 text-xl">
            {borrower.name}
          </h3>
          <Badge
            className={getBorrowerStatusColor(
              borrower.status as BorrowerPipelineStatus
            )}
          >
            {borrower.status}
          </Badge>
        </div>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            {borrower.email}
          </span>
          <span className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            {borrower.phone}
          </span>
        </div>
        <p className="text-lg font-semibold mt-2">
          {formatCurrency(borrower.loan_amount)}
        </p>
      </CardHeader>

      <CardContent>
        {/* AI Explainability Section */}
        <Accordion
          type="single"
          collapsible
          className="w-full border px-3 rounded-lg mb-5"
        >
          <AccordionItem value="ai-explainability">
            <AccordionTrigger className="text-base font-semibold">
              AI Explainability
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              {/* Alerts */}
              {borrower.ai_flags.length > 0 &&
                borrower.ai_flags.map((flag) => (
                  <Alert key={flag} variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="flex items-center gap-2">
                      <span className="font-medium">{flag}</span>
                    </AlertDescription>
                  </Alert>
                ))}

              <div className="flex gap-2 flex-wrap">
                <Button size="sm" onClick={onClickRequestDocuments}>
                  Request Documents
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={onClickSendToValuer}
                >
                  Send to Valuer
                </Button>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={onClickApprove}
                >
                  Approve
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Loan Summary */}
        <LoanSummaryCard borrower={borrower} />
      </CardContent>
    </Card>
  );
}

const borrower = {
  id: "1",
  name: "Sarah Dunn",
  email: "sarah.dunn@example.com",
  phone: "(355)123-4557",
  loan_amount: 300000,
  status: "In Review",
  employment: "At Tech Company",
  income: 120000,
  existing_loan: 240000,
  credit_score: 720,
  source_of_funds: "Declared",
  risk_signal: "Missing Source of Funds declaration",
  ai_flags: [
    "Income Inconsistent with Bank statements",
    "High Debt-to-Income Ratio detected",
  ],
};

export default BorrowerDetail;
