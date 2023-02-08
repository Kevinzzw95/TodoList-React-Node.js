import React, { Fragment, useState } from 'react';
import { Button, Form, Input, Modal, DatePicker, Select, DatePickerProps } from 'antd';
import { Task } from '../../common/task';
import { EditTwoTone } from '@ant-design/icons';
import { useContext } from 'react';
import { TaskContext } from '../../contexts/task.context';
import { TagContext } from '../../contexts/tag.context';
import dayjs from 'dayjs';
import axios from 'axios';

const { Option } = Select;

interface EditTodoProps {
    task: Task;
}

interface UpdateValues {
    content: string;
    tag: string;
    date: Date;
}

interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (updateValues: UpdateValues) => void;
    onCancel: () => void;
}
  


function EditTodo({ task } : EditTodoProps) {
    const [open, setOpen] = useState(false);
    const { updateTask } = useContext(TaskContext);
    const { tags } = useContext(TagContext);

    const handleSelect = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
        open,
        onCreate,
        onCancel,
    }) => {
        const [form] = Form.useForm();
        return (
            <Modal
                open={open}
                title="Update your Todo"
                okText="Update"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                form
                    .validateFields()
                    .then((updateValues) => {
                        form.resetFields();
                        onCreate(updateValues);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
                }}
            >
            <Form
              form={form}
              layout="vertical"
              name="form_in_modal"
              initialValues={{ 
                content: task.content, 
                date: dayjs(task.date), 
                tag: tags.find((tag) => tag.id === task.tagId)?.name}}
            >
                <Form.Item
                    name="content"
                    label="Todo"
                    rules={[{ required: true, message: 'Please update your todo' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="tag"
                    label="Tag"
                >
                    <Select
                        style={{ width: 120 }}
                        onChange={handleSelect}
                    >
                        {tags?.map((tag, index) => (
                            <Fragment key={index}>
                                <Option value={tag.name}>{tag.name}</Option>
                            </Fragment>
                        ))}    
                    </Select>
                </Form.Item>
                <Form.Item name="date" label="Date">
                    <DatePicker onChange={onChangeDate}/>
                </Form.Item>
                </Form>
            </Modal>
        );
    };

    const onCreate = (updateValues: any) => {
        console.log('Received values of form: ', updateValues);

        const updatedTask = new Task(task.id, updateValues.content, updateValues.date, updateValues.tag);

        axios.put(`api/tasks/${task.id}`, updatedTask).then((res) => {
            console.log(res.data);
            updateTask(task.id, updateValues.content, updateValues.tag, updateValues.date);
            setOpen(false);
        }).catch((data) => {
            console.log('error', data)
        })
    };

    return (
        <Fragment>
            <Button
                type="link"
                size="small"
                onClick={() => {
                    setOpen(true);
                }}
                icon={<EditTwoTone />}
            />
            <CollectionCreateForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </Fragment>
    );
}

export default EditTodo;
  