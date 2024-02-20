import './Soon.css';

import logo356 from './../../Imgs/Logo 356x.png'

import { IoLanguage } from "react-icons/io5";

import { lang } from '../..';


function SoonPage() {


  function langEdit(value){
    console.log(`Alterando idioma para: ${value}`)
    window.localStorage.setItem('lang', value)
    window.location.reload()
  }

  return (
    <>
    <div className="soon">
      <img alt='Logo ' src={logo356} />
      <h1>Em breve</h1>
      <h3>Estamos construindo nosso site ainda!</h3>
    </div>
    <div className="soon-idioma">
      <IoLanguage/> - Idioma: {lang} -  Mudar idioma: 
      <select defaultValue={lang} onChange={(e)=> langEdit(e.target.value)} name="lang" id="langs">
        <option id='pt'  value="pt"> Portugues - PT</option>
        <option id='en' value="en"> Ingles - EN</option>
        <option id='es' value="es"> Espanhol - ES</option>
      </select>
    </div>
    </>
  );
}

export default SoonPage;
