import { useState, useEffect } from 'react';
import { Stage, Layer, RegularPolygon } from 'react-konva';

function IcePlate() {
  const [cubeCoordinates, setCubeCoordinates] = useState([{ x: 0, y: 0 }]);

  useEffect(() => {
    const standards = [
      [4, 181, 78],
      [5, 142, 100],
      [6, 103, 122],
      [7, 64, 144],
      [6, 64, 188],
      [5, 64, 232],
      [4, 64, 276],
    ];

    const makeCoordinates = (standards) => {
      const coordinates = [];

      standards.forEach((standard) => {
        for (let i = 0; i < standard[0]; i++) {
          coordinates.push({
            x: standard[1] + i * 39,
            y: standard[2] + i * 22,
          });
        }
      });

      return coordinates;
    };

    setCubeCoordinates(makeCoordinates(standards));
  }, []);

  const removeCube = (ev) => {
    ev.target.visible(false);
  };

  const displayCursorPointer = (ev) => {
    const container = ev.target.getStage().container();
    container.style.cursor = 'pointer';
  };

  return (
    <Stage style={{ height: '58%' }} width={367} height={413.53}>
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
            '#62a8f2',
            0.5,
            '#b7a4ee',
            1,
            '#8bcffc',
          ]}
          shadowColor="#000000"
          shadowBlur={10}
          shadowOffset={{ x: 0, y: 10 }}
          shadowOpacity={0.4}
        />
        {cubeCoordinates?.map((coord) => (
          <RegularPolygon
            key={String(coord.x) + String(coord.y)}
            x={coord.x}
            y={coord.y}
            sides={6}
            radius={20}
            rotation={90}
            fillLinearGradientStartPoint={{ x: 20, y: 30 }}
            fillLinearGradientEndPoint={{ x: -20, y: -10 }}
            fillLinearGradientColorStops={[0, '#e8e3ff', 1, '#bd9cf2']}
            shadowColor="#000000"
            shadowBlur={4}
            shadowOffset={{ x: 1, y: 6 }}
            shadowOpacity={0.2}
            onClick={removeCube}
            onTouchEnd={removeCube}
            onMouseEnter={displayCursorPointer}
          />
        ))}
      </Layer>
    </Stage>
  );
}

export default IcePlate;
