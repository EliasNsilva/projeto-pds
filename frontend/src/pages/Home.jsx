import CodeMirror from '@uiw/react-codemirror';
import { useCallback } from 'react';
import { cpp } from '@codemirror/lang-cpp';

function Home() {
  const onChange = useCallback((value, viewUpdate) => {
    console.log('value:', value);
  }, []);

  return (
    <CodeMirror
      value={`#include <stdio.h> \n\tint main() { \n\tprintf("Hello World!"); \n\treturn 0;\n}`}
      height="200px"
      extensions={cpp()}
      onChange={onChange}
    />
  );
}
export default Home;

