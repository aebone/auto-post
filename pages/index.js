import React from 'react'

import { getAlbum } from '../pages/api/googlePhotos'


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

const IndexPage = ({ images }) => (
  <>
    {images.map((image) => <img src={image.thumbnail}/>)}
  </>
)

export default IndexPage
