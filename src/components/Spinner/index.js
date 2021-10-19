import DotLoader from 'react-spinners/DotLoader';

import styled from 'styled-components';
import { flexCenterColumn } from '../../styles/share/common';
import theme from '../../styles/theme';

function Spinner({ color = 'white' }) {
  return (
    <Wrapper>
      <DotLoader
        className="spinner"
        size="90"
        width="32"
        height="160"
        color={theme[color]}
        radius="10"
      />
    </Wrapper>
  );
}

export default Spinner;

const Wrapper = styled.div`
  ${flexCenterColumn}
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
