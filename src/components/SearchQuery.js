import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Cards from './Cards'
import Footer from './Footer'
import { v4 as uuidv4 } from 'uuid';

function SearchQuery({queryData}) {
  console.log(queryData)
  return (
    <Container className='d-flex flex-column p-0'>
        <div className="category d-flex flex-column my-2">
        <h4 className='text-white fw-bold'>Artists</h4>
          <div className="d-flex gap-3 flex-wrap">
          {
            queryData !== undefined && Object.entries(queryData.artists.items).map(data => {
                return (<Link to={`/artist/${data[1].id}`} style={{textDecoration:"none"}} key={uuidv4()}>
                  <Cards url={data[1].images.length > 0 ? data[1].images[0].url : "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Y5MzctYWV3LTEzOS5qcGc.jpg"} title={data[1].name} description={data[1].type} type="Artist"/>
                </Link>)
            })
          }
          </div>
        </div>
        <div className="category d-flex flex-column my-2">
        <h4 className='text-white fw-bold'>Songs</h4>
          <div className="d-flex gap-3 flex-wrap">
          {
          queryData !== undefined && Object.entries(queryData.tracks.items).map(data => {
              return (<Link to={"/"} style={{textDecoration:"none"}} key={uuidv4()}>
                <Cards url={data[1].album.images.length > 0 && data[1].album.images[0].url} title={data[1].name} description={data[1].artists[0].name}/>
              </Link>)
          })
        }
          </div>
        </div>
        <div className="category d-flex flex-column my-2">
        <h4 className='text-white fw-bold'>Albums</h4>
          <div className="d-flex gap-3 flex-wrap">
          {
          queryData !== undefined && Object.entries(queryData.albums.items).map(data => {
              return (<Link to={"/"} style={{textDecoration:"none"}} key={uuidv4()}>
                <Cards url={data[1].images.length > 0 && data[1].images[0].url} title={data[1].name} description={data[1].release_date.split("-")[0] + " | " + data[1].artists[0].name}/>
              </Link>)
          })
        }
          </div>
        </div>
        
        <Footer></Footer>
    </Container>
  )
}

export default SearchQuery