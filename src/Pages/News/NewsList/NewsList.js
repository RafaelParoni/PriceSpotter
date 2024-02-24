import './NewsList.css';
import { useState } from 'react';

import { LuSendHorizonal, LuPalmtree, LuCrown, LuLink, LuInfo } from 'react-icons/lu'


import { SearchGameNews } from '../../../Components/firebase/SearchNews';


function NewsListPage() {
    var [gameNews, setGameNews] = useState([])

    function GetGameNews(){
        if(Object.keys(gameNews).length > 0){return}else{
          SearchGameNews().then(function(result){
            setGameNews(result)
          })
        }
    }
    GetGameNews()

    function NewsDisplay({item}){
        return (
            <div className="news-card">
                <div className="news-title"> <b> {item.name} </b> </div>
                <div className="news-img">  <img alt={item.imgName} src={item.imgUrl} /> </div>
                <div className="news-description"> {item.description} </div>
                <div className="news-links">
                    <p><LuLink/> Links:</p>
                    {item.link1 !== 'false' && (<a href={item.link1}> <LuSendHorizonal/> {item.link1_text}</a>)}
                    {item.link2 !== 'false' && (<a href={item.link2}> <LuSendHorizonal/> {item.link2_text}</a>)}
                    {item.link2 === 'false' & item.link1 === 'false' && (<p style={{cursor: 'no-drop'}}> Não link<LuPalmtree/> </p>)}
                </div>
                <div className="news-type"> 
                    <h5><LuInfo/> Tema: </h5>
                    <p>{item.type}</p>
                </div>
            </div>
        )
    }

  return (
    <div className="NewsPage">
        <div className='news-list'>
            <h1> <LuCrown/> Noticias:</h1>
            {Object.keys(gameNews).length === 0 && (
                <h1>Carregando</h1>
            )}
            {gameNews.map((gameNews) => <NewsDisplay key={gameNews.name} item={gameNews} />)}
        </div>
    </div>
  );
}

export default NewsListPage;
