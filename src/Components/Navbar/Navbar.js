import './Navbar.css';


import logo356 from './../../Imgs/Logo 356x.png'

function NavbarComp() {


  return (
    <div className="Navbar">
        <div className='navbar-logo' onClick={()=> console.log('teste')}>
            <img src={logo356} height={50} alt="logos" />
            <h2>Price Spotter</h2>
        </div>
        <div className='navbar-search'></div>
        <div className='navbar-extra'></div>
    </div>
  );
}

export default NavbarComp;
