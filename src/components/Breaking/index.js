import styled from 'styled-components';
import { fabric } from 'fabric';

function Breaking() {
  const canvas = new fabric.Canvas('canvas');

  const getPolygon = (size, numVertexes) => {
    const interiorAngle = 360 / numVertexes;
    const radius = size / 2;
    let rotationAdjustment = 0;

    if (numVertexes % 2 == 0) {
      rotationAdjustment = interiorAngle / 2;
    }

    const coords = [];
    for (let i = 0; i < numVertexes; i++) {
      const coord = polarToCartesian(
        size,
        size,
        radius,
        i * interiorAngle + rotationAdjustment,
      );

      coords.push(coord);
    }

    return coords;
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const hexagon = new fabric.Polygon(getPolygon(50, 6), {
    left: 10,
    top: 10,
    strokeLineJoin: 'bevil',
    fill: 'white',
  });
  const shadow = new fabric.Shadow({
    offsetX: 2,
    offsetY: 1,
    color: 'white',
  });

  const gradient = new fabric.Gradient({
    type: 'linear',
    gradientUnits: 'pixel',
    coords: { x1: 0, y1: 0, x2: 0, y2: hexagon.height },
    colorStops: [
      { offset: 0, color: '#7CD0FF' },
      { offset: 1, color: 'rgba(207, 218, 255)' },
    ],
  });

  hexagon.set('fill', gradient);
  hexagon.set('shadow', shadow);

  canvas.add(hexagon);

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
