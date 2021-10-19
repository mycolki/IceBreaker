import BarLoader from 'react-spinners/BarLoader';
import theme from '../../../../styles/theme';
import { Wrapper } from '../../../../styles/share/spinnerStyle';

function BarSpinner({ color = 'white' }) {
  return (
    <Wrapper>
      <BarLoader
        size="90px"
        width="100"
        height="6"
        color={theme[color]}
        radius="10"
      />
    </Wrapper>
  );
}

export default BarSpinner;
