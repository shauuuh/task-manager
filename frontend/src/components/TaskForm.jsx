import React from 'react';
import { createTask } from '../services/api';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


const TaskForm = ({ taskAdded }) => {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get("title");
    const description = formData.get("description");

    try {
      const taskData = {
        title,
        description
      }; 

      const response = await createTask(taskData);
      
      taskAdded(response);
      
    } catch (error) {
      console.error("Error creating the task", error.response?.data || error.message );
    }
  };

  return(
    <Card>
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-primary">Create a New Task</CardTitle>
      </CardHeader>
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-6 px-6">
        <div className="space-y-2">
          <Input 
            type='text' 
            name='title' 
            placeholder='Title'
            className="h-12 text-lg"
            required/>
        </div>
        <div className="space-y-2">
          <Textarea
            name='description'
            className="min-h-[100px] text-base"
            placeholder='Description'
          />
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 flex justify-end">
        <Button type='submit' className="w-full sm:w-auto">Create Task</Button>
      </CardFooter>
        
    </form>
    </Card>
  );
};

export default TaskForm;