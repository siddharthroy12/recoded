import NumberInput from './NumberInput';
import BackgroundColorInput from './BackgroundColorInput';
import SelectInput from './SelectInput';
import Button from './Button';
import './index.css';
import LANGUAGE from '../Background/Window/modes';
import COLORS from '../Background/Window/colors';

export default function Header({ padding, setPadding, colors, setColors,
                                 language, setLanguage, backgroundColor,
                                 setBackgroundColor, onExport, onRecord,
                                 exportingGIF, allGIFFramesCaptured, recording }) {
  const recordButtonText = (exportingGIF || allGIFFramesCaptured) ? 'Saving' : recording ? 'Stop' : 'Record';
  return (
    <div className="header-container">
    <header className="header">
      <div className="header__part">
        <SelectInput name="Colors" value={colors} onChange={setColors} options={Object.keys(COLORS)} />
        <NumberInput name="Padding" value={padding} onChange={setPadding} />
        <SelectInput name="Language" value={language} onChange={setLanguage} options={Object.keys(LANGUAGE)} />
        <BackgroundColorInput value={backgroundColor} onChange={setBackgroundColor} />
        <Button type="export" onClick={onExport}>
          Export
        </Button>
        <Button type="record" onClick={onRecord} disabled={exportingGIF || allGIFFramesCaptured}>
          { recordButtonText }
        </Button>
      </div>
    </header>
    </div>
  );
}
