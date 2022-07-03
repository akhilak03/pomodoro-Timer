import React from 'react'
import { useForm } from 'react-hook-form'
import {useState} from 'react';
import {addTodo} from '../slices/todoSlice';
import { useDispatch } from 'react-redux';
import axios from "axios";
import {  useSelector } from 'react-redux'

function Todo() {
  let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(
    (state) => state.user

  )
const [todos,setTodos]=useState({username:userObj.username,todo:[]});

    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()

    const onFormSubmit=(todoObj)=>{

       setTodos((state)=>{
         state.todo.push(todoObj)
       })
        
     ;
     
        
    axios
    .post("http://localhost:4000/user/getTodo",todos)
    .then((response) => {
      alert(response.data.message);
    })
    .catch((error) => alert("something went wrong!!"));
  

    }
  return (
    <div className="row container m-auto row-12">
      <div className="col-12 ">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="mb-2">
            <h1 className=" p-2 adhead">Today's Tasks</h1>
            <input
              type="text"
              id="todo"
              className="form-control infld p-3 border rounded-pill"
              {...register("todo", { required: true })}
            />
            {errors.todo?.type === "required" && (
              <p className="text-danger text-start">*Add a task in "Tasks"</p>
            )}
          </div>
          <button
            className="btn bg-success text-light border-success rounded-pill p-3 m-2 w-50"
            type="submit"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>

  )
}

export default Todo