import { PokemonInfor } from './components/PokemonInfor';
import { Pokemons } from './components/Pokemons';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import logo from './img/logo.png';
import bg from './img/bg.jpg';
import { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState()
  // let { pokemonID } = useParams();
  return (
    <div className="App bg-bg-bg text-gray-200">
      <img src={bg} alt='bg' className='w-full' />
      <nav className='flex  h-20 bg-color-3 sticky top-0 z-50'>
        <Link to={''}>
          <img src={logo} alt='logo' className='h-full px-8' />
        </Link>
        <div className='relative flex items-center justify-center h-full'>
          <input

            onChange={(e) => {
              setInputValue(e.target.value.toLowerCase().split(' ').join('-'))
            }}
            className='w-full rounded-md border-gray-200 p-2.5 pe-10 shadow-sm sm:text-sm text-slate-800'
            placeholder='Pokemon name'
          ></input>
          <Link to={`/${inputValue}`} className='absolute right-0 p-2.5'><i className="fa-solid fa-magnifying-glass text-slate-800"></i></Link>
        </div>
      </nav>
      <Routes>
        <Route path='' element={<Pokemons />} />
        <Route path=':pokemonID' element={<PokemonInfor />} />

      </Routes>
    </div >
  );
}
export default App;
