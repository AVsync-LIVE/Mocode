import React, { useState, useEffect, useRef } from "react";
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Editor } from 'codemirror';
import styled from "styled-components";

// Import the required CodeMirror modes and addons
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/display/autorefresh';
import { Symbols } from "./Symbols";

export const Code = ({ type, callback }: { type: string, callback: (val: string) => void }) => {
  const [editorInstance, setEditorInstance] = useState<Editor | null>(null);
  
  const [currentCode, setCurrentCode] = useState<string>(() => {
    const storedCode = localStorage.getItem(type);
    try {
      return storedCode ? JSON.parse(storedCode) : "";
    } catch (error) {
      console.error("Error parsing stored code:", error);
      return "";
    }
  });

  useEffect(() => {
    localStorage.setItem(type, JSON.stringify(currentCode));
    callback(currentCode);
  }, [currentCode, type]);

  const handleChange = (editor: any, data: any, value: string) => {
    setCurrentCode(value);
  };

  const codeMirrorOptions = {
    lineNumbers: true,
    mode: type === 'html' ? 'htmlmixed' : type,
    theme: 'pastel-on-dark',
    autoCloseTags: { whenClosing: true, whenOpening: true, indentTags: [], emptyTags: [] },
    extraKeys: { 'Ctrl-Space': 'autocomplete' }, // Enable code completion with Ctrl+Space
    autoRefresh: true
  };

  const insertSymbol = (str: string) => {
    if (editorInstance) {
      const doc = editorInstance.getDoc();
      const cursor = doc.getCursor();
      doc.replaceRange(str, cursor);
      const newCursor = { line: cursor.line, ch: cursor.ch + str.length };
      doc.setCursor(newCursor); // Set the new cursor position
      editorInstance.focus(); // Focus the editor
    }
  }

  const selectAllText = () => {
    if (editorInstance) {
      const doc = editorInstance.getDoc();
      doc.setSelection({ line: 0, ch: 0 }, { line: doc.lineCount(), ch: 0 });
      editorInstance.focus(); // Focus the editor
    }
  };

  
  return (<>
    <Symbols insertSymbol={(symbol: string) => insertSymbol(symbol)} />
    <S.Code>
      <CodeMirror
        options={codeMirrorOptions}
        onChange={handleChange}
        editorDidMount={editor => {
          setEditorInstance(editor);
          editor.setValue(currentCode);
          setCurrentCode(currentCode);
        }}
      />
     
    </S.Code>
    <S.Select onClick={selectAllText}>
      Select all
    </S.Select>
  </>
   
  );
};

const S = {
  Code: styled.div`
    width: 100%;
    position: relative;
    .CodeMirror {
      height: 100% !important;
    }
  `,
  Select: styled.button`
    position: sticky;
    bottom: 1rem;
    left: 100%;
    margin-right: .75rem;
    background: #121212;
    border: none;
    border-radius: .25rem;
    color: #828282;
    height: 32px;
    padding: 0 .75rem;
  `
};
