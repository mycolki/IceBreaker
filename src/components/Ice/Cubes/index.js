import { useState, useEffect, useRef } from 'react';
import { Group, RegularPolygon } from 'react-konva';
import useSound from 'use-sound';

import { getRandomIndexes } from '../../../utils/getRandomIndexes';
import { CUBES_LENGTH, CUBE_ROWS } from '../../../constants/ice';

function Cubes({ level, isAnswerTime }) {
  const cubesRef = useRef(null);
  const colorIndexes = getRandomIndexes(CUBES_LENGTH, CUBES_LENGTH / 2);
  const [positions, setPositions] = useState([{ x: 0, y: 0 }]);
  const [newCubes, setNewCubes] = useState([]);
  const [play] = useSound('/audio/click.mp3');

  useEffect(() => {
    const makePositions = (rows) => {
      const positions = [];
      rows.forEach((row) => {
        for (let i = 0; i < row[0]; i++) {
          positions.push({
            x: row[1] + i * 32,
            y: row[2] + i * 19,
          });
        }
      });

      return positions;
    };

    setPositions(makePositions(CUBE_ROWS));

    return () => setNewCubes([]);
  }, [level]);

  // useEffect(() => {
  //   if (!cubesRef) return;

  //   let randomIndexes;

  //   if (level >= 4) {
  //     const MIN_LENGTH = UNBREAKABLE_ICE[`Lv${level}`];
  //     randomIndexes = getRandomIndexes(CUBES_LENGTH, MIN_LENGTH);
  //   }

  //   cubesRef?.current?.children.forEach((cube, i) => {
  //     if (!cube.isVisible()) cube.show();

  //     if (level >= 4 && randomIndexes.has(i)) {
  //       cube.strokeWidth(0);
  //       cube.off('click touchstart mousedown');
  //     }
  //   });
  // }, [level, isImgLoaded]);

  const hideNewCube = (ev) => ev.target.hide();

  const hideCube = (ev) => {
    play();

    if (isAnswerTime) return;

    const pos = {
      x: ev.target.x(),
      y: ev.target.y(),
    };

    if (level >= 3) return setNewCubes([...newCubes, pos]);

    ev.target.remove();
  };

  return (
    <Group x={-18} y={0} ref={cubesRef}>
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
              onMouseDown={hideCube}
              onTouchStart={hideCube}
              onClick={hideCube}
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
            perfectDrawEnabled={false}
            onMouseDown={hideCube}
            onTouchStart={hideCube}
            onClick={hideCube}
          />
        );
      })}
      {newCubes
        ? newCubes.map((pos, i) => (
            <RegularPolygon
              key={String(pos.x) + String(pos.y) + i}
              x={pos.x - 18}
              y={pos.y - 0}
              sides={6}
              radius={17}
              rotation={90}
              fillLinearGradientStartPoint={{ x: 10, y: 5 }}
              fillLinearGradientEndPoint={{ x: 0, y: -10 }}
              fillLinearGradientColorStops={[
                0,
                '#fba85c',
                0.8,
                '#f178b6',
                1,
                '#e95353',
              ]}
              stroke="#F8E8D3"
              strokeWidth={2}
              shadowColor="#B4457E"
              shadowBlur={1}
              shadowOpacity={0.8}
              shadowOffset={{ x: 5, y: 4 }}
              onClick={hideNewCube}
              onTouchEnd={hideNewCube}
            />
          ))
        : null}
    </Group>
  );
}

export default Cubes;
