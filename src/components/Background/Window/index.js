import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';

import LANGUAGE from './modes.js';
import COLORS from "./colors.js";

import './index.css';
export default function Window({ colors, language, exporting, padding,
                                 editorState, setEditorState, exportingGIF }) {
  return (
    <div className="window" style={{ borderRadius: padding === '0' ? '0' : '6px' }}>
      <link href={`/themes/theme-${COLORS.indexOf(colors)+1}.css`} rel="stylesheet" />
      <div className="title-bar">
        <div className="title-buttons">
          <div className="title-button" />
          <div className="title-button" />
          <div className="title-button" />
        </div>
        <p className="title-text">
          <img src={`/lang_icons/${LANGUAGE[language]}.svg`} alt="" className="language-icon"/>
          <span contentEditable>App.js</span>
        </p>
      </div>
      <div className="editor_wrap">
      <Editor
        value={editorState}
        onValueChange={code => setEditorState(code)}
        highlight={code => highlight(code, languages[LANGUAGE[language]] )}
        padding={10}
        style={{
          fontFamily: '"Mononoki", "Fira Mono", monospace',
          fontSize: 15,
          outline: 'none',
          lineHeight: '21px'
        }}
      />
     </div>
    </div>
  );
}
