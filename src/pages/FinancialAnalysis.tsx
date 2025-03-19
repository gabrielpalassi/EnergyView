import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useNavigate } from "react-router";

export function FinancialAnalysis() {
  const navigate = useNavigate();

  return (
    <>
      <Header title="Financial Analysis" />
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-muted mb-6 flex h-24 w-24 items-center justify-center rounded-full">
          <Wallet className="text-muted-foreground h-12 w-12" />
        </div>
        <h3 className="mb-2 text-2xl font-bold">
          Financial Analysis Coming Soon
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md text-center">
          We're building powerful financial tools to help you understand your
          energy costs and identify savings opportunities.
        </p>
        <Button
          className="cursor-pointer"
          onClick={() => navigate("/daily-dashboard")}
        >
          Return to Daily View
        </Button>
      </div>
    </>
  );
}
