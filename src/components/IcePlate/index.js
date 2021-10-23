import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stage, Layer, Image } from 'react-konva';
import styled from 'styled-components';

import bearSrc from '../../asset/bear.png';
import { loadImage } from '../../store/quizSlice';

import PlateLayer from '../Ice/PlateLayer';
import Cubes from '../Ice/Cubes';
import LoadingPlateLayer from '../Ice/LoadingPlateLayer';
import DotSpinner from '../share/LoadingSpinner/DotSpinner';

function IcePlate() {
  const dispatch = useDispatch();
  const imgUrl = useSelector((state) => state.quiz?.currentQuestion?.imgUrl);
  const level = useSelector((state) => state.quiz?.currentQuestion?.level);
  const isAnswerTime = useSelector((state) => state.quiz?.isAnswerTime);
  const isImgLoaded = useSelector((state) => state.quiz?.isImgLoaded);
  const [bearImage, setBearImage] = useState(null);
  const [image, setImage] = useState(null);
  const bearRef = useRef(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = imgUrl;

    img.addEventListener('load', () => {
      dispatch(loadImage(true));
      setImage(img);
    });

    return () => dispatch(loadImage(false));
  }, [imgUrl, dispatch]);

  return (
    <Container>
      {isImgLoaded ? (
        <Stage width={375} height={400}>
          <PlateLayer />
          <Layer>
            <Image x={90} y={105} image={image} width={195} height={195} />
          </Layer>
          <Layer>
            <Cubes
              level={level}
              isAnswerTime={isAnswerTime}
              isImgLoaded={isImgLoaded}
            />
          </Layer>
        </Stage>
      ) : (
        <DotSpinner color="purple" />
      )}
      {!isImgLoaded && (
        <Stage width={375} height={400}>
          <LoadingPlateLayer />
        </Stage>
      )}
    </Container>
  );
}

export default IcePlate;

const Container = styled.div`
  height: 50%;
`;
