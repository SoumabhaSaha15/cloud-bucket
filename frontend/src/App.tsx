import './App.css'
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import UserAuthentication from './Components/UserAuthentication';
import HomePage from './Components/HomePage';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={HomePage}/>
        <Route path='/user-authentication' Component={UserAuthentication}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
