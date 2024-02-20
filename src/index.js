  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import './index.css';
  import SoonPage from './Pages/SoonPage/Soon.js';

  var pathname = window.location.pathname
  var lang = 'en'

  if(window.localStorage.getItem('lang') === null){ // Verifica se este dispositivo já tem registro de idioma no localStorage! caso não tenha ele cria um conforme os idiomas preferidos do navegador dele.
    console.log("Primeira vez entrando por este dispositivo!")
    console.log(`Idioma preferido de seu dispositivo: ${window.navigator.language}`)
    var prefLang = window.navigator.language
    switch (prefLang){
      case 'pt-BR':
        console.log('idioma do site definido como: pt-br')
        lang = 'pt-br'
      break;
      case 'pt':
        console.log('idioma do site definido como: pt')
        lang = 'pt'
      break;
      case 'en':
        console.log('language defined as: en')
        lang = 'en'
      break;
      case 'en-US':
        lang = 'en-us'
        console.log('language defined as: en-us')
      break;
      default:
        console.log("We didn't find your preferred language in our language database :c so we are setting the site's language to default English")
        lang = 'en'
      break;
    }

    window.localStorage.setItem('lang', lang)

  }else { // se já tem ele avisa no console.log o idioma selecionado e define a variavel 'lang' para o idioma do localStorage.
    if(window.sessionStorage.getItem('session') !== 'true'){
      console.log(`Language selects by LocalStorage was: ${window.localStorage.getItem('lang')}, As soon as you log in to your account, the site will search for the account's defined language!`)
      lang = window.localStorage.getItem("lang")
      console.log(lang)
    }
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
  root.render(
    <React.StrictMode>
      <SoonPage />
    </React.StrictMode>
  );