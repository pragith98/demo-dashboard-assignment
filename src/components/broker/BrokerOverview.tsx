import { useEffect, type ComponentType } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Phone, type LucideProps } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import OnboardingWorkflow from "./OnboardingWorkflow";
import type { Broker } from "@/type/broker.type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppState } from "@/hooks/useAppState";

interface ContactButton {
  id: number;
  name: string;
  icon: ComponentType<LucideProps>;
  action: () => void;
}

function BrokerOverview() {
  const {
    activeBroker,
    onboardingWorkflow,
    getBrokerInfo,
    getOnboardingWorkflow,
  } = useAppState();

  useEffect(() => {
    getBrokerInfo();
    getOnboardingWorkflow();
  }, []);

  const contactButtons: ContactButton[] = [
    {
      id: 1,
      name: "Call",
      icon: Phone,
      action: () => console.debug("Call clicked!"),
    },
    {
      id: 2,
      name: "Email",
      icon: Mail,
      action: () => console.debug("Email clicked!"),
    },
    {
      id: 3,
      name: "Chat",
      icon: MessageCircle,
      action: () => console.debug("Chat clicked!"),
    },
  ];

  const createBrokerInfoView = (broker: Broker) => {
    return (
      <>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">{broker.deals}</p>
            <p className="text-sm text-gray-500">Deals</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {broker.approval_rate}
            </p>
            <p className="text-sm text-gray-500">Approval Rate</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600">
              {formatCurrency(broker.pending)}
            </p>
            <p className="text-sm text-gray-500">Pending</p>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {contactButtons.map((button) => (
            <Button
              key={button.id}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={button.action}
            >
              <button.icon />
              {button.name}
            </Button>
          ))}
        </div>
      </>
    );
  };

  if (!activeBroker) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <p className="text-gray-500">No broker to view details</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Broker Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Broker info Desktop view*/}
        <div className="hidden md:block space-y-6">
          <h3 className="text-xl font-semibold">{activeBroker.name}</h3>
          {createBrokerInfoView(activeBroker)}
        </div>
        {/* Broker info Mobile view*/}
        <Accordion type="single" collapsible className="md:hidden">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-semibold pt-0">
              {activeBroker.name}
            </AccordionTrigger>
            <AccordionContent className="space-y-6">
              {createBrokerInfoView(activeBroker)}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Onboarding Workflow */}
        <OnboardingWorkflow steps={onboardingWorkflow} />

        {/* AI Assistant */}
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="ai-assistant" className="text-sm font-medium">
              E Ardsassist
            </Label>
            <p className="text-xs text-gray-500">AI Assistant</p>
          </div>
          <Switch id="ai-assistant" defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
}

export default BrokerOverview;
