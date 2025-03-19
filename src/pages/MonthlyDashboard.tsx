import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router";

export function MonthlyDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Header title="Monthly Dashboard" />
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-muted mb-6 flex h-24 w-24 items-center justify-center rounded-full">
          <Calendar className="text-muted-foreground h-12 w-12" />
        </div>
        <h3 className="mb-2 text-2xl font-bold">Monthly View Coming Soon</h3>
        <p className="text-muted-foreground mb-6 max-w-md text-center">
          We're creating a meticulously designed monthly dashboard to give you
          the ultimate experience in analyzing long-term trends.
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
