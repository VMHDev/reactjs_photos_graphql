import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Spinner } from 'reactstrap';
import { timeout } from 'utils/helper';
import './styles.scss';

const getRandomImageUrl = () => {
  const randomId = Math.trunc(Math.random() * 2000);
  return `https://picsum.photos/id/${randomId}/300/300`;
};

const RandomPhoto = (props) => {
  const { name, imageUrl, onImageUrlChange, onRandomButtonBlur } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRandomPhotoClick = () => {
    if (onImageUrlChange) {
      const randomImageUrl = getRandomImageUrl();
      onImageUrlChange(randomImageUrl);
    }
  };

  const handleErrorImage = async () => {
    setIsSubmitting(true);
    handleRandomPhotoClick();
    await timeout(1000);
    setIsSubmitting(false);
  };

  return (
    <div className='random-photo'>
      <div className='random-photo__button'>
        <Button
          outline
          name={name}
          color='primary'
          onBlur={onRandomButtonBlur}
          onClick={handleRandomPhotoClick}>
          Random a photo
        </Button>
      </div>

      <div className='random-photo__photo'>
        {isSubmitting ? (
          <div className='row align-items-center justify-content-center random-photo__spinner'>
            <div className='justify-content-center'>
              <Spinner className='random-photo__spinner__item' />
            </div>
          </div>
        ) : (
          imageUrl && (
            <img
              src={imageUrl}
              alt='Ooops ... not found. Please click random again!'
              onError={handleErrorImage}
            />
          )
        )}
      </div>
    </div>
  );
};

RandomPhoto.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  onImageUrlChange: PropTypes.func,
  onRandomButtonBlur: PropTypes.func,
};

RandomPhoto.defaultProps = {
  name: '',
  imageUrl: '',
  onImageUrlChange: null,
  onRandomButtonBlur: null,
};

export default RandomPhoto;
