import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from '@chakra-ui/react'

const SStatsStats = () => {
  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Previous close</Td>
            <Td>23:00</Td>
          </Tr>
          <Tr>
            <Td>Week's Range</Td>
            <Td>23:01 - 00:59</Td>
          </Tr>
          <Tr>
            <Td>52 Week Range</Td>
            <Td>21:11 - 03:22</Td>
          </Tr>
          <Tr>
            <Td>Volume</Td>
            <Td>18734</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
export default SStatsStats