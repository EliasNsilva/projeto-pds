import { useEffect, useState } from "react";
import "./MonitorTip.css";

function MonitorTip({ showHelpBox, problemDescription }) {
  const [monitorTips, setMonitorTips] = useState([]);

  useEffect(() => {
    // Fetch na api pedindo dicas
    const fetchTips = async () => {
      try {
        const response = await fetch("http://localhost:8000/gpt/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message:
              problemDescription +
              " " +
              "Descreva apenas o passo a passo de um algoritmo para resolver o problema (sem código)",
            behavior: 1,
          }),
        });
        const data = await response.json();
        const tips = data.response.split("\n");
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
        <ul>
          {monitorTips.map((tip, index) => (
            <li key={index}>
              <span className="tip">Passo {index + 1}:</span> {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MonitorTip;
