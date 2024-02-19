import Editor, { EditorDidMount } from "@monaco-editor/react";

interface EditorProps {
  initialValue: string;
  onChange(value: string): void;
}

// Create and export instance of monaco with custom options
const CodeEditor: React.FC<EditorProps> = ({ initialValue, onChange }) => {
  // callback function to update editor values
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    monacoEditor.onDidChangeModelContent(() => {
      console.log(getValue());
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  return (
    <Editor
      language="javascript"
      value={initialValue}
      editorDidMount={onEditorDidMount}
      theme="dark"
      height="500px"
      options={{
        wordWrap: "on",
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;
