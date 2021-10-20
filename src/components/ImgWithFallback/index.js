const ImgWithFallback = ({
  src,
  fallback,
  alt,
  width,
  height,
  type = 'image/webp',
}) => {
  return (
    <picture>
      <source srcSet={src} type={type} />
      <img src={fallback} alt={alt} width={width} height={height} />
    </picture>
  );
};

export default ImgWithFallback;
