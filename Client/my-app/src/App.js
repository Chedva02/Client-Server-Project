import logo from './logo.svg';
import './App.css';
import Axios from 'axios'
import Users from './components/users/users'
import Todos from './components/todos/todos';
import TodosCategory from './components/todos/todosCategory'
import Posts from "./components/posts/Posts"
import Photos from "./components/photos/photos"
import Layout from './components/Layout';
import {Routes,Route} from "react-router-dom"

function App() {
  return (
    <>
    
    <Routes>
      <Route path ='/' element={<Layout/>}>
      <Route path ='/users' element={<Users/>}/>
      <Route path ='/todos' element={<Todos/>}/>
      <Route path ='/posts' element={<Posts/>}/>
      <Route path ='/photos' element={<Photos/>}/>
      </Route>
    </Routes>
   
    
    </>
  );
}

export default App;
