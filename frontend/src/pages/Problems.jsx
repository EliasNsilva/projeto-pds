import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Table from '../components/Table';
import SidebarMenu from '../components/SidebarMenu';
import './Problems.css';

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
];

const columns = [
    { header: '', accessor: 'level' },
    { header: 'Nome', accessor: 'name' },
    { header: 'Tópicos', accessor: 'topics' },
    { header: 'Status', accessor: 'status' },
];

const Problems = () => {
    const [showTopics, setShowTopics] = useState(false);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const topics = ['Tópico 1', 'Tópico 2', 'Tópico 3', 'Tópico 4', 'Tópico 5'];

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
                        <Table data={questions} columns={columns} />
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Problems;