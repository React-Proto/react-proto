import React, { Fragment } from 'react';
// import Rnd from 'react-rnd';
import PropTypes from 'prop-types';
import Draggable from './Draggable.jsx';

const UploadedImage = (props) => {
  const {
    image, components,
  } = props;
  return (
    <Fragment>
      {image ? (
        <div className="empty">
          <img className="image" src={`${image}`} alt="image" />
          <div>
            {components.map((component, i) => <Draggable key={i} title={component.title} />)}
          </div>
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
  components: PropTypes.array.isRequired,
};

export default UploadedImage;
