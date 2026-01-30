import React from 'react';
import { List, Card, Checkbox, Tag, Typography, Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { Task, Category } from '../types';

const { Text } = Typography;

interface TaskListProps {
  tasks: Task[];
  categories: Category[];
  onToggle: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, categories, onToggle, onDelete }) => {
  const getCategoryName = (id: number | null) => {
    if (!id) return 'Uncategorized';
    return categories.find(c => c.id === id)?.title || 'Unknown';
  };

  return (
    <List
      grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
      dataSource={tasks}
      renderItem={item => (
        <List.Item>
          <Card
            hoverable
            style={{ 
              borderTop: `4px solid ${item.color}`, 
              opacity: item.is_completed ? 0.6 : 1,
              background: item.is_completed ? '#f9f9f9' : '#fff' 
            }}
            actions={[
               <Checkbox checked={item.is_completed} onChange={() => onToggle(item)}>
                 {item.is_completed ? 'Completada' : 'Marcar Lista'}
               </Checkbox>,
               <Popconfirm title="¿Eliminar?" onConfirm={() => onDelete(item.id)}>
                 <Button type="text" danger icon={<DeleteOutlined />} />
               </Popconfirm>
            ]}
          >
            <Card.Meta
              title={
                <Text delete={item.is_completed} strong>{item.title}</Text>
              }
              description={
                <>
                  <div style={{ marginBottom: 8 }}>{item.description}</div>
                  <Tag color={item.color}>{getCategoryName(item.category)}</Tag>
                </>
              }
            />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default TaskList;
