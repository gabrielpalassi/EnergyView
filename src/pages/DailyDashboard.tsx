import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { enGB } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ConsumptionChart } from "@/components/ConsumptionChart";
import { PhaseDistributionChart } from "@/components/PhaseDistributionChart";
import { Progress } from "@/components/ui/progress";
import { DemandProfileChart } from "@/components/DemandProfileChart";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { TimeSeriesData, State } from "@/lib/types";

interface DailyConsumptionData {
  "consumo-total": number;
  "variacao-consumo-total": number;
  "demanda-media": number;
  "variacao-demanda-media": number;
  "demanda-maxima": number;
  "variacao-demanda-maxima": number;
  "horario-de-pico": string;
  "horario-de-pico-ontem": string;
  "consumo-total-a": number;
  "variacao-consumo-total-a": number;
  "consumo-total-b": number;
  "variacao-consumo-total-b": number;
  "consumo-total-c": number;
  "variacao-consumo-total-c": number;
  "consumo-acumulado": string;
  "curva-de-carga": string;
}

function extractDataFromHtml(htmlString: string): TimeSeriesData | undefined {
  const xRegexPattern = /"x"\s*:\s*\[(.*?)\]/;
  const yRegexPattern = /"y"\s*:\s*\[(.*?)\]/;

  const xMatch = htmlString.match(xRegexPattern);
  const yMatch = htmlString.match(yRegexPattern);

  if (!xMatch || !yMatch) return undefined;

  const xArray = xMatch[1]
    .split(",")
    .map((value) => new Date(value.trim().slice(1, -1)));
  const yArray = yMatch[1].split(",").map((value) => Number(value.trim()));

  return xArray.length === yArray.length
    ? xArray.map((time, index) => ({ time, value: yArray[index] }))
    : undefined;
}

export function DailyDashboard() {
  const [state, setState] = useState<State>("loading");
  const [date, setDate] = useState<Date>(new Date());
  const [datePickerIsOpen, setDatePickerIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<DailyConsumptionData>();
  const [consumptionChartData, setConsumptionChartData] =
    useState<TimeSeriesData>();
  const [demandProfileChartData, setDemandProfileChartData] =
    useState<TimeSeriesData>();

  useEffect(() => {
    setState("loading");
    const now = new Date().getTime();

    // Format the selected date to 'yyyy-MM-dd' and create the cache key
    const formattedDate = format(date, "yyyy-MM-dd");
    const cacheKey = `daily-consumption-${formattedDate}`;

    // Retrieve cached data and its expiry time from localStorage
    const cachedData = localStorage.getItem(cacheKey);
    const cacheExpiry = localStorage.getItem(`${cacheKey}-expiry`);

    // Check if cached data exists and is still valid
    if (cachedData && cacheExpiry && now < Number(cacheExpiry)) {
      const parsedData = JSON.parse(cachedData);
      setData(parsedData);
      setConsumptionChartData(
        extractDataFromHtml(parsedData["consumo-acumulado"]),
      );
      setDemandProfileChartData(
        extractDataFromHtml(parsedData["curva-de-carga"]),
      );
      setState("loaded");
    } else {
      // Fetch data from the API if no valid cache is found
      axios
        .get<DailyConsumptionData>("/api/day-consumption-dashboard", {
          params: { day: formattedDate },
        })
        .then((response) => {
          setData(response.data);
          setConsumptionChartData(
            extractDataFromHtml(response.data["consumo-acumulado"]),
          );
          setDemandProfileChartData(
            extractDataFromHtml(response.data["curva-de-carga"]),
          );
          setState("loaded");

          // Set cache expiry time: 10 minutes for today, 24 hours for previous days
          const expiryTime =
            formattedDate === format(new Date(), "yyyy-MM-dd")
              ? now + 10 * 60 * 1000
              : now + 24 * 60 * 60 * 1000;

          // Store the fetched data and its expiry time in localStorage
          localStorage.setItem(cacheKey, JSON.stringify(response.data));
          localStorage.setItem(`${cacheKey}-expiry`, expiryTime.toString());
        })
        .catch(() => {
          setState("error");
        });
    }
  }, [date]);

  return (
    <>
      {/* Header */}
      <Header title="Daily Dashboard">
        {/* Date Picker */}
        <Popover open={datePickerIsOpen} onOpenChange={setDatePickerIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={"justify-start text-left font-normal"}
            >
              <span>
                <CalendarIcon />
              </span>
              <span className="w-full truncate overflow-ellipsis">
                {date ? (
                  format(date, "P", { locale: enGB })
                ) : (
                  <span>Pick a date</span>
                )}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(day) => {
                  if (day) {
                    setDate(day);
                    setDatePickerIsOpen(false);
                  }
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date("2022-01-01")
                }
                initialFocus
              />
            </div>
          </PopoverContent>
        </Popover>
      </Header>

      {/* Main Content */}
      <div className="space-y-4 px-3 pb-2">
        {state === "error" ? (
          <>
            {/* Error Page */}
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-muted mb-6 flex h-24 w-24 items-center justify-center rounded-full">
                <Info className="text-muted-foreground h-12 w-12" />
              </div>
              <h3 className="mb-2 text-2xl font-bold">Oops!</h3>
              <p className="text-muted-foreground mb-6 max-w-md text-center">
                We couldn't load the data for this date right now. Please check
                your connection and try again in a moment.
              </p>
              <Button
                className="cursor-pointer"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Retry
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Total Consumption */}
              <Card className="gap-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Consumption
                  </CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="text-muted-foreground h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Total energy consumed throughout the day</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardHeader>
                <CardContent>
                  {state === "loaded" && data ? (
                    <>
                      <div className="mb-0.5 text-2xl font-bold">
                        {(data["consumo-total"] / 1000).toFixed(1)} kWh
                      </div>
                      <p className="text-muted-foreground text-xs">
                        <span
                          className={`font-medium ${
                            data["variacao-consumo-total"] > 0
                              ? "text-rose-500"
                              : "text-emerald-500"
                          }`}
                        >
                          {data["variacao-consumo-total"] > 0 ? "↑" : "↓"}{" "}
                          {Math.abs(data["variacao-consumo-total"])}%
                        </span>{" "}
                        compared to previous day
                      </p>
                    </>
                  ) : (
                    <>
                      <Skeleton className="mb-0.5 h-8 w-28" />
                      <Skeleton className="h-4 w-44" />
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Average Demand */}
              <Card className="gap-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Demand
                  </CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="text-muted-foreground h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Average power demand throughout the day</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardHeader>
                <CardContent>
                  {state === "loaded" && data ? (
                    <>
                      <div className="mb-0.5 text-2xl font-bold">
                        {data["demanda-media"]} W
                      </div>
                      <p className="text-muted-foreground text-xs">
                        <span
                          className={`font-medium ${
                            data["variacao-demanda-media"] > 0
                              ? "text-rose-500"
                              : "text-emerald-500"
                          }`}
                        >
                          {data["variacao-demanda-media"] > 0 ? "↑" : "↓"}{" "}
                          {Math.abs(data["variacao-demanda-media"])}%
                        </span>{" "}
                        compared to previous day
                      </p>
                    </>
                  ) : (
                    <>
                      <Skeleton className="mb-0.5 h-8 w-28" />
                      <Skeleton className="h-4 w-44" />
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Maximum Demand */}
              <Card className="gap-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Maximum Demand
                  </CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="text-muted-foreground h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Highest power demand recorded</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardHeader>
                <CardContent>
                  {state === "loaded" && data ? (
                    <>
                      <div className="mb-0.5 text-2xl font-bold">
                        {data["demanda-maxima"]} W
                      </div>
                      <p className="text-muted-foreground text-xs">
                        <span
                          className={`font-medium ${
                            data["variacao-demanda-maxima"] > 0
                              ? "text-rose-500"
                              : "text-emerald-500"
                          }`}
                        >
                          {data["variacao-demanda-maxima"] > 0 ? "↑" : "↓"}{" "}
                          {Math.abs(data["variacao-demanda-maxima"])}%
                        </span>{" "}
                        compared to previous day
                      </p>
                    </>
                  ) : (
                    <>
                      <Skeleton className="mb-0.5 h-8 w-28" />
                      <Skeleton className="h-4 w-44" />
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Peak Time */}
              <Card className="gap-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Peak Time
                  </CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="text-muted-foreground h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Time of highest energy usage</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardHeader>
                <CardContent>
                  {state === "loaded" && data ? (
                    <>
                      <div className="mb-0.5 text-2xl font-bold">
                        {data["horario-de-pico"]}
                      </div>
                      <p className="text-muted-foreground text-xs">
                        <span className="font-medium text-amber-500">
                          {data["horario-de-pico-ontem"]}
                        </span>{" "}
                        the previous day
                      </p>
                    </>
                  ) : (
                    <>
                      <Skeleton className="mb-0.5 h-8 w-28" />
                      <Skeleton className="h-4 w-44" />
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:grid lg:grid-cols-7 lg:gap-4">
              {/* Demand Profile */}
              <Card className="mb-4 lg:col-span-4 lg:mb-0">
                <CardHeader>
                  <CardTitle>Demand Profile</CardTitle>
                  <CardDescription>
                    Power demand throughout the day
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-60 lg:h-[356px]">
                  {state === "loaded" && demandProfileChartData ? (
                    <DemandProfileChart data={demandProfileChartData} />
                  ) : (
                    <Skeleton className="h-60 lg:h-[356px]" />
                  )}
                </CardContent>
              </Card>

              {/* Consumption by Phase */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Consumption by Phase</CardTitle>
                  <CardDescription>Distribution across phases</CardDescription>
                </CardHeader>
                <CardContent>
                  {state === "loaded" && data ? (
                    <>
                      <div className="h-[200px] w-full">
                        <PhaseDistributionChart
                          phaseAConsumption={Number(data["consumo-total-a"])}
                          phaseBConsumption={Number(data["consumo-total-b"])}
                          phaseCConsumption={Number(data["consumo-total-c"])}
                        />
                      </div>
                      <div className="mt-4 space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            {/* Phase A */}
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">
                                Phase A
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium">
                                {(data["consumo-total-a"] / 1000).toFixed(1)}{" "}
                                kWh (
                                {(
                                  (data["consumo-total-a"] /
                                    data["consumo-total"]) *
                                  100
                                ).toFixed(1)}
                                %)
                              </span>
                              <span
                                className={`text-xs font-medium ${
                                  data["variacao-consumo-total-a"] > 0
                                    ? "text-rose-500"
                                    : "text-emerald-500"
                                }`}
                              >
                                {data["variacao-consumo-total-a"] > 0
                                  ? "↑"
                                  : "↓"}{" "}
                                {Math.abs(data["variacao-consumo-total-a"])}%
                              </span>
                            </div>
                          </div>
                          <Progress
                            value={
                              (data["consumo-total-a"] /
                                data["consumo-total"]) *
                              100
                            }
                            className="bg-muted [&>div]:bg-chart-1 h-2"
                          />
                        </div>

                        {/* Phase B */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">
                                Phase B
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium">
                                {(data["consumo-total-b"] / 1000).toFixed(1)}{" "}
                                kWh (
                                {(
                                  (data["consumo-total-b"] /
                                    data["consumo-total"]) *
                                  100
                                ).toFixed(1)}
                                %)
                              </span>
                              <span
                                className={`text-xs font-medium ${
                                  data["variacao-consumo-total-b"] > 0
                                    ? "text-rose-500"
                                    : "text-emerald-500"
                                }`}
                              >
                                {data["variacao-consumo-total-b"] > 0
                                  ? "↑"
                                  : "↓"}{" "}
                                {Math.abs(data["variacao-consumo-total-b"])}%
                              </span>
                            </div>
                          </div>
                          <Progress
                            value={
                              (data["consumo-total-b"] /
                                data["consumo-total"]) *
                              100
                            }
                            className="bg-muted [&>div]:bg-chart-2 h-2"
                          />
                        </div>

                        {/* Phase C */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">
                                Phase C
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium">
                                {(data["consumo-total-c"] / 1000).toFixed(1)}{" "}
                                kWh (
                                {(
                                  (data["consumo-total-c"] /
                                    data["consumo-total"]) *
                                  100
                                ).toFixed(1)}
                                %)
                              </span>
                              <span
                                className={`text-xs font-medium ${
                                  data["variacao-consumo-total-c"] > 0
                                    ? "text-rose-500"
                                    : "text-emerald-500"
                                }`}
                              >
                                {data["variacao-consumo-total-c"] > 0
                                  ? "↑"
                                  : "↓"}{" "}
                                {Math.abs(data["variacao-consumo-total-c"])}%
                              </span>
                            </div>
                          </div>
                          <Progress
                            value={
                              (data["consumo-total-c"] /
                                data["consumo-total"]) *
                              100
                            }
                            className="bg-muted [&>div]:bg-chart-3 h-2"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <Skeleton className="h-[356px]" />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Consumption Over Time */}
            <Card>
              <CardHeader>
                <CardTitle>Consumption Over Time</CardTitle>
                <CardDescription>
                  Cumulative energy usage throughout the day
                </CardDescription>
              </CardHeader>
              <CardContent className="h-60 lg:h-[356px]">
                {state === "loaded" && consumptionChartData ? (
                  <ConsumptionChart data={consumptionChartData} />
                ) : (
                  <Skeleton className="h-60 lg:h-[356px]" />
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </>
  );
}
