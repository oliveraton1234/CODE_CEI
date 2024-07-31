import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import api_base_url from '../../../configs/api_basse_url';
import { saveAs } from 'file-saver';
import NavBarLogged from '../../../shared/components/NavBarLogged';

const TableComponent = () => {

    const [availableData, setAvailableData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${api_base_url}/ninos/reprobados`);
                const formattedData = response.data.map(item => ({
                    id: item._id,
                    nombre: item.nombre,
                    apellido: item.apellido,
                    gradoEscolar: item.calificaciones.gradoEscolar,
                    promedio: item.calificaciones.promedio,
                    periodo: item.calificaciones.periodo,
                }));
                console.log( formattedData);
                setAvailableData(formattedData);
            } catch (error) {
                console.error('Error al obtener datos', error);
            }
        };

        fetchData();
    }, []);

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
        { field: 'nombre', headerName: 'Nombre', width: 130 },
        { field: 'apellido', headerName: 'Apellido', width: 130 },
        { field: 'gradoEscolar', headerName: 'Grado Escolar', width: 130 },
        { field: 'promedio', headerName: 'Promedio', width: 130 },
        { field: 'periodo', headerName: 'Periodo', width: 130 },
    ];

    return (
        <div className='bg-camell-cei h-screen items-center '>
            <NavBarLogged color='camell'/>
            <div className=' mx-auto w-3/4'>
                <DataGrid
                    rows={availableData}
                    columns={columns}
                    autoHeight={true} 
                    autoPageSize={true}  
                />
                <Button onClick={exportToCSV} variant="contained" color="primary" style={{ margin: '10px' }}>
                    Exportar CSV
                </Button>
            </div>
        </div>
    );
}

export default TableComponent;