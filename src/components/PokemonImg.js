import React, { useEffect, useState } from 'react'

export const PokemonImg = ({ id, className }) => {
    const [loading, setLoading] = useState(false)
    const [pokemon, setPokemon] = useState()
    useEffect(() => {
        setLoading(true)

        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setPokemon(data.sprites.other.home.front_default)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false)
            });
    }, [id])
    if (loading) return <div>loading...</div>
    return (
        <>
            <img src={pokemon} className={className} />
        </>
    )
}
