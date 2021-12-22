import React, { useEffect, useState } from 'react'

import { getAlbum } from '../pages/api/googlePhotos'
import { getQuotes } from '../pages/api/quotes'

export const getStaticProps = async () => {
  const album = await getAlbum(process.env.ALBUM_ID)
  const images = await Promise.all(
    album.map(async (url) => {
      console.log(url);
      const original = url
      const thumbnail = `${url}=w100`
      return {
        original,
        thumbnail
      }
    })
  )

  return {
    props: {
      images,
    }
  }
}

const IndexPage = ({ images }) => {
  const [quote, setQuote] = useState(0);

  useEffect(() => {
    getQuotes('motivacao').then((response) => {
      const randomIndex = Math.floor(Math.random() * (499 - 0))
      setQuote(response.frases[randomIndex])
    });
  }, []);

  return(<>
    {images.map((image, index) => <img key={index} src={image.thumbnail}/>)}
    <p>{quote.texto}</p>
  </>)
}

export default IndexPage
