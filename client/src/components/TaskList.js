import {useState, useCallback, useEffect} from 'react';

function TaskList(){

  const [listId] = useState(document.location.pathname.split('/t/')[1]);
  const [form, setForm] = useState({
    taskTitle: ''
  });
  const [tasks, setTasks] = useState(null);

  const getTasks = useCallback(async ()=>{
    const response = await fetch(`/api/task/${listId}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    setTasks(data);
  }, [listId]);

  useEffect(()=>{
    getTasks();
  },[getTasks]);

  function inputHandler(event){
    setForm({
      [event.target.id]: [event.target.value]
    });
  }

  async function addNewTaskHandler(){

    const body = JSON.stringify({...form});

    const response = await fetch(`/api/task/${listId}`,{
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    setTasks(data);
  }

  async function deleteHandler(event){
    const response = await fetch(`/api/task/delete/${event.target.id}/${listId}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    setTasks(data);
  }

  return (
    <>
      <table className="centered">
        <tbody>
          {tasks && tasks.map(task=>{
            return (
              <tr>
                <td>{task.taskTitle}</td>
                <td>
                  <button
                    id={task._id}
                    className="btn"
                    onClick={deleteHandler}
                  >Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <form className="col s12">      
        <div className="row">
          <div className="input-field col s12">
            <input
              id="taskTitle" 
              type="text"
              className="validate" 
              value={form.taskTitle}
              onChange={inputHandler}
            />
            <label htmlFor="taskTitle">New task's title</label>
          </div>
        </div>      
        <button
          className="btn"
          onClick={addNewTaskHandler}
        >Add new task</button>
      </form>
    </>
  );
}

export default TaskList;