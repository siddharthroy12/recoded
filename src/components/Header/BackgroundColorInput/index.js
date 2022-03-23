import { useState, useRef } from 'react';
import useClickOutside from '../../../lib/useClickOutside';
import ArrowDownIcon from '../ArrowDownIcon';
import './index.css';

export default function BackgroundColorInput({ value, onChange }) {
  const [showOptions, setShowOptions] = useState(false);
  const elementRef = useRef(null);

  const onClickBox = () => {
    setShowOptions(prev => !prev);
  };

  const onSelectOption = (value) => {
    onChange(value);
    setShowOptions(false);
  }

  useClickOutside(elementRef, () => setShowOptions(false));

  return (
  <div className="select-input" ref={elementRef}>
      <label className="input-label">Background Color</label>
      <div
        className="input-box"
        style={{
          width: '40px',
          borderBottomRightRadius: showOptions ? '0' : null,
          borderBottomLeftRadius: showOptions ? '0' : null
        }}
        onClick={onClickBox}>
        <div className={`circle background-color-${value === "transparent" ? '' : value}`} style={{ backgroundColor: 'white' }} />
        <ArrowDownIcon />
        </div>
        <div className="options"
          style={{
            width: '40px',
            opacity: !showOptions ? '0' : '100%',
            pointerEvents: !showOptions ? 'none' : 'auto'
          }}>
          {[1,2,3,4,5,6].map(number => (
            <div className="option" onClick={ () => onSelectOption(number) } key={number}>
              <div className={`circle background-color-${number}`} />
            </div>
          ))}
          <div className="option" onClick={ () => onSelectOption('transparent') }>
            <div className={`circle`} style={{ backgroundColor: 'white' }}/>
          </div>
        </div>
    </div>
  );
}
