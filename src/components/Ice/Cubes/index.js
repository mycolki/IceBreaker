import { Group, RegularPolygon } from 'react-konva';

import { getRandomIndexes } from '../../../utils/getRandomIndexes';
import { CUBES_LENGTH } from '../../../constants/ice';

function Cubes({ positions, initialCubesRef, onHide }) {
  const colorIndexes = getRandomIndexes(CUBES_LENGTH, CUBES_LENGTH / 2);

  return (
    <Group x={-13} y={0} ref={initialCubesRef}>
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
              shadowOffset={{ x: 6, y: 5 }}
              onClick={onHide}
              fillEnabled="true"
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
            onClick={onHide}
          />
        );
      })}
    </Group>
  );
}

export default Cubes;
