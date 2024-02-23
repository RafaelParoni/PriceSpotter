import './Navbar.css';


import logo356 from './../../Imgs/Logo 356x.png'

import { LuSearch, LuEraser,LuMenu, LuX } from "react-icons/lu";
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

  function extraContent(){
    if(document.getElementById('CloseExtraBtn').style.display === 'none'){
        document.getElementById("CloseExtraBtn").style.display = 'flex'
        document.getElementById('OpenExtraBtn').style.display = 'none'
        document.getElementById("extraContent").style.display = 'flex'
        document.getElementById("extraContentClose").style.display = 'flex'
    }else{
      document.getElementById("CloseExtraBtn").style.display = 'none'
        document.getElementById('OpenExtraBtn').style.display = 'flex'
        document.getElementById("extraContent").style.display = 'none'
        document.getElementById("extraContentClose").style.display = 'none'
    }
  }

  return (
    <>
      <div className="Navbar">
          <div className='navbar-logo' onClick={()=> window.location = `/${window.localStorage.getItem('lang')}/`}>
              <img src={logo356} height={50} alt="logos" />
              <h2>Price Game</h2>
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
          <div className='navbar-extra'>
            <button id='CloseExtraBtn'  onClick={extraContent} style={{display: 'none'}}><LuX  color='000' size={25}/></button>
            <button id='OpenExtraBtn' onClick={extraContent} style={{display: 'flex'}}><LuMenu  color='000' size={25}/></button>
          </div>
      </div>
      <div onClick={extraContent} id='extraContentClose'></div>
      <div id='extraContent' className='extra-content'>
        <h3 onClick={()=> window.location = `/${window.localStorage.getItem('lang')}/`}> <img src={logo356} width={25} alt="logos" /> Price Spotter Menu</h3>
        <button className='extra-options' onClick={()=> window.location = `/${window.localStorage.getItem('lang')}/`}>Inicio</button>
        <button className='extra-options' onClick={()=> window.location = `/${window.localStorage.getItem('lang')}/history/`}>Historico</button>
        <button className='extra-options' onClick={()=> window.location = `/${window.localStorage.getItem('lang')}/settings/`}>Configuração do site</button>
      </div>
    </>
  );
}

export default NavbarComp;
