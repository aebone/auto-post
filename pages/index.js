import React, { useEffect, useState, useRef} from 'react'
import html2canvas from "html2canvas"

import { getAlbum } from '../pages/api/googlePhotos'
import { getQuotes } from '../pages/api/quotes'

const ALBUM_ID = 'p8WidirJAC8pHgKr7'
const TOP = 'frame--quote-top'
const BOTTOM = 'frame--quote-bottom'

export const getStaticProps = async () => {
  const album = await getAlbum(ALBUM_ID)

  return {
    props: {
      album
    }
  }
}

const IndexPage = ({ album }) => {
  const [quote, setQuote] = useState(0);
  const [position, setPosition] = useState(BOTTOM);
  const [image, setImage] = useState('');
  const frameRef = useRef();

  useEffect(() => {
    getQuotes().then((response) => {
      const randomIndex = Math.floor(Math.random() * (response.length - 0))
      setQuote(response[randomIndex])
    });

    getRandomImage();
  }, []);

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * (album.length - 0))
    setImage(album[randomIndex])
  }

  const changePositionToTop = () => {
    setPosition(TOP);
  }

  const changePositionToBottom = () => {
    setPosition(BOTTOM);
  }

  const onCapture = () => {
    html2canvas(frameRef.current, {allowTaint: true, useCORS: true}).then(function(canvas) {
      saveAs(canvas.toDataURL(), 'post.png');
    });
  }

  function saveAs(uri, filename) {

    var link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;
      //Firefox requires the link to be in the body
      document.body.appendChild(link);
      //simulate click
      link.click();
      //remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  }

  return (<>
    <section ref={frameRef} className='frame'>
      <img className='frame--image' src={image}/>
      <blockquote className={`frame--quote ${position}`}>
        <p>{quote.quote}</p>
        <cite>{quote.author}</cite>
      </blockquote>
    </section>

    <section className='controls'>
      <div className='column'>
        <p>Quote position:</p>
        <div>
          <input checked={position===TOP} type="radio" id="top" name="position" value="top" onChange={changePositionToTop}/>
          <label htmlFor="top">Top</label>
        </div>
        <div>
          <input checked={position===BOTTOM} type="radio" id="bottom" name="position" value="bottom" onChange={changePositionToBottom}/>
          <label htmlFor="bottom">Bottom</label>
        </div>
      </div>
      <div className='column'>
        <button onClick={onCapture}>Download</button>
      </div>
    </section>

    <section className='controls'>
      <div className='column'>
        <p>"{quote.quote}"</p>
        <br/>
        <p>{quote.author !== '-' ? '- ' + quote.author : ''}</p>
        <br/>.
        <br/>.
        <br/>.
        <p>
          #gatos #motivação #gatosfofos #gatosdoinstagram #gatoslindos #amogatos #loucosporgatos #memesdegatos #frasesdemotivação #motivaçãododia #gatosinstagram #gatosengraçados #gatosgraciosos #gatosdobrasil #goodvibes #boasvibracoes
        </p>
      </div>
    </section>
  </>)
}

export default IndexPage
