import { useEffect } from 'react';
import { fabric } from 'fabric';
import styled from 'styled-components';

import getPolygon from '../../utils/getPolygon';

function Breaking() {
  useEffect(() => {
    const canvas = new fabric.Canvas('canvas', { interactive: false });

    const shadow = new fabric.Shadow({
      offsetX: 2,
      offsetY: 1,
      color: 'white',
    });
    const gradient = new fabric.Gradient({
      type: 'linear',
      gradientUnits: 'pixel',
      coords: { x1: 0, y1: 0, x2: 0, y2: 50 },
      colorStops: [
        { offset: 0, color: '#7CD0FF' },
        { offset: 1, color: 'rgba(207, 218, 255)' },
      ],
    });

    // const makeCubes = (cubeLength) => {
    //   const cubes = [];
    //   for (let i = 0; i < cubeLength; i++) {
    //     const leftDistance = 40 * i;
    //     const topDistance = 20 * i;

    //     const option = {
    //       left: distance + 10,
    //       top: topDistance + 10,
    //       strokeLineJoin: 'bevil',
    //       fill: 'white',
    //     };

    //     const cube = new fabric.Polygon(getPolygon(50, 6), option);

    //     cube.set('fill', gradient);
    //     cube.set('shadow', shadow);

    //     cubes.push(cube);
    //   }

    //   return cubes;
    // };

    // const cubes = makeCubes(5);

    // const cubeGroup = new fabric.Group(cubes, {
    //   left: 200,
    //   top: 200,
    // });
    // canvas.add(cubeGroup);

    // console.log(canvas.item());

    const hexagon = new fabric.Polygon(getPolygon(50, 6), {
      left: 10,
      top: 10,
      strokeLineJoin: 'bevil',
      subTargetCheck: true,
    });

    const hexagon2 = new fabric.Polygon(getPolygon(50, 6), {
      left: 50,
      top: 30,
      strokeLineJoin: 'bevil',
      subTargetCheck: true,
    });

    hexagon.set('fill', gradient);
    hexagon.set('shadow', shadow);
    hexagon2.set('fill', gradient);
    hexagon2.set('shadow', shadow);
    // hexagon2.selectable = false;

    canvas.add(hexagon);
    canvas.add(hexagon2);
    // hexagon.on('mousedown', (ev) => console.log(ev));
    // hexagon2.on('mousedown', (ev) => console.log(ev));
    // console.log(canvas.getActiveObject());
    canvas.on({
      'mouse:down': (ev) => {
        console.log(ev.target);

        canvas.remove(ev.target);
      },
    });

    // hexagon.on('click', (e) => {
    //   canvas.remove(canvas.getActiveObject());
    // });
  });

  return (
    <Container>
      <canvas id="canvas"></canvas>
      <h1>Breaking</h1>
    </Container>
  );
}

export default Breaking;

const Container = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.mainSkyBlueBg};
`;
