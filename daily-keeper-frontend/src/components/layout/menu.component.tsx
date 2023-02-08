import React, { Fragment, useState, useContext } from "react";
import { Input, Button, Menu, Tag} from "antd";
import axios from "axios";
import { TagContext } from "../../contexts/tag.context";
import { TaskContext } from "../../contexts/task.context";
import { Tag as myTag } from "../../common/tag";
import { PlusCircleOutlined, TagsOutlined, FieldTimeOutlined, CheckOutlined } from "@ant-design/icons";
import TagItem from "./tagItem.component";
import SubMenu from "antd/es/menu/SubMenu";
import MenuItem from "antd/es/menu/MenuItem";
import { SelectInfo } from "rc-menu/lib/interface";

interface TodoMenuProps {
    onFilter: React.Dispatch<React.SetStateAction<string>>
}

function TodoMenu({onFilter} : TodoMenuProps) {

    const { tags, addTag, updateCurTagId} = useContext(TagContext);
    const[input, setInput] = useState("");
    const[err, setErr] = useState("");
    const{ tasks } = useContext(TaskContext);

    const onSubmitTag = () => {
        const trimedInput = input.trim();
        if (trimedInput === undefined || trimedInput === '' || trimedInput === null || 
            trimedInput === 'Today' || trimedInput === 'Completed') {
            setErr('Please add a valid tag!');
            setInput('');
            return;
        }

        if(tags.some((tag) => tag.name === trimedInput)) {
            setErr('Tag already exists!');
            setInput('');
            return;
        }
    
        let id : number = new Date().getTime();
        id = id & 0xffffffff;
    
        const newTag = new myTag(id, trimedInput, "#0564A4");
        axios.post('api/tags', newTag).then((res) => {
          setInput('');
          addTag(newTag);
        }).catch((data) => {
            console.log('error', data)
        })
    }

    const handleSelectMenu = (item : SelectInfo) => {
        if(item.key === 'addTag') {
            return;
        }
        if(item.key === 'today') {
            onFilter('Today');
        }
        else if(item.key === 'completed') {
            onFilter('Complete');
        }
        else {
            onFilter('Tags')
            updateCurTagId(item.key);
        }
    }

    return (
        <Menu
            mode="inline"
            style={{ height: '100%'}}
            //items={items}
            className="sider"
            onSelect={(item) => handleSelectMenu(item)}
        >
            <SubMenu title="Tags" key="tags" icon={<TagsOutlined />} children=
                {<Fragment>
                    {tags?.map((tag) => (
                        <MenuItem key={tag.name}>
                            <TagItem 
                                tag = {{
                                    id: tag.id,
                                    name: tag.name,
                                    color: tag.color
                                }}
                            />
                        </MenuItem>
                    ))}
                    <MenuItem className="tag-add" key="addTag">
                        <Input 
                            style={{ width: '80%' }} 
                            placeholder={ err === "" ? "Add a new tag" : err}
                            status={ err !== "" && input === "" ? "error" : "" } 
                            value={ input }
                            onChange={ (e) => {setErr(""); setInput(e.target.value)} }
                        />
                        <Button 
                            className="btn-add" 
                            type="link" 
                            icon={<PlusCircleOutlined/>} 
                            size="large"
                            onClick={onSubmitTag}
                        />
                    </MenuItem>
                    
                </Fragment>}
            />
            <MenuItem key="today" icon={<FieldTimeOutlined />}>
                Today
                <span>
                    <Tag className="menu-item-number">
                        {tasks.filter((task) => new Date(task.date).toDateString() === new Date().toDateString()).length}
                    </Tag>
                </span>
            </MenuItem>
            <MenuItem key="completed" icon={<CheckOutlined />}>
                Completed
                <span>
                    <Tag className="menu-item-number">
                        {tasks.filter((task) => task.done === true).length}
                    </Tag>
                </span>
            </MenuItem>

        </ Menu>
    );

}

export default TodoMenu;