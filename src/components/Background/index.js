import { useEffect, useRef, forwardRef } from 'react';
import Window from './Window';
import './index.css';

const MAX_WIDTH = 1000;
const MIN_WIDTH = 400;
const MIN_HEIGHT = 200;

export default forwardRef(( props, ref ) => {
  const {
    backgroundColor,
    padding,
    colors,
    language,
    exporting,
    exportingGIF,
    editorState,
    setEditorState
  } = props;

  const backgroundRef = ref;
  /* const backgroundRef = useRef(null); */
  const handleRightRef = useRef(null);
  const handleLeftRef = useRef(null);
  const handleBottomRef = useRef(null);

  useEffect(() => {
    const backgroundEl = backgroundRef.current;
    const handleRightEl = handleRightRef.current;
    const handleLeftEl = handleLeftRef.current;
    const handleBottomEl = handleBottomRef.current;

    // I cannot avoid duplicate functions here
    function initResizeRight() {
      window.addEventListener('mousemove', resizeRight, false);
      window.addEventListener('mouseup', stopResizeRight, false);
    }

    function resizeRight(e) {
      e.preventDefault();

      backgroundEl.style.width = (e.clientX - backgroundEl.offsetLeft) + 'px';

      if (+(backgroundEl.style.width.replace('px', '')) < MIN_WIDTH) {
        backgroundEl.style.width = MIN_WIDTH + 'px';
      }
      if (+(backgroundEl.style.width.replace('px', '')) > MAX_WIDTH) {
        backgroundEl.style.width = MAX_WIDTH + 'px';
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
      e.preventDefault();
      backgroundEl.style.width = ((window.innerWidth - e.clientX)  - backgroundEl.offsetLeft) + 'px';

      if (+(backgroundEl.style.width.replace('px', '')) < MIN_WIDTH) {
        backgroundEl.style.width = MIN_WIDTH + 'px';
      }
      if (+(backgroundEl.style.width.replace('px', '')) > MAX_WIDTH) {
        backgroundEl.style.width = MAX_WIDTH + 'px';
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
      e.preventDefault();
      backgroundEl.style.height = ((e.clientY + window.scrollY) - backgroundEl.offsetTop) + 'px';
      if (+(backgroundEl.style.height.replace('px', '')) < MIN_HEIGHT) {
        backgroundEl.style.height = MIN_HEIGHT + 'px';
      }

      window.scrollTo(0,document.body.scrollHeight);
    }

    function stopResizeBottom() {
      window.removeEventListener('mousemove', resizeBottom, false);
      window.removeEventListener('mouseup', stopResizeBottom, false);
    }

    handleRightEl.addEventListener('mousedown', initResizeRight, false);
    handleLeftEl.addEventListener('mousedown', initResizeLeft, false);
    handleBottomEl.addEventListener('mousedown', initResizeBottom, false);

    return () => {
      handleRightEl.removeEventListener('mousedown', initResizeRight, false);
      handleLeftEl.removeEventListener('mousedown', initResizeLeft, false);
      handleBottomEl.removeEventListener('mousedown', initResizeBottom, false);
    }
  },[ backgroundRef ]);


  return (
    <div
      className={`background background-color-${(exporting && (backgroundColor === "transparent")) ? '' : backgroundColor}`}
      ref={backgroundRef}
      style={{ padding: padding+'px' }}>
      <div className="resize-handle-left" ref={handleLeftRef} style={{ display: !(exporting || exportingGIF) ? 'block' : 'none' }} />
      <div className="resize-handle-right" ref={handleRightRef} style={{ display: !(exporting || exportingGIF) ? 'block' : 'none' }} />
      <div className="resize-handle-bottom" ref={handleBottomRef} style={{ display: !(exporting || exportingGIF) ? 'block' : 'none' }} />
      <Window
        padding={padding}
        colors={colors}
        language={language}
        exporting={exporting}
        exportingGIF={exportingGIF}
        editorState={editorState}
        setEditorState={setEditorState}
      />
    </div>
  );
})
