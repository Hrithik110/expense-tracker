import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import styles from "./basicPie.module.css";

const COLORS = ["#A000FF", "#FF9304", "#FDE006"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function BasicPie({ data }) {
  const categories = ['Food', 'Entertainment', 'Travel'];

  return (
    <div className={styles.pieContainer}>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx={100}
          cy={100}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>

      {/* Legend below the pie chart */}
      <div className={styles.legendContainer}>
        {categories.map((category, index) => (
          <div key={index} className={styles.legendItem}>
            <span
              style={{
                backgroundColor: COLORS[index % COLORS.length],
                display: 'inline-block',
                width: '10px',
                height: '10px',
                marginRight: '5px'
              }}
            />
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}
