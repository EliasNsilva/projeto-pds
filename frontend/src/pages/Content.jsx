import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import SidebarMenu from '../components/SidebarMenu';
import './Problems.css';

const Content = ({ content }) => {
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
                   
                    {content === 'linguagem-c' && (
                        <div>
                        
                            <h1>Introdução à Linguagem C</h1>
                            <p>Introdução à Linguagem C.</p>
                        </div>
                    )}

                   
                    {content === 'comecar-linguagem-c' && (
                        <div>
                
                            <h1>Como começar com a Linguagem C</h1>
                            <p>Como começar com a Linguagem C.</p>
                        </div>
                    )}
                </Grid>

                {/* Right Grid */}
                <Grid item xs={12} sm={8} className="table-container">
                    
                    <div>

                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Content;
