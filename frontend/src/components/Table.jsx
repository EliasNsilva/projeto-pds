import { Link } from 'react-router-dom';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const Table = ({ data, currentPage, totalPages, onPageChange }) => {
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
                return 'gray';
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
        <div style={{ width: '100%', maxHeight: '1000px', overflowY: 'auto', marginTop: '10px' }}>
            {data.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex', borderRadius: '14px', border: '2px solid #D0D5DD', padding: '0px 0px 0px 0', height: '110px', marginBottom: '10px' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'stretch', borderRadius: '14px' }}>

                        <div style={{ flex: 0.025, textAlign: 'center', backgroundColor: renderLevelColor(row['level']), borderTopLeftRadius: '14px', borderBottomLeftRadius: '14px' }}></div>

                        <div style={{ flex: 0.8, marginLeft: '40px', borderRadius: '14px', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                            <div style={{ marginBottom: '5px', marginTop: '20px', color: '#6B8392', fontFamily: 'Inter, sans-serif', fontSize: '17px' }}>
                                Nome:
                            </div>
                            <div style={{ backgroundColor: '#FFFFFF' }}>
                                <Link to={`/problems/${row.id}`} style={{ color: '#475861', fontFamily: 'Inter, sans-serif', fontSize: '19px', fontWeight: 'bold' }}>
                                    {row['name'].length > 40 ? row['name'].substring(0, 30) + '...' : row['name']}
                                </Link>
                            </div>
                        </div>

                        <div style={{ flex: 0.01, borderLeft: '2px solid #9BACB6', marginBottom: '20px', marginTop: '20px' }}>
                        </div>

                        <div style={{ flex: 0.8, marginLeft: '10px', borderRadius: '14px', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                            <div style={{ marginBottom: '5px', marginTop: '20px', color: '#6B8392', fontFamily: 'Inter, sans-serif', fontSize: '17px' }}>
                                Tópicos:
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                {row['topics'].split(',').slice(0, 5).map((topic, index) => (
                                    <div key={index} style={{ marginRight: '10px', backgroundColor: '#E5E8EA', borderRadius: '18px', padding: '3px' }}>{topic.trim()}</div>
                                ))}
                                {row['topics'].split(',').length > 5 && <div style={{ marginRight: '10px', backgroundColor: '#E5E8EA', borderRadius: '18px', padding: '3px' }}>...</div>}
                            </div>
                        </div>

                        <div style={{ flex: 0.1, marginLeft: '10px', textAlign: 'center', borderRadius: '14px' }}>
                            {renderStatusIcon(row['status'])}
                        </div>
                    </div>
                </div>
            ))}

            <div className='w-full flex justify-center items-center mb-4'>
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} style={{ marginRight: '10px' }}><NavigateBeforeIcon /></button>
                <span style={{ margin: '0 10px' }}>{`Página ${currentPage}`}</span>
                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} style={{ marginRight: '10px' }}><NavigateNextIcon /></button>
            </div>
        </div>
    );
};

export default Table;
