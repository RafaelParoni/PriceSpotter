import './Navbar.css';


import logo356 from './../../Imgs/Logo 356x.png'

import { LuSearch, LuEraser  } from "react-icons/lu";
import { useState } from 'react';

function NavbarComp() {


  var [SearchValue, setSearchValue] = useState('')

  const updataSearchValue = (value, lenght) => {
    setSearchValue(value)
    if(lenght > 0){
      document.getElementById("ClearSearchBtn").style.visibility = 'visible'
    }else{
      document.getElementById("ClearSearchBtn").style.visibility = 'hidden'
    }
  }

  function startSearch(){
    if(SearchValue.length !== 0){
      SearchValue = SearchValue.trim()
      if(SearchValue.includes(" ")){
        var i = 0
        while(i < 5){
          SearchValue = SearchValue.replace(' ', '-')

          if(!SearchValue.includes(" ")){
            i++
          }
        }
  
      }
      console.log(`pesquisando: ${SearchValue}`)
      window.location = `/${window.localStorage.getItem("lang")}/search/${SearchValue}`
    }
  }


  return (
    <div className="Navbar">
        <div className='navbar-logo' onClick={()=> console.log('teste')}>
            <img src={logo356} height={50} alt="logos" />
            <h2>Price Spotter</h2>
        </div>
        <div className='navbar-search'>
            <div className='search'>
                <LuSearch size={15} color='000'/>
                <input 
                  id='search' 

                  value={SearchValue} 
                  onChange={(e)=> updataSearchValue(e.target.value, e.target.value.length)} 
                  placeholder='Pesquisar jogo' 
                  results={5} 
                  type='search' 
                  onKeyDown={event => {if (event.key === 'Enter') {startSearch()}}} 
                />
                <button id='ClearSearchBtn' onClick={()=> updataSearchValue('', 0)}><LuEraser size={15} color='fff'/></button>
                <button id='StartSeachBtn' onClick={()=> startSearch()}><LuSearch size={15} color='fff'/></button>
            </div>
        </div>
        <div className='navbar-extra'></div>
    </div>
  );
}

export default NavbarComp;
