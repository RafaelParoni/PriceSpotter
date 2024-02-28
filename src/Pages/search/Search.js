import './Search.css';


import { LuSearch, LuInfo, LuXCircle, LuChevronLeft, LuCarrot, LuAlertTriangle, LuSearchSlash, LuBanana, LuApple, LuAnnoyed   } from "react-icons/lu";

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

  const urlParams = new URLSearchParams(window.location.search);
  var storeP = urlParams.get("store")
  const typeP = urlParams.get("type")

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

    var id = ''
    var valor = item.price.totalPrice.originalPrice
    var Discout = item.price.totalPrice.fmtPrice.discountPrice
    var DiscoutNum = item.price.totalPrice.discount
    var ValorNum = item.currentPrice

    if(valor === 0){
      // Verificar se é free ou Coming soon
      var jogoData = item.effectiveDate
      jogoData = jogoData.slice(0,4)
      jogoData = Number(jogoData)
      
      var AtualData = new Date().getFullYear()

      if(jogoData > AtualData){
        id = 'soon'
        DiscountDiv = (
          <p> <LuCarrot /> Em Breve</p>
        )
      }else{
        id = 'free'
        DiscountDiv = (
          <p> <LuBanana/> Gratís</p>
        )
      }
    }else{
      if(DiscoutNum > 0){
        if(DiscoutNum === ValorNum){
          id = 'free'
          DiscountDiv = (
            <p> <LuBanana/> Gratís</p>
          )
        }else{
          id = 'discount'
          DiscountDiv = (
            <p> <LuBanana/> <sup> <del> {item.price.totalPrice.fmtPrice.originalPrice} </del>  </sup> <b className='price-discout'> {Discout} </b> </p>
          )
        }
      }else{
        id = 'pay'
        DiscountDiv = (
          <p> <LuApple /> {item.price.totalPrice.fmtPrice.originalPrice}</p>
        )
      }
    }

    if(typeP !== null){
      switch(typeP){
        case 'free':
          if(id === 'free'){
            return (
              <div id={id} onClick={()=> {window.location = `/${window.localStorage.getItem('lang')}/game/details/epic/${GameNameValue}`}} className='results-card'>
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
        break;
        case 'pays':
          if(id === 'pay'){
            return (
              <div id={id} onClick={()=> {window.location = `/${window.localStorage.getItem('lang')}/game/details/epic/${GameNameValue}`}} className='results-card'>
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
        break;
        case 'soon':
          if(id === 'soon'){
            return (
              <div id={id} onClick={()=> {window.location = `/${window.localStorage.getItem('lang')}/game/details/epic/${GameNameValue}`}} className='results-card'>
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
        break;
        case 'discount':
          if(id === 'discount'){
            return (
              <div id={id} onClick={()=> {window.location = `/${window.localStorage.getItem('lang')}/game/details/epic/${GameNameValue}`}} className='results-card'>
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
        break;
        default:
          return (
            <div id={id} onClick={()=> {window.location = `/${window.localStorage.getItem('lang')}/game/details/epic/${GameNameValue}`}} className='results-card'>
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
    }else{
      return (
        <div id={id} onClick={()=> {window.location = `/${window.localStorage.getItem('lang')}/game/details/epic/${GameNameValue}`}} className='results-card'>
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

  
  if(storeP === null){
    storeP = 'epic'
  }

  function updataFilter(type, value){
    if(type === 'store'){
      if(typeP === null){
        if(value === 'remove'){
          window.location.search = ``
        }else{
          window.location.search = `?store=${value}`
        }
      }else{
        if(value === 'remove'){
          window.location.search = `?type=${typeP}`
        }else{
          window.location.search = `?store=${value}&type=${typeP}`
        }
      }
    }else if(type === 'type'){
      if(storeP === null){
        if(value === 'remove'){
          window.location.search = ''
        }else{
          window.location.search = '?type=' + value
        }
      }else{
        if(value === 'remove'){
          window.location.search = `?store=${storeP}`
        }else{ 
          window.location.search = `?store=${storeP}&type=${value}`
        }
      }
    }
  }


  window.addEventListener('click', function(e){
    if(document.getElementById('filter-store-options').style.display === 'flex'){
      if(e.srcElement.nonce !== 'store-filter'){
        document.getElementById('filter-store-options').style.display = 'none'
        document.getElementById('filter-store-icon').style.transform = 'rotate(0deg)'
      }
    }
    if(document.getElementById('filter-price-options').style.display === 'flex'){
      if(e.srcElement.nonce !== 'price-filter'){
        document.getElementById('filter-price-options').style.display = 'none'
        document.getElementById('filter-price-icon').style.transform = 'rotate(0deg)'
      }
    }
  })

  function visibleFilter(filter){
    if(filter === 'store'){
      document.getElementById('filter-store-options').style.display = 'flex'
      document.getElementById('filter-store-icon').style.transform = 'rotate(-90deg)'
    }else if(filter === 'price'){
      document.getElementById('filter-price-options').style.display = 'flex'
      document.getElementById('filter-price-icon').style.transform = 'rotate(-90deg)'
    }
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
          <h4>Filtros: {typeP !== null && (<div> type: {typeP} <LuXCircle onClick={(e) => updataFilter('type', 'remove')} color='#D43A3A'/></div>)} {storeP !== null && (<div> Store: {storeP} <LuXCircle onClick={(e) => updataFilter('store', 'remove')} color='#D43A3A'/></div>)}</h4>
          <div className='search-filter' >
            <div nonce='store-filter' onClick={()=> visibleFilter('store')} className='filter-store' id='filter-store'>
              <div nonce='store-filter' className='filter-store-text'> <p nonce='store-filter'>Loja</p> <LuChevronLeft nonce='store-filter' id='filter-store-icon'/></div>

              <div nonce='store-filter' className='filter-store-options' id='filter-store-options'>
                <div className='filter-store-options-triangulo'></div>
                <button onClick={()=> updataFilter('store', 'epic')} nonce='store-filter'>Epic Games</button>
                <button onClick={()=> updataFilter('store', 'steam')} nonce='store-filter'>Steam </button>
              </div>
            </div>
            <div nonce='price-filter' onClick={()=> visibleFilter('price')} className='filter-store' id='filter-price'>
              <div nonce='price-filter' className='filter-store-text'> <p nonce='price-filter'>Preços</p> <LuChevronLeft nonce='price-filter' id='filter-price-icon'/></div>

              <div nonce='price-filter' className='filter-store-options' id='filter-price-options'>
                <div className='filter-store-options-triangulo'></div>
                <button onClick={()=> updataFilter('type', 'free')} nonce='price-filter'>Gratís</button>
                <button onClick={()=> updataFilter('type', 'soon')} nonce='price-filter'>Em breve </button>
                <button onClick={()=> updataFilter('type', 'discount')} nonce='price-filter'>Promoção </button>
                <button onClick={()=> updataFilter('type', 'pays')} nonce='price-filter'> +0,99 {window.localStorage.getItem("coin")} </button>
                <button onClick={()=> updataFilter('type', 'all')} nonce='price-filter'> Todos </button>
              </div>
            </div>
          </div>
      </div>
      <div className='search-results'>
        
        {storeP === 'steam' && (
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
        )}
        {storeP === 'epic' && (
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
        )}
      
      </div>
    </div>
  );
}

export default SearchPage;
