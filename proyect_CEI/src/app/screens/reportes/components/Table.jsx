import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import api_base_url from '../../../configs/api_basse_url';
import { saveAs } from 'file-saver';
import NavBarLogged from '../../../shared/components/NavBarLogged';

const TableComponent = () => {
    const [availableData, setAvailableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [promedioMaximo, setPromedioMaximo] = useState('');
    const [materia, setMateria] = useState('');
    const [anioAcademico, setAnioAcademico] = useState('');
    const [semestre, setSemestre] = useState('');

    const fetchReportData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${api_base_url}/ninos/reprobados`, {
                params: { promedioMaximo, materia, anioAcademico, semestre }
            });
            setAvailableData(response.data.map(item => ({
                id: item._id,
                nombre: item.nombre,
                apellido: item.apellido,
                gradoEscolar: item.calificaciones.gradoEscolar,
                promedio: item.calificaciones.promedio,
                anio: item.calificaciones.añoAcademico,  
                semestre: item.calificaciones.semestre,  
            })));
        } catch (error) {
            console.error('Error al obtener datos', error);
        } finally {
            setLoading(false);
        }
    };

    const exportToCSV = () => {
        const headers = ['Nombre', 'Apellido', 'Grado Escolar', 'Promedio', 'Periodo'];
        const csvContent = [
            headers.join(','),
            ...availableData.map(row => [row.nombre, row.apellido, row.gradoEscolar, row.promedio].join(','))
        ].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'exported_data.csv');
    };

    const columns = [
        { field: 'nombre', headerName: 'Nombre', width: 150 },
        { field: 'apellido', headerName: 'Apellido', width: 200 },
        { field: 'gradoEscolar', headerName: 'Grado Escolar', width: 160 },
        { field: 'promedio', headerName: 'Promedio', width: 130 },
        { field: 'anio', headerName: 'Año', width: 130 },
        { field: 'semestre', headerName: 'Periodo', width:150},
    ];

    return (
        <div className='bg-camell-cei h-auto min-h-screen items-center'>
            <NavBarLogged color='camell'/>
            <div className=' mx-auto w-3/4'>
                <div >
                <TextField
                    label="Promedio Máximo"
                    variant="outlined"
                    value={promedioMaximo}
                    onChange={e => setPromedioMaximo(e.target.value)}
                    style={{ margin: '10px' }}
                />
                <TextField
                    label="Materia"
                    variant="outlined"
                    value={materia}
                    onChange={e => setMateria(e.target.value)}
                    style={{ margin: '10px' }}
                />
                <FormControl style={{ width: '20%',margin: '10px'  }}>
                    <InputLabel>Año Académico</InputLabel>
                    <Select
                        value={anioAcademico}
                        label="Año Académico"
                        onChange={e => setAnioAcademico(e.target.value)}
                    >
                        <MenuItem value="">Ninguno</MenuItem>
                        <MenuItem value="2021-22">2021-22</MenuItem>
                        <MenuItem value="2022-23">2022-23</MenuItem>
                        <MenuItem value="2023-24">2023-24</MenuItem>
                    </Select>
                </FormControl>
                <FormControl style={{ margin: '10px', width: '20%'}}>
                    <InputLabel>Semestre</InputLabel>
                    <Select
                        value={semestre}
                        label="Semestre"
                        onChange={e => setSemestre(e.target.value)}
                    >
                        <MenuItem value="">Ninguno</MenuItem>
                        <MenuItem value="Agosto-Diciembre">Agosto-Diciembre</MenuItem>
                        <MenuItem value="Febrero-Junio">Febrero-Junio</MenuItem>
                        <MenuItem value="Completo">Completo</MenuItem>
                    </Select>
                </FormControl>
                </div>
                <Button onClick={fetchReportData} variant="contained" color="primary" style={{ marginLeft: '10px', marginBottom: '2%'}}>
                    Buscar
                </Button>
                <DataGrid
                    rows={availableData}
                    columns={columns}
                    autoHeight={true} 
                    initialState={{
                        pagination: { pageSize: 20 },

                    }}
                    
                />
                <Button onClick={exportToCSV} variant="contained" color="primary" style={{ margin: '10px' }}>
                    Exportar CSV
                </Button>
            </div>
        </div>
    );
}

export default TableComponent;