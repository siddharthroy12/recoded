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
        <div className={`circle background-color-${value}`} />
        <ArrowDownIcon />
        </div>
      {showOptions && (
        <div className="options" style={{ width: '40px' }}>
          {[1,2,3,4].map(number => (
            <div className="option" onClick={ () => onSelectOption(number) } key={number}>
              <div className={`circle background-color-${number}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
