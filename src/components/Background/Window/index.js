import { useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import convertToSlug from '../../../lib/convertToSlug';
import { LANGUAGE, EXTENTION } from './modes.js';
import './index.css';

const TABSIZE = 2;

export default function Window({ colors, language, padding,
                                 editorState, setEditorState, filename, setFilename }) {

  // Rename file extention if the language is not plaintext
  useEffect(() => {
    setFilename(prev => {
      const extensionStripped = prev.substr(0, prev.lastIndexOf('.'));
      if (extensionStripped && EXTENTION[LANGUAGE[language]]) {
        return extensionStripped + `.${EXTENTION[LANGUAGE[language]]}`;
      } else {
        return prev
      }
    });
  }, [language, setFilename]);

  // For basic code formatting
  // This algorithm is not perfect but will be enough for those who were complaining
  // Even though most of the time they are gonna copy past
  function onEditorChange(code) {
    setEditorState(prev => {
      if (code.length > prev.length) {
        let lastCharacter = code[code.length -1];
        let secondLastCharacter = code[code.length -2];
        let lastCharacterIndex;

        for (let i = code.length - 2; i >= 0; i--) {
          if (code[i] !== ' ' && code[i] !== '\n') {
            secondLastCharacter = code[i];
            break;
          }
        }

        for (let i = code.length - 1; i >= 0; i--) {
          if (code[i] !== ' ') {
            lastCharacter = code[i];
            lastCharacterIndex = i;
            break;
          }
        }

        console.log({ secondLastCharacter });
        console.log({ lastCharacter });

        if (['{', '[', '(', ':'].includes(secondLastCharacter) && lastCharacter === '\n' && code[lastCharacterIndex - 1] !== ' ') {
          return code + ' '.repeat(TABSIZE);
        } else if (['}', ']', ')'].includes(lastCharacter)) {
          for (let i = code.length - 2; i >= 0; i--) {
             if (code[i] !== ' ') {
               secondLastCharacter = code[i];
               break;
             }
          }
          if (code[lastCharacterIndex-1] === ' ' && secondLastCharacter === '\n') {
            let codeSplit = code.split('');
            codeSplit.splice(code.length - (1 + TABSIZE), TABSIZE);

            return codeSplit.join('');
          }
        }
      }
      return code;
    })
  }

  function onFilenameChange(event) {
    setFilename(event.currentTarget.textContent);
  }

  return (
    <div className="window" style={{ borderRadius: padding === '0' ? '0' : '6px' }}>
      <link href={`/themes/${convertToSlug(colors)}.css`} rel="stylesheet" />
      <div className="title-bar">
        <div className="title-buttons">
          <div className="title-button" />
          <div className="title-button" />
          <div className="title-button" />
        </div>
        <p className="title-text">
          <img src={`/lang_icons/${LANGUAGE[language]}.svg`} alt="" className="language-icon"/>
          <span contentEditable onBlur={onFilenameChange}>{ filename }</span>
        </p>
      </div>
      <div className="editor_wrap">
      <Editor
        value={editorState}
        onValueChange={onEditorChange}
        highlight={code => highlight(code, languages[LANGUAGE[language]] )}
        padding={10}
        tabSize={TABSIZE}
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
