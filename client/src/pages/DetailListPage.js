import {useState, useCallback, useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import TaskList from '../components/TaskList';

function DetailListPage(){

  const [listId] = useState(document.location.pathname.split('/t/')[1]);
  const [listInfo, setListInfo] = useState(null);

  const getListInfo = useCallback(async()=>{
    const response = await fetch(`/api/list/${listId}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    setListInfo(data);
  },[listId]);

  useEffect(()=>{
    getListInfo();
  },[getListInfo]);

  return (
    <>
      <h1>{listInfo && listInfo.listTitle}</h1>
      <NavLink
        to="/list"
        className="btn"
      >Back to schedule's panel</NavLink>
      <TaskList />
    </>
  );
}

export default DetailListPage;