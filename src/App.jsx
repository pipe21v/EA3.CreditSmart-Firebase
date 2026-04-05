import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Simulator from './pages/Simulator';
import Solicitar from './pages/Solicitar';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column">

        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark-blue px-4 py-2">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <img
                src="/img/logo.png"
                alt="CrediSmart Logo"
                style={{ height: '50px', width: 'auto' }}
              />
            </Link>

            <div className="ms-auto">
              <Link to="/" className="text-white text-decoration-none me-3 fw-bold">INICIO</Link>
              <Link to="/simulator" className="text-white text-decoration-none me-3 fw-bold">SIMULADOR</Link>
              <Link to="/solicitar" className="text-white text-decoration-none fw-bold">SOLICITAR</Link>
              <Link to="/admin" className="text-white text-decoration-none fw-bold">  ADMIN</Link>
            </div>
          </div>
        </nav>

        {/* Menu */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/solicitar" element={<Solicitar />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-dark-blue text-white py-4 mt-auto">
          <div className="container text-center">
            <div className="row align-items-center">
              <div className="col-md-4 text-md-start mb-3 mb-md-0">
                <img
                  src="/img/logo.png"
                  alt="Logo Footer"
                  style={{ height: '40px', filter: 'brightness(0) invert(1)' }}
                />
              </div>
              <div className="col-md-4 mb-3 mb-md-0">
                <p className="mb-0 small">© 2026 CrediSmart - IUD Ingeniería de Software</p>
              </div>
              <div className="col-md-4 text-md-end">
                <i className="bi bi-facebook me-3"></i>
                <i className="bi bi-instagram me-3"></i>
                <i className="bi bi-linkedin"></i>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;