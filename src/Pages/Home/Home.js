import './Home.css';

import { useState } from 'react';

import { freeGamelist } from '../../Components/Epic Games/freeGameList';
import { freeGameComingSoonList } from '../../Components/Epic Games/freeGameComingSoon';
import { translateAPI } from '../../Components/TranslateAPI/translate';

import { steamRandomGames } from '../../Components/Steam/steamRandomGames';

import { LuGift } from 'react-icons/lu'

function HomePage() {
  
  var [freeGame, setFreeGame] = useState([])
  var [freeGameComing, setFreeGameComing] = useState([])

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

        </div>
        <div>

        </div>
      </div>
    </>
  );
}

export default HomePage;
