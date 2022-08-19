import NumberInput from './NumberInput';
import BackgroundColorInput from './BackgroundColorInput';
import SelectInput from './SelectInput';
import Button from './Button';
import './index.css';
import LANGUAGE from '../Background/Window/modes';
import FONTS from '../Background/Window/fonts';
import COLORS from '../Background/Window/colors';

export default function Header({ padding, setPadding, colors, setColors,
                                 language, setLanguage, font, setFont, backgroundColor,
                                 setBackgroundColor, onExport, onRecord,
                                 exportingGIF, allGIFFramesCaptured, frameDuration,
                                 setFrameDuration }) {
  const recordButtonText = (exportingGIF || allGIFFramesCaptured) ? 'Saving' : 'Export VID';
  return (
    <div className="header-container">
    <header className="header">
      <div className="header__part">
        <SelectInput name="Colors" value={colors} onChange={setColors} options={COLORS} />
        <NumberInput name="Padding" value={padding} onChange={setPadding} />
        <NumberInput name="Frame Duration" value={frameDuration} onChange={setFrameDuration} />
        <SelectInput name="Language" value={language} onChange={setLanguage} options={Object.keys(LANGUAGE)} />
        <SelectInput name="Font" value={font} onChange={setFont} options={FONTS.map(f => Object.keys(f)[0])} />
        <BackgroundColorInput value={backgroundColor} onChange={setBackgroundColor} />
        <div className="buttons">
          <Button type="export" onClick={onExport}>
            Export PNG
          </Button>
          <Button type="record" onClick={onRecord} disabled={exportingGIF || allGIFFramesCaptured}>
            { recordButtonText }
          </Button>
        </div>
      </div>
    </header>
    </div>
  );
}
