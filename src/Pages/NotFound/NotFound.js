import './NotFound.css';

import NotFoundImg from './../../Imgs/Error404.png'


function NotFoundPage() {

  return (
    <div className="Notfound">
      <h2>Error</h2>
      <img alt='IMG ERROR EXEMPLE' src={NotFoundImg} />
      <h2>Pagina não encontrada</h2>
      <button onClick={()=> window.location = '/'}>Voltar ao inicio</button>
    </div>
  );
}

export default NotFoundPage;
