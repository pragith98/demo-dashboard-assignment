import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface OnboardingWorkflowProps {
  steps: string[];
}

function OnboardingWorkflow({ steps }: OnboardingWorkflowProps) {
  const createStepsView = (steps: string[]) => {
    return (
      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step} className="flex items-center gap-3">
            <div
              className="
                w-6 
                h-6 
                rounded-full 
                flex 
                items-center 
                justify-center 
                text-xs 
                font-medium 
                bg-green-500 
                text-white
              "
            >
              <Check className="h-3 w-3" />
            </div>
            <span className="text-sm text-gray-900 font-medium">{step}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Desktop view */}
      <div className="hidden md:block space-y-6">
        <h3 className="text-lg font-semibold">Onboarding Workflow</h3>
        {createStepsView(steps)}
      </div>

      {/* Mobile view */}
      <Accordion type="single" collapsible className="md:hidden">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-semibold pt-0">
            Onboarding Workflow
          </AccordionTrigger>
          <AccordionContent>{createStepsView(steps)}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default OnboardingWorkflow;
