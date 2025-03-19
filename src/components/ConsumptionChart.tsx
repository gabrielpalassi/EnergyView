import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TimeSeriesData } from "@/lib/types";

interface ConsumptionChartProps {
  data: TimeSeriesData;
}

export function ConsumptionChart({ data }: ConsumptionChartProps) {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Consumption",
          color: "var(--chart-2)",
        },
      }}
      className="h-full w-full"
    >
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={12}
          minTickGap={12}
          tickFormatter={(value) =>
            value.toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })
          }
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={12}
          minTickGap={12}
          tickFormatter={(value) => `${value / 1000} kWh`}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, _name, item) => {
                return (
                  <>
                    <span className="text-muted-foreground">
                      {item.payload.time.toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      :
                    </span>
                    <span>{(Number(value) / 1000).toFixed(1)} kWh</span>
                  </>
                );
              }}
            />
          }
        />
        <defs>
          <linearGradient id="fillConsumption" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-value)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-value)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          type="natural"
          dataKey="value"
          fill="url(#fillConsumption)"
          fillOpacity={0.4}
          stroke="var(--color-value)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}
