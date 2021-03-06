import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SStatsGraph1 = ({ SLog1 }) => {
  return (
    <ResponsiveContainer width={'99%'} height={250}>
      <LineChart
        data={SLog1}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="9 9" />
        <XAxis dataKey='Date' />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="Sleep Value"
          stroke="#63b3ed"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
export default SStatsGraph1