import RecordIcon from './RecordIcon';
import ExportIcon from './ExportIcon';
import './index.css';

export default function Button({ children, type, onClick }) {
  return(<button onClick={onClick} className={`button ${type}`}>
    { children }
    {type === 'record' ?
      <RecordIcon /> : <ExportIcon />
    }
  </button>);
}
