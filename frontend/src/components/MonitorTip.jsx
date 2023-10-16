import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';

function MonitorTip({ monitorTips, handleMonitorTips, problemDescription }) {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch na api pedindo dicas
    const fetchTips = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://pds-2023-1-06.edge.net.br:9006/gpt/", {
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
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    if(monitorTips.length === 0) fetchTips();
  }, []);

  return (
    <>
      {loading && <div className="flex justify-center"><CircularProgress /></div>}
      <ul className="text-white">
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
