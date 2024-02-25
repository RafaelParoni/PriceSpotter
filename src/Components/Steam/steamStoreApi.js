/* 

  import axios from "axios";

  export async function SteamSearchGames(GameName){
      const options = {
        method: 'GET',
        url: 'https://steam-api7.p.rapidapi.com/search',
        params: {
          query: GameName,
        },
        headers: {
          'X-RapidAPI-Key': '6eacff13b4mshce5fb7355efa64fp10b059jsnc2c34ef702a3',
          'X-RapidAPI-Host': 'steam-api7.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          return response.data
      } catch (error) {
          return error
      }
  }

  function getSteamGames(){
    if(Object.keys(steamResults).length > 0){return}else{
      SteamSearchGames(searchValue).then(function(result){
        if(result.code){
          //setSteamResultsStats('error')
        }else{
          setSteamResults(result.results)
          //setSteamResultsStats('sucess')
        }
      })
    }
  }
  getSteamGames()

  function SteamGameDisplay({item}){
    return (
      <h1>{item.name}</h1>
    )
  }


  {steamResultsStats === 'error' && (
      <div className='result-error'>
      <h4>Algo deu errado <LuAlertTriangle/> <br/> Desculpe </h4>
    </div> 
  )}
  {steamResultsStats === 'sucess' && (
    <>
      {steamResults.map((steamResults) => <SteamGameDisplay key={steamResults.name} item={steamResults} />)}
    </>
  )}
  {steamResultsStats === 'loading' && (
    <div className='result-loading'>
      <h2>Carregando</h2>
      <div class="result-loader"></div>
    </div> 
  )}



*/
