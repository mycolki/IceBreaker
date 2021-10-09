import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stage, Layer, Group, Line, RegularPolygon, Image } from 'react-konva';

import { activateSubmit } from '../../store/quizSlice';

function IcePlate() {
  const dispatch = useDispatch();
  const imgUrl = useSelector((state) => state.quiz?.currentQuestion?.imgUrl);
  const currentQuestion = useSelector((state) => state.quiz?.currentQuestion);
  const [initialPositions, setInitialPositions] = useState([{ x: 0, y: 0 }]);
  const [image, setImage] = useState(null);
  const [newCubes, setNewCubes] = useState([]);
  const [hiddenCubes, setHiddenCubes] = useState([]);

  useEffect(() => {
    const questionImage = new window.Image();

    questionImage.src = imgUrl;
    questionImage.onload = () => {
      dispatch(activateSubmit());
    };

    setImage(questionImage);
  }, [imgUrl, dispatch]);

  useEffect(() => {
    const cubeRows = [
      [3, 239, 80],
      [5, 179, 80],
      [8, 111, 80],
      [7, 111, 120],
      [8, 79, 140],
      [7, 79, 180],
      [8, 47, 200],
      [4, 79, 260],
      [1, 111, 320],
    ];

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

    setInitialPositions(makePositions(cubeRows));

    hiddenCubes.forEach((cube) => cube.show());
    setHiddenCubes([]);
  }, [currentQuestion]);

  const hideStrongCube = (ev) => {
    ev.target.hide();
  };

  const hideCube = (ev) => {
    const pos = {
      x: ev.target.x(),
      y: ev.target.y(),
    };

    setNewCubes([...newCubes, pos]);

    ev.target.hide();
    setHiddenCubes([...hiddenCubes, ev.target]);
  };

  const displayCursorPointer = (ev) => {
    const container = ev.target.getStage().container();
    container.style.cursor = 'pointer';
  };

  return (
    <Stage style={{ height: '50%' }} width={375} height={400}>
      <Layer>
        <Line
          points={[
            15, 192, 73, 60, 230, 20, 340, 102, 360, 230, 293, 350, 90, 350,
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
          draggable="true"
        />
      </Layer>
      <Layer>
        <Image
          x={90}
          y={100}
          image={image}
          width={200}
          height={200}
          draggable="true"
        />
      </Layer>
      <Layer>
        <Group x={5} y={-7}>
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
              draggable="true"
              onMouseEnter={displayCursorPointer}
              onClick={hideCube}
            />
          ))}
        </Group>
      </Layer>
      <Layer>
        {newCubes.map((pos, i) => (
          <RegularPolygon
            key={String(pos.x) + String(pos.y) + i}
            x={pos.x + 5}
            y={pos.y - 7}
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
