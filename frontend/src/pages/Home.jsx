import React from 'react'
import Layer from '../component/Layer'
import { SongData } from '../context/Songcontext'
import Albumitems from '../component/Albumitems'
import Songitems from '../component/Songitems'
// import { UserData } from '../context/user'

const Home = () => {
   const{song,album}= SongData()



  return (
   <>
<Layer>

 
   <div className="mb-4">

      <h1 className="my-5 font-bold text-2xl"> Featured Charts</h1>
  {/* Albums */}
      <div className="flex overflow-auto gap-3">
         {
            album.map((e,i)=>(
               <Albumitems  key={i}  
               image={e.thumbnail.url}
               name={e.title}
               desc={e.description}
               id={e._id}
               
               />

            ))
         }
        
      </div>
   </div>


   {/* Songs  */}


      <div className="my6">
         
  
   <h1 className='my-5 font-bold text-2xl'>Today's biggest hits</h1>
     <div className="flex overflow-auto gap-3">
         {
            song.map((e,i)=>(
               <Songitems  key={i}  
               image={e.thumbnail.url}
               name={e.title}
               desc={e.description}
               id={e._id}
               
               />

            ))
         }
      </div>
     
        
      </div>
</Layer>

 
   
   </>
  )
}

export default Home 