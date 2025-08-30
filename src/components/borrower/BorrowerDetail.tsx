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
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LoanSummaryCard from "./LoanSummaryCard";
import { useAppState } from "@/hooks/useAppState";

function BorrowerDetail() {
  const { activeBorrower, requestDocuments, sendToValuer, approveLone } =
    useAppState();

  const onClickRequestDocuments = () => {
    if (!activeBorrower) return;
    requestDocuments(activeBorrower.id);
    console.debug("Request Documents clicked!");
  };

  const onClickSendToValuer = () => {
    if (!activeBorrower) return;
    sendToValuer(activeBorrower.id);
    console.debug("Send to Valuer clicked!");
  };

  const onClickApprove = () => {
    if (!activeBorrower) return;
    approveLone(activeBorrower.id);
    console.debug("Approve clicked!");
  };

  if (!activeBorrower) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <p className="text-gray-500">Select a borrower to view details</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 text-xl">
            {activeBorrower.name}
          </h3>
          <Badge
            className={getBorrowerStatusColor(
              activeBorrower.status as BorrowerPipelineStatus
            )}
          >
            {activeBorrower.status}
          </Badge>
        </div>
        <div
          className="
            flex 
            flex-col 
            lg:flex-row 
            lg:items-center 
            gap-4 
            mt-2 
            text-sm 
            text-gray-600
          "
        >
          <span className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            {activeBorrower.email}
          </span>
          <span className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            {activeBorrower.phone}
          </span>
        </div>
        <p className="text-lg font-semibold mt-2">
          {formatCurrency(activeBorrower.loan_amount)}
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
              {activeBorrower.ai_flags.length > 0 &&
                activeBorrower.ai_flags.map((flag) => (
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
        <LoanSummaryCard borrower={activeBorrower} />
      </CardContent>
    </Card>
  );
}

export default BorrowerDetail;
