import axios from 'axios'

export async function getQuotes() {
    const response = await axios.get(`https://raw.githubusercontent.com/alinebone/quotes/main/quotes.json`)
    return response.data;
  }
  