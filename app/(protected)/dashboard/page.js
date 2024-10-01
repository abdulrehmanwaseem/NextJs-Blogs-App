import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "./bar-chart";
import { PieChart } from "./pie-chart";
import { FaDollarSign, FaUsers, FaChartBar } from "react-icons/fa";
import { getDashboardData } from "@/services/dashbaord";

const DashboardPage = async () => {
  const data = await getDashboardData();

  const stats = [
    {
      title: "Total Users",
      value: data?.cards.totalUserCount || 0,
      percentage: "+20.1% from last year",
      icon: <FaDollarSign className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Blogs",
      value: data?.cards.totalAuthorCount || 0,
      percentage: "+180.1% from last year",
      icon: <FaUsers className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Feedbacks",
      value: data?.cards.totalContactCount || 0,
      percentage: "+19% from last year",
      icon: <FaChartBar className="h-4 w-4 text-muted-foreground" />,
    },
  ];
  return (
    <div className="w-full space-y-4">
      <div className="grid gap-4 grid-cols-2">
        <div className="space-y-2">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.percentage}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <PieChart stats={data?.stats} />
      </div>
      <BarChart devices={data?.devices} />
    </div>
  );
};

export default DashboardPage;
