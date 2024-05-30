import { Route, Routes } from 'react-router-dom'
import InicioRoute from './components/RoutesComponents/inicio/Page'
import Navbar from './components/Navbar'
import { EntidadesContextProvider } from './context/EntidadesContext'
import WindowEmer from './components/WindowEmer'

const App = ()=> {


  return (
    <>
    <div className='relative flex flex-col w-full h-max font-dosis'>
      <EntidadesContextProvider>
        
        <Navbar />

        <Routes>
          <Route path='/' element={<InicioRoute />}/>

          
        </Routes>

        <WindowEmer />

      </EntidadesContextProvider>
      
    </div>
     
    </>
  )
}

export default App
