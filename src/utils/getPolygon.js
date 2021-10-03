const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const getPolygon = (size, numVertexes) => {
  const interiorAngle = 360 / numVertexes;
  const radius = size / 2;
  let rotationAdjustment = 0;

  if (numVertexes % 2 === 0) {
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

export default getPolygon;
