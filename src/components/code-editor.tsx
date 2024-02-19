import Editor, { EditorDidMount } from '@monaco-editor/react';
import { useRef } from 'react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

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
      console.log(getValue());
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue();

    // format the value
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });

    // set the formatted value back in the editor
  };

  return (
    <div>
      <button onClick={onFormatClick}>Format</button>
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
