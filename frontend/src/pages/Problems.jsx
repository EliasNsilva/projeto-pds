import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Table from '../components/Table';
import SidebarMenu from '../components/SidebarMenu';
import './Problems.css';

const columns = [
    { header: '', accessor: 'level' },
    { header: 'Nome', accessor: 'name' },
    { header: 'Tópicos', accessor: 'topics' },
    { header: 'Status', accessor: 'status' },
];

const Problems = () => {
    const [showTopics, setShowTopics] = useState(false);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [problemData, setProblemData] = useState([]); // guarda os dados da API

    const topics = ['Tópico 1', 'Tópico 2', 'Tópico 3', 'Tópico 4', 'Tópico 5'];

    // pegaa dados da API
    const fetchProblemData = async () => {
        try {
            const response = await fetch('https://www.thehuxley.com/api/v1/problems?max=10&offset=0&problemType=ALGORITHM');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setProblemData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    
    useEffect(() => {
        fetchProblemData();
    }, []); 

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
        <Grid container direction="column" className="problems-container">
            {/* Menu sidebar */}
            <SidebarMenu />

            {/* Container for the Grids */}
            <Grid container item className="content-container">
                <Grid item xs={12} className="page-title">
                    <h3 className='text-base'>Problemas</h3>
                </Grid>

                {/* Left Grid with narrower width */}
                <Grid item xs={12} sm={4} className="filters-container">
                    <div className="filter-box">
                        <h3 className='filter-text'>Filtros</h3>
                        <textarea
                            className="filter-input"
                            placeholder="Nome do problema"
                        ></textarea>
                        <button className="toggle-topics-button" onClick={toggleTopics}>
                            Selecionar Tópicos
                        </button>
                        {showTopics && (
                            <div className="topic-list">
                                {topics.map((topic) => (
                                    <div key={topic} className="topic-item">
                                        <label className="topic-label">
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
                        <div className="filter-select">
                            <h3>Nível de dificuldade</h3>
                            <select className="difficulty-select">
                                <option value="todos">Todos</option>
                                <option value="iniciante">Iniciante</option>
                                <option value="facil">Fácil</option>
                                <option value="medio">Médio</option>
                                <option value="avancado">Avançado</option>
                                <option value="expert">Expert</option>
                            </select>
                        </div>
                        <div className="filter-select">
                            <h3>Listar</h3>
                            <select className="list-select">
                                <option value="todos">Todos</option>
                                <option value="naoResolvidos">Não resolvidos</option>
                            </select>
                        </div>
                    </div>
                </Grid>

                {/* Right Grid */}
                <Grid item xs={12} sm={8} className="table-container">
                    <div className="table-wrapper">
                        {/* Table */}
                        <Table data={problemData.map((problem) => ({
                            level: problem.nd,
                            name: problem.name,
                            topics: problem.topics.map((topic) => topic.name).join(', '),
                            status: problem.status,
                            id: problem.id,
                        }))} columns={columns} />
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Problems;
