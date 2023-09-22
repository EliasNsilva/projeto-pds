import React, { useState } from 'react';
import Grid from '@mui/material/Grid';

const Problemas = () => {
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
            {/* Menu */}
            <Grid item style={{ backgroundColor: '#455d7a', padding: '10px', color: 'white' }}>
                {/* Conteúdo do Menu temporario */}
                <h1>PiOne</h1>
                <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', justifyContent: 'center' }}>
                    <li style={{ margin: '0 10px' }}><a href="#">hehe</a></li>
                    <li style={{ margin: '0 10px' }}><a href="#">hehe</a></li>
                    <li style={{ margin: '0 10px' }}><a href="#">hehe</a></li>
                </ul>
            </Grid>

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
                        <h3>Idioma</h3>
                        <select
                            style={{
                                width: '100%',
                                height: '30px',
                            }}
                        >
                            <option value="portugues">Português</option>
                            <option value="ingles">Inglês</option>
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

                {/* Grid da Direita com largura maior que ta incompleto*/}
                <Grid item xs={12} sm={8} style={{ backgroundColor: '#e3e3e3', height: '80vh', paddingLeft: '10px', border: '1px dotted #233142' }}>
                    {/* Conteúdo do Grid 2 */}
                </Grid>
            </Grid>
        </Grid>
    );



}

export default Problemas;
