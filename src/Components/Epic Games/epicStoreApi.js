import axios from "axios";

export async function EpicGamesStoreApi(GameName, locale){
    const options = {
        method: 'GET',
        url: 'https://epic-store-games.p.rapidapi.com/onSale',
        params: {
          searchWords: GameName,
          locale: locale,
          country: locale
        },
        headers: {
          'X-RapidAPI-Key': '6eacff13b4mshce5fb7355efa64fp10b059jsnc2c34ef702a3',
          'X-RapidAPI-Host': 'epic-store-games.p.rapidapi.com'
        }
    };
    
    try {
      const response = await axios.request(options);
        return response.data
    } catch (error) {
        return error
    }
}