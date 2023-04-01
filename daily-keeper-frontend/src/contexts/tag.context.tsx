import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Tag } from "../common/tag";

export const TagContext = createContext({} as TagContextProps);

interface Props {
    children?: React.ReactNode;
}

interface TagContextProps {
    tags: Tag[];
    curTagId: number;
    addTag: (newTag: Tag) => void;
    updateTagColor: (id: number, color: string) => void;
    updateCurTagId: (selectedTag: string) => void;
    deleteTag: (tagId : number) => void;
}

function TagProvider({children} : Props) {

    
    const[tags, setTags] = useState<Tag[]>([]);
    const[curTagId, setCurTagId] = useState<number>(1);

    useEffect(() => {
        axios.get<Tag[]>('/api/tags').then(
            res => {
                console.log('tag data: ', res.data);
                setTags(res.data);
            },
            err => {
                console.log(err);
            }
        )
    }, []);

    const updateTagColor = (id: number, color: string) => {
        setTags((prevTags) =>
          prevTags.map((tag) => {
            if (tag.id === id) {
              return { ...tag, color: color };
            }
            return tag;
          }),
        );
    };

    const addTag = (newTag : Tag) => {
        setTags((prevTag) => [...prevTag, newTag]);
    }

    const updateCurTagId = (selectedTag: string) => {
        setCurTagId(tags.find((tag) => tag.name === selectedTag)!.id);
    }

    const deleteTag = (tagId : number) => {
        setTags((prevTag) => prevTag.filter((tag) => tag.id != tagId));
    }

    return (
        <TagContext.Provider 
            value={{tags, curTagId, addTag, updateTagColor, updateCurTagId, deleteTag}}
        >
            {children}
        </TagContext.Provider>
    );


}

export default TagProvider;
