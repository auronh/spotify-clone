import React, { useContext } from 'react'
import { categoriesContext } from '../context/categoriesContext'

function SearchBrowse() {
    const categories = useContext(categoriesContext)

  return (
    <div className='d-flex flex-column flex-wrap gap-3'>
        <h4 className='text-white fw-bold'>Browse</h4>
        <div className="categories d-flex flex-wrap gap-4">
            {
                categories && categories.map(c => 
                    <div key={c.id} className='d-flex p-3 rounded bg-dark' style={{height:"190px",width:"190px",backgroundImage:`url(${c.icons[0].url})`,backgroundSize:"190px"}}>
                        <h5 className='text-white fw-semibold text-break'>{c.name}</h5>
                    </div>
                )
            }
            
        </div>

        
    </div>
  )
}

export default SearchBrowse