import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stage, Layer, Image } from 'react-konva';
import styled from 'styled-components';

import bearSrc from '../../asset/bear.png';
import { activateBreaking } from '../../store/quizSlice';
import { getRandomIndexes } from '../../utils/getRandomIndexes';
import { CUBE_ROWS, CUBES_LENGTH, UNBREAKABLE_ICE } from '../../constants/ice';

import PlateLayer from '../Ice/PlateLayer';
import Cubes from '../Ice/Cubes';
import NewCubes from '../Ice/NewCubes';
import LoadingPlateLayer from '../Ice/LoadingPlateLayer';
import DotSpinner from '../share/LoadingSpinner/DotSpinner';

function IcePlate() {
  const dispatch = useDispatch();
  const currentQuestion = useSelector((state) => state.quiz?.currentQuestion);
  const imgUrl = useSelector((state) => state.quiz?.currentQuestion?.imgUrl);
  const level = useSelector((state) => state.quiz?.currentQuestion?.level);
  const isNotBreaking = useSelector((state) => state.quiz?.isNotBreaking);
  const isImageLoaded = useSelector((state) => state.quiz?.isImageLoaded);
  const initialCubesRef = useRef(null);
  const bearRef = useRef();
  const stageRef = useRef();

  const [initialPositions, setInitialPositions] = useState([{ x: 0, y: 0 }]);
  const [newCubes, setNewCubes] = useState([]);
  const [image, setImage] = useState(null);
  const [bearImage, setBearImage] = useState(null);

  useEffect(() => {
    if (stageRef) stageRef.current.container().style.cursor = 'pointer';
  }, []);

  useEffect(() => {
    const questionImage = new window.Image();
    questionImage.src = imgUrl;
    questionImage.onload = () => {
      dispatch(activateBreaking(true));
    };

    setImage(questionImage);
  }, [imgUrl, dispatch]);

  useEffect(() => {
    const bear = new window.Image();
    bear.src = bearSrc;
    setBearImage(bear);
  }, []);

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

    initialCubesRef.current.children.forEach((cube, i) => {
      if (!cube.isVisible()) {
        cube.show();
      }

      if (level >= 4 && randomIndexes.has(i)) {
        cube.strokeWidth(0);
        cube.on('click', () => cube.off('click'));
      }
    });

    return () => setNewCubes([]);
  }, [currentQuestion, level]);

  const hideCube = (ev) => {
    if (isNotBreaking) return;

    const pos = {
      x: ev.target.x(),
      y: ev.target.y(),
    };

    if (level >= 3) {
      setNewCubes([...newCubes, pos]);
    }

    ev.target.visible(false);
  };

  return (
    <Container>
      <Stage width={375} height={400} ref={stageRef}>
        <PlateLayer />
        <Layer>
          <Image x={90} y={100} image={image} width={200} height={200} />
        </Layer>
        <Layer>
          <Cubes
            initialCubesRef={initialCubesRef}
            positions={initialPositions}
            onHide={hideCube}
          />
          <NewCubes cubes={newCubes} />
        </Layer>
        <Layer>
          <Image
            ref={bearRef}
            x={90}
            y={100}
            image={bearImage}
            width={100}
            height={60}
          />
        </Layer>
        {!isImageLoaded ? <LoadingPlateLayer /> : null}
      </Stage>
      {!isImageLoaded ? <DotSpinner color="purple" /> : null}
    </Container>
  );
}

export default IcePlate;

const Container = styled.div`
  height: 50%;
`;
