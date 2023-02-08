
import {Form, Divider, List, Typography, Checkbox, Tag } from 'antd';
import React, { useContext, useState } from 'react';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { TaskContext } from '../../contexts/task.context';
import DeleteTodo from './deleteTodo.component';
import EditTodo from './editTodo.component';
import { TagContext } from '../../contexts/tag.context';
import axios from 'axios';
import { Task } from '../../common/task';
import "./style.css";

interface ListItemProps {
    item: Task;
}

function ListItem({item}: ListItemProps) {
    const {tags} = useContext(TagContext);
    const {updateTaskStates} = useContext(TaskContext); 

    const onChangeState = (e: CheckboxChangeEvent) => {
        item.done = e.target.checked;
        
        axios.put(`api/tasks/${item.id}`, item).then((res) => {
            updateTaskStates(item.id, item.done, item.important, item.urgent);
        }).catch((data) => {
            console.log('error', data)
        })
    };

    return (
        <List.Item 
            actions={[
                <Tag color={tags.find((tag) => tag.id === item.tagId)?.color}>
                {tags.find((tag) => tag.id === item.tagId)?.name}
                </Tag>,
                <Tag >
                    {new Date(item.date).toDateString()}
                </Tag>,
                <EditTodo task={item}/>, 
                <DeleteTodo task={item}/>
            ]}
        >
        <Checkbox checked={item.done} onChange={(e) => onChangeState(e)}>
            <div className={item.done ? 'todo-item-text todo-text-strikethrough':'todo-item-text'}>
                {item.content}
            </div>
            
        </Checkbox>

        </List.Item>
    )

}

export default ListItem;