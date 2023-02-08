import React, { useState, useEffect, useContext, Fragment } from "react";
import { Button, Input, Select, DatePicker } from 'antd';
import axios from 'axios';
import { TaskContext } from "../../contexts/task.context";
import { Task } from "../../common/task";
import { v4 as uuid } from 'uuid';
import { default as dayjs } from 'dayjs';
import { TagContext } from "../../contexts/tag.context";
import { Tag } from "../../common/tag";

const { Option } = Select;

var utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const CreateTodo = () => {

    const [input, setInput] = useState(''); 
    const [date, setDate] = useState(new Date()); 
    const [err, setErr] = useState('');
    const { addTask } = useContext(TaskContext);
    const { tags } = useContext(TagContext);
    const [selectedTag, setSelectedTag] = useState<Tag>(new Tag(1)); 


    const onSubmitTodo = () => {

        const trimedInput = input.trim();
        if (trimedInput === undefined || trimedInput === '' || trimedInput === null) {
          setErr('Please add a valid tag!');
          return;
        }

        const id = uuid();

        const newTask = new Task(id, trimedInput, date, selectedTag!.id);

        axios.post('api/tasks', newTask).then((res) => {
            console.log(res.data);
            setInput('');
            
            addTask(newTask);
        }).catch((data) => {
            console.log('error', data)
        })
    }

    useEffect(() => {
        const currTag = tags?.find((tag) => tag.id === selectedTag?.id);
        if(currTag != null) {
            setSelectedTag(currTag!);
        }
    }, [selectedTag, tags]);

    const handleSelectTag = (selectTag: string) => {
        const targetTag = tags.find((currTag) => currTag.name === selectTag);
        setSelectedTag(targetTag!);
    }

    const handleSelectDate = (date: dayjs.Dayjs| null) => {
        setDate(date!.toDate());
    };

    const getTimePeriod = () => {
        const hrs = new Date().getHours();
        if (hrs < 12 && hrs >=6)
            return 'Morning';
        else if (hrs >= 12 && hrs <= 17)
            return 'Afternoon';
        else if (hrs >= 17 && hrs <= 20)
            return 'Evening';
        else 
            return 'Night';
    }

    return (
        <div className="input-task" >
            <h1 className="greeting">
                Good {getTimePeriod()} ～
            </h1>
            <Input.Group  compact >
                <Input
                    style={{
                        width: 'calc(60% - 200px)'
                    }}
                    placeholder={ err === "" ? "Add a new todo" : err}
                    status={ err !== "" && input === "" ? "error" : "" } 
                    value={input}
                    onChange={e => {setErr(""); setInput(e.target.value)}}
                />
                <Select 
                    defaultValue="None"
                    onChange={handleSelectTag}
                >
                    {tags?.map((tag, index) => (
                        <Fragment key={index}>
                            <Option value={tag.name}>{tag.name}</Option>
                        </Fragment>
                    ))}
                </Select>
                <DatePicker defaultPickerValue={dayjs()} onChange={handleSelectDate}/>
                <Button className="create-btn" type="primary" onClick={onSubmitTodo}>Add</Button>

            </Input.Group>
        </div>
    )
}

export default CreateTodo;