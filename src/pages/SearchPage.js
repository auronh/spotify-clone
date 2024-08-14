import React from 'react'
import { Container } from 'react-bootstrap'
import SearchBrowse from '../components/SearchBrowse'
import SearchQuery from '../components/SearchQuery'

function SearchPage({query}) {

  return (
    <Container className='d-flex flex-column rounded-bottom p-4 pb-3 content' style={{backgroundColor: "#121212", height:"90.1vh", overflowY:"overlay"}}>
      {query !== undefined ? <SearchQuery queryData={query}></SearchQuery> : <SearchBrowse></SearchBrowse>} 
    </Container>
  )
}

export default SearchPage