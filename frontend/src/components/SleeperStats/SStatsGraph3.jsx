import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack, 
  Skeleton,
} from '@chakra-ui/react'

const SStatsGraph1 = ({ SLog4 }) => {

  if (SLog4) {
    let SLog4Reverse = [...SLog4].reverse();

    return (
      <TableContainer>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th isNumeric>Sleep Time</Th>
              <Th isNumeric>Awake Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {SLog4Reverse.map((x) => (
              <Tr key={x.log_id}>
                <Td>{x.date}</Td>
                <Td isNumeric>{x.sleep_time.substring(0,5)}</Td>
                <Td isNumeric>{x.awake_time.substring(0,5)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    )
  }
  else {
    <Stack>
      <Skeleton height='20px' />
      <Skeleton height='20px' />
      <Skeleton height='20px' />
    </Stack>
  }
}
export default SStatsGraph1