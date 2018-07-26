import React, { Fragment } from 'react';

const UploadedImage = props => (
  <Fragment>
    {props.image ? (
      <div>
        <img style={{ height: `${props.height}px` }} className="image" src={`${props.image}`} alt="image" />
      </div>
    ) : (
        <h1>Upload An Image with Cmd+O</h1>
    )
    }
  </Fragment>
);

export default UploadedImage;
