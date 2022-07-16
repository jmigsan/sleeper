import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { useEffect } from 'react';
import { useState } from 'react';

const SStatsStats = ({SLog1, SLog2, SLog4}) => {
  const [log1, setLog1] = useState([]);
  const [log2, setLog2] = useState([]);
  const [log4, setLog4] = useState([]);

  useEffect(() => {
    setLog1(SLog1)
    setLog2(SLog2)
    setLog4(SLog4)
  }, [SLog1, SLog2, SLog4])

  const PreviousClose = () => {
    if (log1.at(-2)) {
      return (
        <Tr>
          <Td>Previous Close</Td>
          <Td>{log1.at(-2)["Sleep Value"].toFixed(2)}</Td>
        </Tr>
      )
    }
    else {
      return (
        <Tr>
          <Td>Previous Close</Td>
          <Td>n/a</Td>
        </Tr>
      )
    }
  };

  const PreviousHours = () => {
    if (log2.at(-2)) {
      return (
        <Tr>
          <Td>Previous Hours Slept</Td>
          <Td>{log2.at(-2)['Hours Slept'].toFixed(2)}</Td>
        </Tr>
      )
    }
    else {
      return (
        <Tr>
          <Td>Previous Hours Slept</Td>
          <Td>n/a</Td>
        </Tr>
      )
    }
  };

  const PreviousLog = () => {
    if (log4.at(-2)) {
      return (
        <Tr>
          <Td>Previous Date Logged</Td>
          <Td>{log4.at(-2).date}</Td>
        </Tr>
      )
    }
    else {
      return (
        <Tr>
          <Td>Previous Date Logged</Td>
          <Td>n/a</Td>
        </Tr>
      )
    }
  };
  
if (log1 !== undefined || log2 !== undefined || log4 !== undefined) {
    return (
      <TableContainer>
        <Table variant='simple'>
          <Thead>
          </Thead>
          <Tbody>
            <PreviousClose/>
            <PreviousHours/>
            <PreviousLog/>
          </Tbody>
        </Table>
      </TableContainer>
    )
  }
}
export default SStatsStats