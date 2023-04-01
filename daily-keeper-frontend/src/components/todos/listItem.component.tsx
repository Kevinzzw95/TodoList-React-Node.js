
import {List, Checkbox, Tag } from 'antd';
import { useContext } from 'react';
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
        item.is_done = e.target.checked;
        
        axios.put(`api/tasks/${item.id}`, item).then((res) => {
            console.log("Update " + res.data);
            updateTaskStates(item.id, item.is_done, item.is_important, item.is_urgent);
        }).catch((data) => {
            console.log('error', data)
        })
    };

    return (
        <List.Item 
            actions={[
                <Tag color={tags.find((tag) => tag.id === item.tag_id)?.color}>
                {tags.find((tag) => tag.id === item.tag_id)?.name}
                </Tag>,
                <Tag >
                    {new Date(item.date).toDateString()}
                </Tag>,
                <EditTodo task={item}/>, 
                <DeleteTodo task={item}/>
            ]}
        >
        <Checkbox checked={item.is_done} onChange={(e) => onChangeState(e)}>
            <div className={item.is_done ? 'todo-item-text todo-text-strikethrough':'todo-item-text'}>
                {item.content}
            </div>
            
        </Checkbox>

        </List.Item>
    )

}

export default ListItem;