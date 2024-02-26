import './Game.css';

import { LuCherry, LuX, LuChevronLeft, LuChevronRight     } from "react-icons/lu";

import { useState, } from 'react';

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
  var [slideImgs, setSlideImgs] = useState([])


  var CoinSelect = window.localStorage.getItem("coin")
  function getEpicGames(){
      if(Object.keys(epicResults).length > 0){return}else{
        EpicGamesStoreApi(detailsValue, CoinSelect).then(function(result){
          if(result.code){
            setEpicResultsStats('error')
          }else{
            setEpicResults(result[0])
            if(result["error-index"] === "1"){
              setEpicResultsStats('notFound')
            }else{
              setEpicResultsStats('sucess')
              setSlideImgs(result[0].keyImages)
              selectBanner(result[0].keyImages)
              console.log(result[0])

            }
          }
        })
      }
  }

  var [thumbnail, setThumbnail] = useState('')
  function selectBanner(imgs){
    var i = 0
    while(i < imgs.length){
      if(imgs[i].type === 'Thumbnail'){
        setThumbnail(imgs[i].url)
        i = imgs.length
      }
      i++
    }
    
  }

  var Slide = 0

  function SlideViewImgs(type){
    if(type === 'start'){
      document.getElementById(slideImgs[Slide].type).style.display = 'none'
      document.getElementById(slideImgs[0].type).style.display = 'flex'
      Slide = 0
      document.getElementById('SlideValue').value = Slide
    }else if(type === 'next'){
      if(Slide === slideImgs.length -1){
        console.log(`Slide final: ${Slide}, Voltando para Slide: 0`)
        document.getElementById(slideImgs[Slide].type).style.display = 'none'
        Slide = 0
        document.getElementById(slideImgs[Slide].type).style.display = 'flex'
      }else{
        console.log(`Slide anterior: ${Slide} - Proximo Slide: ${Slide + 1}`)
        console.log('ID: ' + slideImgs[Slide].type)
        document.getElementById(slideImgs[Slide].type).style.display = 'none'
        Slide = Slide + 1
        document.getElementById(slideImgs[Slide].type).style.display = 'flex'
      }
    }else if(type === 'back'){
     if(Slide === 0){
      document.getElementById(slideImgs[Slide].type).style.display = 'none'
      console.log('Chegamos no INICIO dos slides, Voltando para o final! ' + slideImgs.length)
      Slide = slideImgs.length -1 
      document.getElementById(slideImgs[Slide].type).style.display = 'flex'
     }else{
      console.log(`Slide anterior: ${Slide}, Proximo Slide: ${Slide -1}`)
      document.getElementById(slideImgs[Slide].type).style.display = 'none'
      Slide = Slide -1
      document.getElementById(slideImgs[Slide].type).style.display = 'flex'
     }
    }
    document.getElementById('SlideValue').innerHTML = Slide + 1   
  }


  // VER SE O JOGO É GRATIS OU NÃO se effectiveDate for maior doq 2040 ele não é gratis é coming soon, agora se ele é menor ou igual a 2024 ele é gratis

  function SlideViewImgsDisplay({item}){
    return (
      <img alt='Slide img' id={item.type} style={{display: 'none'}} src={item.url} />
    )
  }

  if(detailsType === 'epic'){
    getEpicGames()

  }else{
    
  }
  return (
    <>
      <div className="gamePage">
        <div className='game-info'>
            <h2> <LuCherry/> {detailsValue}</h2>
        </div>
        <div className='game-details'>
          {epicResultsStats === 'sucess' && (
            <>
              <div onClick={()=> {document.getElementById('view-img').style.display = 'flex'; document.getElementById('view-img').style.filter = ' opacity(1)'; SlideViewImgs('start')}} className='game-details-img'>
                <img alt='img card' id='imageCard' src={thumbnail} className='game-details-img' />
                <div className='game-details-img-text'>Mais outras {epicResults.keyImages.length -1 } imagens</div>
              </div>
              
              <div className='game-details-info'>
                <p>{epicResults.description}</p>
                <div className='info-price'>
                  PREÇO effectiveDate
                  
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {epicResultsStats === 'sucess' && (
        <div id='view-img' className='games-img-views'>
            <div className='view-imgs-display'>
              <button onClick={()=> SlideViewImgs('back')}><LuChevronLeft/></button>
                {slideImgs.map((slideImgs) => <SlideViewImgsDisplay item={slideImgs} /> )}
              <button onClick={()=> SlideViewImgs('next')}><LuChevronRight/></button>
            </div>
            <div className='view-imgs-control'>
              <p><p id='SlideValue'>1</p>/{Object.keys(slideImgs).length }</p>
              <button onClick={()=> {document.getElementById('view-img').style.display = 'none'; document.getElementById('view-img').style.filter = ' opacity(0)'; document.getElementById(slideImgs[Slide].type).style.display = 'none'}}><LuX size={20}/> Fechar</button>
            </div>
        </div>
      )}
    </>
  );
}

export default GamePage;
