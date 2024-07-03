import React from 'react'
import "./ShowVideoGrid.css"
import ShowVideo from '../ShowVideo/ShowVideo'

const ShowVideoGrid = ({vids}) => {
  return (
   <>
   <div className="container_showVideo_grid">
    {
      vids.map(vi=>
        {
          return (
            <div key={vi._id} className="videoBox">
              <ShowVideo vid={vi}/>
            </div>
          )
        }
      )
    }
   </div>
   </>
  )
}

export default ShowVideoGrid
