import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BorrowerCard from "./BorrowerCard";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const tabs = [
  { id: 1, name: "New" },
  { id: 2, name: "In Review" },
  { id: 3, name: "Approved" },
];

function BorrowerPipeline() {
  const [selectedBorrowerId, setSelectedBorrowerId] = useState<null | number>(
    null
  );

  const [sanitizedActiveValue, setSanitizedActiveValue] =
    useState<string>("active");

  const [activeTab, setActiveTab] = useState<string>(tabs[0].name);

  const isSelected = (pipelineId: number): boolean => {
    return selectedBorrowerId === pipelineId;
  };

  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle>Borrower Pipeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="grid w-full grid-cols-3">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.name}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-3">
              {/* Cards */}
              {borrowerData.map((item) => (
                <BorrowerCard
                  key={item.id}
                  borrower={item}
                  isActive={isSelected(item.id)}
                  onClick={(id) => setSelectedBorrowerId(id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Radio section */}
        <div className="space-y-3">
          <h3
            className="
              text-xs 
              font-semibold 
              text-gray-500 
              uppercase 
              tracking-wide
            "
          >
            F-SANITISED ACTIVE
          </h3>
          <RadioGroup
            value={sanitizedActiveValue}
            className="space-y-2"
            onValueChange={(value) => setSanitizedActiveValue(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="active" id="active" />
              <Label htmlFor="active" className="text-sm">
                ACTIVE
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="inactive" id="inactive" />
              <Label htmlFor="inactive" className="text-sm">
                INACTIVE
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}

const borrowerData = [
  {
    id: 1,
    name: "Sarah Dunn",
    loan_type: "Home Loan",
    amount: 300000,
    status: "Renew",
  },
  {
    id: 3,
    name: "Lisa Carter",
    loan_type: "Home Loan",
    amount: 450000,
    status: "New",
  },
];

export default BorrowerPipeline;
