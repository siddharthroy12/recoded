import { useState } from 'react';
import NumberInput from './NumberInput';
import BackgroundColorInput from './BackgroundColorInput';
import SelectInput from './SelectInput';
import './index.css';

const colorsList = [
  'One Dark',
  'One Dark',
  'One Dark',
  'One Dark',
  'One Dark',
];

export default function Header() {
  const [padding, setPadding] = useState(16);
  const [colors, setColors] = useState(colorsList[0]);
  const [language, setLanguage] = useState('HTML');
  const [borderRadius, setBorderRadius] = useState(10);
  const [backgroundColor, setBackgroundColor] = useState(1);

  return (
    <header className="header">
      <div className="header__part">
        <img src="/app_logo.svg" alt="app logo" className="app-logo"/>
        <h1 className="app-name">Recoded</h1>
      </div>
      <div className="header__part">
        <SelectInput name="Colors" value={colors} onChange={setColors} options={colorsList} />
        <NumberInput name="Padding" value={padding} onChange={setPadding} />
        <NumberInput name="Border Radius" value={borderRadius} onChange={setBorderRadius} />
        <SelectInput name="Language" value={language} onChange={setLanguage} options={['HTML', 'CSS', 'JavaScript']} />
        <BackgroundColorInput value={backgroundColor} onChange={setBackgroundColor} />
      </div>
    </header>
  );
}
