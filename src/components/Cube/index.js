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
          x={120}
          y={120}
          sides={6}
          radius={25}
          rotation={90}
          fillLinearGradientStartPoint={{ x: -20, y: 0 }}
          fillLinearGradientEndPoint={{ x: 20, y: 0 }}
          fillLinearGradientColorStops={[0, '#E8E3FF', 1, '#BD9CF2']}
          shadowColor="#000000"
          shadowBlur={4}
          shadowOffset={{ x: 1, y: 6 }}
          shadowOpacity="0.2"
        />
        <RegularPolygon
          x={159}
          y={142}
          sides={6}
          radius={25}
          rotation={90}
          fillLinearGradientStartPoint={{ x: -20, y: 0 }}
          fillLinearGradientEndPoint={{ x: 20, y: 0 }}
          fillLinearGradientColorStops={[0, '#E8E3FF', 1, '#BD9CF2']}
          shadowColor="#000000"
          shadowBlur={4}
          shadowOffset={{ x: 1, y: 6 }}
          shadowOpacity="0.2"
        />
        <RegularPolygon
          x={120}
          y={165}
          sides={6}
          radius={25}
          rotation={90}
          fillLinearGradientStartPoint={{ x: 20, y: -10 }}
          fillLinearGradientEndPoint={{ x: 10, y: 20 }}
          fillLinearGradientColorStops={[0, ' #54BEFA', 1, '#CFDAFF']}
          shadowColor="#000000"
          shadowBlur={4}
          shadowOffset={{ x: 1, y: 6 }}
          shadowOpacity="0.2"
        />
        <RegularPolygon
          x={159}
          y={187}
          sides={6}
          radius={25}
          rotation={90}
          fillLinearGradientStartPoint={{ x: 20, y: -10 }}
          fillLinearGradientEndPoint={{ x: 10, y: 20 }}
          fillLinearGradientColorStops={[0, ' #54BEFA', 1, '#CFDAFF']}
          shadowColor="#000000"
          shadowBlur={4}
          shadowOffset={{ x: 1, y: 6 }}
          shadowOpacity="0.2"
        />
      </Layer>
    </Stage>
  );
}

export default Cube;
