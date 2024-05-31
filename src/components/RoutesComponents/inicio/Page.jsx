import { useEffect } from "react";
import { useEntidadesContext } from "../../../context/EntidadesContext";
import { useSearchParams } from "react-router-dom";

const inicio = () => {

 const {entidadesDB} = useEntidadesContext();

 const [urlParams, setUrlParams] = useSearchParams()

 useEffect(()=>{
  
 },[])




  return (
    <>
      <div className="relative z-40 w-full h-max">
        <div className="relative z-20 w-full h-[calc(100dvh_+_100px)]">
          <div className="absolute top-0 w-full h-full bg-[url('/images/landingPage.jpg')] bg-fixed bg-cover bg-bottom">
            <div className="relative z-20 top-0 w-full h-full flex justify-center items-center bg-[linear-gradient(90deg,_rgba(50,50,50,1)_0%,_rgba(27,27,27,0.28)_48%,_rgba(0,0,0,1)_100%)]">
              <h2 className="text-4xl w-3/6 text-center font-bold text-white">
                Lo mejor de nuestra tarea es que podemos ayudar a los seres mas
                leales y perfectos de la historia
              </h2>
            </div>
          </div>
        </div>

        <div className="relative top-[-100px] w-full h-dvh z-30 bg-white rounded-t-3xl flex flex-col items-center p-6 gap-10">
          <h2 className=" text-3xl font-bold text-cyan-500">Entidades disponibles </h2>

          <div className="w-full h-max flex flex-wrap gap-8">
            {entidadesDB?.map((item, index) => (

              <div onClick={()=> setUrlParams({entidad:`${item._id}`, edit: 'false'})} key={index} className="w-[400px] h-[220px] rounded-xl shadow-lg flex gap-3 p-4 cursor-pointer ">
                <div className="w-1/2 h-full flex flex-col flex justify-center items-center">
                  <div className="w-[150px] h-[120px] border rounded-xl bg-zinc-500"></div>
                </div>
                <div className="relative w-1/2 h-full py-4 px-2 flex flex-col gap-4">
                  <p className="font-extrabold text-zinc-500">
                    {item.nombre}
                  </p>
                  <p> <span className="font-bold text-zinc-400">Ubicacion:</span>  {item.ubicacion}</p>
                  <p><span className="font-bold text-zinc-400">Telefono:</span> {item.telefono}</p>
                  <div className="absolute bottom-0">Valoracion:⭐⭐⭐⭐⭐</div>
                </div>
              </div>

            ))}

            <div onClick={()=> setUrlParams({create:'true'})} className="w-[400px] h-[220px] rounded-xl flex gap-3 p-4 cursor-pointer border border-dashed border-4 border-cyan-400 flex flex-col justify-center items-center">
              <i className='bx bx-add-to-queue text-4xl text-cyan-400'></i>
              <p className="text-xl text-cyan-400">Crear una nueva entidad</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default inicio;