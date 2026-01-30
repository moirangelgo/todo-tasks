import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Typography, FloatButton, message, Input, Modal, Tabs } from 'antd';
import { PlusOutlined, LogoutOutlined, AppstoreOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getCategories, createCategory, deleteCategory } from '../services/categories';
import { getTasks, createTask, updateTask, deleteTask } from '../services/tasks';
import type { Category, Task } from '../types';
import { logout } from '../services/auth';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const Dashboard: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  // const [loading, setLoading] = useState(true);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [cats, tsks] = await Promise.all([getCategories(), getTasks()]);
      setCategories(cats);
      setTasks(tsks);
    } catch (error) {
      console.error(error);
      navigate('/login');
    }
//  finally {
//       setLoading(false);
//     }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
    else fetchData();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreateTask = async (values: Partial<Task>) => {
    await createTask(values);
    message.success('Task created');
    fetchData();
  };

  const handleToggleTask = async (task: Task) => {
    await updateTask(task.id, { is_completed: !task.is_completed });
    // Optimistic update or refetch
    fetchData(); 
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    message.success('Tarea eliminada');
    fetchData();
  };

  const handleAddCategory = async (value: string) => {
    if (!value) return;
    try {
      await createCategory(value);
      message.success('Categoría agregada');
      fetchData();
    } catch(e) { message.error('Falló al agregar categoría'); }
  };
  
    const handleDeleteCategory = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    Modal.confirm({
      title: '¿Eliminar Categoría?',
      content: 'Esto no borrará las tareas, pero las desasignará.',
      onOk: async () => {
        await deleteCategory(id);
        if (selectedCategory === String(id)) setSelectedCategory('all');
        fetchData();
      }
    });
  };

  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(t => t.category === Number(selectedCategory));

  const pendingTasks = filteredTasks.filter(t => !t.is_completed);
  const completedTasks = filteredTasks.filter(t => t.is_completed);

  const items = [
    {
      key: '1',
      label: 'Pendientes',
      children: (
        <TaskList 
          tasks={pendingTasks} 
          categories={categories}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />
      ),
    },
    {
      key: '2',
      label: 'Terminadas',
      children: (
        <TaskList 
          tasks={completedTasks} 
          categories={categories}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" width={250} style={{ borderRight: '1px solid #f0f0f0' }}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f0f0f0' }}>
            <Title level={4} style={{ margin: 0, color: '#1890ff' }}>Tasker</Title>
        </div>
        <Menu 
            mode="inline" 
            selectedKeys={[selectedCategory]}
            onClick={(e) => setSelectedCategory(e.key)}
            style={{ borderRight: 0 }}
            items={[
                { key: 'all', icon: <AppstoreOutlined />, label: 'Todas las Tareas' },
                ...categories.map(c => ({
                    key: String(c.id),
                    label: (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>{c.title}</span>
                            <DeleteOutlined 
                                style={{ fontSize: 12, color: '#999' }} 
                                onClick={(e) => handleDeleteCategory(e, c.id)} 
                            />
                        </div>
                    )
                }))
            ]}
        />
        <div style={{ padding: 16, borderTop: '1px solid #f0f0f0' }}>
            <Input.Search placeholder="Nueva Categoría" onSearch={handleAddCategory} enterButton={<PlusOutlined />} />
        </div>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px #f0f1f2' }}>
           <Title level={3} style={{ margin: 0 }}>
               {selectedCategory === 'all' ? 'Todas las Tareas' : categories.find(c => String(c.id) === selectedCategory)?.title}
           </Title>
           <Button icon={<LogoutOutlined />} onClick={handleLogout}>Salir</Button>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', borderRadius: 8, overflow: 'auto' }}>
           <Tabs defaultActiveKey="1" items={items} />
        </Content>
      </Layout>
      <FloatButton 
        icon={<PlusOutlined />} 
        type="primary" 
        style={{ right: 24, bottom: 24, width: 60, height: 60 }} 
        onClick={() => setIsTaskModalOpen(true)} 
      />
      
      <TaskForm 
        open={isTaskModalOpen} 
        categories={categories} 
        onCreate={handleCreateTask} 
        onCancel={() => setIsTaskModalOpen(false)}
      />
    </Layout>
  );
};

export default Dashboard;
