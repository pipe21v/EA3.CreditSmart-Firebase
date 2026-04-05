import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import creditsData from '../data/creditsData'; 

const Solicitar = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    telefono: '',
    email: '',
    tipoCredito: '',
    monto: '',
    plazo: '12',
    destino: '',
    empresa: '',
    cargo: '',
    ingresos: ''
  });

  const [cuotaEstimada, setCuotaEstimada] = useState(0);
  const [enviado, setEnviado] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState(false);

  // Lógica de cálculo en tiempo real
  useEffect(() => {
    const tasa = 0.018;
    const p = parseFloat(formData.monto);
    const n = parseInt(formData.plazo);
    if (p > 0 && n > 0) {
      const cuota = (p * tasa * Math.pow(1 + tasa, n)) / (Math.pow(1 + tasa, n) - 1);
      setCuotaEstimada(cuota);
    } else {
      setCuotaEstimada(0);
    }
  }, [formData.monto, formData.plazo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //FUNCIÓN DE ENVÍO A FIREBASE 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorEnvio(false);

    try {
      // Referencia a la colección en la nube
      const solicitudesRef = collection(db, "solicitudes");

      await addDoc(solicitudesRef, {
        ...formData,
        cuotaEstimada: Math.round(cuotaEstimada),
        fechaRegistro: new Date().toLocaleString(), 
        estado: 'Pendiente'
      });

      setEnviado(true);
      handleLimpiar(); 
      setTimeout(() => setEnviado(false), 5000);

    } catch (error) {
      console.error("Error al guardar:", error);
      setErrorEnvio(true);
    }
  };

  const handleLimpiar = () => {
    setFormData({
      nombre: '', cedula: '', telefono: '', email: '', 
      tipoCredito: '', monto: '', plazo: '12', destino: '', 
      empresa: '', cargo: '', ingresos: ''
    });
    setCuotaEstimada(0);
  };

  return (
    <div className="container py-5 bg-white">
      <div className="row">
        <div className="col-md-7">
          <h1 className="fw-bold text-dark-blue mb-4 text-uppercase">Formulario de Solicitud</h1>
          
          <form onSubmit={handleSubmit}>
            {/* Sección de Datos Personales */}
            <div className="bg-light p-4 rounded mb-4 shadow-sm border-start border-orange border-4">
              <h5 className="fw-bold text-dark-blue mb-3">Datos Personales</h5>
              <div className="mb-3">
                <label className="text-orange small fw-bold">Nombre Completo</label>
                <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="text-orange small fw-bold">Número de Cédula</label>
                <input type="number" name="cedula" className="form-control" value={formData.cedula} onChange={handleChange} required />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="text-orange small fw-bold">Teléfono</label>
                  <input type="tel" name="telefono" className="form-control" value={formData.telefono} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="text-orange small fw-bold">Email</label>
                  <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                </div>
              </div>
            </div>

            {/* Sección de Datos del Crédito */}
            <div className="bg-light p-4 rounded mb-4 shadow-sm border-start border-orange border-4">
              <h5 className="fw-bold text-dark-blue mb-3">Datos Del Crédito</h5>
              <div className="mb-3">
                <label className="text-orange small fw-bold">Tipo De Crédito</label>
                <select name="tipoCredito" className="form-select" value={formData.tipoCredito} onChange={handleChange} required>
                  <option value="">Seleccione un crédito...</option>
                  {creditsData.map((credito) => (
                    <option key={credito.id} value={credito.name}>
                      {credito.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="text-orange small fw-bold">Monto Solicitado</label>
                  <input type="number" name="monto" className="form-control" value={formData.monto} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="text-orange small fw-bold">Plazo (Meses)</label>
                  <select name="plazo" className="form-select" value={formData.plazo} onChange={handleChange}>
                    <option value="12">12 Meses</option>
                    <option value="24">24 Meses</option>
                    <option value="36">36 Meses</option>
                    <option value="48">48 Meses</option>
                    <option value="60">60 Meses</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="text-orange small fw-bold">Destino Del Crédito</label>
                <input type="text" name="destino" className="form-control" placeholder="Ej: Compra de vivienda, Viaje, etc." value={formData.destino} onChange={handleChange} required />
              </div>
            </div>

            {/* Sección de Datos Laborales */}
            <div className="bg-light p-4 rounded mb-4 shadow-sm border-start border-orange border-4">
              <h5 className="fw-bold text-dark-blue mb-3">Datos Laborales</h5>
              <div className="mb-3">
                <label className="text-orange small fw-bold">Empresa Donde Trabaja</label>
                <input type="text" name="empresa" className="form-control" value={formData.empresa} onChange={handleChange} required />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="text-orange small fw-bold">Cargo</label>
                  <input type="text" name="cargo" className="form-control" value={formData.cargo} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="text-orange small fw-bold">Ingresos Mensuales</label>
                  <input type="number" name="ingresos" className="form-control" value={formData.ingresos} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <div className="d-grid gap-3">
              <button type="submit" className="btn btn-orange text-white fw-bold py-3 shadow-sm text-uppercase">
                Enviar Solicitud
              </button>
              <button type="button" className="btn btn-outline-secondary fw-bold py-2 text-uppercase" onClick={handleLimpiar}>
                Limpiar Formulario
              </button>
            </div>

            {/* Mensaje de Error*/}
            {errorEnvio && (
              <div className="alert alert-danger mt-3">
                No se pudo conectar con el servidor. Intenta más tarde.
              </div>
            )}
          </form>
        </div>

        {/* Lado derecho: Resumen */}
        <div className="col-md-5">
          <div className="sticky-top" style={{ top: '100px' }}>
            <div className="text-center mb-5">
               <img src="/img/logo.png" alt="Logo" className="img-fluid w-50" />
            </div>
            
            <div className="card border-0 shadow-lg bg-dark-blue text-white p-4 rounded-4">
              <h4 className="fw-bold mb-4 border-bottom pb-2">Resumen de Solicitud</h4>
              <p className="mb-1 small opacity-75">Crédito seleccionado:</p>
              <h5 className="text-orange fw-bold mb-4">{formData.tipoCredito || 'No seleccionado'}</h5>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Monto:</span>
                <span className="fw-bold">${parseFloat(formData.monto || 0).toLocaleString('es-CO')}</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span>Plazo:</span>
                <span className="fw-bold">{formData.plazo} Meses</span>
              </div>

              <div className="bg-white text-dark-blue rounded-3 p-3 text-center">
                <small className="fw-bold d-block text-muted mb-1">CUOTA ESTIMADA</small>
                <h2 className="fw-bold mb-0">${Math.round(cuotaEstimada).toLocaleString('es-CO')}</h2>
              </div>
            </div>

            {enviado && (
              <div className="alert alert-success mt-4 border-0 shadow-sm animate__animated animate__bounceIn">
                <i className="bi bi-check-circle-fill me-2"></i>
                ¡Solicitud enviada correctamente!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solicitar;