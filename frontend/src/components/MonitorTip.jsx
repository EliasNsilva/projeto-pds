import { useEffect, useState } from "react";

function MonitorTip({ monitorTips, handleMonitorTips, problemDescription }) {

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
        handleMonitorTips(tips);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    if(monitorTips.length === 0) fetchTips();
  }, []);

  return (
    <>
      <ul>
        {monitorTips.map((tip, index) => {
          if (tip === "") return null;
          return (
            <li key={index}>
              {tip}
            </li>
          )
        })}
      </ul>
    </>
  );
}

export default MonitorTip;
