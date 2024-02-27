import './Game.css';

import { LuCherry, LuX, LuChevronLeft, LuStore, LuChevronRight, LuApple, LuBanana, LuCandyCane, LuCandy      } from "react-icons/lu";

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
              selectPrice(result[0])
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

  function SlideViewImgsDisplay({item}){
    return (
      <img alt='Slide img' id={item.type} style={{display: 'none'}} src={item.url} />
    )
  }


  function selectPrice(jogo){
    var valor = jogo.price.totalPrice.originalPrice
    var Discout = jogo.price.totalPrice.fmtPrice.discountPrice
    var DiscoutNum = jogo.price.totalPrice.discount
    var ValorNum = jogo.currentPrice

    if(valor === 0){
      // Verificar se é free ou Coming soon
      var jogoData = jogo.effectiveDate
      jogoData = jogoData.slice(0,4)
      jogoData = Number(jogoData)
      
      var AtualData = new Date().getFullYear()

      if(jogoData > AtualData){
        setTimeout(function(){
          document.getElementById('price-value-epic').innerHTML = ` EM BREVE`
        },100)
      }else{
        setTimeout(function(){
          document.getElementById('price-value-epic').innerHTML = ` GRATÍS`
        },100)
      }
    }else{
      if(DiscoutNum > 0){
        if(DiscoutNum === ValorNum){
          setTimeout(function(){
            document.getElementById('price-value-epic').innerHTML = `GRATÍS `
          },100)
        }else{
          setTimeout(function(){
            document.getElementById('discontTtile').style.display = 'flex'
            document.getElementById('price-value-epic').innerHTML = `<sup> <del> ${jogo.price.totalPrice.fmtPrice.originalPrice} </del>  </sup> <b class='price-discout'> ${Discout} </b> `
          },100)
        }
      }else{
        setTimeout(function(){
          document.getElementById('price-value-epic').innerHTML = `${jogo.price.totalPrice.fmtPrice.originalPrice} `
        },300)
      }
    }
  }



  if(detailsType === 'epic'){
    getEpicGames()

  }else{
    
  }
  return (
    <>
      <div className="gamePage">
        <div className='game-info'>
            <h2> <LuCherry/> {detailsValue}  <sup style={{display: 'none'}} id='discontTtile'> <p>  <LuBanana /> Tem desconto! </p></sup></h2>
        </div>
        <div className='game-details'>
          {epicResultsStats === 'sucess' && (
            <>
              <div onClick={()=> {document.getElementById('view-img').style.display = 'flex'; document.getElementById('view-img').style.filter = ' opacity(1)'; SlideViewImgs('start')}} className='game-details-img'>
                <img alt='img card' id='imageCard' src={thumbnail} className='game-details-img' />
                <div className='game-details-img-text'>Mais outras {epicResults.keyImages.length -1 } imagens</div>
              </div>
              
              <div className='game-details-info'>
                <h2><sub> <LuStore /> Publisher: </sub> {epicResults.publisherName}</h2>
                <p>{epicResults.description}</p>
                <h3>Preços:</h3>
                <h4> <LuCandy /> Epic Games:</h4>
                <div id='info-price-epic' className='info-price'>
                   <h3 id='price-value-epic'> Carregando</h3>
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
