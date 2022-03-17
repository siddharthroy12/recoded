import RecordIcon from './RecordIcon';
import ExportIcon from './ExportIcon';
import './index.css';

export default function Button({ children, type, onClick, disabled }) {
  return(<button onClick={onClick} className={`button ${type} ${disabled ? 'disabled' : ''}`} disabled={disabled}>
    { children }
    {type === 'record' ?
      <RecordIcon /> : <ExportIcon />
    }
  </button>);
}
