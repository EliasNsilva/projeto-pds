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
        <div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {visibleData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, columnIndex) => (
                                <td
                                    key={columnIndex}
                                    style={{
                                        borderBottom: '1px solid #ddd',
                                        padding: '8px',
                                        textAlign: column.accessor === 'level' ? 'center' : 'left', 
                                    }}
                                >
                                    {column.accessor === 'level'
                                        ? renderLevelIcon(row[column.accessor])
                                        : column.accessor === 'status'
                                            ? renderStatusIcon(row[column.accessor])
                                            : (
                                                <Link
                                                    to={`/problems/${row.id}`}
                                                    style={{
                                                        textDecoration: 'none',
                                                        color: 'inherit',
                                                    }}
                                                    className="link"
                                                >

                                                    {column.accessor === 'topics'
                                                        ? row[column.accessor].length > 30
                                                            ? row[column.accessor].substring(0, 30) + '...' // Limita a 30 caracteres
                                                            : row[column.accessor]
                                                        : column.accessor === 'name' 
                                                            ? row[column.accessor].length > 30
                                                                ? row[column.accessor].substring(0, 30) + '...' // Limita a 30 caracteres pra nao virar bagunca
                                                                : row[column.accessor]
                                                            : row[column.accessor]}
                                                </Link>
                                            )}
                                </td>
                            ))}

                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
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
