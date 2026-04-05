import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-base-100 border border-base-300 rounded-xl px-4 py-2 shadow-lg">
        <p className="text-xs text-base-content/50 mb-1 font-mono">{label}</p>
        <p className="text-base font-bold text-primary font-mono">
          ₹{Number(payload[0].value).toLocaleString("en-IN")}
        </p>
      </div>
    );
  }
  return null;
};

function BalanceChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(var(--p))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="oklch(var(--p))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--b3))" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fontFamily: "DM Mono", fill: "oklch(var(--bc)/0.5)" }}
          axisLine={false} tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 10, fontFamily: "DM Mono", fill: "oklch(var(--bc)/0.5)" }}
          axisLine={false} tickLine={false}
          tickFormatter={(v) => `₹${v >= 1000 ? (v / 1000).toFixed(1) + "k" : v}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone" dataKey="balance"
          stroke="oklch(var(--p))" strokeWidth={2.5}
          fill="url(#balanceGrad)" dot={{ r: 4, fill: "oklch(var(--p))", strokeWidth: 2 }}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default BalanceChart;