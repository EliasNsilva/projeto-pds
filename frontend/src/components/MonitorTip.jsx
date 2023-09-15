import { useEffect, useState } from "react";
import "./MonitorTip.css";

function MonitorTip({ showHelpBox, problemDescription }) {
  const [monitorTips, setMonitorTips] = useState("");

  useEffect(() => {
    // Fetch na api pedindo dicas
    const fetchTips = async () => {
      try {
        const response = await fetch("http://localhost:8000/gpt/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ "message": problemDescription + " " + "Descreva apenas o passo a passo de um algoritmo para resolver o problema (sem código)" }),
        });
        const data = await response.json();
        const tips = data.response.split("\n");
        console.log(tips)
        setMonitorTips(tips);
        console.log(data);
      } catch (error) {
        console.log(error);
      }

    };
    fetchTips();
  }, []);

  return (
    <div className="help-box">
      {/* Conteúdo do monitor de ajuda pro chatgpt */}
      <div className="help-box-content">
        <h2 className="help-box-title">Monitor</h2>
        <div className="divider"></div>
        {/* <ul>
          <li><span className="tip">Dica 1:</span> Sempre comente seu código para torná-lo mais compreensível.</li>
          <li><span className="tip">Dica 2:</span> Utilize nomes descritivos para suas variáveis e funções.</li>
          <li><span className="tip">Dica 3:</span> Pratique a resolução de problemas para melhorar suas habilidades de codificação.</li>
          <li><span className="tip">Dica 4:</span> Utilize estruturas de dados apropriadas para otimizar o desempenho do seu programa.</li>
          <li><span className="tip">Dica 5:</span> Mantenha-se atualizado com as melhores práticas e novas tecnologias.</li>
        </ul> */}
        {/* <ul>
        {monitorTips?.map((tip, index) => {
          return <li key={index}><span className="tip">Dica:</span> {tip}</li>
        })}
        </ul> */}
        <ul>
          <li><span className="tip">Dicas:</span> {monitorTips}</li>
        </ul>

      </div>
    </div>
  );
}

export default MonitorTip;