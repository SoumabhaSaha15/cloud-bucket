import './App.css'
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import UserAuthentication from './Components/UserAuthentication';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' Component={}/> */}
        <Route path='/user-authentication' Component={UserAuthentication}/>
        {/* <Route path='/goodbye' Component={Goodbye}/>
        <Route path='/signup' Component={Signup}/>
        <Route path='/login' Component={Login}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
