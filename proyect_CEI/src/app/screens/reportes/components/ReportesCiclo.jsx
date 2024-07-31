
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api_base_url from '../../../configs/api_basse_url';
import NavBarLogged from '../../../shared/components/NavBarLogged';

export const ReportesCiclo = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const fetchReportData = async () => {
        if (!year || !semester) {
            alert('Por favor, seleccione tanto el año como el semestre.');
            return;
        }
    
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${api_base_url}/ninos/reportes/ciclos`, { params: { year, semester } });
            const rawData = response.data;
            
            // Procesar datos para la tabla
            const processedData = rawData.reduce((acc, item) => {
                const { gradoEscolar, genero, estatus } = item._id;
                acc[estatus] = acc[estatus] || {};
                acc[estatus][gradoEscolar] = acc[estatus][gradoEscolar] || { masculino: 0, femenino: 0, total: 0 };
                if (genero === 'Masculino') {
                    acc[estatus][gradoEscolar].masculino += item.count;
                } else if (genero === 'Femenino') {
                    acc[estatus][gradoEscolar].femenino += item.count;
                }
                acc[estatus][gradoEscolar].total += item.count;
                return acc;
            }, {});
    
            console.log(year, semester);
            setReportData(processedData);
        } catch (err) {
            setError('Error fetching report data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <>
            <NavBarLogged color={'camell'}/>
            <div className=' bg-camell-cei flex flex-col items-center justify-center'>
                <div className='flex gap-4 mb-10'>
                <select value={year} onChange={e => setYear(e.target.value)} className='p-2 rounded border'>
                        <option value="">Seleccione un año académico</option>
                        <option value="2021-22">2021-22</option>
                        <option value="2022-23">2022-23</option>
                        <option value="2023-24">2023-24</option>
                    </select>
                    <select value={semester} onChange={e => setSemester(e.target.value)} className='p-2 rounded border'>
                        <option value="">Seleccione un semestre</option>
                        <option value="Agosto-Diciembre">Agosto-Diciembre</option>
                        <option value="Febrero-Junio">Febrero-Junio</option>
                        <option value="Completo">Completo</option>
                    </select>
                    <button onClick={fetchReportData} className='bg-blue-500 text-white p-2 rounded'>
                        Seleccionar
                    </button>
                </div>
            
        
                    <div className='bg-camell-cei '>
                        <h1 className="text-xl font-bold text-center mb-5">Reporte de Ciclos</h1>
                        {Object.keys(reportData).map((status) => (
                            <div key={status}>
                                <h2 className="text-lg font-semibold">{status.toUpperCase()}</h2>
                                <div className="grid grid-cols-4 text-center border-b-2 py-2">
                                    <div>Grado Escolar</div>
                                    <div>Masculino</div>
                                    <div>Femenino</div>
                                    <div>Total</div>
                                </div>
                                {Object.keys(reportData[status]).map((grado) => (
                                    <div key={grado} className="grid grid-cols-4 text-center py-1">
                                        <div>{grado}</div>
                                        <div>{reportData[status][grado].masculino}</div>
                                        <div>{reportData[status][grado].femenino}</div>
                                        <div>{reportData[status][grado].total}</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    </div>
                    </>          
    );
};
