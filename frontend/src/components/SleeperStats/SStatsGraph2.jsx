import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SStatsGraph2 = ({ SLog2 }) => {
  return (
    <ResponsiveContainer width={'99%'} height={250}>
      <BarChart
        width={500}
        height={300}
        data={SLog2}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="9 9" />
        <XAxis dataKey='Date' />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Hours Slept" fill="#63b3ed" />
      </BarChart>
    </ResponsiveContainer>
  )
}
export default SStatsGraph2