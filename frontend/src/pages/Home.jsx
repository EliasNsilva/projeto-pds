import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

import { htmlToPlainText } from '../utils/utils';
import Sidebar from '../components/SidebarMenu';
import MonitorTip from '../components/MonitorTip';
import toast from 'react-hot-toast';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';


function Home() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [code, setCode] = useState(`#include <stdio.h>\n\nint main() {\n\tprintf("Hello World!");\n\treturn 0;\n}`);
  const [expanded, setExpanded] = useState([true, true, true]);
  const [problemGrid, setProblemGrid] = useState(true);
  const [showAdditionalIcon, setShowAdditionalIcon] = useState(false);
  const [executeText, setExecuteText] = useState({ executeinput: "", executeoutput: "" });
  const [trueTestCases, setTrueTestCases] = useState([]);
  const [falseTestCases, setFalseTestCases] = useState([]);
  const [testCaseTip, setTestCaseTip] = useState('');
  const [testCaseLoading, setTestCaseLoading] = useState(false);
  const [tabValue, setTabValue] = useState("execution");
  const [monitorTips, setMonitorTips] = useState([]);

  if (!id) {
    return <h1 className='text-center mt-4 font-medium'>Sem problema selecionado</h1>;
  }

  // Fetch problem details when the 'id' parameter changes
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(`http://localhost:8000/huxley/problem/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch problem data.");
        }
        const data = await response.json();
        const { description, name, level, inputFormat, outputFormat } = data;
        const plainDescription = htmlToPlainText(description);
        const plainInputFormat = htmlToPlainText(inputFormat);
        const plainOutputFormat = htmlToPlainText(outputFormat);

        setProblem({
          name,
          level,
          description: plainDescription,
          inputFormat: plainInputFormat,
          outputFormat: plainOutputFormat,
        });
      } catch (error) {
        console.error("An error occurred while fetching problem data:", error);
      }
    };

    if (id) {
      fetchProblem();
    }
  }, [id]);

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

  const onChange = useCallback((value, viewUpdate) => {
    setCode(value);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    // Clean before submit
    setExecuteText({ executeinput: "", executeoutput: "" });
    setTestCaseTip("");
    setTrueTestCases([]);
    setFalseTestCases([]);

    // Check if the user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Você precisa estar logado para submeter uma resposta");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/huxley/submission/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          token: token,
        }),
      });

      const data = await response.json();

      // Handle evaluation and test cases
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

      const trueTestCases = data.testCaseEvaluations?.filter(testCase => testCase.evaluation === "CORRECT") || [];
      const falseTestCases = data.testCaseEvaluations?.filter(testCase => testCase.evaluation !== "CORRECT") || [];

      setTrueTestCases(trueTestCases);
      setFalseTestCases(falseTestCases);
      setSubmitting(false);
    } catch (error) {
      console.error("An error occurred while submitting code:", error);
      toast.error("Erro de backend na API do Huxley");
      setSubmitting(false);
    }
  };

  const handleChange = (panel) => (event, isExpanded) => {
    const newExpanded = [...expanded];
    newExpanded[panel] = isExpanded;
    setExpanded(newExpanded);
  };

  const handleAdditionalIconClick = () => {
    setShowAdditionalIcon(!showAdditionalIcon);
  };

  const handleProblemGrid = () => {
    setProblemGrid(!problemGrid);
  };

  const handleExecuteText = (id, value) => {
    setExecuteText({ ...executeText, [id]: value });
  };

  const handleOfflineHuxley = () => {
    toast.error("API do Huxley de execução offline!");
  }

  const handleTabValue = (event, newValue) => {
    console.log(newValue)
    setTabValue(newValue);
  };

  const handleMonitorTips = (newValue) => {
    setMonitorTips(newValue);
  }

  // Test cases
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
      /* const response = await fetch("http://localhost:8000/gpt/", {
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

  return (
    <div>
      <Sidebar />
      <div className="min-h-screen w-full h-full pt-4 pl-4 pr-4 pb-4 bg-principalazul">
        <Grid container justifyContent="center" spacing={2} className="bg-principalazul">
          {/* Problem Grid */}
          {problemGrid && problem && (
            <Grid item xs={12} md={4}>
              <div className="bg-escuros-50 p-4 m-2 rounded-3xl border-25">
                <div className="flex justify-between mb-4">
                  <h2 className="font-nunito text-2xl">Informações do Problema</h2>
                  <div
                    onClick={() => {
                      handleProblemGrid();
                      handleAdditionalIconClick();
                    }}
                    className="cursor-pointer text-white"
                  >
                    <ArrowBackIosIcon />
                  </div>
                </div>
                <div className='mb-2'>
                  <Typography>{problem.description}</Typography>
                </div>
                <div>
                  <div className="mb-2">
                    <Accordion
                      expanded={expanded[1]}
                      onChange={handleChange(1)}
                      sx={{
                        borderRadius: '25px',
                        border: '1px solid #889CA8',
                        background: '#BFCFDB'
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="input-format-panel"
                        id="input-format-header"
                      >
                        <Typography className="font-bold text-center">Formato de Entrada</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>{problem.inputFormat}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
                <div>
                  <div className="mb-2">
                    <Accordion
                      expanded={expanded[2]}
                      onChange={handleChange(2)}
                      sx={{
                        borderRadius: '25px',
                        border: '1px solid #889CA8',
                        background: '#BFCFDB'
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="output-format-panel"
                        id="output-format-header"
                      >
                        <Typography className="font-bold">Formato de Saída</Typography>
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

          {!problemGrid && problem && (
            <Grid item xs={12} md={1}>
              <div className="flex flex-col px-[2.6%] py-[2.4%] h-screen overflow-hidden rounded-[2.5rem] relative border border-solid border-escuros-300 items-center gap-[2.5rem] bg-escuros-400">
                <div className="flex-col items-center gap-[1.6rem] flex-[0_0_auto] relative w-full inline-flex">
                  <div className="inline-flex items-center gap-[0.8rem] flex-[0_0_auto]">
                    {/* <img className="w-[2.4rem] h-[2.4rem] relative" alt="Visibility off" src="visibility.png" /> */}
                    <div className="text-center [font-family:'Inter-SemiBold',Helvetica] tracking-[0] text-[0.8rem] text-principalverde-escuro font-semibold leading-[1.4rem] whitespace-nowrap relative">
                      <>Mostrar</>
                    </div>
                  </div>
                </div>
                <div className="relative flex justify-center h-[75%] text-[#b1c9d7] [font-family:'Nunito-Bold',Helvetica] leading-[normal] flex-col font-bold whitespace-nowrap text-[1.4rem] -rotate-90 tracking-[0]">
                  <>{id}:{problem.name}</>
                </div>
              </div>


            </Grid>
          )}

          {/* Code Editor */}
          <Grid item xs={12} md={problemGrid ? 7 : 9}>
            <div>
              <div style={{
                borderTopLeftRadius: '25px',
                borderTopRightRadius: '25px',
                border: '1px solid #304351',
                background: '#022032',
              }} className="flex p-6 items-center">
                {showAdditionalIcon && (
                  <div
                    onClick={() => {
                      handleProblemGrid();
                      handleAdditionalIconClick();
                    }}
                    className="cursor-pointer text-white mr-4 mb-2"
                  >
                    <ArrowForwardIosIcon />
                  </div>
                )}

                <div className="flex items-center w-full mb-2">
                  <div className="flex-1">
                    <h2 style={{
                      color: 'var(--escuros-100, #B1C9D7)',
                      fontFamily: 'Nunito',
                      fontSize: '32px',
                      fontStyle: 'normal',
                      fontWeight: '700',
                      lineHeight: 'normal',
                    }}
                    >
                      Sua solução
                    </h2>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="contained" size="small" endIcon={<ArrowForwardIcon />} onClick={handleOfflineHuxley}>
                      Executar Código
                    </Button>
                    <Button variant="contained" size="small" endIcon={<ArrowForwardIcon />} onClick={handleSubmit}>
                      Enviar Resposta
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <CodeMirror
                  value={code}
                  height="400px"
                  extensions={cpp()}
                  onChange={onChange}
                  className="border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mb-4"
                  theme={tokyoNight}
                />
              </div>

              {/* Execution grid */}
              <TabContext value={tabValue}>
                <div style={{
                  borderRadius: '25px',
                  border: '1px solid var(--escuros-300, #304351)',
                }}>
                  <Tabs
                    value={tabValue}
                    onChange={handleTabValue}
                    aria-label="secondary tabs example"
                  >
                    <Tab label="Execução" value="execution" />
                    <Tab label="Casos de teste" value="test-cases" disabled={!(trueTestCases.length > 0 || falseTestCases.length > 0)} />
                    <Tab label="Ajuda" value="help" />
                  </Tabs>

                  {/* Tab panel (execution) 1 */}
                  <TabPanel value={"execution"} index={0}>
                    <div className="flex justify-center gap-4">
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
                  </TabPanel>

                  {/* Tab panel 2 (test-cases) */}
                  <TabPanel value={"test-cases"} index={1}>
                    <div className="flex flex-wrap">
                      {trueTestCases.map((testCase, index) => {
                        return (
                          <div key={index} className="mr-2 mb-2">
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => setTestCaseTip(testCase.tip)}
                              className="bg-green-500 rounded-full text-white cursor-pointer"
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
                          <div key={index} className="mr-4 mb-4 flex">
                            <Button
                              variant="contained"
                              size="small"
                              endIcon={testCase.tip ? <TipsAndUpdatesIcon /> : null}
                              onClick={() => falseTestCaseTip(testCase)}
                              className="bg-red-500 rounded-full text-white cursor-pointer"
                            >
                              {trueTestCases.length + index + 1}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-center items-center">
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
                  </TabPanel>

                  {/* Tab panel 3 (help) */}
                  <TabPanel value={"help"} index={2} >
                    <div>
                      {problem?.description && <MonitorTip monitorTips={monitorTips} handleMonitorTips={handleMonitorTips} problemDescription={problem.description} />}
                    </div>
                  </TabPanel>
                </div>
              </TabContext>
            </div>
          </Grid>
        </Grid>
      </div>
    </div >
  );
}

export default Home;