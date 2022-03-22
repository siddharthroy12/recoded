import { useRef, useEffect, useState } from "react";
import AceEditor from "react-ace";

import LANGUAGE from './modes.js';
import COLORS from "./colors.js";

import './index.css';

export default function Window({ colors, language, exporting, padding,
                                 editorState, setEditorState, exportingGIF }) {
  const editorRef = useRef(null);
  const colorsRef = useRef(null);

  useEffect(() => {
    editorRef.current.editor.moveCursorTo(editorState.row, editorState.column);
    console.log(editorRef);
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
    <div className="window" style={{ borderRadius: padding === '0' ? '0' : '6px' }}>
      <div className="title-bar">
        <div className="title-buttons">
          <div className="title-button" />
          <div className="title-button" />
          <div className="title-button" />
        </div>
        <p className="title-text" style={{ backgroundColor }}>
          <img src={`/lang_icons/${LANGUAGE[language]}.svg`} alt="" className="language-icon"/>
          <span contentEditable>App.js</span>
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
        fontSize={'16px'}
        cursorStart={1}
        tabSize={2}
        readOnly={exportingGIF}
        onLoad={element => {
          element.renderer.setScrollMargin(10, 10);
          /* I hope this doesn't have any effect on performance */
          setInterval(() => element.resize(), 100);
        }}
        height="calc(100% - 35px)"
        setOptions={{ highlightGutterLine: !exporting, cursorStyle:"ace" }}
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  );
}
