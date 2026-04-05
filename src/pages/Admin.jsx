import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const Admin = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);

    //LEER TODAS LAS SOLICITUDES
    const fetchSolicitudes = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, "solicitudes"));
            const docs = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setSolicitudes(docs);
        } catch (error) {
            console.error("Error al obtener solicitudes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSolicitudes();
    }, []);

    //FUNCIÓN PARA ELIMINAR
    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta solicitud?")) {
            try {
                const docRef = doc(db, "solicitudes", id);
                await deleteDoc(docRef);
                
                setSolicitudes(solicitudes.filter(item => item.id !== id));
                alert("Solicitud eliminada correctamente.");
            } catch (error) {
                alert("No se pudo eliminar la solicitud.");
            }
        }
    };

    if (loading) return <div className="text-center py-5">Cargando panel...</div>;

    return (
        <div className="container py-5">
            <h2 className="fw-bold text-dark-blue mb-4">PANEL DE ADMINISTRACIÓN</h2>
            <div className="table-responsive shadow-sm rounded">
                <table className="table table-hover align-middle bg-white">
                    <thead className="bg-dark-blue text-white">
                        <tr>
                            <th>Cliente</th>
                            <th>Crédito</th>
                            <th>Monto</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitudes.length > 0 ? (
                            solicitudes.map((s) => (
                                <tr key={s.id}>
                                    <td>
                                        <div className="fw-bold">{s.nombre}</div>
                                        <small className="text-muted">{s.email}</small>
                                    </td>
                                    <td><span className="badge bg-info">{s.tipoCredito}</span></td>
                                    <td className="fw-bold text-success">${parseInt(s.monto).toLocaleString('es-CO')}</td>
                                    <td className="small text-muted">{s.fechaRegistro || 'Sin fecha'}</td>
                                    <td>
                                        <button 
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(s.id)}
                                        >
                                            <i className="bi bi-trash"></i> Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-muted">No hay solicitudes pendientes.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;