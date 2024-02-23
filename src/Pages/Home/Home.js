import './Home.css';

import { useState } from 'react';

import { freeGamelist } from '../../Components/Epic Games/freeGameList';
import { freeGameComingSoonList } from '../../Components/Epic Games/freeGameComingSoon';
import { translateAPI } from '../../Components/TranslateAPI/translate';
import { SearchGameNews } from '../../Components/firebase/SearchNews';


import { LuGift, LuSendHorizonal, LuPalmtree, LuCrown, LuLink, LuInfo, LuCookie } from 'react-icons/lu'

function HomePage() {
  
  var [freeGame, setFreeGame] = useState([])
  var [freeGameComing, setFreeGameComing] = useState([])
  var [gameNews, setGameNews] = useState([])

  function SearchFreeGame(){
    if(Object.keys(freeGame).length > 0){return}else{
      freeGamelist().then(function(result){
        setFreeGame(result)
      })
    }
  }
  SearchFreeGame()
  function SearchFreeGameComing(){
    if(Object.keys(freeGameComing).length > 0){return}else{
      freeGameComingSoonList().then(function(result){
        setFreeGameComing(result)
      })
    }
  }
  SearchFreeGameComing()

 




  var [descirption01, setDescription01] = useState('')
  function FreeGameDisplay({item}){
      translateAPI(item.description, 'pt').then(function(result){
        if(result === 'error'){
          setDescription01(item.description)
        }else{
          setDescription01(result)
        }
      })
    return (
        <div onClick={()=> window.open(item.appUrl)}> 
          <img alt='Game free - store.epicgames.com' src={item.offerImageWide} />
          <h4>FREE NOW</h4>
          <h2>{item.name}</h2> 
          <h5>{descirption01}</h5> 
        </div>
    )
  }
  var [descirption02, setDescription02] = useState('')
  function FreeGameComingDisplay({item}){
    translateAPI(item.description, 'pt').then(function(result){
      if(result === 'error'){
        setDescription02(item.description)
      }else{
        setDescription02(result)
      }
    })
    return (
      <div onClick={()=> window.open(item.appUrl)}> 
        <img alt='Game free coming soon - store.epicgames.com' src={item.offerImageTall} /> 
        <h4>COMING SOON</h4>
        <h2>{item.name}</h2> 
        <h5>{descirption02} </h5>
      </div>
    )
  }
  
  // Pegando a ultima noticia do banco de dados firebase em "Components/firebase/SearchNews.js"
  
  function GetGameNews(){
    if(Object.keys(gameNews).length > 0){return}else{
      SearchGameNews().then(function(result){
        setGameNews(result)
      })
    }
  }
  GetGameNews()





  return (
    <>
      <div className="Home">
        <div className='home-epic-free'>
          <h2><LuGift/> Epic Games Free</h2>
          <div className='epic-cards'>
            {freeGame.map((freeGame) => <FreeGameDisplay key={freeGame.name} item={freeGame} />)}
            {freeGameComing.map((freeGameComing) => <FreeGameComingDisplay key={freeGameComing.name} item={freeGameComing} />)}
          </div>
        </div>
        <div className='home-news'>
          <h1><LuCrown/> Ultima noticias: </h1>
          {Object.keys(gameNews).length > 0 && (
            <div className="news-card">
              <div className="news-title"> {gameNews[gameNews.length -1].name} </div>
              <div className="news-img">  <img alt={gameNews[gameNews.length -1].imgName} src={gameNews[gameNews.length -1].imgUrl} /> </div>
              <div className="news-description"> {gameNews[gameNews.length -1].description} </div>
              <div className="news-links">
                <p><LuLink/> Links:</p>
                {gameNews[gameNews.length -1].link1 !== 'false' && (<a href={gameNews[gameNews.length -1].link1}> <LuSendHorizonal/> {gameNews[gameNews.length -1].link1_text}</a>)}
                {gameNews[gameNews.length -1].link2 !== 'false' && (<a href={gameNews[gameNews.length -1].link2}> <LuSendHorizonal/> {gameNews[gameNews.length -1].link2_text}</a>)}
                {gameNews[gameNews.length -1].link2 === 'false' & gameNews[gameNews.length -1].link1 === 'false' &&(<p style={{cursor: 'no-drop'}}> Nenhum link <LuPalmtree/> </p>)}
              </div>
              <div className="news-type"> 
                <h5><LuInfo/> Tema: </h5>
                <p>{gameNews[gameNews.length -1].type}</p>
              </div>
            </div>
          )}
          {Object.keys(gameNews).length === 0 && (
            <div className="news-card no-news">
              <h1>Nenhum noticia <LuCookie /></h1>
            </div>
          )}
          <div className='news-footer'>
            <a href={`/${window.localStorage.getItem('lang')}/news`}>Ver todas as noticias</a>
            <a href={`/${window.localStorage.getItem('lang')}/bug`}>Relar algum bug/erro</a>
          </div>
        </div>
        <div>

        </div>
      </div>
    </>
  );
}

export default HomePage;
