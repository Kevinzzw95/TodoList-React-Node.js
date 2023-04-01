import {Form, Divider, List, Typography } from 'antd';
import React, { useContext } from 'react';

import { TaskContext } from '../../contexts/task.context';

import { TagContext } from '../../contexts/tag.context';

import "./style.css";
import ListItem from './listItem.component';

const { Paragraph } = Typography;

interface TodoListProps {
    filter: string;
}

function TodoList({filter} : TodoListProps) {
    const { tasks } = useContext(TaskContext);
    const { curTagId } = useContext(TagContext);

    const filterTasks = tasks.filter((task) => {
        switch (filter) {
            case 'Today':
                return (new Date(task.date)).toDateString() === (new Date()).toDateString();

            case 'Complete':
                return task.is_done;

            case 'Tags':
                return task.tag_id === curTagId;

            default:
                return true;
        }
    });

    return (
        <>
            <Divider className='list-title' orientation="center">Todo List</Divider>
                <List
                    style={{ margin: '24px 100px'}}
                    bordered
                    dataSource={filterTasks}
                    renderItem={(item) => 
                        <ListItem item={item}/>
                    }
                />
        </>
    );
    
    

}

export default TodoList;