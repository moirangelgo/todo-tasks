import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/auth';

const { Title } = Typography;

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await register(values.email, values.password);
      message.success('Registration successful. Please login.');
      navigate('/login');
    } catch (error) {
      message.error('Registration failed. Email might be in use.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2}>Crear Cuenta</Title>
          <Typography.Text type="secondary">Únete a Tasker UI</Typography.Text>
        </div>
        <Form
          name="register"
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
            rules={[{ required: true, message: '¡Por favor ingresa tu contraseña!' }, { min: 8, message: 'La contraseña debe tener al menos 8 caracteres' }]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" size="large" />
          </Form.Item>
           <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: '¡Por favor confirma tu contraseña!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('¡Las dos contraseñas no coinciden!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirmar Contraseña" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              Registrarse
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            ¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
