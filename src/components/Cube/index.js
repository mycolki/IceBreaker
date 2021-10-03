import { Stage, Layer, RegularPolygon } from 'react-konva';

import theme from '../../styles/theme';

const stageStyle = {
  height: '100%',
  background: theme.mainSkyBlueBg,
};

function Cube() {
  return (
    <Stage style={stageStyle} width={350} height={350}>
      <Layer>
        <RegularPolygon
          x={100}
          y={100}
          sides={6}
          radius={25}
          fillLinearGradientStartPoint={{
            x1: 0,
            y1: 0,
          }}
          fillLinearGradientEndPoint={{
            x2: 0,
            y2: 50,
          }}
          fillLinearGradientColorStops={[
            0,
            '#7cdffF',
            1,
            'rgba(207, 218, 255)',
          ]}
          shadowColor="#ffffff"
          shadowBLur={0}
          shadowOffset={{ x: 2, y: 1 }}
          rotation={90}
        />
      </Layer>
    </Stage>
  );
}

export default Cube;
