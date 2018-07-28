import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const UploadedImage = (props) => {
  const { image, height, components } = props;
  return (
    <Fragment>
      {image ? (
        <div>
          <img style={{ height: `${height}px` }} className="image" src={`${image}`} alt="image" />
        </div>
      ) : (
          <h1>Upload An Image with Cmd+O</h1>
      )
      }
    </Fragment >
  );
};

UploadedImage.propTypes = {
  image: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  components: PropTypes.array.isRequired,
};

export default UploadedImage;
