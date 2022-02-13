import {useState} from 'react';
import {NavLink} from 'react-router-dom';

function CreateList(){

  const [form, setForm] = useState({
    listTitle: ''
  });

  function inputHandler(event){
    setForm({
      [event.target.id]: [event.target.value]
    });
  }

  async function addListHandler(){
    const body = JSON.stringify({...form});
    await fetch('/api/list',{
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return (
    <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input
              id="listTitle" 
              type="text"
              className="validate" 
              value={form.listTitle}
              onChange={inputHandler}
            />
            <label htmlFor="listTitle">New list's title</label>
          </div>
        </div>
        <NavLink
          to="/list/create"
          className="waves-effect waves-light btn"
          onClick={addListHandler}
        >Add new list</NavLink>
      </form>
    </div>
  );
}

export default CreateList;