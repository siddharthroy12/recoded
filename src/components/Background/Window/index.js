import { useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import convertToSlug from "../../../lib/convertToSlug";
import { LANGUAGE, EXTENTION } from "./modes.js";
import { FONTS } from "./fonts.js";
import "./index.css";

const TABSIZE = 2;

export default function Window({
  colors,
  language,
  font,
  setFont,
  padding,
  editorState,
  setEditorState,
  filename,
  setFilename,
}) {
  // Rename file extention if the language is not plaintext
  useEffect(() => {
    setFilename((prev) => {
      const extensionStripped = prev.substr(0, prev.lastIndexOf("."));
      if (extensionStripped && EXTENTION[LANGUAGE[language]]) {
        return extensionStripped + `.${EXTENTION[LANGUAGE[language]]}`;
      } else {
        return prev;
      }
    });
  }, [language, setFilename]);

  const loadFont = (url) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let css = xhr.responseText;

        if (
          css.indexOf("url(https") === -1 &&
          css.indexOf("url('https") === -1 &&
          css.indexOf('url("https') === -1
        ) {
          if (css.indexOf("url('") !== -1) {
            let newUrl = url.split("/");
            newUrl.pop();
            newUrl = newUrl.join("/");
            css = css.replace(/url\('/g, "url('" + newUrl + "/");
          } else if (css.indexOf('url("') !== -1) {
            let newUrl = url.split("/");
            newUrl.pop();
            newUrl = newUrl.join("/");
            css = css.replace(/url\("/g, 'url("' + newUrl + "/");
          } else {
            let newUrl = url.split("/");
            newUrl.pop();
            newUrl = newUrl.join("/");
            css = css.replace(/url\(/g, "url(" + newUrl + "/");
          }
        }

        const head = document.getElementsByTagName("head")[0];
        const style = document.createElement("style");
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);
        console.log(style);
      }
    };
    xhr.send();
  };

  // Set editor font
  useEffect(() => {
    console.log("what?");
    setFont((prev) => {
      const font = Object.values(
        FONTS.find((f) => {
          return prev === Object.keys(f)[0];
        })
      )[0];

      if (!document.getElementById(font.fontFamily)) {
        loadFont(font.url);
        // const link = document.createElement('link')
        // link.rel = 'stylesheet'
        // link.id = font.fontFamily
        // document.head.appendChild(link)
        // link.href = font.url

        // link.crossOrigin = "anonymous"
      }

      return prev;
    });
  }, [font, setFont]);

  // For basic code formatting
  // This algorithm is not perfect but will be enough for those who were complaining
  // Even though most of the time they are gonna copy past
  function onEditorChange(code) {
    setEditorState((prev) => {
      if (code.length > prev.length) {
        let lastCharacter = code[code.length - 1];
        let secondLastCharacter = code[code.length - 2];
        let lastCharacterIndex;

        for (let i = code.length - 2; i >= 0; i--) {
          if (code[i] !== " " && code[i] !== "\n") {
            secondLastCharacter = code[i];
            break;
          }
        }

        for (let i = code.length - 1; i >= 0; i--) {
          if (code[i] !== " ") {
            lastCharacter = code[i];
            lastCharacterIndex = i;
            break;
          }
        }
        if (
          ["{", "[", "(", ":"].includes(secondLastCharacter) &&
          lastCharacter === "\n" &&
          code[lastCharacterIndex - 1] !== " "
        ) {
          return code + " ".repeat(TABSIZE);
        } else if (["}", "]", ")"].includes(lastCharacter)) {
          for (let i = code.length - 2; i >= 0; i--) {
            if (code[i] !== " ") {
              secondLastCharacter = code[i];
              break;
            }
          }
          if (
            code[lastCharacterIndex - 1] === " " &&
            secondLastCharacter === "\n"
          ) {
            let codeSplit = code.split("");
            codeSplit.splice(code.length - (1 + TABSIZE), TABSIZE);

            return codeSplit.join("");
          }
        }
      }
      return code;
    });
  }

  function onFilenameChange(event) {
    setFilename(event.currentTarget.textContent);
  }

  return (
    <div
      className="window"
      style={{ borderRadius: padding === "0" ? "0" : "6px" }}
    >
      <link href={`/themes/${convertToSlug(colors)}.css`} rel="stylesheet" />
      <div className="title-bar">
        <div className="title-buttons">
          <div className="title-button" />
          <div className="title-button" />
          <div className="title-button" />
        </div>
        <p className="title-text">
          <img
            src={`/lang_icons/${LANGUAGE[language]}.svg`}
            alt=""
            className="language-icon"
          />
          <span contentEditable onBlur={onFilenameChange}>
            {filename}
          </span>
        </p>
      </div>
      <div className="editor_wrap">
        <Editor
          value={editorState}
          onValueChange={onEditorChange}
          highlight={(code) => highlight(code, languages[LANGUAGE[language]])}
          padding={10}
          tabSize={TABSIZE}
          style={{
            fontFamily: `"${
              Object.values(FONTS.find((f) => Object.keys(f)[0] === font))[0]
                .fontFamily
            }", monospace`,
            fontSize: 15,
            outline: "none",
            lineHeight: "21px",
          }}
        />
      </div>
    </div>
  );
}
