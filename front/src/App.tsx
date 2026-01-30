import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { ConfigProvider } from 'antd';
const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#7C90DB', // Color primario (Rojo)
          borderRadius: 4,         // Ejemplo: bordes más rectos
        },
        components: {
          Button: {
            colorPrimaryHover: '#736B92', // Es mejor usar un hexadecimal para el hover
          },
        },
      }}
    >
      {/* Todo lo que esté aquí adentro heredará el tema */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};
export default App;
