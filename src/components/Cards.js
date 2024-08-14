import React from 'react'
import {Card, Button} from "react-bootstrap"
import { Link } from 'react-router-dom'

function Cards({url, title, description, type=""}) {

  return (
    
      <Card className="p-3 pb-2 Cards" style={{minHeight:"278px"}}>
        <Card.Img variant="top" className={type == "Artist" && "rounded-pill Artist"} src={url} />
        <div className="play">
          <i className="bi bi-play-fill fs-2"></i>
        </div>
        <Card.Body className='px-0 py-2'>
          <Card.Title className='fs-6 mb-1 mt-2 fw-semibold text-white'>{title.substring(0,16)}{title.length>16 && "..."}</Card.Title>
          <Card.Text style={{color:"#A7A7A7", fontSize:"14px"}}>
            {type == "Home" ? description.substring(0,40): description}{type == "Home" && description.length > 40 && "..."}
          </Card.Text>
        </Card.Body>
      </Card>
  )
}

export default Cards