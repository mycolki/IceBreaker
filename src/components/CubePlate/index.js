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
          fill="black"
          rotationDeg={140}
        />
      </Layer>
    </Stage>
  );
}

export default IcePlate;
