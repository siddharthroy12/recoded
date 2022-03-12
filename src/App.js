import { useState } from 'react';
import Header from './components/Header';
import Background from './components/Background';

function App() {
  // use Redux? nah
  const [padding, setPadding] = useState(16);
  const [colors, setColors] = useState('One Dark');
  const [language, setLanguage] = useState('HTML');
  const [borderRadius, setBorderRadius] = useState(10);
  const [backgroundColor, setBackgroundColor] = useState(1);

  const onExport = () => {
  }

  const onRecord = () => {
  }

  return (
    <>
      <Header
        padding={padding} setPadding={setPadding}
        colors={colors} setColors={setColors}
        language={language} setLanguage={setLanguage}
        borderRadius={borderRadius} setBorderRadius={setBorderRadius}
        backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor}
        onExport={onExport}
        onRecord={onRecord}
      />
      <Background backgroundColor={backgroundColor} />
    </>
  );
}

export default App;
