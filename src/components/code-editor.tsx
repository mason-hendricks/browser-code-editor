import Editor, { EditorDidMount } from '@monaco-editor/react';
import { useRef } from 'react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './code-editor.css';
import './syntax.css';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

interface EditorProps {
  initialValue: string;
  onChange(value: string): void;
}

// Create and export instance of monaco with custom options
const CodeEditor: React.FC<EditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();

  // callback function to update editor values
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    //setup js code shift and highlighter
    // to fix jsx highlighting within monaco editor

    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );

    // for some reason this fixes the problem with
    // the editor automatically evaluating JS
    // everytime a character is entered,
    // thus removing console error spam.

    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  const onFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue();

    // format the value
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={onFormatClick}
      >
        Format
      </button>
      <Editor
        language='javascript'
        value={initialValue}
        editorDidMount={onEditorDidMount}
        theme='dark'
        height='500px'
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
