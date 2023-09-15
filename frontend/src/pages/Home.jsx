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
import LinearProgress from '@mui/material/LinearProgress';

import Sidebar from '../components/Sidebar';
import MonitorTip from '../components/MonitorTip';
import HelpIcon from '@mui/icons-material/Help';
import toast from 'react-hot-toast';

function Home() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(`http://localhost:8000/huxley/problem/${id}`);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    const submit = async () => {
      try {
        const response = await fetch(`http://localhost:8000/huxley/submission/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "code": code
          })
        });

        console.log(response)
        const data = await response.json();
        console.log(data)

        // Evaluation
        if (data.evaluation === "CORRECT") {
          toast.success("Resposta correta");
        } else if (data.evaluation === "WAITING") {
          toast.error("Submeta novamente, problema com a API do Huxley");
        } else {
          toast.error("Resposta incorreta, analise os testes");
        }

        // Casos de teste
        const trueTestCases = []
        const falseTestCases = []
        data.testCaseEvaluations.map((testCase) => {
          if (testCase.evaluation === "CORRECT") {
            trueTestCases.push(testCase)
          } else {
            falseTestCases.push(testCase)
          }
        })

        console.log(trueTestCases)
        console.log(falseTestCases)

        // Saída da execução

        setTrueTestCases(trueTestCases)
        setFalseTestCases(falseTestCases)
        setSubmitting(false);
      } catch (error) {
        console.error("An error occurred while submitting code:", error);
        toast.error("Erro de backend na API do Huxley");
        setSubmitting(false);
      }
    };

    submit();
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

  const [showHelpBox, setShowHelpBox] = useState(false);

  const handleOfflineHuxley = () => {
    toast.error("API do Huxley de execução offline!");
  }

  // Test cases
  const [trueTestCases, setTrueTestCases] = useState([]);
  const [falseTestCases, setFalseTestCases] = useState([]);
  const [testCaseTip, setTestCaseTip] = useState("");


  return (
    <div>
      <Sidebar handleProblemGrid={handleProblemGrid} handleExecuteGrid={handleExecuteGrid} />
      <div className=" min-h-screen first-color w-full h-full pt-20 pl-4 pr-4">
        <Grid container justifyContent="center" spacing={4} className="first-color">
          {/* Problem Grid */}
          {problemGrid && problem && (
            <Grid item xs={12} md={4}>
              <div className='mb-4'>
                <div className="flex justify-between mb-4">
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
          <Grid item xs={12} md={problemGrid ? executeGrid ? 4 : 6 : 8}>
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Sua solução</h2>
              <CodeMirror
                value={code}
                height="400px"
                width="100%"
                extensions={cpp()}
                onChange={onChange}
              />
              <div className="mt-2 pb-2 text-center justify-center flex gap-x-3">
                <div>
                  <Button variant="contained" size="small" endIcon={<ArrowForwardIcon />} onClick={handleOfflineHuxley}>
                    Executar Código
                  </Button>
                </div>
                <div>
                  <Button variant="contained" size="small" endIcon={<ArrowForwardIcon />} onClick={handleSubmit}>
                    Enviar Reposta
                  </Button>
                </div>
              </div>
              <div>
                {submitting && <LinearProgress />}
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
              />
            </div>

            {/* Test Cases */}
            {(trueTestCases.length > 0 || falseTestCases.length > 0) && <Grid item xs={12} md={12}>
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold text-white mb-4">Casos de Teste</h2>
              </div>
              <div className="flex flex-wrap">
                {trueTestCases.map((testCase, index) => {
                  return (
                    <div key={index} style={{ marginRight: '10px', marginBottom: '10px', display: 'flex' }}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => setTestCaseTip(testCase.tip)}
                        style={{
                          backgroundColor: 'green',
                          borderRadius: '999px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontWeight: 'normal',
                          cursor: 'pointer',
                          border: 'none',
                        }}
                      >
                        {index + 1}
                      </Button>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap">
                {falseTestCases.map((testCase, index) => {
                  return (
                    <div key={index} style={{ marginRight: '10px', marginBottom: '10px', display: 'flex' }}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => setTestCaseTip(testCase.tip)}
                        style={{
                          backgroundColor: testCase.tip ? 'red' : '#f95959',
                          borderRadius: '999px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontWeight: 'normal',
                          cursor: 'pointer',
                          border: 'none',
                        }}
                      >
                        {trueTestCases.length + index + 1}
                      </Button>
                    </div>
                  );
                })}
              </div>
              <div>
                {testCaseTip && <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mb-4"
                  rows="4"
                  id="testcasetip"
                  name="testcasetip"
                  placeholder="Dica do caso de teste"
                  readOnly={true}
                  value={testCaseTip}
                />}
              </div>
            </Grid>}
          </Grid>}
        </Grid>
      </div>

      <div>
        <div
          className="floating-help-button"
          onClick={() => setShowHelpBox(!showHelpBox)}
        >
          <HelpIcon fontSize="large" />
        </div>
        {showHelpBox && <MonitorTip showHelpBox={showHelpBox} />}
      </div>
    </div>
  );
}

export default Home;