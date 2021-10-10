import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stage, Layer, Line, RegularPolygon, Image } from 'react-konva';

import { activateSubmit } from '../../store/quizSlice';
import { getRandomIndexes } from '../../utils/getRandomIndexes';
import {
  INITIAL_CUBES,
  CUBE_ROWS,
  CUBES_LENGTH,
  UNBREAKABLE_ICE,
} from '../../constants/ice';

function IcePlate() {
  const dispatch = useDispatch();
  const stageRef = useRef();
  const currentQuestion = useSelector((state) => state.quiz?.currentQuestion);
  const imgUrl = useSelector((state) => state.quiz?.currentQuestion?.imgUrl);
  const level = useSelector((state) => state.quiz?.currentQuestion?.level);
  const enableSubmit = useSelector((state) => state.quiz?.enableSubmit);

  const [initialPositions, setInitialPositions] = useState([{ x: 0, y: 0 }]);
  const [image, setImage] = useState(null);
  const [newCubes, setNewCubes] = useState([]);

  useEffect(() => {
    const questionImage = new window.Image();

    questionImage.src = imgUrl;
    questionImage.onload = () => {
      dispatch(activateSubmit());
    };

    setImage(questionImage);
  }, [imgUrl, dispatch]);

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

    setInitialPositions(makePositions(CUBE_ROWS));

    let randomIndexes;

    if (level >= 4) {
      const MIN_LENGTH = UNBREAKABLE_ICE[`Lv${level}`];
      randomIndexes = getRandomIndexes(CUBES_LENGTH, MIN_LENGTH);
    }

    stageRef.current.children.forEach((layer) => {
      if (layer.attrs.id === INITIAL_CUBES) {
        layer.children.forEach((cube, i) => {
          if (!cube.isVisible()) {
            cube.show();
          }

          if (level >= 4 && randomIndexes.has(i)) {
            cube.on('click', () => cube.off('click'));
            cube.fill('white');
            cube.strokeWidth(0);
          }
        });
      }
    });
  }, [currentQuestion, level]);

  const hideStrongCube = (ev) => {
    ev.target.hide();
  };

  const hideCube = (ev) => {
    if (enableSubmit) return;

    const pos = {
      x: ev.target.x(),
      y: ev.target.y(),
    };

    if (level >= 3) {
      setNewCubes([...newCubes, pos]);
    }

    ev.target.visible(false);
  };

  const displayCursorPointer = (ev) => {
    const container = ev.target.getStage().container();
    container.style.cursor = 'pointer';
  };

  return (
    <Stage style={{ height: '50%' }} width={375} height={400} ref={stageRef}>
      <Layer>
        <Line
          points={[
            15, 192, 73, 60, 230, 20, 340, 102, 360, 230, 293, 355, 90, 355,
          ]}
          closed="true"
          fillLinearGradientStartPoint={{ x: 100, y: -80, z: 0 }}
          fillLinearGradientEndPoint={{ x: -30, y: 0, z: 0 }}
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
      </Layer>
      <Layer>
        <Image x={90} y={100} image={image} width={200} height={200} />
      </Layer>
      <Layer id="initial-cubes" x={-4} y={-3}>
        {initialPositions?.map((pos, i) => (
          <RegularPolygon
            key={String(pos.x) + String(pos.y) + i}
            x={pos.x}
            y={pos.y}
            sides={6}
            radius={17}
            rotation={90}
            fillLinearGradientStartPoint={{ x: 0, y: 30 }}
            fillLinearGradientEndPoint={{ x: 0, y: -20 }}
            fillLinearGradientColorStops={[0, '#3d9fff', 1, '#CFDAFF']}
            stroke="#ffffff"
            strokeWidth={2}
            shadowColor="#54BEFA"
            shadowBlur={1}
            shadowOffset={{ x: 6, y: 5 }}
            shadowOpacity={0.7}
            onMouseEnter={displayCursorPointer}
            onClick={hideCube}
          />
        ))}
      </Layer>
      <Layer>
        {newCubes.map((pos, i) => (
          <RegularPolygon
            key={String(pos.x) + String(pos.y) + i}
            x={pos.x - 4}
            y={pos.y - 3}
            sides={6}
            radius={17}
            rotation={90}
            fillLinearGradientStartPoint={{ x: 0, y: 30 }}
            fillLinearGradientEndPoint={{ x: 0, y: -20 }}
            fillLinearGradientColorStops={[0, '#fba85c', 1, '#CFDAFF']}
            stroke="#ffffff"
            strokeWidth={2}
            shadowColor="#54BEFA"
            shadowBlur={1}
            shadowOffset={{ x: 6, y: 5 }}
            shadowOpacity={0.7}
            onMouseEnter={displayCursorPointer}
            onClick={hideStrongCube}
          />
        ))}
      </Layer>
    </Stage>
  );
}

export default IcePlate;
