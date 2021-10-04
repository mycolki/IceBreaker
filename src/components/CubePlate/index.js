import { Stage, Layer, RegularPolygon } from 'react-konva';

const stageStyle = {
  height: '58%',
};

function IcePlate() {
  return (
    <Stage style={stageStyle} width={367} height={413.53}>
      <Layer>
        <RegularPolygon
          x={182}
          y={206}
          sides={6}
          radius={170}
          rotation={140}
          fillLinearGradientStartPoint={{ x: -10, y: 100, z: 50 }}
          fillLinearGradientEndPoint={{ x: 90, y: -150, z: 0 }}
          fillLinearGradientColorStops={[
            0,
            '#62A8F2',
            0.5,
            '#B7A4EE',
            1,
            '#8BCFFC',
          ]}
          shadowColor="#000000"
          shadowBlur={10}
          shadowOffset={{ x: 0, y: 10 }}
          shadowOpacity="0.4"
        />
        <RegularPolygon
          x={120}
          y={120}
          sides={6}
          radius={25}
          fillLinearGradientStartPoint={{ x: -50, y: -50 }}
          fillLinearGradientEndPoint={{ x: 50, y: 50 }}
          fillLinearGradientColorStops={[
            0,
            'rgba(114, 112, 219',
            1,
            'rgba(252, 146, 216)',
          ]}
          shadowColor="#ffffff"
          shadowBlur={0}
          shadowOffset={{ x: 2.5, y: 1.5 }}
          rotation={90}
        />
        <RegularPolygon
          x={159}
          y={142}
          sides={6}
          radius={25}
          fillLinearGradientStartPoint={{ x: -50, y: -50 }}
          fillLinearGradientEndPoint={{ x: 50, y: 50 }}
          fillLinearGradientColorStops={[
            0,
            'rgba(114, 112, 219',
            1,
            'rgba(252, 146, 216)',
          ]}
          shadowColor="#ffffff"
          shadowBLur={0}
          shadowOffset={{ x: 2.5, y: 1.5 }}
          rotation={90}
        />
        <RegularPolygon
          x={120}
          y={165}
          sides={6}
          radius={25}
          fillLinearGradientStartPoint={{ x: -50, y: -50 }}
          fillLinearGradientEndPoint={{ x: 50, y: 50 }}
          fillLinearGradientColorStops={[0, 'orange', 1, 'rgba(252, 146, 216)']}
          shadowColor="#ffffff"
          shadowBLur={0}
          shadowOffset={{ x: 2.5, y: 1.5 }}
          rotation={90}
        />
      </Layer>
    </Stage>
  );
}

export default IcePlate;
