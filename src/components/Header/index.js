import NumberInput from './NumberInput';
import BackgroundColorInput from './BackgroundColorInput';
import SelectInput from './SelectInput';
import Button from './Button';
import './index.css';
import { COLORS, LANGUAGE } from '../Background/Window';

export default function Header({ padding, setPadding, colors, setColors,
                                 language, setLanguage, borderRadius,
                                 setBorderRadius, backgroundColor,
                                 setBackgroundColor, onExport, onRecord,
                                 fontSize, setFontSize }) {
  return (
    <div className="header-container">
    <header className="header">
      <div className="header__part">
        <SelectInput name="Colors" value={colors} onChange={setColors} options={Object.keys(COLORS)} />
        <NumberInput name="Padding" value={padding} onChange={setPadding} />
        <NumberInput name="Border Radius" value={borderRadius} onChange={setBorderRadius} />
        <SelectInput name="Language" value={language} onChange={setLanguage} options={Object.keys(LANGUAGE)} />
        <NumberInput name="Font Size" value={fontSize} onChange={setFontSize} />
        <BackgroundColorInput value={backgroundColor} onChange={setBackgroundColor} />
        <Button type="export" onClick={onExport}>
          Export
        </Button>
        <Button type="record" onClick={onRecord}>
          Record
        </Button>
      </div>
    </header>
    </div>
  );
}
