import './NotFound.css';

import NotFoundImg from './../../Imgs/Error404.png'

import { Languages } from '../../exports';

function NotFoundPage() {

  var langL = window.localStorage.getItem('lang')
  var langA = {}

  switch(langL){
    case "pt":
      langA = Languages.pt.NotFound
    break;
    case "es":
      langA = Languages.es.NotFound
    break;
    default: 
      langA = Languages.en.NotFound
    break;
  }

  return (
    <div className="Notfound">
      <h2>Error</h2>
      <img alt='IMG ERROR EXEMPLE' src={NotFoundImg} />
      <h2>{langA.Title}</h2>
      <button onClick={()=> window.location = '/'}>{langA.Button}</button>
    </div>
  );
}

export default NotFoundPage;
