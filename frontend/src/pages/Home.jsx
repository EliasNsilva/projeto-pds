import React, { useCallback, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Grid from '@mui/material/Grid';

function Home() {
  const [code, setCode] = useState(`#include <stdio.h>\n\nint main() {\n\tprintf("Hello World!");\n\treturn 0;\n}`);

  const onChange = useCallback((value, viewUpdate) => {
    setCode(value);
  }, []);

  const handleSubmit = () => {
    console.log(code);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" className="h-screen bg-blue-500">
      <Grid item xs={10} sm={6} md={4}>
        <div>
          <h1 className="text-2xl font-bold text-white mb-4 text-center">Bem vindo</h1>
          <CodeMirror
            value={code}
            height="300px"
            width="100%"
            extensions={cpp()}
            onChange={onChange}
          />
          <div className="mt-2 text-center">
            <Button variant="contained" size="small" endIcon={<ArrowForwardIcon />} onClick={handleSubmit}>
              Submeter
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default Home;
