import { useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Home,
  LineChart,
  Wallet,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTutorial } from "@/context/TutorialContext";

export function TutorialDialog() {
  const { showTutorial, setShowTutorial } = useTutorial();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  return (
    <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
      <DialogContent className="sm:max-w-md">
        {/* Header */}
        <DialogHeader className="text-left">
          <DialogTitle>Welcome to EnergyView</DialogTitle>
          <DialogDescription>
            Let's take a quick tour of the app's features
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Home className="text-primary bg-primary/10 h-10 min-h-10 w-10 min-w-10 rounded-full p-2" />
                <div>
                  <h3 className="font-medium">Navigation</h3>
                  <p className="text-muted-foreground text-sm">
                    Use the sidebar on the left to navigate between different
                    views .
                  </p>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg border p-4">
                <p className="text-sm">
                  The sidebar can be collapsed on smaller screens. Click the
                  menu icon in the top left to toggle it.
                </p>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="text-primary bg-primary/10 h-10 min-h-10 w-10 min-w-10 rounded-full p-2" />
                <div>
                  <h3 className="font-medium">Daily View</h3>
                  <p className="text-muted-foreground text-sm">
                    The daily view shows your energy consumption broken down by
                    hour.
                  </p>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg border p-4">
                <p className="text-sm">
                  You can see your total consumption, peak usage times, and
                  consumption by phase.
                </p>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="text-primary bg-primary/10 h-10 min-h-10 w-10 min-w-10 rounded-full p-2" />
                <div>
                  <h3 className="font-medium">Monthly View</h3>
                  <p className="text-muted-foreground text-sm">
                    This view provides aggregated data over longer periods for
                    trend analysis.
                  </p>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg border p-4">
                <p className="text-sm">
                  Compare your energy usage across months to identify patterns
                  and opportunities for optimization.
                </p>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Wallet className="text-primary bg-primary/10 h-10 min-h-10 w-10 min-w-10 rounded-full p-2" />

                <div>
                  <h3 className="font-medium">Financial Analysis</h3>
                  <p className="text-muted-foreground text-sm">
                    Track your energy costs and identify savings opportunities
                    at a glance.
                  </p>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg border p-4">
                <p className="text-sm">
                  The financial view provides insights into your energy costs,
                  and billing trends based on your usage patterns.
                </p>
              </div>
            </div>
          )}

          {/* Step 5 */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <LineChart className="text-primary bg-primary/10 h-10 min-h-10 w-10 min-w-10 rounded-full p-2" />

                <div>
                  <h3 className="font-medium">Interactive Charts</h3>
                  <p className="text-muted-foreground text-sm">
                    All charts are interactive and provide detailed information
                    on hover.
                  </p>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg border p-4">
                <p className="text-sm">
                  Hover over data points to see exact values and compare
                  different metrics at specific times.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="flex flex-row items-center justify-end">
          <div className="flex items-center gap-2">
            <Button
              className="cursor-pointer"
              variant="outline"
              size="icon"
              onClick={() => {
                if (step > 1) {
                  setStep(step - 1);
                }
              }}
              disabled={step === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-muted-foreground text-sm">
              {step} of {totalSteps}
            </span>
            <Button
              className="cursor-pointer"
              variant="outline"
              size="icon"
              onClick={() => {
                if (step < totalSteps) {
                  setStep(step + 1);
                } else {
                  setShowTutorial(false);
                  setStep(1);
                }
              }}
            >
              {step === totalSteps ? (
                <X className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button
            onClick={() => {
              setShowTutorial(false);
              setStep(1);
            }}
            className="cursor-pointer"
          >
            {step === totalSteps ? "Get Started" : "Skip Tour"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
