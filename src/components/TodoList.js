import React from 'react'


import { useSelector } from 'react-redux'



function Todolist() {

    let todolist = useSelector(state => state.todo)

    //console.log("todo list is ", todolist)

    return (
        <div className='border-end border-5  p-3'>
            <p className="display-6 text-center heading" style={{ color: '#0096c7' }}>
               
            </p>
            <hr />



            

            {/* if no todos existed, it shd render "no tasks" */}
            {todolist.length === 0 && <p className='display-6 text-danger'>No tasks found</p>}
            {
                todolist.map((todoTask, index) => <h3 className='text-warning' key={index}>{todoTask}</h3>)
            }


        </div>
    )
}

export default Todolist