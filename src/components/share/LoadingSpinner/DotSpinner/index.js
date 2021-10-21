import DotLoader from 'react-spinners/DotLoader';
import theme from '../../../../styles/theme';
import { Wrapper } from '../../../../styles/share/spinnerStyle';

function DotSpinner({ color = 'white' }) {
  return (
    <Wrapper>
      <DotLoader
        className="spinner"
        size="90px"
        width="32px"
        height="160px"
        color={theme[color]}
        radius="10"
      />
    </Wrapper>
  );
}

export default DotSpinner;
