import './App.css'
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import UserAuthentication from './pages/UserAuthentication';
import HomePage from './pages/HomePage';
import Files from './pages/Files';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
function App() {

  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={HomePage}/>
          <Route path='/user-authentication' Component={UserAuthentication}/>
          <Route path='/files' Component={Files}/>
        </Routes>
      </BrowserRouter>
    </DndProvider>
  )
}

export default App
