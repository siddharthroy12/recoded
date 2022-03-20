import { useRef, useEffect, useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-sh";
import "ace-builds/src-noconflict/mode-plain_text";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-dart";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-django";
import "ace-builds/src-noconflict/mode-lua";
import "ace-builds/src-noconflict/mode-perl";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-julia";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-tsx";

import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/theme-ambiance";

import './index.css';

export const COLORS = {
  'One Dark': 'one_dark',
  'Dracula': 'dracula',
  'Nord': 'nord_dark',
  'Vibrant Ink': 'vibrant_ink',
}

export const LANGUAGE = {
  'C++': 'c_cpp',
  'Java': 'java',
  'Bash': 'sh',
  'Plain Text': 'plain_text',
  'Python': 'python',
  'C#': 'csharp',
  'Dart': 'django',
  'Rust': 'rust',
  'JSON': 'json',
  'HTML': 'html',
  'CSS': 'css',
  'JavaScript': 'javascript',
  'JSX': 'jsx',
  'Django': 'django',
  'Lua': 'lua',
  'Perl': 'perl',
  'PHP': 'php',
  'Julia': 'julia',
  'TypeScript': 'typescript',
  'TSX': 'tsx',
}

export default function Window({ borderRadius, fontSize,
                                 colors, language, exporting,
                                 editorState, setEditorState, exportingGIF }) {
  const editorRef = useRef(null);
  const colorsRef = useRef(null);

  useEffect(() => {
    editorRef.current.editor.moveCursorTo(editorState.row, editorState.column);
  }, [editorState]);

  const [shouldUpdate, setShouldUpdate] = useState(false)

  // set shouldUpdate => true on initial render, triggering re-render
  useEffect(() => {
    if (shouldUpdate) setShouldUpdate(false)
  }, [shouldUpdate])

  // Render twice when colors change to
  // update the title bar text background color to match the editors color
  useEffect(() => {
    if (colors !== colorsRef.current) {
      setShouldUpdate(true);
    }
    colorsRef.current = colors;
  }, [colors]);

  const backgroundColor = editorRef.current ?
    getComputedStyle(editorRef.current.refEditor)['background-color'] : null;

  return (
    <div className="window" style={{ borderRadius: borderRadius + 'px' }}>
      <div className="title-bar">
        <div className="title-buttons">
          <div className="title-button" />
          <div className="title-button" />
          <div className="title-button" />
        </div>
        <p className="title-text" contentEditable style={{ backgroundColor }}>
          App.tsx
        </p>
      </div>
      <AceEditor
        ref={editorRef}
        mode={LANGUAGE[language]}
        theme={COLORS[colors]}
        width="100%"
        highlightActiveLine={!exporting}
        showPrintMargin={false}
        value={editorState.text}
        onChange={(text, event) => {
          // To fix cursor position on autocomplete
          let finalRow = event.end.row;
          let finalColumn = event.end.column;

          if (event.start.row < event.end.row) {
            finalRow = event.start.row + 1;
          } else if (event.start.row > event.end.row) {
            finalRow = event.start.row - 1;
          }

          if (event.action === "remove") {
            finalColumn = event.start.column;
          } else if (event.start.column < event.end.column) {
            if (event.lines[0] === '  ') {
              finalColumn = event.end.column;
            } else {
              finalColumn = event.start.column + 1;
            }
          } else if (event.start.column > event.end.column) {
            finalColumn = event.start.column - 1;
          }

          setEditorState(prev => ({
            ...prev,
            text, row: finalRow, column: finalColumn
          }));
        }}
        fontSize={fontSize + 'px'}
        cursorStart={1}
        tabSize={2}
        focus={exportingGIF}
        readOnly={exportingGIF}
        onLoad={element => {
          element.renderer.setScrollMargin(10, 10);
          /* I hope this doesn't have any effect on performance */
          setInterval(() => element.resize(), 100);
        }}
        height="calc(100% - 35px)"
        setOptions={{ highlightGutterLine: !exporting }}
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  );
}
