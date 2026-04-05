import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config'; 
import { collection, getDocs } from 'firebase/firestore';
import CreditCard from '../components/CreditCard';

const Inicio = () => {
    //Datos de Firebase, Buscador, Estado de Carga y Errores
    const [credits, setCredits] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true); //Loading state
    const [error, setError] = useState(null); // Manejo de errores

    //useEffect para ejecutar la lectura (READ) al montar el componente
    useEffect(() => {
        const fetchCredits = async () => {
            try {
                setLoading(true);
                const creditsCollection = collection(db, "credits");
                
                const querySnapshot = await getDocs(creditsCollection);
                
                const docs = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                setCredits(docs);
            } catch (err) {
                console.error("Error al leer Firestore:", err);
                setError("No se pudieron cargar los productos financieros. Revisa tu conexión a internet.");
            } finally {
                setLoading(false);
            }
        };

        fetchCredits();
    }, []);

    //Lógica de filtrado para el buscador
    const filteredCredits = credits.filter((credito) => {
        const nombreLimpio = (credito.name || '').toLowerCase();
        const busquedaLimpia = searchTerm.toLowerCase().trim();
        return nombreLimpio.includes(busquedaLimpia);
    });

    //Mientras carga
    if (loading) return (
        <div className="text-center py-5 mt-5">
            <div className="spinner-border text-orange" role="status" style={{ width: '3rem', height: '3rem' }}></div>
            <p className="mt-3 text-muted fw-bold text-uppercase">Conectando con la base de datos...</p>
        </div>
    );

    //Renderizado Condicional
    if (error) return (
        <div className="container py-5 text-center mt-5">
            <div className="alert alert-danger shadow-sm py-4">
                <i className="bi bi-wifi-off fs-1 d-block mb-3"></i>
                <h4 className="fw-bold">{error}</h4>
                <button className="btn btn-outline-danger mt-3" onClick={() => window.location.reload()}>
                    Reintentar conexión
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Banner con Buscador */}
            <section className="bg-orange text-white py-6 px-4">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-7 text-start">
                            <h1 className="fw-bold display-4 mb-3" style={{ lineHeight: '1.0' }}>
                                Seguridad En Cada Paso, <br /> Respaldo En Cada Meta
                            </h1>
                            <p className="lead opacity-90 mb-4" style={{ maxWidth: '700px' }}>
                                Rediseñamos el acceso al crédito. Combinamos tecnología inteligente con
                                soluciones humanas para ofrecerte préstamos rápidos.
                            </p>

                            <div className="input-group w-75 shadow-sm">
                                <span className="input-group-text bg-white border-0">
                                    <i className="bi bi-search text-orange"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-0 py-2"
                                    placeholder="¿Qué crédito buscas hoy?"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-md-5 d-none d-md-block text-end">
                            <img
                                src="/img/img_banner.png"
                                alt="Banner CrediSmart"
                                className="img-fluid"
                                style={{ maxHeight: '350px' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Listado Dinámico desde Firebase */}
            <main className="container py-5">
                <h2 className="fw-bold text-dark-blue mb-5 text-uppercase">Nuestros Productos</h2>
                <div className="row">
                    {filteredCredits.length > 0 ? (
                        filteredCredits.map((credito) => (
                            <CreditCard key={credito.id} {...credito} />
                        ))
                    ) : (
                        <div className="col-12 text-center py-5">
                            <i className="bi bi-exclamation-circle fs-1 text-muted"></i>
                            <h3 className="text-muted mt-3">No encontramos créditos con ese nombre.</h3>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default Inicio;