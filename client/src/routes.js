import {Routes, Route, Navigate} from 'react-router-dom';
import ListPage from './pages/ListPage';
import DetailListPage from './pages/DetailListPage';

function useRoutes(){
  return (
    <Routes>
      <Route path="/list" element={<ListPage />}/>
      <Route path="/list/t/*" element={<DetailListPage />}/>
      <Route path="/*" element={<Navigate to="/list" />}/>
    </Routes>
  );
} 

export default useRoutes;