import axios from 'axios'

export async function getQuotes(term) {
  const response = await axios.get(`https://pensador-api.vercel.app/?term=${term}&max=500`)
  return response.data;
}
