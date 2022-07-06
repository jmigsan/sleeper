import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Heading
} from '@chakra-ui/react';

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

const DashboardGraph = () => {
  return (
    <Box>
      <Stat p={5}>
        <StatLabel>
          <Heading as='h2' size='lg'>Balance</Heading>
        </StatLabel>
        <StatNumber>£13.52</StatNumber>
        <StatHelpText>Feb 12 - Feb 28</StatHelpText>
      </Stat>
      <ResponsiveContainer width={'99%'} height={250}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="9 9" />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="cost"
            stroke="#63b3ed"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default DashboardGraph
