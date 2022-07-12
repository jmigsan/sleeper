import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    date: '1/2/2022',
    cost: 30
  },
  {
    date: '2/2/2022',
    cost: 40
  },
  {
    date: '3/2/2022',
    cost: 20
  },
  {
    date: '4/2/2022',
    cost: 50
  },
  {
    date: '5/2/2022',
    cost: 55
  },
  {
    date: '6/2/2022',
    cost: 10
  },
];



const SLogsGraph1 = (props) => {

  return (
    <ResponsiveContainer width={'99%'} height={250}>
      <LineChart
        data={props.sleeplogs}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="9 9" />
        <XAxis dataKey='timestamp' />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="sleepvalue"
          stroke="#63b3ed"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
export default SLogsGraph1