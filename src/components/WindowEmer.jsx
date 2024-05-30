import { useSearchParams } from "react-router-dom"
import { useEntidadesContext } from "../context/EntidadesContext";
import { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";

const WindowEmer = () => {

  const [flag, setFlag] = useState(false)
  const [entidad, setEntidad] = useState(null)

  const [urlParams, setUrlParams] = useSearchParams()

  const [deleteInput, setDeleteInput] = useState('')

  

  const {entidadesDB} = useEntidadesContext();

  const formularioOrigin ={
    nombre:'',
    direccion:'',
    email:'',
    telefono:'',
    ubicacion:''
  }
  
  const [formulario, setFormulario] = useState(formularioOrigin)

  const getEntidad = async(id)=>{
    try {
      const entidadGet = await axios.get(`http://localhost:4100/entidades/${id}`)
      //console.log(entidad.data)
      setEntidad(entidadGet.data)
      setFormulario(entidadGet.data)
      setFlag(true)

    } catch (error) {
      console.error(error.message)
    }
  }

  const putSubmit = async(id, formu)=>{
    try {
      const entidadPost = await axios.put(`http://localhost:4100/entidades/${id}/edit`, formu)

      const newSearchParams = new URLSearchParams(urlParams)
      newSearchParams.set('edit','false')
      newSearchParams.set('render','true')
      setUrlParams(newSearchParams)
     
    } catch (error) {
      console.error(error)
  
    }
  }

  const deleteEntidad = async(id)=>{
    try {
      const entidadDelete = await axios.delete(`http://localhost:4100/entidades/${id}/edit`)

      setUrlParams(urlParams.delete('entidad'))
      setUrlParams(urlParams.delete('edit'))
      
      const newSearchParams = new URLSearchParams(urlParams)
      newSearchParams.set('render','true')
      setUrlParams(newSearchParams)
     
    } catch (error) {
      console.error(error)
  
    }
  }

  const createEntidad = async(formu)=>{
  
    try {
      const create = await axios.post(`http://localhost:4100/entidades/create`, formu)
      setUrlParams(urlParams.delete('create'))

      const newSearchParams = new URLSearchParams(urlParams)
      newSearchParams.set('render','true')
      setUrlParams(newSearchParams)
      setFormulario(formularioOrigin)

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=>{
   if(urlParams.get('entidad') && entidadesDB){
    if(entidadesDB?.find(item => item._id == urlParams.get('entidad'))){
      getEntidad(urlParams.get('entidad'))
      
    } else {
      console.log('no Encontrado')
      setFlag(false)
    }
   } else {
    setFlag(false)
    setFormulario(formularioOrigin)
   }

  },[urlParams, entidadesDB])


  const handleSubmit = (e, id)=>{
    e.preventDefault()
      putSubmit(id, formulario)
  }

  const handleChange = (e)=>{
    const change = {...formulario, [e.target.name]:e.target.value}
    console.log(change)
    setFormulario(change)
  }

  const deleteChange =(e)=>{
    setDeleteInput(e.target.value)
  }

  const deleteSubmit =(e, id)=>{
    e.preventDefault()

    const pass = "Eliminar Entidad"
    if(deleteInput == pass){
      deleteEntidad(id)
      setDeleteInput('')
    } else{
      alert('debes escribir correctamente la directriz')
    }
  }

  const createSubmit =(e, formu)=>{
    e.preventDefault()
    createEntidad(formulario)
  }
  

  return (
    <div className={`fixed z-[50] w-full h-[calc(100dvh)] top-0 ${flag || (urlParams.get('create') == 'true')? 'visible delay-0':'invisible'} transition-all delay-100 flex justify-center overflow-hidden`}>

      <div onClick={()=>{ setUrlParams(urlParams.delete('entidad'));setUrlParams(urlParams.delete('edit')); setUrlParams(urlParams.delete('create')) }} className={`absolute z-[40] top-0 w-full h-full bg-[rgba(0,0,0,0.0)] ${flag || (urlParams.get('create') == 'true')? "opacity-100":""} opacity-0 transition-all duration-300 backdrop-blur-sm`}></div>

      <div className={`absolute top-20 z-[50] ${urlParams.get('entidad')? "w-[505px] delay-0":"w-[0px]"} h-[calc(100dvh_-_6rem)] right-0 bg-white flex justify-end overflow-hidden transition-all delay-300 duration-300 shadow-xl rounded-l-xl`}>

          <div className="absolute top-0 z-30 right-0 w-[500px] h-full p-6 overflow-y-scroll">
            <div className="relative w-full h-[300px] rounded-2xl overflow-hidden bg-zinc-800">
              <div className="absolute bottom-0 w-full h-[110px] flex items-center gap-5 py-3 px-8 overflow-x-scroll">
                <div className="min-w-[90px] h-full rounded-xl shadow-lg bg-zinc-700"></div>
                <div className="min-w-[90px] h-full rounded-xl shadow-lg bg-zinc-700"></div>
                <div className="min-w-[90px] h-full rounded-xl shadow-lg bg-zinc-700"></div>
                <div className="min-w-[90px] h-full rounded-xl shadow-lg bg-zinc-700"></div>
                <div className="min-w-[90px] h-full rounded-xl shadow-lg bg-zinc-700"></div>
              </div>
            </div>
            <div className="w-full h-max mt-6 flex flex-col gap-6">
              <p className="text-xl font-bold text-cyan-600">{entidad && entidad.nombre} - ⭐⭐⭐⭐⭐</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, dolores. Fuga cumque, sit quam ipsam soluta modi cupiditate eos quidem hic, placeat sequi enim commodi aliquid molestiae tenetur possimus iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor praesentium vel, perferendis, inventore aspernatur dolore iste autem dolorem, sed laborum eos exercitationem et ducimus possimus ipsum porro. Et, culpa fuga!</p>
              <p className="text-lg "><span className="text-cyan-600 font-bold">Ubicacion:</span> {entidad && entidad.ubicacion}</p>
              <p className="text-lg "><span className="text-cyan-600 font-bold">Direccion:</span> {entidad && entidad.direccion}</p>
              <p className="text-lg "><span className="text-cyan-600 font-bold">Telefono:</span> {entidad && entidad.telefono}</p>
              <p className="text-lg "><span className="text-cyan-600 font-bold">Email:</span> {entidad && entidad.email}</p>
              <p className="text-lg "><span className="text-cyan-600 font-bold">Mascotas para adoptar:</span> <span className="font-extrabold text-lime-500">Disponible</span> </p>

              <p onClick={()=> {
                const newSearchParams = new URLSearchParams(urlParams)
                newSearchParams.set('edit','true')
                setUrlParams(newSearchParams)
            
                }} className="text-lg"> <span className=" cursor-pointer font-extrabold text-lime-500 border p-3 rounded-lg border-2">Editar Entidad</span> </p>
            </div>
          </div>

        <div className={`absolute top-0 ${urlParams.get('edit') == 'true'? 'left-[0%]':'left-[100%]'}  z-40 w-[500px] h-full bg-white p-4 transition-all duration-300 overflow-y-scroll py-6`}>
          <p className="text-xl font-bold text-lime-500"><i onClick={()=> {
                const newSearchParams = new URLSearchParams(urlParams)
                newSearchParams.set('edit','false')
                setUrlParams(newSearchParams)
            
                }} className='bx bx-left-arrow-alt text-4xl text-cyan-500 font-bold cursor-pointer' ></i>&nbsp; &nbsp; &nbsp; Editar Entidad</p>

          <form onSubmit={(e)=>handleSubmit(e, entidad._id)} className="mt-10 flex flex-col gap-4 shadow-lg rounded-xl p-4">

            <label htmlFor="nombre" className="flex flex-col gap-2 p-2 ">
              <p>Nombre</p>
              <input type="text" id="nombre" name="nombre" className="border w-full rounded-lg py-1 px-3" value={formulario.nombre} onChange={(e)=> handleChange(e)}/>
            </label>
            <label htmlFor="direccion" className=" flex flex-col gap-2 p-2 ">
              <p>Direccion</p>
              <input type="text" id="direccion" name="direccion" className="border w-full rounded-lg py-1 px-3" value={formulario.direccion} onChange={(e)=> handleChange(e)}/>
            </label>
            <label htmlFor="email" className="flex flex-col gap-2 p-2 ">
              <p>Email</p>
              <input type="text" id="email" name="email" className="border w-full rounded-lg py-1 px-3" value={formulario.email} onChange={(e)=> handleChange(e)}/>
            </label>
            <label htmlFor="telefono" className="flex flex-col gap-2 p-2 ">
              <p>Telefono</p>
              <input type="text" id="telefono" name="telefono" className="border w-full rounded-lg py-1 px-3" value={formulario.telefono} onChange={(e)=> handleChange(e)}/>
            </label>
            <label htmlFor="ubicacion" className="flex flex-col gap-2 p-2 ">
              <p>Ubicacion</p>
              <input type="text" id="ubicacion" name="ubicacion" className="border w-full rounded-lg py-1 px-3" value={formulario.ubicacion} onChange={(e)=> handleChange(e)}/>
            </label>

            <button type="submit" className="bg-cyan-400 w-max px-4 py-3 rounded-xl font-bold text-white">Editar Documento</button>
            

          </form>
          <div className="w-full h-max mt-10 shadow-lg rounded-lg flex flex-col py-2 px-4 gap-6 group overflow-hidden">
            <p className="w-full text-zinc-400 font-bold ">Opciones Avanzadas</p>

            <div className="w-full group-focus:h-max group-focus:visible h-max visible flex flex-col gap-4">
                <p className="text-orange-500">ELIMINAR ENTIDAD</p>
                <p>Para eliminar la entidad, se requiere escribir <span className="font-extrabold">"Eliminar Entidad"</span> para continuar</p>

                <form onSubmit={(e)=> deleteSubmit(e, entidad._id)} className="flex flex-col gap-4">
                  <input name="confirmar" type="text" className="border w-full rounded-lg py-1 px-3" value={deleteInput} onChange={(e)=>deleteChange(e)}/>
                  <button type="submit" className="w-max px-3 p-2 rounded-lg bg-orange-500 font-extrabold text-white">Eliminar Entidad</button>
                </form>

            </div>
          </div>
        </div>


      </div>

      <div className={`${urlParams.get('create') == 'true'? 'opacity-100 block':'hidden'} absolute z-[50] top-16 w-[450px] h-[calc(100dvh_-_6rem)] rounded-xl  bg-white transition-all duration-300 delay-100 flex flex-col p-4 items-center opacity-0 shadow-xl`}>

        <p className="text-2xl font-bold text-cyan-500">Nueva entidad</p>


        <form onSubmit={(e)=>createSubmit(e, formulario)} className="w-full mt-10 flex flex-col gap-4 rounded-xl p-4">

            <label htmlFor="nombre" className="flex flex-col gap-2 p-2 ">
              <p>Nombre</p>
              <input type="text" id="nombre" name="nombre" className="border w-full rounded-lg py-1 px-3" value={formulario.nombre} onChange={(e)=> handleChange(e)}/>
            </label>
            <label htmlFor="direccion" className=" flex flex-col gap-2 p-2 ">
              <p>Direccion</p>
              <input type="text" id="direccion" name="direccion" className="border w-full rounded-lg py-1 px-3" value={formulario.direccion} onChange={(e)=> handleChange(e)}/>
            </label>
            <label htmlFor="email" className="flex flex-col gap-2 p-2 ">
              <p>Email</p>
              <input type="text" id="email" name="email" className="border w-full rounded-lg py-1 px-3" value={formulario.email} onChange={(e)=> handleChange(e)}/>
            </label>
            <label htmlFor="telefono" className="flex flex-col gap-2 p-2 ">
              <p>Telefono</p>
              <input type="text" id="telefono" name="telefono" className="border w-full rounded-lg py-1 px-3" value={formulario.telefono} onChange={(e)=> handleChange(e)}/>
            </label>
            <label htmlFor="ubicacion" className="flex flex-col gap-2 p-2 ">
              <p>Ubicacion</p>
              <input type="text" id="ubicacion" name="ubicacion" className="border w-full rounded-lg py-1 px-3" value={formulario.ubicacion} onChange={(e)=> handleChange(e)}/>
            </label>

            <button type="submit" className="bg-cyan-400 w-max px-4 py-3 rounded-xl font-bold text-white">Crear una nueva Entidad</button>
            

          </form>
      </div>


    </div>
  )
}

export default WindowEmer