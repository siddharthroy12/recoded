// This needs refactoring
import { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Background from './components/Background';
import Footer from './components/Footer';
import ForkButton from './components/ForkButton';
import domtoimage from 'dom-to-image-more';
import { createGIF } from 'gifshot';
import COLORS from './components/Background/Window/colors';
import downloadBlob from './lib/downloadBlob';
import './App.css';

const SCALE = 1.9;

function App() {
  // TODO: Refactor this to use context API
  const backgroundRef = useRef(null);
  const [padding, setPadding] = useState(42);
  const [colors, setColors] = useState(COLORS[0]);
  const [language, setLanguage] = useState('JavaScript');
  const [backgroundColor, setBackgroundColor] = useState(2);
  const [exporting, setExporting] = useState(false);
  const [exportingGIF, setExportingGIF] = useState(false);
  const [currentFrameToCapture, setCurrentFrameToCapture] = useState(0);
  const [filename, setFilename] = useState('App.js');
  const [frames, setFrames] = useState([]);
  const [gifFrames, setGIFFrames] = useState([]);
  const [editorState, setEditorState] = useState('// Type your code here');
  const [allGIFFramesCaptured, setAllGIFFramesCaptured] = useState(false);
  const [singleFrameProcessing, setSingleFrameProcessing] = useState(false);

  useEffect(() => {
    if (exportingGIF && !singleFrameProcessing) {
      if (currentFrameToCapture === (frames.length-1)) {
        setExportingGIF(false);
        setAllGIFFramesCaptured(true);
        setCurrentFrameToCapture(0);
      } else {
        setCurrentFrameToCapture(prev => prev +1);
      }
    }
  }, [exportingGIF, singleFrameProcessing, currentFrameToCapture, frames.length])

  useEffect(() => {
    if(exportingGIF) {
      setEditorState(frames[currentFrameToCapture])
    }
  }, [exportingGIF, currentFrameToCapture, frames])

  useEffect(() => {
     if (exportingGIF && !singleFrameProcessing) {
      setSingleFrameProcessing(true);

      takeSnapshot()
        .then(imageBlob => {
          setGIFFrames(prev => [...prev, imageBlob]);
          setSingleFrameProcessing(false);
        });
    }
  }, [exportingGIF, editorState, frames, singleFrameProcessing]);

  useEffect(() => {
    if (allGIFFramesCaptured && (gifFrames.length === frames.length)) {
      const width = backgroundRef.current.offsetWidth * SCALE;
      const height = backgroundRef.current.offsetHeight * SCALE;
      const framesToExport = [...gifFrames];
      for (let i = 0; i < 9; i++) {
        framesToExport.push(gifFrames[gifFrames.length-1]);
      }
      createGIF({
        images: framesToExport,
        gifWidth: width,
        gifHeight: height,
        numWorkers: 5
      }, (obj) => {
        if (!obj.error) {
          downloadBlob(obj.image, `${filename}.gif`);
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
    return base64Image;
  }

  const onExport = () => {
    setExporting(true);

    setTimeout(() => {
      takeSnapshot()
        .then(blobUrl => {
          downloadBlob(blobUrl, `${filename}.png`);
        })
        .catch(error => {
          console.log("Error: "+error);
        })
        .finally(() => setExporting(false));
    }, 100);
  }

  const onRecord = () => {
    const totalLines = editorState.split('').filter(letter => letter === '\n').length;
    let linesLeft = totalLines;
    let tempFrames = [];

    for (let i = 0; i < editorState.length; i++) {
      if (editorState[i] === '\n') {
        linesLeft--;
      }

      let currentFrame = editorState.slice(0, i+1);
      for (let j = 0; j < linesLeft; j++) {
        currentFrame += '\n';
      }

      tempFrames.push(currentFrame);
    }


    setFrames(tempFrames);
    setExportingGIF(true);
  }

  return (
    <>
      <ForkButton />
      <Header
        padding={padding} setPadding={setPadding}
        colors={colors} setColors={setColors}
        language={language} setLanguage={setLanguage}
        backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor}
        exportingGIF={exportingGIF}
        allGIFFramesCaptured={allGIFFramesCaptured}
        onExport={onExport}
        onRecord={onRecord}
      />
      <div className="center">
      <Background
        ref={backgroundRef}
        backgroundColor={backgroundColor}
        padding={padding}
        colors={colors}
        language={language}
        exporting={exporting}
        exportingGIF={exportingGIF || allGIFFramesCaptured}
        filename={filename} setFilename={setFilename}
        editorState={editorState}
        setEditorState={setEditorState}
      />
      </div>
      <Footer />
    </>
  );
}

export default App;
