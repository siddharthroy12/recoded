import { useEffect, useRef } from 'react';

import './index.css';

export default function Background({ backgroundColor }) {
  const backgroundRef = useRef(null);
  const handleRightRef = useRef(null);
  const handleLeftRef = useRef(null);
  const handleBottomRef = useRef(null);

  useEffect(() => {
    handleRightRef.current.addEventListener('mousedown', initResizeRight, false);
    handleLeftRef.current.addEventListener('mousedown', initResizeLeft, false);
    handleBottomRef.current.addEventListener('mousedown', initResizeBottom, false);

    return () => {
      handleRightRef.current.removeEventListener('mousedown', initResizeRight, false);
      handleLeftRef.current.removeEventListener('mousedown', initResizeLeft, false);
      handleBottomRef.current.removeEventListener('mousedown', initResizeBottom, false);
    }
  },[ initResizeRight, initResizeLeft, initResizeBottom]);

  // I cannot avoid duplicate functions here
  function initResizeRight() {
    window.addEventListener('mousemove', resizeRight, false);
    window.addEventListener('mouseup', stopResizeRight, false);
  }

  function resizeRight(e) {
    const element = backgroundRef.current;
    element.style.width = (e.clientX - element.offsetLeft) + 'px';

    if (+(element.style.width.replace('px', '')) < 400) {
      element.style.width = '400px';
    }
    if (+(element.style.width.replace('px', '')) > 800) {
      element.style.width = '800px';
    }
  }

  function stopResizeRight() {
    window.removeEventListener('mousemove', resizeRight, false);
    window.removeEventListener('mouseup', stopResizeRight, false);
  }

  function initResizeLeft() {
    window.addEventListener('mousemove', resizeLeft, false);
    window.addEventListener('mouseup', stopResizeLeft, false);
  }

  function resizeLeft(e) {
    const element = backgroundRef.current;
    element.style.width = ((window.innerWidth - e.clientX)  - element.offsetLeft) + 'px';

    if (+(element.style.width.replace('px', '')) < 400) {
      element.style.width = '400px';
    }
    if (+(element.style.width.replace('px', '')) > 800) {
      element.style.width = '800px';
    }
  }

  function stopResizeLeft() {
    window.removeEventListener('mousemove', resizeLeft, false);
    window.removeEventListener('mouseup', stopResizeLeft, false);
  }

  function initResizeBottom() {
    window.addEventListener('mousemove', resizeBottom, false);
    window.addEventListener('mouseup', stopResizeBottom, false);
  }

  function resizeBottom(e) {
    const element = backgroundRef.current;
    element.style.height = ((e.clientY + window.scrollY) - element.offsetTop) + 'px';
    if (+(element.style.height.replace('px', '')) < 300) {
      element.style.height = '300px';
    }

  }

  function stopResizeBottom() {
    window.removeEventListener('mousemove', resizeBottom, false);
    window.removeEventListener('mouseup', stopResizeBottom, false);
  }

  return (
    <div className={`background background-color-${backgroundColor}`} ref={backgroundRef}>
      <div className="resize-handle-left" ref={handleLeftRef} />
      <div className="resize-handle-right" ref={handleRightRef}/>
      <div className="resize-handle-bottom" ref={handleBottomRef}/>
    </div>
  );
}
