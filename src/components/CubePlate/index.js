import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Stage, Layer, Group, Line, RegularPolygon, Image } from 'react-konva';

function IcePlate() {
  const imgUrl = useSelector((state) => state.quiz?.currentQuestion?.imgUrl);
  const [cubeCoordinates, setCubeCoordinates] = useState([{ x: 0, y: 0 }]);
  const [images, setImages] = useState(null);

  useEffect(() => {
    const image = new window.Image();
    image.src = imgUrl;
    setImages(image);
  }, [imgUrl]);

  useEffect(() => {
    const standards = [
      [3, 229, 95],
      [5, 157, 95],
      [6, 121, 116],
      [7, 85, 137],
      [6, 85, 179],
      [7, 49, 200],
      [4, 85, 263],
      [2, 85, 305],
    ];

    const makeCoordinates = (standards) => {
      const coordinates = [];

      standards.forEach((standard) => {
        for (let i = 0; i < standard[0]; i++) {
          coordinates.push({
            x: standard[1] + i * 36,
            y: standard[2] + i * 21,
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
    <Stage style={{ height: '54%' }} width={367} height={400}>
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
            15, 208, 73, 80, 210, 40, 330, 112, 350, 250, 283, 360, 73, 360,
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
          image={images}
          width={300}
          height={300}
          draggable="true"
        />
      </Layer>
      <Layer>
        <Group>
          {cubeCoordinates?.map((coord) => (
            <RegularPolygon
              onClick={removeCube}
              key={String(coord.x) + String(coord.y)}
              x={coord.x}
              y={coord.y}
              sides={6}
              radius={23}
              rotation={90}
              fillLinearGradientStartPoint={{ x: 20, y: 30 }}
              fillLinearGradientEndPoint={{ x: 0, y: -10 }}
              fillLinearGradientColorStops={[0, '#54BEFA', 1, '#CFDAFF']}
              shadowColor="#000000"
              shadowBlur={4}
              shadowOffset={{ x: 1, y: 6 }}
              shadowOpacity={0.2}
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
