import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../Config'
import { PokemonCart } from './PokemonCart';
// import e from 'express'

export const Pokemons = () => {
    if (!localStorage.getItem("currentURL")) {
        // console.log()
        localStorage.setItem("currentURL", `${BASE_URL}pokemon`);
    }
    const [pokemonList, setPokemonList] = useState();
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(() => {
        return localStorage.getItem("currentURL")
    })
    const [nextPage, setNextPage] = useState('')
    const [prevPage, setPrevPage] = useState('')

    useEffect(() => {
        setLoading(true)
        fetch(currentPage)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setPokemonList(data.results)
                setNextPage(data.next)
                setPrevPage(data.previous)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false)
            });
    }, [currentPage])

    function goToNextPage() {
        setCurrentPage(nextPage)
        localStorage.setItem("currentURL", nextPage);
    }

    function goToPrevPage() {
        setCurrentPage(prevPage)
        localStorage.setItem("currentURL", prevPage);
    }

    return (
        <div className='w-full flex'>
            <div className='h-full sticky top-1/2 flex items-center '>
                <button onClick={goToPrevPage} className={` bottom-1/2 left-2 text-xl font-bold p-4   focus-visible:outline-none rounded-lg bg-color-2 hover:bg-opacity-50 ${prevPage ? '' : 'hidden'}`}>
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
            </div>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10 m-auto py-24'>
                {loading ? <div>loading...</div>
                    : pokemonList && pokemonList.map((pokemon) => {
                        return (
                            <div key={pokemon.name} className=' flex items-center justify-center'>
                                <PokemonCart URL={pokemon.url} />
                            </div>
                        )
                    })}
            </div>
            {/* <div className='h-full sticky top-0  '> */}

            <div className='h-full sticky top-1/2 flex items-center '>

                <button onClick={goToNextPage} className={` bottom-1/2 right-2 text-xl font-bold p-4   focus-visible:outline-none rounded-lg bg-color-2 hover:bg-opacity-50 ${nextPage ? '' : 'hidden'}`}>
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    )
}
