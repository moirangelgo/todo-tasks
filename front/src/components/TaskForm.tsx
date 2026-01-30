import React from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import type { Category, Task } from '../types';

interface TaskFormProps {
  open: boolean;
  categories: Category[];
  onCreate: (values: Partial<Task>) => Promise<void>;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ open, categories, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await onCreate(values);
      form.resetFields();
      onCancel();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Crear Nueva Tarea"
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="title" rules={[{ required: true, message: '¡Por favor ingresa el título!' }]}>
          <Input placeholder="Título de la Tarea" />
        </Form.Item>
        <Form.Item name="description">
          <Input.TextArea placeholder="Descripción (opcional)" />
        </Form.Item>
        <Form.Item name="category" rules={[{ required: true, message: 'Selecciona una categoría' }]}>
          <Select placeholder="Seleccionar Categoría">
            {categories.map(c => (
              <Select.Option key={c.id} value={c.id}>{c.title}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Crear Tarea
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm;
