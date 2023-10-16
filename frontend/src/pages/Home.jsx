import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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
  const [executionGrid, setExecutionGrid] = useState(true);
  const [executeText, setExecuteText] = useState({ executeinput: "", executeoutput: "" });
  const [trueTestCases, setTrueTestCases] = useState([]);
  const [falseTestCases, setFalseTestCases] = useState([]);
  const [testCaseTip, setTestCaseTip] = useState('');
  const [testCaseMonitorTip, setTestCaseMonitorTip] = useState('');
  const [testCaseLoading, setTestCaseLoading] = useState(false);
  const [tabValue, setTabValue] = useState("execution");
  const [monitorTips, setMonitorTips] = useState([]);
  const [textAreaHelpHeight, setTextAreaHelpHeight] = useState(0);

  const [modalStatus, setModalStatus] = useState(false);
  const handleOpenModal = () => setModalStatus(true);
  const handleCloseModal = () => setModalStatus(false);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '25px',
    boxShadow: 24,
    p: 4,
  };

  if (!id) {
    return <h1 className='text-center mt-4 font-medium'>Sem problema selecionado</h1>;
  }

  useEffect(() => {
    const fetchLastSubmission = async () => {
      const token = localStorage.getItem("token");
      console.log(id)
      console.log('Bearer ' + token)
      try {
        const response = await fetch(`http://pds-2023-1-06.edge.net.br:9006/huxley/submission/${id}/last/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: token,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch last submission data.");
        }

        const data = await response.json();
        if(data){
          setCode(data[0].code)
        }
        console.log(data)

      } catch (error) {
        console.error("An error occurred while fetching last submission data:", error);
      }
    }

    fetchLastSubmission()
  }, []);


  // Fetch problem details when the 'id' parameter changes
  useEffect(() => {
    const fetchProblem = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`http://pds-2023-1-06.edge.net.br:9006/huxley/problem/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
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
    const textCaseArea = document.getElementById("testcasetip");
    if (textCaseArea) {
      textCaseArea.style.height = "inherit";
      const computed = window.getComputedStyle(textCaseArea);
      const height = parseInt(computed.getPropertyValue("border-top-width"), 10)
        + parseInt(computed.getPropertyValue("padding-top"), 10)
        + textCaseArea.scrollHeight
        + parseInt(computed.getPropertyValue("padding-bottom"), 10)
        + parseInt(computed.getPropertyValue("border-bottom-width"), 10);
      textCaseArea.style.height = height - 10 + "px";
    }

    const textCaseMonitor = document.getElementById("testcasemonitortip");
    if (textCaseMonitor) {
      textCaseMonitor.style.height = "inherit";
      const computed = window.getComputedStyle(textCaseMonitor);
      const height = parseInt(computed.getPropertyValue("border-top-width"), 10)
        + parseInt(computed.getPropertyValue("padding-top"), 10)
        + textCaseMonitor.scrollHeight
        + parseInt(computed.getPropertyValue("padding-bottom"), 10)
        + parseInt(computed.getPropertyValue("border-bottom-width"), 10);
      textCaseMonitor.style.height = height - 10 + "px";
    }

    // Compare heigth and set big height to two textArea
    if (textCaseArea && textCaseMonitor) {
      if (textCaseArea.scrollHeight > textCaseMonitor.scrollHeight) {
        textCaseMonitor.style.height = textCaseArea.scrollHeight + "px";
        setTextAreaHelpHeight(textCaseArea.scrollHeight)
      }
      else {
        textCaseArea.style.height = textCaseMonitor.scrollHeight + "px";
        setTextAreaHelpHeight(textCaseMonitor.scrollHeight)
      }

      console.log(textCaseArea.scrollHeight, textCaseMonitor.scrollHeight)
    }

  }, [testCaseTip, testCaseMonitorTip])

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
      const response = await fetch(`http://pds-2023-1-06.edge.net.br:9006/huxley/submission/${id}`, {
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
      } else if (data.evaluation === "RUNTIME_ERROR") {
        toast.error("Tempo de execução excedido");
      } else {
        toast.error("Erro de backend na API do Huxley");
      }

      const trueTestCases = data.testCaseEvaluations?.filter(testCase => testCase.evaluation === "CORRECT") || [];
      const falseTestCases = data.testCaseEvaluations?.filter(testCase => testCase.evaluation !== "CORRECT") || [];

      // Set the execute test output to the first test case false
      if (falseTestCases.length > 0) {
        const testCase = falseTestCases[0];
        if (testCase.diff) {
          // Parse the JSON data
          const parsedData = JSON.parse(testCase.diff);
          setExecuteText({ ...executeText, ["executeoutput"]: parsedData.lines[0].actual });
        } else if (testCase.errorMsg) {
          setExecuteText({ ...executeText, ["executeoutput"]: testCase.errorMsg });
        }
      }

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

  const handleProblemGrid = () => {
    setProblemGrid(!problemGrid);
  };

  const handleExecutionGrid = () => {
    setExecutionGrid(!executionGrid);
  }

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

  const falseTestCaseTip = async (testCase) => {
    setTestCaseLoading(true)
    //console.log(testCase)

    let body = ""
    // if (testCase.evaluation === "WRONG_ANSWER") {
    //   body = `Descriçao: ${problem.description}\nCódigo: ${code}\nDiferença (entrada esperada e saída atual): ${testCase.diff}\n Explique o que posso ajustar para combinar com a descrição do problema (sem código, só lógica)`
    // } else if (testCase.evaluation === "COMPILATION_ERROR") {
    //   body = `Código: ${code}\nDiferença (entrada esperada e saída atual): ${testCase.diff}\nErro: ${testCase.errorMsg}\n Explique o que posso melhorar para corrigir o erro de compilação (sem código, só lógica)`
    // } else {
    //   body = `Código: ${code}\nDiferença (entrada esperada e saída atual): ${testCase.diff}\n Explique o que posso melhorar para corrigir o erro de compilação (sem código, só lógica)`
    // }
    body = `Descriçao: ${problem.description}\nFormato de entrada: ${problem.inputFormat}\nFormato de saida: ${problem.outputFormat}\nCódigo: ${code}\nDiferença (entrada esperada e saída atual): ${testCase.diff}\n`

    // Fetch na api pedindo dicas
    try {
      const response = await fetch("http://pds-2023-1-06.edge.net.br:9006/gpt/", {
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

      setTestCaseTip(testCase.tip ? testCase.tip : "Sem dica para esse caso de teste")
      setTestCaseMonitorTip(tips)

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
            <Grid item xs={12} md={3}>
              <div className="bg-escuros-50 p-4 rounded-3xl">
                <div className="flex justify-between mb-2">
                  <h2 className="text-xl font-semibold">Informações do Problema</h2>
                  <div
                    className="inline-flex items-center gap-[0.4rem] flex-[0_0_auto] mt-1 cursor-pointer"
                    onClick={() => {
                      handleProblemGrid();
                    }}>
                    <VisibilityOffOutlined className="relative text-principalverde-escuro" />
                    <div className="text-center [font-family:'Inter-SemiBold',Helvetica] tracking-[0] text-[1.0rem] text-principalverde-escuro font-semibold whitespace-nowrap relative">
                      <>Ocultar</>
                    </div>
                  </div>
                </div>
                <div className='p-2'>
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
                        <h2 className='font-semibold'>Formato de Entrada</h2>
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
                        className='py-0'
                      >
                        <h2 className='font-semibold'>Formato de Saída</h2>
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
              <div className="flex flex-col px-[2.6%] py-[2.4%] h-[calc(100vh-6.5rem)] overflow-hidden rounded-[2.5rem] relative border border-solid border-escuros-300 items-center gap-[2.5rem] bg-escuros-400">
                <div className="flex-col items-center gap-[1.6rem] flex-[0_0_auto] relative w-full inline-flex">
                  <div
                    className="inline-flex items-center gap-[0.4rem] flex-[0_0_auto] mt-8 cursor-pointer"
                    onClick={() => {
                      handleProblemGrid();
                    }}>
                    <VisibilityOutlined className="relative text-principalverde-escuro" />
                    <div className="text-center [font-family:'Inter-SemiBold',Helvetica] tracking-[0] text-[1.0rem] text-principalverde-escuro font-semibold whitespace-nowrap relative">
                      <>Exibir</>
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
          <Grid item xs={12} md={problemGrid ? 8 : 10}>
            <div>
              <div style={{
                borderTopLeftRadius: '25px',
                borderTopRightRadius: '25px',
                borderLeft: '2px solid #304351',
                borderRight: '2px solid #304351',
                borderTop: '2px solid #304351',
                background: '#022032',
              }} className="flex p-2 items-center">
                <div className="flex items-center w-full">
                  <div className="flex-1 ml-2">
                    <h2 className="ml-1 justify-center text-[#b1c9d7] [font-family:'Nunito-Bold',Helvetica] flex-col font-bold text-xl text-[1.4rem]">
                      Sua solução
                    </h2>
                  </div>

                  <div className="flex gap-2 mr-2">
                    <button
                      onClick={handleOfflineHuxley}
                      className="rounded-full bg-[#0B3853] hover:bg-[#123E58] focus:outline-none focus:ring focus:ring-primary-verde focus:ring-opacity-50 box-border py-2 px-4 shadow-md text-white relative"
                    >
                      <h2 className='antialiased'>Executar código</h2>
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="rounded-full bg-[#29C09B] hover:bg-[#1A7F63] focus:outline-none focus:ring focus:ring-primary-verde focus:ring-opacity-50 box-border py-2 px-4 shadow-md relative"
                    >
                      {submitting ? (
                        <div className="flex items-center antialiased">
                          Enviando
                          <CircularProgress className="ml-2" size={20} sx={{ color: 'black' }} />
                        </div>
                      ) : (
                        "Enviar resposta"
                      )}
                    </button>

                    <div>
                      <button
                        onClick={handleOpenModal}
                        className="rounded-full bg-[escuros-100] hover:bg-escuros-300 text-white focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50 box-border py-2 px-4 shadow-md relative"
                      >
                        ?
                      </button>

                      <Modal
                        open={modalStatus}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={modalStyle}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            Explicação da plataforma
                          </Typography>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <span style={{ fontWeight: 'bold' }}>Botões:</span><br />
                            Executar código: clique para executar o código e aguarde a saída<br />
                            Enviar resposta: submeta seu código para ser avaliado<br /><br />
                            <span style={{ fontWeight: 'bold' }}>Abas:</span><br />
                            Execução: veja a saída do seu código<br />
                            Casos de teste: clique nos casos de teste para ver dicas<br />
                            Ajuda: clique para obter uma ajuda em como fazer o algoritmo (lógica)
                          </Typography>

                        </Box>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px',
                borderLeft: '2px solid #304351',
                borderRight: '2px solid #304351',
                borderBottom: '2px solid #304351',
                marginBottom: '1rem',
              }}>
                <CodeMirror
                  value={code}
                  height={executionGrid ? "calc(90vh - 20rem)" : "calc(90vh - 10rem)"}
                  extensions={cpp()}
                  onChange={onChange}
                  theme={tokyoNight}
                  className='text-base'
                />
              </div>

              {/* Execution grid */}
              {executionGrid && <TabContext value={tabValue}>
                <div style={{
                  borderRadius: '25px',
                  border: '2px solid var(--escuros-300, #304351)',
                  background: 'var(--escuros-400, #022032)',
                  color: 'white',
                }}>
                  <div className="flex justify-between items-center">
                    <Tabs
                      value={tabValue}
                      onChange={handleTabValue}
                    >
                      <Tab label="Execução" value="execution" sx={{ color: 'white' }} />
                      <Tab label="Casos de teste" value="test-cases" sx={{ color: 'white' }} />
                      <Tab label="Ajuda" value="help" sx={{ color: 'white' }} />
                    </Tabs>

                    <div
                      className="inline-flex items-center gap-[0.4rem] cursor-pointer mr-6"
                      onClick={() => {
                        handleExecutionGrid();
                      }}
                    >
                      <div className="text-center [font-family:'Inter-SemiBold',Helvetica] tracking-[0] text-[1.0rem] text-principalverde-escuro font-semibold whitespace-nowrap relative">
                        <>Ocultar</>
                      </div>
                      <VisibilityOffOutlined className="relative text-principalverde-escuro" />
                    </div>
                  </div>

                  {/* Tab panel (execution) 1 */}
                  <TabPanel value={"execution"} index={0}>
                    <div className="flex justify-center gap-4">
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 mb-4 bg-[#022032]"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 mb-4 bg-[#022032]"
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

                    {!(trueTestCases.length > 0 || falseTestCases.length > 0) && ("Submeta para ver os casos de teste")}

                    <div className="flex flex-wrap">
                      {trueTestCases.map((testCase, index) => {
                        return (
                          <div key={index} className="mr-2 mb-2">
                            <button
                              onClick={() => setTestCaseTip(testCase.tip)}
                              className="bg-green-500 rounded-full text-white cursor-pointer hover:bg-green-700 focus:outline-none focus:ring focus:ring-green focus:ring-opacity-50 box-border py-1 px-2 shadow-md text-white"
                            >
                              {index + 1}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex flex-wrap">
                      {falseTestCases.map((testCase, index) => {
                        return (
                          <div key={index} className="mr-2 mb-2 flex">
                            <button
                              onClick={() => falseTestCaseTip(testCase)}
                              className="bg-red-500 rounded-full text-white cursor-pointer hover:bg-red-700 focus:outline-none focus:ring focus:ring-red focus:ring-opacity-50 box-border py-1 px-2 shadow-md text-white"
                            >
                              {trueTestCases.length + index + 1} {testCase.tip ? <TipsAndUpdatesIcon /> : null}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      {testCaseLoading ? (
                        <div className='flex justify-center items-center'>
                          <CircularProgress className='mt-2' />
                        </div>
                      ) : testCaseTip ? (
                        <div className="flex gap-x-8">
                          <textarea
                            className="w-full p-2 m-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 bg-[#022032] justify-center"
                            id="testcasetip"
                            name="testcasetip"
                            placeholder="Dica do caso de teste"
                            readOnly={true}
                            value={testCaseTip}
                            style={{
                              height: textAreaHelpHeight + "px"
                            }}
                          />

                          <textarea
                            className="w-full p-2 m-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 bg-[#022032] justify-center"
                            id="testcasemonitortip"
                            name="testcasemonitortip"
                            placeholder="Dica do caso de teste"
                            readOnly={true}
                            value={testCaseMonitorTip}
                            style={{
                              height: textAreaHelpHeight + "px"
                            }}
                          />

                        </div>
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
              </TabContext>}

              {!executionGrid && (
                <Grid item xs={12} md={12}>
                  <div className="flex px-6 py-4 w-full rounded-[2.5rem] border border-solid border-escuros-300 items-center gap-[1rem] bg-escuros-400">
                    <div className="justify-center text-[#b1c9d7] [font-family:'Nunito-Bold',Helvetica] flex-col font-bold text-xl text-[1.4rem]">
                      <>Execução</>
                    </div>

                    <div className='flex gap-1 mt-0.5'
                      onClick={() => {
                        handleExecutionGrid();
                      }}>
                      <VisibilityOutlined className="relative text-principalverde-escuro" />
                      <div className="relative text-center [font-family:'Inter-SemiBold',Helvetica] tracking-[0] text-[1.0rem] text-principalverde-escuro font-semibold">
                        <>Exibir</>
                      </div>
                    </div>

                  </div>
                </Grid>
              )}

            </div>
          </Grid>
        </Grid >
      </div >
    </div >
  );
}

export default Home;