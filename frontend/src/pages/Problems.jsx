import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import './Problems.css';
import Table from '../components/Table';

import SearchIcon from '@mui/icons-material/Search';
import LightModeIcon from '@mui/icons-material/LightMode';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


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
    const [selectedDifficulty, setSelectedDifficulty] = useState('todos');

    const topics = ['Tópico 1', 'Tópico 2', 'Tópico 3', 'Tópico 4', 'Tópico 5'];

    // pegaa dados da API
    const fetchProblemData = async () => {
        console.log(selectedDifficulty);
        try {
            const response = await fetch(`http://localhost:8000/huxley/list/?20max=10&format=json&offset=1&problemType=ALGORITHM&difficulty=${selectedDifficulty}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();

            // Filtro para selecionar o nível de dificuldade
            const filteredData = data.filter(problem => {
                if (selectedDifficulty === 'todos') {
                    return true;
                }
                return parseFloat(selectedDifficulty) === problem.nd;
            });

            setProblemData(filteredData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDifficultyChange = (event) => {
        setSelectedDifficulty(event.target.value);
    };


    useEffect(() => {
        fetchProblemData();
    }, [selectedDifficulty]);

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
        <Grid container direction="column" className="problems-container rounded">
            <Grid
                container
                item
                direction="column"
                style={{
                    background: '#F6F6F6',
                    height: '90vh',
                    width: '90vw',
                    margin: '5vh auto',
                    padding: '20px',
                    position: 'relative'
                }}
            >
                <Grid
                    container
                    item
                    style={{
                        background: '#F6F6F6',
                        height: '10vh',
                        width: '100%',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    {/* Título */}
                    <div style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#022032',
                        marginBottom: '5px',
                        fontFamily: 'Nunito'
                    }}>
                        Problemas
                    </div>

                    {/* Subtítulo */}
                    <div style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: '#667085'
                    }}>
                        Veja todos os problemas cadastrados
                    </div>
                </Grid>

                {/* Novo Grid Azul */}
                <Grid
                    container
                    item
                    style={{
                        background: '#FFFFFF',
                        height: '3vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-around',
                        position: 'absolute',
                        top: '10vh',
                        left: '0',
                    }}
                >
                    {/* Três Divs Alinhadas Lateralmente na regiao de botoes e pesquisa*/}
                    <div style={{ background: '#FFFFFF', flex: '2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '8px', border: '2px solid #D0D5DD' }}>
                        <button style={{ margin: '2px', padding: '4px', backgroundColor: '#FFFFFF', border: 'none', cursor: 'pointer' }}>
                            <SearchIcon />
                        </button>
                        <textarea
                            style={{ flex: '1', margin: '2px', padding: '4px', resize: 'none', backgroundColor: '#FFFFFF', textAlign: 'left', lineHeight: 'normal', outline: 'none' }}
                            placeholder="Pesquise pelo nome do problema"
                        ></textarea>
                    </div>

                    <div style={{ background: '#FFFFFF', marginLeft: '8px', flex: '0.5', alignItems: 'center', justifyContent: 'space-between', borderRadius: '8px', border: '2px solid #D0D5DD' }}>
                        <button style={{ margin: '2px', padding: '4px', backgroundColor: '#FFFFFF', border: 'none', cursor: 'pointer' }}>
                            <LightModeIcon />
                        </button>
                        <select className="difficulty-select rounded" onChange={handleDifficultyChange} value={selectedDifficulty}>
                            <option value="todos">Todos</option>
                            <option value="1">Iniciante</option>
                            <option value="2">Fácil</option>
                            <option value="3">Médio</option>
                            <option value="4">Avançado</option>
                            <option value="5">Expert</option>
                        </select>
                    </div>

                    <div style={{ background: '#FFFFFF', marginLeft: '8px', flex: '0.5', alignItems: 'center', justifyContent: 'space-between', borderRadius: '8px', border: '2px solid #D0D5DD' }}>
                        <button style={{ margin: '2px', padding: '4px', backgroundColor: '#FFFFFF', border: 'none', cursor: 'pointer' }}>
                            <FormatListBulletedIcon />
                        </button>
                        <select className="list-select rounded">
                            <option value="todos">Todos</option>
                            <option value="naoResolvidos">Não resolvidos</option>
                        </select>
                    </div>
                </Grid>

                <Grid
                    container
                    item
                    style={{
                        background: '#F6F6F6',
                        height: '70vh',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                        position: 'absolute',
                        top: '18vh',
                        left: '0',
                    }}
                >
                    <div>
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
