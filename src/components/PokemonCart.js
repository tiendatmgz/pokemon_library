import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



export const PokemonCart = (props) => {
    const [loading, setLoading] = useState(false)
    const [pokemonCart, setPokemoncart] = useState()
    useEffect(() => {
        fetch(props.URL)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setPokemoncart(data)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false)
            });
    }, [props.URL])

    if (loading || !pokemonCart) {
        return <div>loading...</div>;
    }


    return (
        <div className=' shadow-xl bg-slate-900 rounded-lg border-4 border-slate-800 flex justify-between flex-col w-full h-full '>
            <div className='flex items-center justify-center h-full w-full'>
                <img src={pokemonCart.sprites.front_default} alt={pokemonCart.id} className='p-4 h-full' />
            </div>
            <div className='bg-slate-800 p-6'>
                <h3 className='uppercase font-bold  mb-4 text-center'> {pokemonCart.forms[0].name.split('-').join(' ')}</h3>
                <div >
                    <Link to={`/${pokemonCart.id}`} className='flex items-center justify-center gap-2  border group/item'>
                        <p>Read more</p>
                        <i className="fa-solid fa-arrow-right group-hover/item:translate-x-4"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}
