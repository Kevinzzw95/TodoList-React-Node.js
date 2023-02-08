import {Form, Divider, List, Typography, Checkbox, Tag } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { TaskContext } from '../../contexts/task.context';
import DeleteTodo from './deleteTodo.component';
import EditTodo from './editTodo.component';
import { TagContext } from '../../contexts/tag.context';
import axios from 'axios';
import { Task } from '../../common/task';
import "./style.css";
import ListItem from './listItem.component';

const { Paragraph } = Typography;

interface TodoListProps {
    filter: string;
}

function TodoList({filter} : TodoListProps) {
    const {tasks, updateTaskStates} = useContext(TaskContext);
    const {tags, curTagId} = useContext(TagContext);

    const filterTasks = tasks.filter((task) => {
        switch (filter) {
            case 'Today':
                return (new Date(task.date)).toDateString() === (new Date()).toDateString();

            case 'Complete':
                return task.done;

            case 'Tags':
                return task.tagId === curTagId;

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