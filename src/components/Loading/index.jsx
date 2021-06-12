import React, { useState, useEffect } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { useSelector } from 'react-redux';

const Loading = (props) => {
  const isShowLoading = useSelector((state) => {
    return state.app.isShowLoading || false;
  });

  const [isShow, setIsShow] = useState(isShowLoading);

  useEffect(() => {
    setIsShow(isShowLoading);
  }, [isShowLoading]);

  return (
    <LoadingOverlay
      active={isShow}
      spinner
      styles={{
        overlay: (base) => ({
          ...base,
          height: '100vh',
          position: 'fixed',
        }),
      }}>
      {props.children}
    </LoadingOverlay>
  );
};

export default Loading;
