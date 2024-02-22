import axios from "axios";

export async function freeGamelist(){
    const options = {
        method: 'GET',
        url: 'https://epic-free-games.p.rapidapi.com/epic-free-games',
        headers: {
          'X-RapidAPI-Key': '6eacff13b4mshce5fb7355efa64fp10b059jsnc2c34ef702a3',
          'X-RapidAPI-Host': 'epic-free-games.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          return response.data
      } catch (error) {
          return error
      }
}