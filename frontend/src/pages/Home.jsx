import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Grid from '@mui/material/Grid';
import { htmlToPlainText } from '../utils/utils';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Sidebar from '../components/Sidebar';

function Home() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(`https://www.thehuxley.com/api/v1/problems/${id}`);
        const data = await response.json();

        if (response.ok) {
          const { description, name, level, inputFormat, outputFormat } = data;
          const plainDescription = htmlToPlainText(description);
          const plainInputFormat = htmlToPlainText(inputFormat);
          const plainOutputFormat = htmlToPlainText(outputFormat);

          setProblem({ name, level, description: plainDescription, inputFormat: plainInputFormat, outputFormat: plainOutputFormat });
        } else {
          console.error("Failed to fetch problem data.");
        }
      } catch (error) {
        console.error("An error occurred while fetching problem data:", error);
      }
    };

    fetchProblem();
  }, [id]);

  const [code, setCode] = useState(`#include <stdio.h>\n\nint main() {\n\tprintf("Hello World!");\n\treturn 0;\n}`);

  const onChange = useCallback((value, viewUpdate) => {
    setCode(value);
  }, []);

  const handleSubmit = () => {
    console.log("Original code: ", code);
    const encoder = new TextEncoder();
    const binaryData = encoder.encode(code);

    console.log("Binary code: ", binaryData);

    const decoder = new TextDecoder('utf-8');
    const codeDecoded = decoder.decode(binaryData);
    console.log("Decoded code: ", codeDecoded);
  };

  if (!id) {
    return (
      <h1 className='text-center mt-4 font-medium'>Sem problema selecionado</h1>
    )
  }

  const [expanded, setExpanded] = useState(true);

  const handleExpanded = () => {
    setExpanded(!expanded);
  };

  const [problemGrid, setProblemGrid] = useState(true);

  const handleProblemGrid = () => {
    console.log("chamou")
    setProblemGrid(!problemGrid);
  };

  const [executeGrid, setExecuteGrid] = useState(true);

  const handleExecuteGrid = () => {
    setExecuteGrid(!executeGrid);
  };


  const [executeText, setExecuteText] = useState({ executeinput: "", executeoutput: "" });

  const handleExecuteText = (id, value) => {
    setExecuteText({ ...executeText, [id]: value });
  };

  return (
    <div>
      <Sidebar handleProblemGrid={handleProblemGrid} handleExecuteGrid={handleExecuteGrid} />
      <div className="first-color h-screen pt-20 pl-4 pr-4">
        <Grid container justifyContent="center" spacing={4} className="first-color">
          {/* Problem Grid */}
          {problemGrid && problem && (
            <Grid item xs={12} md={4}>
              <div>
                <div className="flex justify-between">
                  <h2 className="text-xl font-semibold text-white">Informações do Problema</h2>
                  <div onClick={() => handleProblemGrid()} style={{ cursor: 'pointer', color: 'white' }}>
                    <VisibilityIcon />
                  </div>

                </div>
                {/* Description Accordion */}
                <Accordion expanded={expanded} onChange={handleExpanded}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="description-panel"
                    id="description-header"
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>Descrição</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{problem.description}</Typography>
                  </AccordionDetails>
                </Accordion>

                {/* Input Format Accordion */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="input-format-panel"
                    id="input-format-header"
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>Formato de Entrada</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{problem.inputFormat}</Typography>
                  </AccordionDetails>
                </Accordion>

                {/* Output Format Accordion */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="output-format-panel"
                    id="output-format-header"
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>Formato de Saída</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{problem.outputFormat}</Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Grid>
          )}


          {/* Code Editor */}
          <Grid item xs={12} md={4}>
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Sua solução</h2>
              <CodeMirror
                value={code}
                height="500px"
                width="100%"
                extensions={cpp()}
                onChange={onChange}
              />
              <div className="mt-2 pb-2 text-center justify-center flex gap-x-3">
                <div>
                  <Button variant="contained" size="small" endIcon={<ArrowForwardIcon />} onClick={handleSubmit}>
                    Executar Código
                  </Button>
                </div>
                <div>
                  <Button variant="contained" size="small" endIcon={<ArrowForwardIcon />} onClick={handleSubmit}>
                    Enviar Reposta
                  </Button>
                </div>
              </div>
            </div>
          </Grid>

          {/* Execution Input and Output */}
          {executeGrid && <Grid item xs={12} md={4}>
            <div>
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold text-white mb-4">Execução</h2>
                <div onClick={() => handleExecuteGrid()} style={{ cursor: 'pointer', color: 'white' }}>
                  <VisibilityIcon />
                </div>
              </div>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mb-4"
                rows="4"
                id="executeinput"
                name="executeinput"
                placeholder="Valores de entrada para seu código"
                value={executeText.executeinput}
                onChange={(e) => {
                  console.log(e.target.id, e.target.value);
                  handleExecuteText(e.target.id, e.target.value);
                }}
              />

              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mb-4"
                rows="4"
                id="executeoutput"
                name="executeoutput"
                placeholder="Submeta e veja a saída aqui"
                readOnly={true}
                value={executeText.executeoutput}
                onChange={(e) => {
                  console.log(e.target.id, e.target.value);
                  handleExecuteText(e.target.id, e.target.value);
                }}
              />
            </div>
          </Grid>}
        </Grid>
      </div>
    </div>
  );
}

export default Home;
