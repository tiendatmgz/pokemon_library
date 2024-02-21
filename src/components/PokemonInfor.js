import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { pokemonType } from '../func/pokemonType'
import { caculateStatsColor } from '../func/CaculateStatsColor';
import PokemonEvolution from './PokemonEvolution';

export const PokemonInfor = () => {
    const [loading, setLoading] = useState(false)
    const { pokemonID } = useParams();
    const [pokemon, setPokemon] = useState()
    const [pokemonColor, setPokemonColor] = useState()

    function getDominantColor(imageUrl, callback) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';

        img.onload = function () {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            context.drawImage(img, 0, 0);

            var imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
            var colorCounts = {};

            // Tính toán màu trung bình của toàn bộ hình ảnh
            var totalRed = 0,
                totalGreen = 0,
                totalBlue = 0,
                pixelCount = 0;

            for (var i = 0; i < imageData.length; i += 4) {
                var r = imageData[i],
                    g = imageData[i + 1],
                    b = imageData[i + 2],
                    a = imageData[i + 3];

                // Kiểm tra độ trong suốt của pixel
                if (a >= 125) {
                    totalRed += r;
                    totalGreen += g;
                    totalBlue += b;
                    pixelCount++;
                }
            }

            var avgRed = totalRed / pixelCount,
                avgGreen = totalGreen / pixelCount,
                avgBlue = totalBlue / pixelCount;

            // Chuyển đổi màu RGB trung bình thành chuỗi hex
            var dominantColor = rgbToHex(avgRed, avgGreen, avgBlue);

            callback(dominantColor);
        };

        img.src = imageUrl;
    }

    // Hàm chuyển đổi màu từ RGB sang hex
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(Math.round(r)) + componentToHex(Math.round(g)) + componentToHex(Math.round(b));
    }

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                // console.log(res)
                return res.json();
            })
            .then((data) => {
                setPokemon(data)
                console.log(data)
                getDominantColor(data.sprites.other.dream_world.front_default, function (color) {
                    setPokemonColor(color)
                });
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false)
            });
    }, [pokemonID])
    if (loading || !pokemon) {
        return <div>loading...</div>;
    }
    return (
        <div className=''>
            <div className='  '>
                <div className='grid grid-cols-2  gap-8 h-screen p-24 relative overflow-hidden' style={{ backgroundColor: pokemonColor }}>
                    <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.id} className=' w-2/3 absolute -top-0 right-1/4  opacity-10' />
                    <div className='relative z-10  '>
                        <p className=' uppercase tracking-[12px]  '>POKEMON</p>
                        <div className='relative'>
                            <h1 className='text-[1.5em] md:text-[3.5em] lg:text-[5.5em]  font-bold my-16 capitalize'>{pokemon.forms[0].name.split('-').join(' ')}.</h1>
                        </div>
                        <div className='grid grid-cols-10   z-10  w-full '>
                            <div className='flex flex-col'>
                                <p className='uppercase border-b-2 mb-12 text-xl font-bold'>type</p>
                                {pokemon.types && pokemon.types.map(type => {
                                    let typeImg = pokemonType(type.type.name)
                                    return (
                                        <div className='mb-4' key={type.type.name}>
                                            <img src={typeImg} alt={type.type.name} className='w-16 ' />
                                            <p className='text-center uppercase'>
                                                {type.type.name}
                                            </p>

                                        </div>
                                    )
                                })
                                }
                            </div>
                            <div className='col-span-8 col-start-3 '>
                                <p className='uppercase w-full border-b-2 mb-12 text-xl font-bold'>stats</p>
                                <div className=' before:content-["100"] before:absolute before:-right-3 before:bottom-full  after:absolute after:top-0 after:right-0 after:w-[1px]  after:bg-white after:h-full relative '>

                                    {pokemon.stats && pokemon.stats.map((stat) => {
                                        return (
                                            <div className='grid grid-cols-3 mb-2' key={stat.stat.name}>
                                                <p className='capitalize col-span-1'>{stat.stat.name.split('-').join(' ')} :</p>
                                                <div className='col-span-2'>
                                                    <div
                                                        style={{
                                                            width: stat.base_stat + '%',
                                                            height: "100%",
                                                            backgroundColor: caculateStatsColor(stat.base_stat)
                                                        }}
                                                        className='px-2 py-1 text-black font-medium rounded-e-lg'
                                                    >
                                                        <p>{stat.base_stat}</p>
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <img
                            src={pokemon.sprites.other.dream_world.front_default}
                            alt={pokemon.id}
                            className='  -right-0 top-0 h-full  drop-shadow-2xl'
                        />

                    </div>
                </div>

            </div>
            <PokemonEvolution pokemonID={pokemon.id} />
        </div >
    )
}
