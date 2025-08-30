import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BorrowerCard from "./BorrowerCard";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getBorrowerPipelineTabs } from "@/constants/borrower-pipline";
import { useAppState } from "@/hooks/useAppState";

function BorrowerPipeline() {
  const {
    activeBorrower,
    activeTab,
    borrowers,
    setActiveBorrower,
    setActiveTab,
    getFilteredBorrowers,
  } = useAppState();

  const [sanitizedActiveValue, setSanitizedActiveValue] =
    useState<string>("active");

  useEffect(() => {
    getFilteredBorrowers();
  }, []);

  const isSelected = (borrowerId: string): boolean => {
    if (!activeBorrower) return false;

    return activeBorrower.id === borrowerId;
  };

  const onChangeTabAndFilterBorrowers = (tab: string) => {
    setActiveTab(tab);
    getFilteredBorrowers();
  };

  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle>Borrower Pipeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => onChangeTabAndFilterBorrowers(value)}
        >
          <TabsList className="grid w-full grid-cols-3">
            {getBorrowerPipelineTabs().map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-3">
              {/* Cards */}
              {borrowers.map((item) => (
                <BorrowerCard
                  key={item.id}
                  borrower={item}
                  isActive={isSelected(item.id)}
                  onClick={(borrower) => setActiveBorrower(borrower)}
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

export default BorrowerPipeline;
