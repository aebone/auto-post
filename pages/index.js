import React, { useEffect, useState } from 'react'

import { getAlbum } from '../pages/api/googlePhotos'
import { getQuotes } from '../pages/api/quotes'

const TOP = 'frame--quote-top '
const BOTTOM = 'frame--quote-bottom '

export const getStaticProps = async () => {
  const album = await getAlbum(process.env.ALBUM_ID)
  const randomIndex = Math.floor(Math.random() * (album.length - 0))
  
  const image = album[randomIndex]

  return {
    props: {
      image
    }
  }
}

const IndexPage = ({ image }) => {
  const [quote, setQuote] = useState(0);
  const [position, setPosition] = useState(BOTTOM);

  useEffect(() => {
    getQuotes().then((response) => {
      const randomIndex = Math.floor(Math.random() * (response.length - 0))
      setQuote(response[randomIndex])
    });
  }, []);

  const changePositionToTop = () => {
    setPosition(TOP);
  }

  const changePositionToBottom = () => {
    setPosition(BOTTOM);
  }

  return(<>
    <section className='frame'>
      <img className='frame--image' src={image}/>

      <blockquote className={`frame--quote ${position}`}>
        <p>{quote.quote}</p>
        <cite>{quote.author}</cite>
      </blockquote>
    </section>

    <section className='controls'>
      <p>Position</p>
      <div>
        <input type="radio" id="top" name="position" value="top" onClick={changePositionToTop}/>
        <label htmlFor="top">Top</label>
      </div>
      <div>
        <input type="radio" id="bottom" name="position" value="bottom" onClick={changePositionToBottom}/>
        <label htmlFor="bottom">Bottom</label>
      </div>
    </section>
  </>)
}

export default IndexPage
