import React, { useContext, useEffect, useState } from 'react'
import { accessTokenContext } from '../context/accessTokenContext'
import { Col } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';

function ArtistsTracks({artistId}) {
    const accessToken = useContext(accessTokenContext)
    const [artistTracks, setArtistTracks] = useState()

    useEffect(()=>{
        if(accessToken!=undefined && artistId!=undefined){
          const artistsTracks = async ()=>{
            const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`
            var artistParams = {
                method: "GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            const response = await fetch(url, artistParams)
            const data = await response.json()
            setArtistTracks(data)
        }
        artistsTracks()}
    },[artistId])
    console.log(artistTracks)
  return (
    <Col className='d-flex flex-column mx-3 gap-2'>
        <h4 className='text-white bold'>Popular</h4>
        <div className="songs d-flex flex-column gap-1">
            {
                artistTracks && Object.entries(artistTracks.tracks).map(data => {
                return (
                    <div className="song d-flex align-items-center justify-content-between w-100 rounded px-2" key={uuidv4()}>
                        <div className="left d-flex gap-2 align-items-center justify-content-center text-white">
                            <i className="bi bi-play-fill fs-2"></i>
                            <img className='rounded' src={data ? data[1].album.images[0].url:"https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Y5MzctYWV3LTEzOS5qcGc.jpg"} alt="" style={{height:"40px"}}/>
                            <p className='mt-3'>{data[1].name}</p>
                        </div>
                        <div className="d-flex align-items-center mx-3 right" style={{color:"#9e9e9e", gap:"250px"}}>
                            <p className='mt-3'>{new Date(data[1].duration_ms).getMinutes()}:{new Date(data[1].duration_ms).getSeconds()<10 ? "0" + new Date(data[1].duration_ms).getSeconds().toString():new Date(data[1].duration_ms).getSeconds()}</p>
                        </div>
                    </div>)
                })
            }
        </div>
    </Col>
  )
}

export default ArtistsTracks