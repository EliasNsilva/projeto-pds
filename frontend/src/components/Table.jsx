import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';



const Table = ({ data, columns, itemsPerPage = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleData = data.slice(startIndex, endIndex);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    // cores pros levels
    const renderLevelIcon = (level) => {
        let icon = '';
        let color = '';

        switch (level) {
            case 1.0:
                icon = '●';
                color = 'green';
                break;
            case 2.0:
                icon = '●';
                color = 'blue';
                break;
            case 3.0:
                icon = '●';
                color = 'yellow';
                break;
            case 4.0:
                icon = '●';
                color = 'orange';
                break;
            case 5.0:
                icon = '●';
                color = 'red';
                break;
            default:
                break;
        }

        return (
            <span style={{ color, textAlign: 'center', display: 'block' }}>
                {icon}
            </span>
        );
    };

    const renderLevelColor = (level) => {
        switch (level) {
            case 1.0:
                return '#77D9C1';
            case 2.0:
                return 'blue';
            case 3.0:
                return 'yellow';
            case 4.0:
                return '#FFAC60';
            case 5.0:
                return 'red';
            default:
                return 'gray'; // ou qualquer outra cor padrão que você deseje
        }
    };


    const renderStatusIcon = (status) => {
        let icon = '';
        let color = '';

        switch (status) {
            case 'Completed':
                icon = <AddTaskIcon />;
                color = 'green';
                break;
            case 'Failed':
                icon = <DisabledByDefaultIcon />;
                color = 'red';
                break;
            case 'Pending':
                icon = '';
                color = 'white';
                break;
            default:
                break;
        }

        return (
            <span style={{ color, textAlign: 'center', display: 'block' }}>
                {icon}
            </span>
        );
    };




    return (
        <div style={{ width: '100%', backgroundColor: '#F6F6F6' }}>
            {visibleData.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex', borderRadius: '14px', border: '2px solid #D0D5DD', padding: '0px 0px 0px 0', height: '125px', backgroundColor: '#FFFFFF', marginBottom: '10px' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'stretch', backgroundColor: '#FFFFFF', borderRadius: '14px' }}>

                        <div style={{ flex: 0.025, textAlign: 'center', backgroundColor: renderLevelColor(row['level']), borderTopLeftRadius: '14px', borderBottomLeftRadius: '14px' }}></div>

                        <div style={{ flex: 0.8, marginLeft: '40px', backgroundColor: '#FFFFFF', borderRadius: '14px', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                            <div style={{marginBottom: '5px', backgroundColor: '#FFFFFF', marginTop: '30px', color: '#6B8392', fontFamily: 'Inter, sans-serif', fontSize: '17px' }}>
                                Nome:
                            </div>
                            <div style={{ backgroundColor: '#FFFFFF' }}>
                                <Link to={`/problems/${row.id}`} style={{ color: '#475861', fontFamily: 'Inter, sans-serif', fontSize: '19px', fontWeight: 'bold' }}>
                                    {row['name'].length > 40 ? row['name'].substring(0, 30) + '...' : row['name']}
                                </Link>
                            </div>
                        </div>

                        <div style={{ flex: 0.01, backgroundColor: '#FFFFFF', borderLeft: '2px solid #9BACB6', marginBottom: '20px', marginTop: '20px' }}>
                        </div>

                        <div style={{ flex: 0.8, marginLeft: '10px', backgroundColor: '#FFFFFF', borderRadius: '14px', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                            <div style={{ marginBottom: '5px', backgroundColor: '#FFFFFF', marginTop: '30px', color: '#6B8392', fontFamily: 'Inter, sans-serif', fontSize: '17px'  }}>
                                Tópicos:
                            </div>
                            <div style={{ backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'row' }}>
                                {row['topics'].split(',').slice(0, 5).map((topic, index) => (
                                    <div key={index} style={{ marginRight: '10px', backgroundColor: '#E5E8EA', borderRadius: '18px', padding: '3px' }}>{topic.trim()}</div>
                                ))}
                                {row['topics'].split(',').length > 5 && <div style={{ marginRight: '10px', backgroundColor: '#E5E8EA', borderRadius: '18px', padding: '3px' }}>...</div>}
                            </div>
                        </div>




                        <div style={{ flex: 0.1, marginLeft: '10px', textAlign: 'center', backgroundColor: '#FFFFFF', borderRadius: '14px' }}>
                            {renderStatusIcon(row['status'])}
                        </div>
                    </div>
                </div>
            ))}
            <div style={{ marginTop: '20px', textAlign: 'center', backgroundColor: '#F6F6F6', marginBottom: '20px' }}>
                <button onClick={handleFirstPage} disabled={currentPage === 1} style={{ marginRight: '10px' }}><FirstPageIcon /></button>
                <button onClick={handlePrevPage} disabled={currentPage === 1} style={{ marginRight: '10px' }}><NavigateBeforeIcon /></button>
                <span style={{ margin: '0 10px' }}>{`Página ${currentPage} de ${totalPages}`}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} style={{ marginRight: '10px' }}><NavigateNextIcon /></button>
                <button onClick={handleLastPage} disabled={currentPage === totalPages}><LastPageIcon /></button>
            </div>
        </div>
    );

};

export default Table;
