import {useCallback, useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import CreateList from '../components/CreateList';

function ListPage(){

  const [lists, setLists] = useState(null);

  const getLists = useCallback(async ()=>{
    const response = await fetch('/api/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    setLists(data);
  },[]);

  useEffect(()=>{
    getLists();
  }, [getLists]);

  async function deleteHandler(event){
    const response = await fetch(`/api/list/delete/${event.target.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const updatedLists = await response.json();
    setLists(updatedLists);
  }

  return (
    <>
      <h1>Schedule's panel</h1>
      <table className="centered">
        <tbody>
          {lists && lists.map(list=>{
            return (
              <tr>
                <td>{list.listTitle}</td>
                <td>
                  <NavLink
                    to={`/list/t/${list._id}`}
                    style={{marginRight: '2rem'}}
                    className="btn"
                  >Go to schedule</NavLink>
                  <button
                    id={list._id}
                    className="btn"
                    onClick={deleteHandler}
                  >Delete</button>
                </td>
              </tr>        
            );
          })}
        </tbody>
      </table>
      <CreateList />    
    </>
  );
}

export default ListPage;