import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stage, Layer, Group, Line, RegularPolygon, Image } from 'react-konva';

function IcePlate() {
  const dispatch = useDispatch();
  const imgUrl = useSelector((state) => state.quiz?.currentQuestion?.imgUrl);
  const [cubeCoordinates, setCubeCoordinates] = useState([{ x: 0, y: 0 }]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const questionImage = new window.Image();
    questionImage.src = imgUrl;
    setImage(questionImage);
  }, [imgUrl, dispatch]);

  useEffect(() => {
    const standards = [
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

    const makeCoordinates = (standards) => {
      const coordinates = [];

      standards.forEach((standard) => {
        for (let i = 0; i < standard[0]; i++) {
          coordinates.push({
            x: standard[1] + i * 32,
            y: standard[2] + i * 19,
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
    <Stage style={{ height: '50%' }} width={375} height={400}>
      <Layer>
        <Line
          points={[
            25, 208, 83, 85, 210, 50, 320, 115, 340, 248, 273, 350, 80, 350,
          ]}
          closed="true"
          fill="black"
          draggable="true"
        />
      </Layer>
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
          x={30}
          y={50}
          image={image}
          width={300}
          height={300}
          draggable="true"
        />
      </Layer>
      <Layer>
        <Group x={5} y={-7}>
          {cubeCoordinates?.map((coord) => (
            <RegularPolygon
              onClick={removeCube}
              key={String(coord.x) + String(coord.y)}
              x={coord.x}
              y={coord.y}
              sides={6}
              radius={17}
              rotation={90}
              fillLinearGradientStartPoint={{ x: 0, y: 30 }}
              fillLinearGradientEndPoint={{ x: 0, y: -20 }}
              fillLinearGradientColorStops={[0, '#3d9fff', 1, '#CFDAFF']}
              stroke="#ffffff"
              strokeWidth="2"
              shadowColor="#54BEFA"
              shadowBlur={1}
              shadowOffset={{ x: 6, y: 5 }}
              shadowOpacity={0.7}
              onMouseEnter={displayCursorPointer}
              draggable="true"
            />
          ))}
        </Group>
      </Layer>
    </Stage>
  );
}

export default IcePlate;
