import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import SidebarMenu from '../components/SidebarMenu';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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

    // Conteúdo das páginas
    const pages = [
        {
            title: 'Unidade 1',
            content: (
                <div>
                    <h2>sla</h2>
                    <h2>sla</h2>
                    {/* Conteúdo da primeira página */}
                </div>
            ),
        },
        {
            title: 'Unidade 2',
            content: (
                <div>
                    <h2>Página 2</h2>
                    {/* Conteúdo da segunda página */}
                </div>
            ),
        },
        // Adicione mais páginas conforme necessário
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
                    <Grid item style={{ backgroundColor: '#e3e3e3', padding: '10px', color: 'white' }}>
                        <div style={{ listStyleType: 'none',  display: 'flex', justifyContent: 'center', border: '2px solid #233142', padding: '10px' }}>
                            <h2 style={{ color: '#233142', margin: 0 }}>{pages[currentPage - 1].title}</h2>
                        </div>
                    </Grid>

                    {pages[currentPage - 1].content} {/* Renderiza o conteúdo da página atual que ta incompleto*/}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default StudyTrack;
