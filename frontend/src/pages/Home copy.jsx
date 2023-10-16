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
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Sidebar from '../components/SidebarMenu';
import MonitorTip from '../components/MonitorTip';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import toast from 'react-hot-toast';

function Home() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(`http://pds-2023-1-06.edge.net.br:9006/huxley/problem/${id}`);
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
    // Clean before submit
    setExecuteText({ ...executeText, ["executeoutput"]: "" });
    setTestCaseTip("")
    setTrueTestCases([])
    setFalseTestCases([])

    const submit = async () => {
      try {
        // Check if local storage has token
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("username");
        const email = localStorage.getItem("email");
        // console.log(token, user, email)
        if (!token) {
          toast.error("Você precisa estar logado para submeter uma resposta");
          setSubmitting(false);
          return;
        }

        const response = await fetch(`http://pds-2023-1-06.edge.net.br:9006/huxley/submission/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "code": code,
            "token": token,
          })
        });

        // console.log("Aqui", response)
        const data = await response.json();
        // console.log("Dados", data)

        // Evaluation
        if (data.evaluation === "CORRECT") {
          toast.success("Resposta correta");
        } else if (data.evaluation === "WAITING") {
          toast.error("Submeta novamente, problema com a API do Huxley");
        } else if (data.evaluation === "COMPILATION_ERROR") {
          toast.error("Erro de compilação, analise a saída");
        } else if (data.evaluation === "WRONG_ANSWER") {
          toast.error("Resposta incorreta, analise os testes");
        } else {
          toast.error("Erro de backend na API do Huxley");
        }

        // Casos de teste
        const trueTestCases = []
        const falseTestCases = []
        data.testCaseEvaluations?.map((testCase) => {
          if (testCase.evaluation === "CORRECT") {
            trueTestCases.push(testCase)
          } else {
            falseTestCases.push(testCase)
          }
        })

        // console.log(trueTestCases)
        // console.log(falseTestCases)

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

  const [expanded, setExpanded] = useState([true, true, true]);

  const handleChange = (panel) => (event, isExpanded) => {
    const newExpanded = [...expanded];
    newExpanded[panel] = isExpanded;
    setExpanded(newExpanded);
  };

  const [problemGrid, setProblemGrid] = useState(true);

  const [showAdditionalIcon, setShowAdditionalIcon] = useState(false);
  const [showAdditionalIcon2, setShowAdditionalIcon2] = useState(false);

  const handleAdditionalIconClick = () => {
    setShowAdditionalIcon(!showAdditionalIcon);
  };

  const handleAdditionalIconClick2 = () => {
    setShowAdditionalIcon2(!showAdditionalIcon2);
  };



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
  const [testCaseLoading, setTestCaseLoading] = useState(false);

  const falseTestCaseTip = async (testCase) => {
    setTestCaseLoading(true)
    //console.log(testCase)

    let body = ""
    if (testCase.evaluation === "WRONG_ANSWER") {
      body = `Descriçao: ${problem.description}\nCódigo: ${code}\nDiferença (entrada esperada e saída atual): ${testCase.diff}\n Explique o que posso ajustar para combinar com a descrição do problema (sem código, só lógica)`
    } else if (testCase.evaluation === "COMPILATION_ERROR") {
      body = `Código: ${code}\nDiferença (entrada esperada e saída atual): ${testCase.diff}\nErro: ${testCase.errorMsg}\n Explique o que posso melhorar para corrigir o erro de compilação (sem código, só lógica)`
    } else {
      body = `Código: ${code}\nDiferença (entrada esperada e saída atual): ${testCase.diff}\n Explique o que posso melhorar para corrigir o erro de compilação (sem código, só lógica)`
    }

    // Fetch na api pedindo dicas
    try {
      /* const response = await fetch("http://pds-2023-1-06.edge.net.br:9006/gpt/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "message": body,
          "behavior": 2
        }),
      });
      const data = await response.json();
      const tips = data.response;
      console.log(tips)
      if (!(testCase.tip === "")) {
        setTestCaseTip("-Dicas do huxley:\n" + testCase.tip + "\n\n" + "-Dicas do monitor:\n" + tips)
      } else {
        setTestCaseTip("-Dicas do monitor:\n" + tips)
      } */

      setTestCaseTip(testCase.tip)

      if (testCase.diff) {
        // Parse the JSON data
        const parsedData = JSON.parse(testCase.diff);

        // Extract the "expected" and "actual" values
        const expected = parsedData.lines[0].expected;
        const actual = parsedData.lines[0].actual;

        setExecuteText({ ...executeText, ["executeoutput"]: `"Esperado": ${expected}\n"Recebido": ${actual}` });
      } else if (testCase.errorMsg) {
        setExecuteText({ ...executeText, ["executeoutput"]: testCase.errorMsg });
      } else {
        setExecuteText({ ...executeText, ["executeoutput"]: "Erro não informado, observe as dicas do monitor" });
      }

      setTestCaseLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  // Resize textarea
  useEffect(() => {
    const textArea = document.getElementById("testcasetip");
    if (textArea) {
      textArea.style.height = "inherit";
      const computed = window.getComputedStyle(textArea);
      const height = parseInt(computed.getPropertyValue("border-top-width"), 10)
        + parseInt(computed.getPropertyValue("padding-top"), 10)
        + textArea.scrollHeight
        + parseInt(computed.getPropertyValue("padding-bottom"), 10)
        + parseInt(computed.getPropertyValue("border-bottom-width"), 10);
      textArea.style.height = height + "px";
    }
  }, [testCaseTip])

  return (
    <div>
      <Sidebar handleProblemGrid={handleProblemGrid} handleExecuteGrid={handleExecuteGrid} />
      <div className=" min-h-screen first-color w-full h-full pt-4 pl-4 pr-4">
        <Grid container justifyContent="center" spacing={4} className="first-color">
          {/* Problem Grid */}
          {problemGrid && problem && (
            <Grid item xs={12} md={4} style={{ backgroundColor: '#03263B', borderRadius: '8px', height: '100vh' }}>
              <div style={{ backgroundColor: '#CCDCE7', height: '100%', padding: '16px', margin: '8px', borderRadius: '25px' }}>
                <div className="flex justify-between mb-4">
                  <h2 style={{ fontFamily: 'Nunito, sans-serif', color: '#24323E', fontSize: '32px' }}>Informações do Problema</h2>
                  <div
                    onClick={() => {
                      handleProblemGrid();
                      handleAdditionalIconClick(); // Adicione esta linha para controlar a visibilidade do ícone extra
                    }}
                    style={{ cursor: 'pointer', color: 'white' }}
                  >
                    <ArrowBackIosIcon />
                  </div>

                </div>
                {/* Description div */}
                <div style={{ backgroundColor: '#CCDCE7', height: '40%' }}>
                  <div style={{ backgroundColor: '#CCDCE7', padding: '10px', height: '98%' }}>
                    <Typography>{problem.description}</Typography>
                  </div>
                </div>


                <div style={{ backgroundColor: '#BFCFDB', padding: '10px', borderRadius: '25px', border: '2px solid #889CA8', marginBottom: '25px' }}>
                  {/* Input Format Accordion */}
                  <div>
                    <Accordion expanded={expanded[1]} onChange={handleChange(1)} style={{ background: 'transparent', border: 'none', borderRadius: '25px' }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="input-format-panel"
                        id="input-format-header"
                        style={{ borderRadius: '10px 10px 0 0' }}
                      >
                        <Typography sx={{ fontWeight: 'bold' }}>Formato de Entrada</Typography>
                      </AccordionSummary>
                      <AccordionDetails style={{ borderRadius: '0 0 10px 10px' }}>
                        <Typography>{problem.inputFormat}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>



                <div style={{ backgroundColor: '#BFCFDB', padding: '10px', borderRadius: '25px', border: '2px solid #889CA8', marginBottom: '10px' }}>
                  {/* Output Format Accordion */}
                  <div>
                    <Accordion expanded={expanded[2]} onChange={handleChange(2)} style={{ background: 'transparent', border: 'none', borderRadius: '25px' }}>
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
                </div>
              </div>
            </Grid>
          )}

          {/* Code Editor */}
          <Grid item xs={12} md={problemGrid ? executeGrid ? 4 : 6 : 8} style={{ backgroundColor: 'green' }}>

            <div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {showAdditionalIcon && (
                  <div
                    onClick={() => {
                      handleProblemGrid();
                      handleAdditionalIconClick();
                    }}
                    style={{ cursor: 'pointer', color: 'white', marginRight: '10px', marginBottom: '15px' }}
                  >
                    <ArrowForwardIosIcon />
                  </div>
                )}
                <h2 className="text-xl font-semibold text-white mb-4">Sua solução</h2>

                {showAdditionalIcon2 && (
                  <div
                    onClick={() => {
                      handleExecuteGrid();
                      handleAdditionalIconClick2();
                    }}
                    style={{ cursor: 'pointer', color: 'white', marginLeft: 'auto', marginBottom: '15px' }}
                  >
                    <ArrowBackIosIcon />
                  </div>
                )}

              </div>
              <CodeMirror
                value={code}
                height="400px"
                width="100%"
                extensions={cpp()}
                onChange={onChange}
                className='rounded'
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    onClick={() => {
                      handleExecuteGrid();
                      handleAdditionalIconClick2();
                    }}
                    style={{ cursor: 'pointer', color: 'white', marginRight: '10px', marginBottom: '15px' }}
                  >
                    <ArrowForwardIosIcon />
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-4">Execução</h2>
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
                        endIcon={testCase.tip ? <TipsAndUpdatesIcon /> : null}
                        onClick={() => falseTestCaseTip(testCase)}
                        style={{
                          backgroundColor: '#f95959',
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
              <div className='flex justify-center items-center'>
                {testCaseLoading ? (
                  <CircularProgress />
                ) : testCaseTip ? (
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mb-4"
                    id="testcasetip"
                    name="testcasetip"
                    placeholder="Dica do caso de teste"
                    readOnly={true}
                    value={testCaseTip}
                  />
                ) : null}
              </div>
            </Grid>}
          </Grid>}
        </Grid>
      </div>

      <div>
        <div
          className="floating-help-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded"
          onClick={() => setShowHelpBox(!showHelpBox)}
        >
          Ajuda
          <div className='ml-1'>
            <TipsAndUpdatesIcon />
          </div>

        </div>
        {showHelpBox && <MonitorTip showHelpBox={showHelpBox} problemDescription={problem.description} />}
      </div>
    </div>
  );
}

export default Home;