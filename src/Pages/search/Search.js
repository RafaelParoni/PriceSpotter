import './Search.css';


import { LuSearch, LuInfo, LuAlertTriangle, LuSearchSlash, LuBanana, LuApple, LuAnnoyed   } from "react-icons/lu";

// import { SteamSearchGames } from '../../Components/Steam/steamStoreApi';
import { EpicGamesStoreApi } from '../../Components/Epic Games/epicStoreApi';

import { Languages } from '../../exports';

import { useState } from 'react';

function SearchPage() {

  var langL = window.localStorage.getItem('lang')
  var lang = {}

  switch(langL){
    case "pt":
      lang = Languages.pt.Search
      break;
    case "es":
      lang = Languages.es.Search
      break;
    default: 
      lang = Languages.en.Search
      break;
  }

  var searchValue = window.location.pathname
  var searchValue2 = window.location.pathname.indexOf('/search/')
  searchValue = searchValue.slice(searchValue2 + 8, searchValue.length)

  if(searchValue === ''){window.location = `/${window.localStorage.getItem("lang")}/` }


  var [steamResults, setSteamResults] = useState([])
  var [steamResultsStats, setSteamResultsStats] = useState('coming-soon')



  var [epicResults, setEpicResults] = useState([])
  var [epicResultsStats, setEpicResultsStats] = useState('loading')

  function getEpicGames(){

    var coinEpic = window.localStorage.getItem("coin")

    if(Object.keys(epicResults).length > 0){return}else{
      EpicGamesStoreApi(searchValue, coinEpic).then(function(result){
        if(result.code){
          setEpicResultsStats('error')
        }else{
          setEpicResults(result)
          if(result["error-index"] === "1"){
            setEpicResultsStats('notFound')
          }else{
            setEpicResultsStats('sucess')
          }
        }
      })
    }
  }
  getEpicGames()

  function EpicGamesDisplay({item}){
    var DiscountDiv = (
      <p> <LuApple /> {item.price.totalPrice.fmtPrice.originalPrice}</p>
    )
    if(item.currentPrice !== item.price.totalPrice.discountPrice){
      DiscountDiv = (
        <p style={{flexDirection: 'column'}}>
          <p className='discount'> <small style={{color: '#6e6e6e'}}> <del>{item.price.totalPrice.fmtPrice.originalPrice} </del> </small></p> <p> <LuBanana /> {item.price.totalPrice.fmtPrice.discountPrice} </p>
        </p>
      )
    }
    if(item.currentPrice === 0){
      DiscountDiv = (
          <p>
           {lang.GameNotSale }
          </p>
      )
    }

    var GameNameValue = item.title


    GameNameValue = GameNameValue.trim()
    if(GameNameValue.includes(" ")){
        var i = 0
        while(i < 5){
          GameNameValue = GameNameValue.replace(' ', '-')

          if(!GameNameValue.includes(" ")){
            i++
          }
        }
  
    }

    return (
      <div onClick={()=> {window.location = `/${window.localStorage.getItem('lang')}/game/details/epic/${GameNameValue}`}} className='results-card'>
          <div className="card-img"> 
            <img alt={`Img-card: ${item.title}`} src={item.keyImages[2].url} />
          </div>
          <div className="card-title">
            <h3>{item.title} </h3>
          </div>
          <div className="card-price"> 
            {DiscountDiv}
          </div>
      </div>
    )
  }

function updataPriceValue(newCoin){
  if(newCoin === 'BRL'){
    window.localStorage.setItem('coin', 'BRL')
  }else if(newCoin === 'EUR'){
    window.localStorage.setItem('coin', 'EUR')
  }else{
    window.localStorage.setItem('coin', 'USD')
  }
  window.location.reload()
}
  return (
    <div className="SearchPage">
      <div className='search-value'>
          <h3><LuSearch/> {searchValue}</h3>
          <p><LuInfo/> {lang.SearchInfo} <a href='https://store.epicgames.com/pt-BR/'>EPIC GAMES</a> & <del><a href='https://store.steampowered.com/'>STEAM</a> </del></p>
          <div className='search-price'>
            <p>{lang.PriceCoin }:</p>
            <select defaultValue={window.localStorage.getItem('coin')} id='price-value' onChange={(e)=> updataPriceValue(e.target.value)}>
              <option value={'BRL'}>Real (BRL - R$) </option>
              <option value={'USD'}>Dolar (USD - US$) </option>
              <option value={'EUR'}>Euro (EUR - €) </option>
            </select>
          </div>
      </div>
      <div className='search-results'>
        <div className='results-steam'>
          <h1>Steam:</h1>
          <div className='results-list'>
            {steamResultsStats === 'coming-soon' && (
              <div className='result-error'>
                <h4><LuAnnoyed/> {lang.SteamNotFunction }</h4>
              </div> 
            )}
          </div>
        </div>
        <div className='results-epic'>
          <h1>Epic games: </h1>
          <div className='results-list'>
            {epicResultsStats === 'error' && (
              <div className='result-error'>
                <h4>{lang.ErrorMsgPart1 }<LuAlertTriangle/> <br/> {lang.ErrorMsgPart2 } </h4>
              </div> 
            )}
            {epicResultsStats === 'sucess' && (
              <>
                {epicResults.map((epicResults) => <EpicGamesDisplay key={epicResults.title} item={epicResults} />)}
              </>
            )}
            {epicResultsStats === 'notFound' && (
              <div className='result-loading'>
                 <h2><LuSearchSlash /> {lang.notFoundGame }</h2>
                  
              </div> 
            )}
            {epicResultsStats === 'loading' && (
              <div className='result-loading'>
                 <h2>{lang.Loading }</h2>
                  <div className="result-loader"></div>
              </div> 
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default SearchPage;
