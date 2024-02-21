import React, { useEffect, useState } from 'react'
import { PokemonImg } from './PokemonImg'
import { Link } from 'react-router-dom'

const PokemonEvolution = ({ pokemonID }) => {
    const [PokemonEvolution, setPokemonEvolution] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0)
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                // console.log(res)
                return res.json();
            })
            .then((data) => {
                fetch(data.evolution_chain.url)
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return res.json();
                    })
                    .then(data => {
                        // console.log(data)
                        setPokemonEvolution(data)
                        setLoading(false)
                    })
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false)
            });
    }, [pokemonID])

    if (loading) {
        return <div>loading...</div>
    }

    const chain = PokemonEvolution.chain
    const evolves_to = chain.evolves_to || [];
    const evolves_to_0 = evolves_to[0] || {};
    const evolves_to_0_evolves_to = evolves_to_0.evolves_to || [];
    const evolves_to_0_evolves_to_0 = evolves_to_0_evolves_to[0] || {};

    return (
        <div className='p-24'>
            <p className='w-full text-center  font-bold uppercase text-6xl'>Evolution</p>
            <div className='flex items-center justify-between w-full '>
                <div>
                    <PokemonImg id={PokemonEvolution.chain.species.name} className={"w-full"} />
                    <Link to={`/${PokemonEvolution.chain.species.name}`} className='uppercase font-medium text-2xl text-center hover:underline'>
                        <p className='w-full text-center'>
                            {PokemonEvolution.chain.species.name}
                        </p>
                    </Link>
                </div>

                <div className={evolves_to.length ? "" : "hidden"}>
                    <div className='w-20 h-20  border-t-8 border-r-8 rotate-45'></div>
                </div>

                {evolves_to.length ? (
                    <div >
                        < PokemonImg id={evolves_to[0].species?.name} className={"w-full"} />
                        <Link to={`/${evolves_to[0].species?.name}`} className='uppercase font-medium text-2xl text-center hover:underline'>
                            <p className='w-full text-center'>
                                {evolves_to[0].species?.name}
                            </p>
                        </Link>
                    </div>
                ) : (
                    ''
                )}

                <div className={evolves_to_0_evolves_to.length ? '' : 'hidden'}>
                    <div className='w-20 h-20  border-t-8 border-r-8 rotate-45'></div>
                </div>

                {evolves_to_0_evolves_to.length ? (
                    <div >
                        < PokemonImg id={evolves_to_0_evolves_to_0.species?.name} className={"w-full"} />
                        <Link to={`/${evolves_to_0_evolves_to_0.species?.name}`} className='uppercase font-medium text-2xl text-center hover:underline'>
                            <p className='w-full text-center'>
                                {evolves_to_0_evolves_to_0.species?.name}
                            </p>
                        </Link>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}

export default PokemonEvolution
