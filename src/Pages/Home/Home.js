import './Home.css';

import { useState } from 'react';

import { freeGamelist } from '../../Components/Epic Games/freeGameList';
import { freeGameComingSoonList } from '../../Components/Epic Games/freeGameComingSoon';



function HomePage() {


  var [freeGame, setFreeGame] = useState({})
  var [freeGameComing, setFreeGameComing] = useState({})

  const SearchFreeGame = () => {
    if(Object.keys(freeGame).length > 0){return}else{
      freeGamelist().then(function(result){
        setFreeGame(result)
      })
    }
  }
  SearchFreeGame()
  const SearchFreeGameComing = () => {
    if(Object.keys(freeGameComing).length > 0){return}else{
      freeGameComingSoonList().then(function(result){
        setFreeGameComing(result)
      })
    }
  }
  SearchFreeGameComing()



  return (
    <>
      <div className="Home">
        <div className='home-epic-free'>
          <button onClick={()=> {console.log(freeGame); console.log(freeGameComing)}}>teste</button>

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
