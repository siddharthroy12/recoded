import { useState, useRef } from 'react';
import Header from './components/Header';
import Background from './components/Background';
import domtoimage from 'dom-to-image';
import useVideoCapture from "react-dom-to-video";
import './App.css';

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
  const [text, setText] = useState('adsa');

  const { startWatching, stopWatching, generateVideo, exportVideo } =
    useVideoCapture(
        backgroundRef.current, // node
        text, // trigger
    );

  const onExport = () => {
    setExporting(true);

    setTimeout(() => {

    const scale = 3

    const node = backgroundRef.current;

    const style = {
      transform: 'scale('+scale+')',
      transformOrigin: 'top left',
      width: node.offsetWidth + "px",
      height: node.offsetHeight + "px",
    }

    const param = {
      height: node.offsetHeight * scale,
      width: node.offsetWidth * scale,
      quality: 1,
      style
    }

    domtoimage.toPng(node, param)
      .then(function (dataUrl) {
        window.open(base64toBlobURL(dataUrl), '_blank');
        setExporting(false);
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
        setExporting(false);
      });
    }, 100);
  }

  const onRecord = () => {
    setRecording(true);
    startWatching();

    setTimeout(async () => {
      setRecording(false);

      stopWatching();
      const video = await generateVideo();
      console.log({ video });
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
        text={text}
        setText={setText}
      />
      </div>
    </>
  );
}

export default App;
