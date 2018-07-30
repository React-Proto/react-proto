import React, { Fragment } from 'react';
// import Rnd from 'react-rnd';
import PropTypes from 'prop-types';
import Draggable from './Draggable.jsx';

const UploadedImage = (props) => {
  const {
    image, height, components,
  } = props;
  return (
    <Fragment>
      {image ? (
        <div className="image-container">
          <img className="image" style={{ height: `${height}px` }} src={`${image}`} alt="image" />
          {components.map((component, i) => <Draggable key={i} title={component.title} />)}
        </div>
      ) : (
          <div>
            <h1>Upload An Image with Cmd+O</h1>
            <div>
              {components.map((component, i) => <Draggable key={i} title={component.title} />)}
            </div>
          </div>
      )
      }
    </Fragment>
  );
};

UploadedImage.propTypes = {
  image: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  components: PropTypes.array.isRequired,
};

export default UploadedImage;
