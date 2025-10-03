import {ChangeEvent } from 'react'
import { FaSearch } from "react-icons/fa";

export default function SearchInput({termo, setTermo}) {
return(
    <input type='text'
    placeholder='Pesquisar música, album, artista'
    value={termo}
    onChange={e => setTermo(e.target.value)}
    className="w-full p-2 border text-black placeholder:text-sm border-gray-200 focus:border bg-white focus:border-gray-600 rounded-full"
/>

)
}