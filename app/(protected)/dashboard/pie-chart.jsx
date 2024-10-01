"use client";

import * as React from "react";
import { Label, Pie, PieChart as PieChartContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import moment from "moment";
import { BiTrendingUp } from "react-icons/bi";

const chartConfig = {
  visitors: {
    label: "Count",
  },
  author: {
    label: "Authors",
    color: "hsl(var(--chart-2))",
  },
  audience: {
    label: "Audience",
    color: "hsl(var(--chart-1))",
  },
  feedbacks: {
    label: "Feedbacks",
    color: "hsl(var(--chart-3))",
  },
  blogs: {
    label: "Blogs",
    color: "hsl(var(--chart-4))",
  },
  likes: {
    label: "Ratings",
    color: "hsl(var(--chart-5))",
  },
};

export function PieChart({ stats }) {
  const chartData = [
    {
      browser: "Authors",
      visitors: stats?.authorCount,
      fill: "var(--color-author)",
    },
    {
      browser: "Audience",
      visitors: stats?.userCount,
      fill: "var(--color-audience)",
    },
    {
      browser: "Feedbacks",
      visitors: stats?.contactCount,
      fill: "var(--color-feedbacks)",
    },
    {
      browser: "Blogs",
      visitors: stats?.blogCount,
      fill: "var(--color-blogs)",
    },
    {
      browser: "Ratings",
      visitors: stats?.ratingCount,
      fill: "var(--color-likes)",
    },
  ];

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Statistics - Last 6 Months Overview</CardTitle>
        <CardDescription>
          {moment().subtract(6, "months").format("MMMM YYYY")} -{" "}
          {moment().format("MMMM YYYY")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChartContainer>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Statistics
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChartContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <BiTrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total stats for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
