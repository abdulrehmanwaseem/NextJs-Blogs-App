"use client";

import { Bar, BarChart as BarChartBox, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card } from "@/components/ui/card";

export const BarChart = ({ devices }) => {
  const chartData = [
    { month: "January", desktop: 200 || devices.desktopUserCount, mobile: 100 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 83, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 280, mobile: 140 },
    { month: "July", desktop: 214, mobile: 140 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-5))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <Card className="w-full">
      <ChartContainer config={chartConfig} className="h-[32rem] w-full">
        <BarChartBox accessibilityLayer data={chartData} className=" -mt-1">
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChartBox>
      </ChartContainer>
    </Card>
  );
};
