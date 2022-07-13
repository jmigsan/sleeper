import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Skeleton,
  Stack,
} from '@chakra-ui/react'

const SStatsStatGroup = ({ SLog3 }) => {
  if (SLog3){
    return (
      <StatGroup pb={6}>
        <Stat>
          <StatLabel>Sleep value</StatLabel>
          <StatNumber>{ SLog3.lastPrice.toFixed(2) }</StatNumber>
          <StatHelpText>
            <StatArrow type={ SLog3.svArrowUpDown } />
            { SLog3.svHowUpDown.toFixed(2) }%
          </StatHelpText>
        </Stat>
  
        <Stat>
          <StatLabel>Hours slept</StatLabel>
          <StatNumber>{ (SLog3.lastMinsSlept / 60).toFixed(2) }</StatNumber>
          <StatHelpText>
            <StatArrow type={ SLog3.hsArrowUpDown } />
            { SLog3.hsHowUpDown.toFixed(2) }%
          </StatHelpText>
        </Stat>
      </StatGroup>
    )
  }
  else {
    return (
      <Stack pb={4}>
        <Skeleton height='20px' />
        <Skeleton height='20px' />
        <Skeleton height='20px' />
        <Skeleton height='20px' />
      </Stack>
    )
  };
};
export default SStatsStatGroup