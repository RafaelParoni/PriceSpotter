import './Navbar.css';


import logo356 from './../../Imgs/Logo 356x.png'

import { LuSearch } from "react-icons/lu";

function NavbarComp() {


  return (
    <div className="Navbar">
        <div className='navbar-logo' onClick={()=> console.log('teste')}>
            <img src={logo356} height={50} alt="logos" />
            <h2>Price Spotter</h2>
        </div>
        <div className='navbar-search'>
            <div className='search'>
                <LuSearch color='000'/>
                <input id='search' results={5} type='text' />
                <button id='clerSearch' onClick={()=> document.getElementById('search').value = ''}>X</button>
                <button id='StartSearch' onClick={()=> document.getElementById('search').value = ''}><LuSearch color='000'/></button>
            </div>
        </div>
        <div className='navbar-extra'></div>
    </div>
  );
}

export default NavbarComp;
