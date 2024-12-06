import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';


const TaskItem = ({ task, onCompleted, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableTask, setEditableTask] = useState({ ...task});

  
  const handleChange = (e) => {
    setEditableTask({ ...editableTask, [e.target.name]: e.target.value });
  };
    
  const handleCheckBoxChange = (checked) => {

    if(isEditing) {
      setEditableTask({ ...editableTask, completed: checked });
    } else {
      onCompleted();
    }
  };

  const handleSave = () => {
    onEdit(editableTask.id, editableTask);
    setIsEditing(false);
  }

  const handleCancel = () => {
    setEditableTask({ ...task });
    setIsEditing(false);
  };

  return(
    <Card className= {`flex items-center p-4 mb-4 gap-4 shadow-sm rounded-lg border"> ${task.completed ? 'bg-gray-100' : 'bg-white' }`}>
      <input
        type='checkbox'
        checked={isEditing ? editableTask.completed : task.completed}
        onChange={handleCheckBoxChange}
        className="h-5 w-5 accent-black rounded-md"
      />
      {isEditing ? (
        <div className=' flex flex-col flex-grow'>
          <input
            type="text"
            name="title"
            value={editableTask.title}
            onChange={handleChange}
            className="mb-2 border rounded-md p-2"
          />
          <textarea
            name="description"
            value={editableTask.description}
            onChange={handleChange}
            className="border rounded-md p-2"
          />
        </div>
      ) : (
        <div className={`flex-grow ${task.completed ? "line-through text-gray-400" : ""}`}>
          <h3 className="text-lg font-semibold text-left">{task.title}</h3>
          <p className="text-sm text-gray-500 text-left">{task.description}</p>
        </div>
      )}
      <div className="flex space-x-2">
      {isEditing ? (
        <>
          <Button variant="success" size="sm" onClick={handleSave}>
            <DoneIcon/>
          </Button>
          <Button variant="destructive" size="sm" onClick={handleCancel}>
            <CloseIcon/>
          </Button>
        </>
      ) : (
        <>
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <EditIcon/>

          </Button>
          <Button variant="destructive" size="sm" onClick={onDelete}>
            <DeleteIcon/>
          </Button>
        </>
      )}
      </div>
    </Card>
    
  );
};

export default TaskItem;