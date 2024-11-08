// components/FundAllocationPieChart.tsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface TokenData {
  token_name: string;
  quantity: string;
  amount_in_inr: string;
  token_image: string;
  token_address: string;
  network_name: string;
}

interface FundAllocationPieChartProps {
  tokens: TokenData[];
}

// Define colors for each slice (you can adjust or randomize as needed)
const COLORS = ["#f8c667", "#9a00e2", "#9a00e2", "#033003", "#00000"];

const FundAllocationPieChart: React.FC<FundAllocationPieChartProps> = ({ tokens }) => {
  // Convert token data to the format required by Recharts
  const data = tokens.map((token) => ({
    name: token.network_name,
    value: parseFloat(token.quantity),
  }));

  return (
    <div className=" w-full h-80 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            
            label
            animationDuration={2000}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FundAllocationPieChart;
