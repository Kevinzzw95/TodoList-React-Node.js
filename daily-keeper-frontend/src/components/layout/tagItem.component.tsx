import React, { useContext } from "react";
import axios from "axios";
import { useState, Fragment } from "react";
import { Popover, Tag, Button, Modal } from "antd";
import { HexColorPicker } from "react-colorful";
import { TaskContext } from "../../contexts/task.context";
import { TagContext } from "../../contexts/tag.context";
import { Tag as myTag } from "../../common/tag";
import { DeleteTwoTone, ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;

interface TagComponentProps {
    tag: myTag;
}

function TagItem({tag} : TagComponentProps) {
    const [isSelectingColor, setIsSelectingColor] = useState(false);
    const [color, setColor] = useState("#aabbcc");
    const { tasks } = useContext(TaskContext);
    const { updateTagColor, deleteTag } = useContext(TagContext);
    const { deleteTask } = useContext(TaskContext);
    
    const handleDelete = (id: number) => {
        confirm({
            title: 'Are you sure to delete this tag?',
            icon: <ExclamationCircleFilled />,
            content: 'The tag as well as corresponding tasks will be deleted',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
                axios.delete(`api/tags/${id}`).then((res) => {
                    deleteTag(id);
                }).catch((data) => {
                    console.log('error', data);
                })
        
                tasks.map((task) => {
                    if(task.tag_id === id) {
                        axios.delete(`api/tasks/${task.id}`).then((res) => {
                            deleteTask(task.id);
                        }).catch((data) => {
                            console.log('error', data);
                        })
                    }
                });
            },
            onCancel() {
              console.log('Cancel');
            },
          }); 
    }

    const handleOk = () => {
        setIsSelectingColor(false);
        updateTagColor(tag.id, color);
        tag.color = color;
        axios.put(`api/tags/${tag.id}`, tag).then((res) => {
            console.log("tag update: " + res.data);
        }).catch((data) => {
            console.log('error', data)
        });
    };
    
    const hide = () => {
        setIsSelectingColor(false);
    };
    
    const handleOpenChange = (newOpen: boolean) => {
        setIsSelectingColor(newOpen);
    };

    return (
        <Fragment>
            <div className="tag-bar">
                <span>{tag.name}</span>
                {tag.name === 'None' ? <></> : 
                <span>
                    <Button className="tag-delete" type="link" shape="circle" icon={<DeleteTwoTone />} 
                        size = "small" onClick={() => handleDelete(tag.id)}
                    /> 
                </span>}
                
                <span>
                    <Popover
                        content={
                            <Fragment>
                                <HexColorPicker color={tag.color} onChange={setColor} />
                                <span className="color-picker-action">
                                    <a onClick={hide}>Close</a>
                                </span>
                                <span className="color-picker-action">
                                    <a onClick={handleOk}>Confirm</a> 
                                </span>
                                
                                
                            </Fragment>
                        }
                        title="Title"
                        trigger="click"
                        open={isSelectingColor}
                        onOpenChange={handleOpenChange}
                    >
                        <Tag className="tag-color" color={tag.color} />

                    </Popover>
                     
                </span>
                                  

                <span>
                    <Tag className="menu-item-number">
                        {tasks.filter((task) => task.tag_id === tag.id)?.length}
                    </Tag>
                </span>
            </div>
        </Fragment>
    );
}

export default TagItem;
