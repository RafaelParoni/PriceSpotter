  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import './index.css';


  // importante paginas


  // em breve
  import SoonPage from './Pages/SoonPage/Soon.js';

  // paginas 
  import HomePage from './Pages/Home/Home.js';
  import SearchPage from './Pages/search/Search.js';
  import GamePage from './Pages/Game/Game.js';
  import NotFoundPage from './Pages/NotFound/NotFound.js';
  import NewsListPage from './Pages/News/NewsList/NewsList.js';
  import { ReportBugs } from './Pages/bugs/ReportBugs.js';

  // componentes

  import NavbarComp from './Components/Navbar/Navbar.js';

  var pathname = window.location.pathname
  var lang = 'en'

  if(window.localStorage.getItem('lang') === null){ // Verifica se este dispositivo já tem registro de idioma no localStorage! caso não tenha ele cria um conforme os idiomas preferidos do navegador dele.
    console.log("Primeira vez entrando por este dispositivo!")
    console.log(`Idioma preferido de seu dispositivo: ${window.navigator.language}`)
    var prefLang = window.navigator.language
    if(prefLang.includes('pt')){
      console.log('idioma do site definido como: pt')
      lang = 'pt'
    }else if(prefLang.includes('en')){
      console.log('language defined as: en')
      lang = 'en'
    }else if(prefLang.includes('es')){
      console.log('language defined as: en')
      lang = 'es'
    }else{
      console.log("We didn't find your preferred language in our language database :c so we are setting the site's language to default English")
      lang = 'en'
    }

    window.localStorage.setItem('lang', lang)

  }else { // se já tem ele avisa no console.log o idioma selecionado e define a variavel 'lang' para o idioma do localStorage.
      console.log(`Language selects by LocalStorage was: ${window.localStorage.getItem('lang')}, As soon as you log in to your account, the site will search for the account's defined language!`)
      lang = window.localStorage.getItem("lang")
      console.log(lang)
  }
  pathname = pathname.slice(1, pathname.length)
  pathname = pathname.slice(0, pathname.indexOf('/'))
  
  if(pathname === 'pt-br'){
    console.log("Portugues brasil")
    langValicacao(lang, 'pt-br')
  }else if(pathname === 'pt'){
    console.log('Portugues')
    langValicacao(lang, 'pt')
  }else if(pathname === 'en'){
    console.log('Ingles')
    langValicacao(lang, 'en')
  }else{
    console.log(pathname)
    langValicacao(lang, pathname)
  }

  if(window.localStorage.getItem('coin') === null){
    window.localStorage.setItem('coin', 'USD')
  }


  function langValicacao(langV, pathname){

    if(pathname === ''){
      console.log(`pathname: ${pathname}`)
      if(langV !== ""){
        console.log(`langV: ${langV}`)
        window.location = `${langV}/`
      }
      return
    }

    if(window.sessionStorage.getItem("session") === 'true'){

      if(pathname !== window.sessionStorage.getItem("lang")){
        var newLocSession = window.location.pathname
        newLocSession = newLocSession.replace(`/${pathname}/`, `/${window.sessionStorage.getItem("lang")}/`)
        window.location = newLocSession
      }
      return 
    }
    if(langV !== pathname){
      console.log('Idiomas diferentes encontrados! realocando para o idioma de localstorage!')
      console.log(window.location.pathname)
      var newLoc = window.location.pathname
      newLoc = newLoc.replace(`/${pathname}/`, `/${window.localStorage.getItem('lang')}/`)
      window.location = newLoc
      
    }else{
      console.log('Idioma Validado!')
    }
  }


  const root = ReactDOM.createRoot(document.getElementById('root'));

  lang = `/${pathname}/`
  let path = window.location.pathname.replace(lang, '')

    if(path.includes('/') === true){
      path = path.slice(0, path.lastIndexOf('/'))
    }
    if(path === ''){
      path = 'home'
    }

    switch(path){
      case 'game/details/epic':
          root.render(
            <React.StrictMode>
              <NavbarComp/>
              <GamePage />
            </React.StrictMode>
          );
        break;
        case 'game/details/steam':
          root.render(
            <React.StrictMode>
              <NavbarComp/>
              <GamePage />
            </React.StrictMode>
          );
        break;
      case 'search':
          root.render(
            <React.StrictMode>
              <NavbarComp/>
              <SearchPage />
            </React.StrictMode>
          );
        break;
      case 'home':
          root.render(
              <>
                <NavbarComp/>
                <HomePage />
              </>
          );
        break;
        case 'news':
          root.render(
              <>
                <NavbarComp/>
                <NewsListPage/>
              </>
          );
        break;
        case 'bug':
          root.render(
              <>
                <NavbarComp/>
                <ReportBugs/>
              </>
          );
        break;
        case 'ComingSoon':
          root.render(
              <>
                <SoonPage/>
              </>
          );
        break;
      default:
          root.render(
            <React.StrictMode>
              <NavbarComp/>
              <NotFoundPage />
            </React.StrictMode>
          );
        break;
    }



  export {lang};