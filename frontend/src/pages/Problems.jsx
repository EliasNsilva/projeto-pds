import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Table from '../components/Table';
import Sidebar from '../components/SidebarMenu';
import SearchIcon from '@mui/icons-material/Search';
import LightModeIcon from '@mui/icons-material/LightMode';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const API_BASE_URL = 'https://www.thehuxley.com/api/v1/problems';

const Problems = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [problemData, setProblemData] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState('todos');
    const [textQuery, setTextQuery] = useState('');
    const totalPages = 270;

    const fetchProblemData = async (offset = 0) => {
        try {
            let apiUrl = `${API_BASE_URL}?max=10&offset=${offset}&problemType=ALGORITHM`;
            if(selectedDifficulty !== 'todos') {
                apiUrl += `&nd=${selectedDifficulty}`;
            }

            if (textQuery.length > 0) {
                apiUrl += `&q=${textQuery}`;
            }

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setProblemData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDifficultyChange = (event) => {
        setSelectedDifficulty(event.target.value);
    };

    useEffect(() => {
        fetchProblemData();
    }, []);

    useEffect(() => {
        fetchProblemData();
    }, [selectedDifficulty], [textQuery])

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            const newOffset = (newPage - 1) * 10;
            setCurrentPage(newPage);
            fetchProblemData(newOffset);
        }
    };

    useEffect(() => {
        if (textQuery.length > 0) {
            fetchProblemData();
        }
    }, [textQuery]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Grid container direction="column" className="problems-container rounded" style={{ height: '100%' }}>

                <Sidebar />
                <Grid
                    container
                    item
                    direction="column"
                    style={{
                        width: '90vw',
                        margin: '3vh auto',
                        padding: '20px',
                        position: 'relative',
                        flexGrow: 1,
                    }}
                >
                    <Grid container item style={{ height: '10vh', width: '100%', position: 'absolute', top: '0', left: '0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#022032', marginBottom: '5px', fontFamily: 'Nunito' }}>
                            Problemas
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: '500', color: '#667085' }}>
                            Veja todos os problemas cadastrados
                        </div>
                    </Grid>

                    <Grid container item style={{ width: '100%', display: 'flex', justifyContent: 'space-around', position: 'absolute', top: '10vh', left: '0' }}>

                        <div style={{ flex: '2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '8px', border: '2px solid #D0D5DD' }}>
                            <button style={{ margin: '2px', padding: '4px', border: 'none', cursor: 'pointer' }}>
                                <SearchIcon />
                            </button>
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <textarea
                                    style={{ margin: '2px', padding: '2px', resize: 'none', textAlign: 'center', lineHeight: 'normal', outline: 'none', display: 'flex', alignItems: 'center' }}
                                    placeholder="Pesquise pelo nome do problema"
                                    value={textQuery} // Set the value of the textarea to textQuery
                                    onChange={(e) => setTextQuery(e.target.value)} // Update textQuery state when the textarea value changes
                                />
                            </div>
                        </div>


                        <div style={{ marginLeft: '8px', flex: '0.5', alignItems: 'center', justifyContent: 'space-between', borderRadius: '8px', border: '2px solid #D0D5DD' }}>
                            <button style={{ margin: '2px', padding: '10px', border: 'none', cursor: 'pointer' }}>
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
                        <div style={{ marginLeft: '8px', flex: '0.5', alignItems: 'center', justifyContent: 'space-between', borderRadius: '8px', border: '2px solid #D0D5DD' }}>
                            <button style={{ margin: '2px', padding: '10px', border: 'none', cursor: 'pointer' }}>
                                <FormatListBulletedIcon />
                            </button>
                            <select className="list-select rounded">
                                <option value="todos">Todos</option>
                                <option value="naoResolvidos">Não resolvidos</option>
                            </select>
                        </div>
                    </Grid>
                    <Grid container item style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'left', position: 'absolute', top: '18vh', left: '0' }}>
                        <div>
                            <Table
                                data={problemData.map((problem) => ({
                                    level: problem.nd,
                                    name: problem.name,
                                    topics: problem.topics
                                        ? problem.topics
                                            .map((topic) => (topic?.name ? topic.name.charAt(0).toUpperCase() + topic.name.slice(1) : 'Sem tópico(s)'))
                                            .join(', ')
                                        : 'sem tópico(s)',
                                    status: problem.status,
                                    id: problem.id,
                                }))}

                                currentPage={currentPage} // Pass current page as prop
                                totalPages={totalPages} // Pass total pages as prop
                                onPageChange={handlePageChange} // Pass the page change function as prop
                            />
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Problems;
