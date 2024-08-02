import { NavLink } from "react-router-dom"

function Navbar() {
    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <header className='w-full py-5 border border-gray shadow-sm'>
            <div className='container mx-auto flex justify-between items-center'>
                <img src="/logo_texto_morado.png" alt="" width={90} />
                <nav>
                    <ul className='flex gap-5'>
                        <li>
                            <NavLink to="/home" className={({ isActive }) => isActive ? 'font-semibold underline text-[#C683EA]' : ''}>Inicio</NavLink>
                        </li>
                        <li>
                            <NavLink to="/adopciones" className={({ isActive }) => isActive ? 'font-semibold underline text-[#C683EA]' : ''}>Adopciones</NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile" className={({ isActive }) => isActive ? 'font-semibold underline text-[#C683EA]' : ''}>Perfil</NavLink>
                        </li>
                        <li>
                            <NavLink to="/crear" className={({ isActive }) => (` p-2 bg-[#c683ea] rounded text-white hover:bg-[#a56dc4]`)}>Crear</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar