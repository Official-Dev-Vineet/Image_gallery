import PropTypes from "prop-types";
const ImageCanvas = ({ src, alt }) => {
  return <img src={src} alt={alt} />;
};

export default ImageCanvas;

ImageCanvas.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
