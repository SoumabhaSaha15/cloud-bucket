import './App.css'
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import UserAuthentication from './pages/UserAuthentication';
import HomePage from './pages/HomePage';
import Files from './pages/Files';
function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={HomePage}/>
          <Route path='/user-authentication' Component={UserAuthentication}/>
          <Route path='/files' Component={Files}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
