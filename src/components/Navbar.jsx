import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <>
        <div className="fixed z-[1000] w-full h-20 flex justify-between items-center px-5 py-2">

            <div className="w-max h-full py-4 px-6 ">
                <h1 className="font-poetsen text-2xl text-white">Laika Pets Go!</h1>
            </div>

            <div className="w-max h-full flex gap-6">

                <Link to="/" className="w-max h-full flex items-center px-5">
                    <span className="font-extrabold text-zinc-600 text-lg">Entidades y veterinarias</span>
                </Link>

                <Link to="/" className="w-max h-full flex items-center px-5">
                    <span className="font-extrabold text-zinc-600 text-lg">Panel de control</span>
                </Link>

                <Link to="/" className="w-max h-full flex items-center px-5">
                    <span className="font-extrabold text-zinc-600 text-lg">Cuenta</span>
                </Link>


            </div>
        </div>
    </>
  )
}

export default Navbar