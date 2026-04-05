import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const COLORS = ["#7c6cfc", "#fc6c8f", "#4ade80", "#f59e0b", "#38bdf8", "#f472b6"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-base-100 border border-base-300 rounded-xl px-4 py-2 shadow-lg">
        <p className="text-xs font-bold text-base-content">{payload[0].name}</p>
        <p className="text-sm font-mono text-error">
          ₹{Number(payload[0].value).toLocaleString("en-IN")}
        </p>
      </div>
    );
  }
  return null;
};

function CategoryChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data} dataKey="value" nameKey="name"
          cx="50%" cy="50%" innerRadius={55} outerRadius={85}
          paddingAngle={3} strokeWidth={0}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle" iconSize={8}
          formatter={(v) => (
            <span style={{ fontSize: 11, fontFamily: "DM Mono" }}>{v}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CategoryChart;