import "./MonitorTip.css";

function MonitorTip({ showHelpBox }) {
  return (
    <div className="help-box">
      {/* Conteúdo do monitor de ajuda pro chatgpt */}
      <div className="help-box-content">
        <h2 className="help-box-title">Monitor</h2>
        <div className="divider"></div> 
        <ul>
          <li><span className="tip">Dica 1:</span> Sempre comente seu código para torná-lo mais compreensível.</li>
          <li><span className="tip">Dica 2:</span> Utilize nomes descritivos para suas variáveis e funções.</li>
          <li><span className="tip">Dica 3:</span> Pratique a resolução de problemas para melhorar suas habilidades de codificação.</li>
          <li><span className="tip">Dica 4:</span> Utilize estruturas de dados apropriadas para otimizar o desempenho do seu programa.</li>
          <li><span className="tip">Dica 5:</span> Mantenha-se atualizado com as melhores práticas e novas tecnologias.</li>
        </ul>
      </div>
    </div>
  );
}

export default MonitorTip;