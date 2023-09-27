import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import SidebarMenu from '../components/SidebarMenu';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';


const StudyTrack = () => {
    const [currentPage, setCurrentPage] = useState(1); // Estado para controlar a página atual

    // Função para avançar para a próxima página
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    // Função para voltar para a página anterior
    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    // Função de manipulação de clique para os botões das páginas
    const handleButtonClick = (pageTitle) => {
        // Verifique qual unidade está ativa (Unidade 1 ou Unidade 2)
        if (currentPage === 1) {
            // Se for a Unidade 1, verifique qual botão foi clicado
            if (pageTitle === 'O que é a Linguagem C?') {
                window.location.href = 'https://www.google.com';
            } else if (pageTitle === 'Botão 1.2') {
                // sla
            } else if (pageTitle === 'Botão 1.3') {
                // sla
            }

        } else if (currentPage === 2) {
            // Se for a Unidade 2, verifique qual botão foi clicado
            if (pageTitle === 'Declarar sla') {
                window.location.href = 'https://www.youtube.com';
            } else if (pageTitle === 'Botão 2.2') {
                // sla
            } else if (pageTitle === 'Botão 2.3') {
                // sla
            }
            // Adicione mais verificações de botões, por enquanto ta sem verificacoes corretas, pois nao temos ainda os links
        }
    };

    // Conteúdo das páginas
    const pages = [
        {
            title: 'Introdução à Linguagem C',
            content: (
                <div style={{ width: '100%' }}>
                    <Button
                        onClick={() => handleButtonClick('O que é a Linguagem C?')}
                        style={{
                            backgroundColor: '#455d7a',
                            width: '100%',
                            color: '#e3e3e3',
                            border: '2px solid #e3e3e3',
                            transition: 'background-color 0.3s',
                            marginBottom: '10px',
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#e3e3e3';
                            e.target.style.color = '#455d7a';
                            e.target.style.border = '2px solid #455d7a';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#455d7a';
                            e.target.style.color = '#e3e3e3';
                        }}
                    >
                        O que é a Linguagem C?
                    </Button>

                    <Button
                        onClick={() => handleButtonClick('Como começar com a Linguagem C?')}
                        style={{
                            backgroundColor: '#455d7a',
                            width: '100%',
                            color: '#e3e3e3',
                            border: '2px solid #e3e3e3',
                            transition: 'background-color 0.3s',
                            marginBottom: '10px',
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#e3e3e3';
                            e.target.style.color = '#455d7a';
                            e.target.style.border = '2px solid #455d7a';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#455d7a';
                            e.target.style.color = '#e3e3e3';
                        }}
                    >
                        Como começar com a Linguagem C?
                    </Button>

                    {/* Adicione mais botões na pagina */}
                </div>
            ),
        },

        {
            title: 'Variaveis',
            content: (
                <div style={{ width: '100%' }}>
                    <Button
                        onClick={() => handleButtonClick('Declarar sla')}
                        style={{
                            backgroundColor: '#455d7a',
                            width: '100%',
                            color: '#e3e3e3',
                            border: '2px solid #e3e3e3',
                            transition: 'background-color 0.3s',
                            marginBottom: '10px',
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#e3e3e3';
                            e.target.style.color = '#455d7a';
                            e.target.style.border = '2px solid #455d7a';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#455d7a';
                            e.target.style.color = '#e3e3e3';
                        }}
                    >
                        Declarar sla
                    </Button>

                    <Button
                        onClick={() => handleButtonClick('sla')}
                        style={{
                            backgroundColor: '#455d7a',
                            width: '100%',
                            color: '#e3e3e3',
                            border: '2px solid #e3e3e3',
                            transition: 'background-color 0.3s',
                            marginBottom: '10px',
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#e3e3e3';
                            e.target.style.color = '#455d7a';
                            e.target.style.border = '2px solid #455d7a';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#455d7a';
                            e.target.style.color = '#e3e3e3';
                        }}
                    >
                        sla
                    </Button>

                    {/* Adicione mais botões na pagina */}
                </div>
            ),
        },
        // Adicione mais paginas
    ];


    return (
        <Grid container direction="column" style={{ background: '#233142', minHeight: '100vh' }}>
            {/* Menu sidebar */}
            <SidebarMenu />
            <Grid container direction="column" style={{ flex: '1', width: '70%', backgroundColor: '#e3e3e3', margin: 'auto', marginTop: '60px', padding: '20px', marginBottom: '20px', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '20px', backgroundColor: '#e3e3e3' }}>
                    <button onClick={prevPage} disabled={currentPage === 1}><ArrowBackIosIcon /></button>
                </div>
                <div style={{ position: 'absolute', right: '20px', backgroundColor: '#e3e3e3' }}>
                    <button onClick={nextPage} disabled={currentPage === pages.length}><ArrowForwardIosIcon /></button>
                </div>
                <Grid container direction="column" style={{ flex: '1', width: '70%', backgroundColor: '#e3e3e3', margin: 'auto', marginTop: '60px', padding: '20px', marginBottom: '20px', position: 'relative' }}>
                    <Grid item style={{ backgroundColor: '#e3e3e3', padding: '10px' }}>
                        <div style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center', borderBottom: '2px solid #233142', padding: '10px' }}>
                            <h2 style={{ color: '#233142', margin: 0, textTransform: 'uppercase' }}>{pages[currentPage - 1].title}</h2>
                        </div>
                    </Grid>

                    <Grid container direction="column" style={{ flex: '1', width: '100%', backgroundColor: '#e3e3e3', margin: 'auto', marginTop: '60px', padding: '20px', marginBottom: '20px', position: 'relative' }}>
                        <div style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            {pages[currentPage - 1].content} {/* Renderiza o conteúdo da página atual */}
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

}

export default StudyTrack;
