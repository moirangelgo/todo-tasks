import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/auth';

const { Title } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const token = await login(values.email, values.password);
      localStorage.setItem('token', token);
      message.success('Login successful');
      navigate('/');
    } catch (error) {
      message.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2}>Tasker UI</Title>
          <Typography.Text type="secondary">Bienvenido de nuevo</Typography.Text>
        </div>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: '¡Por favor ingresa tu correo!' }, { type: 'email', message: 'Correo inválido' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Correo Electrónico" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '¡Por favor ingresa tu contraseña!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              Iniciar Sesión
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            O <Link to="/register">¡regístrate ahora!</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
