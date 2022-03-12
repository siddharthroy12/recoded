import NumberInput from './NumberInput';
import BackgroundColorInput from './BackgroundColorInput';
import SelectInput from './SelectInput';
import Button from './Button';
import './index.css';

const colorsList = [
  'One Dark',
  'One Dark',
  'One Dark',
  'One Dark',
  'One Dark',
];

export default function Header({ padding, setPadding, colors, setColors,
                                 language, setLanguage, borderRadius,
                                 setBorderRadius, backgroundColor,
                                 setBackgroundColor, onExport, onRecord }) {
  return (
    <header className="header">
      <div className="header__part" style={{ minWidth: '125px' }}>
        <img src="/app_logo.svg" alt="app logo" className="app-logo"/>
        <h1 className="app-name">Recoded</h1>
      </div>
      <div className="header__part">
        <SelectInput name="Colors" value={colors} onChange={setColors} options={colorsList} />
        <NumberInput name="Padding" value={padding} onChange={setPadding} />
        <NumberInput name="Border Radius" value={borderRadius} onChange={setBorderRadius} />
        <SelectInput name="Language" value={language} onChange={setLanguage} options={['HTML', 'CSS', 'JavaScript']} />
        <BackgroundColorInput value={backgroundColor} onChange={setBackgroundColor} />
        <Button type="export" onClick={onExport}>
          Export
        </Button>
        <Button type="record" onClick={onRecord}>
          Record
        </Button>
      </div>
    </header>
  );
}
