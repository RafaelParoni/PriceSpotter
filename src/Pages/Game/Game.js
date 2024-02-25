import './Game.css';

import { LuCherry } from "react-icons/lu";

import { useState } from 'react';

import { EpicGamesStoreApi } from '../../Components/Epic Games/epicStoreApi';


function GamePage() {


  var detailsValue = window.location.pathname
  var detailsType = ''
  var detailsTypeLenght = 19
  if(window.location.pathname.includes('/epic/')){
    detailsType = 'epic'
    detailsTypeLenght = 19
  }else{
    detailsType = 'steam'
    detailsTypeLenght = 20
  }
  var detailsValue2 = window.location.pathname.indexOf(`/game/details/${detailsType}/`)
  detailsValue = detailsValue.slice(detailsValue2 + detailsTypeLenght, detailsValue.length)

  if(detailsValue.includes('%C2%AE')){
    detailsValue = detailsValue.replace('%C2%AE', '')
  }

  if(detailsValue === ''){window.location = `/${window.localStorage.getItem("lang")}/` }

  var [epicResults, setEpicResults] = useState([])
  var [epicResultsStats, setEpicResultsStats] = useState('loading')

  if(detailsType === 'epic'){

    window.localStorage.setItem("coin", 'br')
    var coinEpic = window.localStorage.getItem("coin")
    function getEpicGames(){
      if(Object.keys(epicResults).length > 0){return}else{
        EpicGamesStoreApi(detailsValue, coinEpic).then(function(result){
          if(result.code){
            setEpicResultsStats('error')
          }else{
            setEpicResults(result[0])
            console.log(result[0])
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

  }else{
    
  }
  return (
    <div className="gamePage">
      <div className='game-info'>
          <h2> <LuCherry/> {detailsValue}</h2>
      </div>
      <div className='game-details'>
        {epicResults.title}
      </div>
    </div>
  );
}

export default GamePage;
