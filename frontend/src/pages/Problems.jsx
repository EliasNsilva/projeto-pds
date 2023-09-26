import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Table from '../components/Table';
import SidebarMenu from '../components/SidebarMenu';

const questions = [
    { id: 1, level: 1, name: 'Question 1', topics: 'Topic 1, Topic 2', status: 'Failed' },
    { id: 2, level: 2, name: 'Question 2', topics: 'Topic 3', status: 'Completed' },
    { id: 3, level: 3, name: 'Question 3', topics: 'Topic 2', status: 'Pending' },
    { id: 4, level: 1, name: 'Question 4', topics: 'Topic 1, Topic 3', status: 'Completed' },
    { id: 5, level: 5, name: 'Question 5', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 6, level: 4, name: 'Question 6', topics: 'Topic 3', status: 'Completed' },
    { id: 7, level: 1, name: 'Question 7', topics: 'Topic 2', status: 'Pending' },
    { id: 8, level: 5, name: 'Question 8', topics: 'Topic 1, Topic 3', status: 'Completed' },
    { id: 9, level: 3, name: 'Question 9', topics: 'Topic 2', status: 'Pending' },
    { id: 10, level: 4, name: 'Question 10', topics: 'Topic 1, Topic 2', status: 'Completed' },
    { id: 11, level: 2, name: 'Question 11', topics: 'Topic 3', status: 'Pending' },
    { id: 12, level: 3, name: 'Question 12', topics: 'Topic 2', status: 'Completed' },
    { id: 13, level: 1, name: 'Question 13', topics: 'Topic 1, Topic 3', status: 'Pending' },
    { id: 14, level: 2, name: 'Question 14', topics: 'Topic 2', status: 'Completed' },
    { id: 16, level: 3, name: 'Question 15', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 17, level: 4, name: 'Question 16', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 18, level: 4, name: 'Question 17', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 19, level: 4, name: 'Question 18', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 20, level: 4, name: 'Question 19', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 21, level: 4, name: 'Question 20', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 22, level: 4, name: 'Question 21', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 23, level: 4, name: 'Question 22', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 24, level: 4, name: 'Question 23', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 25, level: 4, name: 'Question 24', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 1, level: 1, name: 'Question 1', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 2, level: 2, name: 'Question 2', topics: 'Topic 3', status: 'Completed' },
    { id: 3, level: 3, name: 'Question 3', topics: 'Topic 2', status: 'Pending' },
    { id: 4, level: 1, name: 'Question 4', topics: 'Topic 1, Topic 3', status: 'Completed' },
    { id: 5, level: 2, name: 'Question 5', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 6, level: 3, name: 'Question 6', topics: 'Topic 3', status: 'Completed' },
    { id: 7, level: 1, name: 'Question 7', topics: 'Topic 2', status: 'Pending' },
    { id: 8, level: 2, name: 'Question 8', topics: 'Topic 1, Topic 3', status: 'Completed' },
    { id: 9, level: 3, name: 'Question 9', topics: 'Topic 2', status: 'Pending' },
    { id: 10, level: 1, name: 'Question 10', topics: 'Topic 1, Topic 2', status: 'Completed' },
    { id: 11, level: 2, name: 'Question 11', topics: 'Topic 3', status: 'Pending' },
    { id: 12, level: 3, name: 'Question 12', topics: 'Topic 2', status: 'Completed' },
    { id: 13, level: 1, name: 'Question 13', topics: 'Topic 1, Topic 3', status: 'Pending' },
    { id: 14, level: 2, name: 'Question 14', topics: 'Topic 2', status: 'Completed' },
    { id: 16, level: 3, name: 'Question 15', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 17, level: 4, name: 'Question 16', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 18, level: 4, name: 'Question 17', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 19, level: 4, name: 'Question 18', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 20, level: 4, name: 'Question 19', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 21, level: 4, name: 'Question 20', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 22, level: 4, name: 'Question 21', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 23, level: 4, name: 'Question 22', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 24, level: 4, name: 'Question 23', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 25, level: 4, name: 'Question 24', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 1, level: 1, name: 'Question 1', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 2, level: 2, name: 'Question 2', topics: 'Topic 3', status: 'Completed' },
    { id: 3, level: 3, name: 'Question 3', topics: 'Topic 2', status: 'Pending' },
    { id: 4, level: 1, name: 'Question 4', topics: 'Topic 1, Topic 3', status: 'Completed' },
    { id: 5, level: 2, name: 'Question 5', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 6, level: 3, name: 'Question 6', topics: 'Topic 3', status: 'Completed' },
    { id: 7, level: 1, name: 'Question 7', topics: 'Topic 2', status: 'Pending' },
    { id: 8, level: 2, name: 'Question 8', topics: 'Topic 1, Topic 3', status: 'Completed' },
    { id: 9, level: 3, name: 'Question 9', topics: 'Topic 2', status: 'Pending' },
    { id: 10, level: 1, name: 'Question 10', topics: 'Topic 1, Topic 2', status: 'Completed' },
    { id: 11, level: 2, name: 'Question 11', topics: 'Topic 3', status: 'Pending' },
    { id: 12, level: 3, name: 'Question 12', topics: 'Topic 2', status: 'Completed' },
    { id: 13, level: 1, name: 'Question 13', topics: 'Topic 1, Topic 3', status: 'Pending' },
    { id: 14, level: 2, name: 'Question 14', topics: 'Topic 2', status: 'Completed' },
    { id: 16, level: 3, name: 'Question 15', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 17, level: 4, name: 'Question 16', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 18, level: 4, name: 'Question 17', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 19, level: 4, name: 'Question 18', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 20, level: 4, name: 'Question 19', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 21, level: 4, name: 'Question 20', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 22, level: 4, name: 'Question 21', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 23, level: 4, name: 'Question 22', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 24, level: 4, name: 'Question 23', topics: 'Topic 1, Topic 2', status: 'Pending' },
    { id: 25, level: 4, name: 'Question 24', topics: 'Topic 1, Topic 2', status: 'Pending' },
    //aqui sao so exemplos de dados pra botar na tabela
];

// aqui sao as colunas da tabela
const columns = [
    { header: '', accessor: 'level' },
    { header: 'Nome', accessor: 'name' },
    { header: 'Tópicos', accessor: 'topics' },
    { header: 'Status', accessor: 'status' },
];

const Problems = () => {
    const [showTopics, setShowTopics] = useState(false);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const topics = ['Tópico 1', 'Tópico 2', 'Tópico 3', 'Tópico 2', 'Tópico 2', 'Tópico 2', 'Tópico 2', 'Tópico 2', 'Tópico 2', 'Tópico 2', 'Tópico 2', 'Tópico 2', 'Tópico 2', 'Tópico 2', 'Tópico 2', 'Tópico 2', 'Tópico 2', 'Tópico 2'];

    const toggleTopics = () => {
        setShowTopics(!showTopics);
    };

    const toggleTopic = (topic) => {
        if (selectedTopics.includes(topic)) {
            setSelectedTopics(selectedTopics.filter((item) => item !== topic));
        } else {
            setSelectedTopics([...selectedTopics, topic]);
        }
    };

    return (
        <Grid container direction="column" style={{ background: '#233142', minHeight: '100vh' }}>
            {/* Menu sidebar */}
            <SidebarMenu />

            {/* Contêiner para os Grids */}
            <Grid container item style={{ flex: '1', width: '70%', height: '50%', backgroundColor: '#e3e3e3', margin: 'auto', marginTop: '20px', padding: '20px', marginBottom: '20px' }}>
                <Grid item xs={12} style={{ backgroundColor: '#e3e3e3', padding: '10px', textAlign: 'center' }}>
                    <div style={{ marginTop: '20px', backgroundColor: '#e3e3e3', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h3>Problemas</h3>
                    </div>
                    <div style={{ borderBottom: '1px solid #233142', width: '95%', margin: '0 auto' }}></div>
                </Grid>

                {/* Grid da Esquerda com largura menor */}
                <Grid item xs={12} sm={4} style={{ backgroundColor: '#e3e3e3', height: '80vh', paddingRight: '10px', border: '1px dotted #233142' }}>
                    {/* Conteúdo do Grid 1 */}

                    <div style={{ marginTop: '20px', backgroundColor: '#e3e3e3', padding: '10px', marginLeft: '20px' }}>
                        <h3>Filtros</h3>
                    </div>
                    <div style={{ borderBottom: '1px solid #233142', width: '95%', margin: '0 auto' }}></div>
                    <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e3e3e3', border: '1px solid #233142', marginLeft: '20px' }}>
                        <textarea
                            style={{
                                width: '100%',
                                height: '30px',
                                border: 'none',
                                resize: 'none',
                                backgroundColor: '#e3e3e3',
                                outline: 'none',
                            }}
                            placeholder="Nome do problema"
                        ></textarea>
                    </div>
                    <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e3e3e3', border: '1px solid #233142', marginLeft: '20px' }}>
                        {/* Botão que exibe a lista de tópicos selecionáveis */}
                        <button onClick={toggleTopics}>
                            Selecionar Tópicos
                        </button>
                        {/* Lista de tópicos selecionáveis com barra de rolagem */}
                        {showTopics && (
                            <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                                {topics.map((topic) => (
                                    <div key={topic}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                onChange={() => toggleTopic(topic)}
                                                checked={selectedTopics.includes(topic)}
                                            />
                                            {topic}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div style={{ marginTop: '20px', backgroundColor: '#e3e3e3', padding: '10px', marginLeft: '20px' }}>
                        <h3>Nível de dificuldade</h3>
                        <select
                            style={{
                                width: '100%',
                                height: '30px',
                            }}
                        >
                            <option value="todos">Todos</option>
                            <option value="iniciante">Iniciante</option>
                            <option value="facil">Fácil</option>
                            <option value="medio">Médio</option>
                            <option value="avancado">Avançado</option>
                            <option value="expert">Expert</option>
                        </select>
                    </div>

                    <div style={{ marginTop: '20px', backgroundColor: '#e3e3e3', padding: '10px', marginLeft: '20px' }}>
                        <h3>Listar</h3>
                        <select
                            style={{
                                width: '100%',
                                height: '30px',
                            }}
                        >
                            <option value="todos">Todos</option>
                            <option value="naoResolvidos">Não resolvidos</option>
                        </select>
                    </div>

                </Grid>

                {/* Grid maior que eh o da direita*/}
                <Grid item xs={12} sm={8} style={{ backgroundColor: '#e3e3e3', height: '80vh', border: '1px dotted #233142', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ height: '100%', overflow: 'auto', backgroundColor: '#e3e3e3' }}>
                        {/* Aqui fica nossa tabela */}
                        <Table data={questions} columns={columns} />
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Problems;
