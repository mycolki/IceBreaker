import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stage, Layer, Image, Group } from 'react-konva';
import styled from 'styled-components';

import bearSrc from '../../asset/bear.png';
import { activateBreaking } from '../../store/quizSlice';
import { getRandomIndexes } from '../../utils/getRandomIndexes';
import { CUBE_ROWS, CUBES_LENGTH, UNBREAKABLE_ICE } from '../../constants/ice';

import PlateLayer from '../IceLayers/PlateLayer';
import CubesLayer from '../IceLayers/CubesLayer';
import NewCubesLayer from '../IceLayers/NewCubesLayer';
import Spinner from '../Spinner';
import LoadingPlateLayer from '../IceLayers/LoadingPlateLayer';

function IcePlate() {
  const dispatch = useDispatch();
  const currentQuestion = useSelector((state) => state.quiz?.currentQuestion);
  const imgUrl = useSelector((state) => state.quiz?.currentQuestion?.imgUrl);
  const level = useSelector((state) => state.quiz?.currentQuestion?.level);
  const isNotBreaking = useSelector((state) => state.quiz?.isNotBreaking);
  const isImageLoaded = useSelector((state) => state.quiz?.isImageLoaded);
  const initialCubesRef = useRef(null);
  const bearRef = useRef();

  const [initialPositions, setInitialPositions] = useState([{ x: 0, y: 0 }]);
  const [newCubes, setNewCubes] = useState([]);
  const [image, setImage] = useState(null);
  const [bearImage, setBearImage] = useState(null);

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
    console.log(initialCubesRef);

    // let randomIndexes;

    // if (level >= 4) {
    //   const MIN_LENGTH = UNBREAKABLE_ICE[`Lv${level}`];
    //   randomIndexes = getRandomIndexes(CUBES_LENGTH, MIN_LENGTH);
    // }
    // console.log(initialCubesRef.getChildren());
    // initialCubesRef.current.children.forEach((cube, i) => {
    //   if (!cube.isVisible()) {
    //     cube.show();
    //   }

    //   if (level >= 4 && randomIndexes.has(i)) {
    //     cube.strokeWidth(0);
    //     cube.on('click', () => cube.off('click'));
    //   }
    // });
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

  const displayCursorPointer = (ev) => {
    const container = ev.target.getStage().container();
    container.style.cursor = 'pointer';
  }; //useEffect로

  return (
    <Container>
      <Stage width={375} height={400}>
        <PlateLayer />
        <Layer>
          <Image x={90} y={100} image={image} width={200} height={200} />
        </Layer>
        <CubesLayer
          initialCubesRef={initialCubesRef}
          positions={initialPositions}
          onHide={hideCube}
          displayCursorPointer={displayCursorPointer}
        />
        <NewCubesLayer
          cubes={newCubes}
          displayCursorPointer={displayCursorPointer}
        />
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
      {!isImageLoaded ? <Spinner color="purple" /> : null}
    </Container>
  );
}

export default IcePlate;

const Container = styled.div`
  height: 50%;
`;
