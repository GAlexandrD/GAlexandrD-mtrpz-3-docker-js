import React, {
  FC,
  ReactNode,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import Editor from '../editor/Editor';
import Brush from '../tools/Brush';
import Tool from '../tools/Tool';

interface EditorProviderProps {
  children: ReactNode;
}

interface IEditorContext {
  editor: Editor;
  tool: Tool;
  changeTool: Function;
}

const EditorContext = React.createContext<IEditorContext>({
  editor: new Editor(),
  tool: new Brush(),
  changeTool: () => {},
});

export const useEditor = () => useContext(EditorContext);

const EditorProvider: FC<EditorProviderProps> = ({ children }) => {
  const editor = useMemo(() => new Editor(), []);
  const [tool, setTool] = useState(new Brush());
  const changeTool = (tool: Tool): void => {
    setTool(tool);
    editor.chooseTool(tool);
  };
  useEffect(() => {
    editor.chooseTool(tool);
  }, []);
  return (
    <EditorContext.Provider
      value={{
        tool: tool,
        changeTool: changeTool,
        editor: editor,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
