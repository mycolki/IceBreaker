import { Group, RegularPolygon } from 'react-konva';

import { getRandomIndexes } from '../../../utils/getRandomIndexes';
import { CUBES_LENGTH } from '../../../constants/ice';

function Cubes({ positions, cubeRef, onHide }) {
  const colorIndexes = getRandomIndexes(CUBES_LENGTH, CUBES_LENGTH / 2);

  return (
    <Group x={-18} y={0} ref={cubeRef}>
      {positions?.map((pos, i) => {
        if (colorIndexes.has(i)) {
          return (
            <RegularPolygon
              key={String(pos.x) + String(pos.y) + i}
              x={pos.x}
              y={pos.y}
              sides={6}
              radius={17}
              rotation={90}
              fillLinearGradientStartPoint={{ x: -20, y: 0 }}
              fillLinearGradientEndPoint={{ x: 20, y: -30 }}
              fillLinearGradientColorStops={[
                0,
                '#ffffff',
                0.5,
                '#8ba5ff',
                1,
                '#7879f1',
              ]}
              stroke="#ffffff"
              strokeWidth={2}
              shadowColor="#7879f1"
              shadowBlur={1}
              shadowOffset={{ x: 8, y: 6 }}
              onMouseDown={onHide}
              onTouchStart={onHide}
              fillEnabled="true"
              perfectDrawEnabled
            />
          );
        }
        return (
          <RegularPolygon
            key={String(pos.x) + String(pos.y) + i}
            x={pos.x}
            y={pos.y}
            sides={6}
            radius={17}
            rotation={90}
            fillLinearGradientStartPoint={{ x: -10, y: -5 }}
            fillLinearGradientEndPoint={{ x: 0, y: -15 }}
            fillLinearGradientColorStops={[0, '#8EC7FF', 1, '#ffffff']}
            stroke="#ffffff"
            strokeWidth={2}
            shadowColor="#2AA0ED"
            shadowBlur={1}
            shadowOffset={{ x: 6, y: 5 }}
            onMouseDown={onHide}
            onTouchStart={onHide}
            perfectDrawEnabled={false}
          />
        );
      })}
    </Group>
  );
}

export default Cubes;
