import {ChangeEvent } from 'react'

export default function SearchInput({termo, setTermo}) {
return(
    <input type='text'
    placeholder='Pesquisar música, album, artista'
    value={termo}
    onChange={e => setTermo(e.target.value)}
    className="w-full p-2 border text-black border-gray-400 focus:border focus:border-gray-600 rounded-md"
/>
)
}