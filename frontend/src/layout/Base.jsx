import { useEffect } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function Base({ children, title }) {

    useEffect(() => {
        document.title = title
    }, [title])

    return (
        <div className="w-full flex flex-col">
            <Navbar />
            <main className="container mx-auto h-[90%] flex justify-between items-center mt-10">
                {children}
            </main>
        </div>
    )
}

export default Base