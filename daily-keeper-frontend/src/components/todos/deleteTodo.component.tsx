import React, { Fragment, useState } from "react";
import { Button } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import { useContext } from "react";
import { TaskContext } from "../../contexts/task.context";
import { Task } from "../../common/task";
import axios from "axios";

interface TodoListProps {
    task: Task;
}

function DeleteTodo({ task }: TodoListProps) {

    const { deleteTask } = useContext(TaskContext);

    const handleDelete = (id: string) => {

        axios.delete(`api/tasks/${id}`).then((res) => {
            console.log(res.data);
            deleteTask(id);
        }).catch((data) => {
            console.log('error', data);
        })
        
    }

    return (
        <Button type="link" shape="circle" icon={<DeleteTwoTone />} 
            size = "small" onClick={() => handleDelete(task.id)}
        />    
    );
}

export default DeleteTodo;