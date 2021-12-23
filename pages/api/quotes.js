import axios from 'axios'

export async function getQuotes() {
    const response = await axios.get(`https://raw.githubusercontent.com/alinebone/motivar/master/data/br/01.json`)
    return response.data;
  }
  