import { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Background from './components/Background';
import domtoimage from 'dom-to-image';
import { createGIF } from 'gifshot';
import './App.css';

const SCALE = 1.6;

function base64toBlobURL(base64ImageData) {
  const contentType = 'image/png';
  const byteCharacters = atob(base64ImageData.substr(`data:${contentType};base64,`.length));
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, {type: contentType});
  const blobUrl = URL.createObjectURL(blob);
  return blobUrl;
}

function App() {
  const backgroundRef = useRef(null);
  // use Redux? nah, Prop drilling is cool
  const [padding, setPadding] = useState(16);
  const [colors, setColors] = useState('One Dark');
  const [language, setLanguage] = useState('HTML');
  const [borderRadius, setBorderRadius] = useState(5);
  const [backgroundColor, setBackgroundColor] = useState(2);
  const [fontSize, setFontSize] = useState(16);
  const [exporting, setExporting] = useState(false);
  const [recording, setRecording] = useState(false);
  const [exportingGIF, setExportingGIF] = useState(false);
  const [currentFrameToCapture, setCurrentFrameToCapture] = useState(0);
  const [frames, setFrames] = useState([]);
  const [gifFrames, setGIFFrames] = useState([]);
  const [editorState, setEditorState] = useState({ text: '', row: 0, column: 0 });
  const [allGIFFramesCaptured, setAllGIFFramesCaptured] = useState(false);
  const [singleFrameProcessing, setSingleFrameProcessing] = useState(false);

  useEffect(() => {
    if (recording) {
      setFrames(prev => [...prev, { ...editorState }]);
    }
  }, [recording, editorState]);

  useEffect(() => {
    if (exportingGIF && !singleFrameProcessing) {
      setTimeout(() => {
      setSingleFrameProcessing(true);
      setEditorState(({ ...frames[currentFrameToCapture], column: frames[currentFrameToCapture].text.length }))
      takeSnapshot()
        .then(imageBlob => setGIFFrames(prev => [...prev, imageBlob]));
      setCurrentFrameToCapture(prev => prev+1);

      if (currentFrameToCapture === (frames.length - 1)) {
        setExportingGIF(false);
        setAllGIFFramesCaptured(true);
        setCurrentFrameToCapture(0);
      }

      setSingleFrameProcessing(false);
      }, 1000);
    }
  }, [exportingGIF, currentFrameToCapture, frames, singleFrameProcessing]);

  useEffect(() => {
    if (allGIFFramesCaptured && (gifFrames.length === frames.length)) {
      const width = backgroundRef.current.offsetWidth * SCALE;
      const height = backgroundRef.current.offsetHeight * SCALE;
      createGIF({ images: gifFrames, gifWidth: width, gifHeight: height }, (obj) => {
        if (!obj.error) {
          let image = obj.image;
          let animatedImage = document.createElement('a');
          animatedImage.setAttribute('href', image);
          animatedImage.setAttribute('download', 'simp.gif');
          animatedImage.style.display = 'none';
          document.body.appendChild(animatedImage);
          animatedImage.click();
          document.body.removeChild(animatedImage);
        }
        setAllGIFFramesCaptured(false);
        setGIFFrames([]);
        setFrames([]);
      });
    }
  }, [allGIFFramesCaptured, gifFrames, frames]);

  const takeSnapshot = async () => {
    const node = backgroundRef.current;

    const style = {
      transform: 'scale('+SCALE+')',
      transformOrigin: 'top left',
      width: node.offsetWidth + "px",
      height: node.offsetHeight + "px",
    }

    const param = {
      height: node.offsetHeight * SCALE,
      width: node.offsetWidth * SCALE,
      quality: 1,
      style
    }

    const base64Image = await domtoimage.toPng(node, param)
    return base64toBlobURL(base64Image)
  }

  const onExport = () => {
    setExporting(true);

    setTimeout(() => {
      takeSnapshot()
        .then(blobUrl => {
          window.open(blobUrl, '_blank');
        })
        .catch(error => {
          console.log("Error: "+error);
        })
        .finally(() => setExporting(false));
    }, 100);
  }

  const onRecord = () => {
    setFrames([]);
    setRecording(true);

    setTimeout(() => {
      setRecording(false);
      setExportingGIF(true);
    }, 5000)
  }

  return (
    <>
      <Header
        padding={padding} setPadding={setPadding}
        colors={colors} setColors={setColors}
        language={language} setLanguage={setLanguage}
        borderRadius={borderRadius} setBorderRadius={setBorderRadius}
        backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor}
        fontSize={fontSize} setFontSize={setFontSize}
        onExport={onExport}
        onRecord={onRecord}
      />
      <div className="center">
      <Background
        ref={backgroundRef}
        backgroundColor={backgroundColor}
        padding={padding}
        borderRadius={borderRadius}
        fontSize={fontSize}
        colors={colors}
        language={language}
        exporting={exporting}
        editorState={editorState}
        setEditorState={setEditorState}
      />
      </div>
    </>
  );
}

export default App;
