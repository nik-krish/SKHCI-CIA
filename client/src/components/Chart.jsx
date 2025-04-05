import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

export const Chart = ({ data }) => {
  // Custom color palette
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82CA9D",
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-800 dark:text-white">{label}</p>
          <p className="text-blue-600 dark:text-blue-400">
            Tasks: <span className="font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[500px] bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
          barSize={40}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E5E7EB"
            strokeOpacity={0.3}
            vertical={false}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280" }}
            tickMargin={20}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6B7280" }} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
          />
          <Bar dataKey="total" radius={[4, 4, 0, 0]} animationDuration={1500}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
