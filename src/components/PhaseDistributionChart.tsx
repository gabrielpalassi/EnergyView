import { Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PhaseDistributionChartProps {
  phaseAConsumption: number;
  phaseBConsumption: number;
  phaseCConsumption: number;
}

export function PhaseDistributionChart({
  phaseAConsumption,
  phaseBConsumption,
  phaseCConsumption,
}: PhaseDistributionChartProps) {
  const chartConfig = {
    consumption: {
      label: "Consumption",
    },
    a: {
      label: "Phase A",
      color: "var(--chart-1)",
    },
    b: {
      label: "Phase B",
      color: "var(--chart-2)",
    },
    c: {
      label: "Phase C",
      color: "var(--chart-3)",
    },
  };

  const chartData = [
    {
      phase: "a",
      consumption: phaseAConsumption / 1000,
      fill: "var(--color-a)",
    },
    {
      phase: "b",
      consumption: phaseBConsumption / 1000,
      fill: "var(--color-b)",
    },
    {
      phase: "c",
      consumption: phaseCConsumption / 1000,
      fill: "var(--color-c)",
    },
  ];

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-full w-full"
    >
      <PieChart>
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, _name, item) => {
                return (
                  <>
                    <span className="text-muted-foreground">
                      Phase {item.payload.phase.toUpperCase()}:
                    </span>
                    <span>{Number(value).toFixed(1)} kWh</span>
                  </>
                );
              }}
            />
          }
        />
        <Pie data={chartData} dataKey="consumption" nameKey="phase" />
      </PieChart>
    </ChartContainer>
  );
}
