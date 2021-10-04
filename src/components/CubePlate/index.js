import { useState, useEffect } from 'react';
import { Stage, Layer, RegularPolygon } from 'react-konva';

const stageStyle = {
  height: '58%',
};

function IcePlate() {
  const [cubeCoordinates, setCubeCoordinates] = useState([{ x: 0, y: 0 }]);

  useEffect(() => {
    const coordinates = [];
    let x = 0;
    let y = 0;

    for (let i = 0; i < 4; i++) {
      x = 181 + i * 39;
      y = 78 + i * 22;

      coordinates.push({ x, y });
    }

    for (let i = 0; i < 5; i++) {
      x = 142 + i * 39;
      y = 100 + i * 22;

      coordinates.push({ x, y });
    }

    for (let i = 0; i < 6; i++) {
      x = 103 + i * 39;
      y = 122 + i * 22;

      coordinates.push({ x, y });
    }

    for (let i = 0; i < 7; i++) {
      x = 64 + i * 39;
      y = 144 + i * 22;

      coordinates.push({ x, y });
    }

    for (let i = 0; i < 6; i++) {
      x = 64 + i * 39;
      y = 188 + i * 22;

      coordinates.push({ x, y });
    }

    for (let i = 0; i < 5; i++) {
      x = 64 + i * 39;
      y = 232 + i * 22;

      coordinates.push({ x, y });
    }

    for (let i = 0; i < 4; i++) {
      x = 64 + i * 39;
      y = 276 + i * 22;

      coordinates.push({ x, y });
    }

    setCubeCoordinates(coordinates);
  }, []);

  return (
    <Stage style={stageStyle} width={367} height={413.53}>
      <Layer>
        <RegularPolygon
          x={182}
          y={206}
          sides={7}
          radius={177}
          rotation={80}
          fillLinearGradientStartPoint={{ x: -100, y: 60, z: 0 }}
          fillLinearGradientEndPoint={{ x: 150, y: 0, z: 0 }}
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
        {cubeCoordinates?.map((coord, index) => (
          <RegularPolygon
            x={coord.x}
            y={coord.y}
            draggable="true"
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
        ))}
      </Layer>
    </Stage>
  );
}

export default IcePlate;
