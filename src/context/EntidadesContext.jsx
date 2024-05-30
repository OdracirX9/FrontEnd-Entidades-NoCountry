import { createContext, useContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom"



//CREACION DE CONTEXTO GLOBAL PARA SERVICIOS
const EntidadesContext = createContext({})

export const EntidadesContextProvider = ({children}) => {

  const [entidadesDB, setEntidadesDB] = useState(null)
  const [render, setRender] = useState(false)
  const [urlParams, setUrlParams] = useSearchParams()


    const axiosApi = useCallback(async ()=>{
      try {
        const entidades = await axios.get('http://localhost:4100/entidades')

        setEntidadesDB(entidades.data)

      } catch (error) {
        console.log(error)
      }
      setRender(false)
    },[render])

    useEffect(()=>{
      if(urlParams.get('render') == 'true'){
        setUrlParams(urlParams.delete('render'))
        axiosApi()
      }
    },[urlParams])

    useEffect(()=>{
      axiosApi()
    },[])


  return (
    <EntidadesContext.Provider value={{entidadesDB, setRender}}>
        {children}
    </EntidadesContext.Provider>
  )
}

export const useEntidadesContext = () => useContext(EntidadesContext);