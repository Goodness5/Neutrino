import React from 'react'

const Description = () => {
  return (
    <div>
        <div style={{ position: 'relative' }} className="text-[#504b4bad]" >
        <img className='h-[400px] container' src="/house.jpg" alt="" />
        <div style={{ position: 'absolute', top: 180, left: 860 }} className="max-w-sm rounded left-0 border mt-5 ml-5 bg-white">
    <div className="px-6  py-4">
        <span className='text-xs'>Total price</span>
      <div className='flex mb-5'>
    <div className="font-bold text-xl text-black mb-2">1,700,0000</div>
    <button className='bg-[#00B4A2] ml-20 text-white rounded p-2'>Send Request</button>
    </div>
    <hr />

    <div className='mb-5'>
     <p className="font-bold text-xl my-5  text-black text-center mb-2">Go tour this Home</p>
     <div className='flex m-auto'>
        <button className='rounded text-xs border p-2'>Sun.Mar.10</button><button className='rounded ml-1 mr-2 border text-xs p-2'>Sun.Mar.10</button><button className='rounded border text-xs p-2'>Sun.Mar.10</button>
     </div>
      <div className='flex mt-2'>
        <button className='rounded text-xs border p-2'>Sun.Mar.10</button><button className='rounded ml-1 mr-2 border text-xs p-2'>Sun.Mar.10</button><button className='rounded border text-xs p-2'>Sun.Mar.10</button>
     </div>
       <button className='bg-[#00B4A2]  container mt-5 text-white rounded p-2'>schedule Tour</button>
       <p className='text-xs text-center mt-5'>It's free, with no Obligation - cancel anytime</p>
  </div>
  <hr />
    <p className='text-xs mt-5'> Updated 2days ago   <button className='rounded text-xs ml-[90px] border p-2'>Add to shortlist</button></p>
  </div>
 </div>
    <div className='my-10 mx-10'>
    <p className='text-xs mt-5'>BeverlyWood - Los Angelos, CA 90034</p>
    <div className='flex my-5'>
     <p className='flex '> <img className='w-7 h-7' src="/house.png" alt="" />
     <p className="font-bold text-xs  text-black ml-1">House <br /><p className='text-sm font-normal text-[#504b4bad]'>Type</p></p>
     </p>
      <p className='flex ml-5'> <img className='w-7 h-7' src="/square.png" alt="" />
     <p className="font-bold text-xs  text-black ml-1">1169 <br /><p className='text-sm font-normal text-[#504b4bad]'>sq.ft</p></p>
     </p>
      <p className='flex ml-5'> <img className='w-7 h-7' src="/bed.png" alt="" />
     <p className="font-bold  text-black text-xs ml-1">5 <br /><p className='text-sm font-normal text-[#504b4bad] '>bacony</p></p>
     </p>
      <p className='flex ml-5'> <img className='w-7 h-7' src="/bath.png" alt="" />
     <p className="font-bold text-xs text-black ml-1">2 <br /><p className='text-sm font-normal text-[#504b4bad]'>bathroom</p></p>
     </p>
    </div>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. A deserunt, officia autem praesentium dolores omnis <br /> tempora necessitatibus beatae sed earum illo voluptate odio voluptatum quasi suscipit consequuntur <br /> reprehenderit natus labore! Lorem ipsum dolor, sit amet consectetur  adipisicing elit. Error, nobis sed autem<br /> deleniti distinctio natus unde assumenda sequi libero officia, corporis laudantium nesciunt eligendi.
    </div>
    </div>
    <div className='my-10 mx-10 border rounded w-[800px]'>
      <p className="font-bold text-xl text-black m-5">Features</p>
      <hr className='w-[170px]'/>
    <div className='flex'>
      <div className='my-5'>
      <p className='flex ml-5'> <p className="font-bold text-xs text-black">Property Type:
        <span className='text-sm font-normal text-[#504b4bad] ml-[90px]'>single family home</span></p>
       </p><p className='flex ml-5 mt-5'> <p className="font-bold text-xs text-black">Country:
        <span className='text-sm font-normal text-[#504b4bad] ml-[125px]'>Califonia</span></p>
       </p>
       <p className='flex ml-5 mt-5'> <p className="font-bold text-xs text-black">year Built:
        <span className='text-sm font-normal text-[#504b4bad] ml-[117px]'>1991</span></p>
       </p>
       <p className='flex ml-5 mt-5'> <p className="font-bold text-xs text-black">Bathroom features:
        <span className='text-sm font-normal text-[#504b4bad] ml-16'>2full</span></p>
       </p>
      </div>
       <div className='mt-5 ml-16'>
      <p className='flex ml-5'> <p className="font-bold text-xs text-black">HOA Name:
        <span className='text-sm font-normal text-[#504b4bad] ml-[108px]'>7900 club</span></p>
       </p><p className='flex ml-5 mt-5'> <p className="font-bold text-xs text-black">HOA/ Maintainance:
        <span className='text-sm font-normal text-[#504b4bad] ml-16'>$345</span></p>
       </p>
       <p className='flex ml-5 mt-5'> <p className="font-bold text-xs text-black">Fee Frequency:
        <span className='text-sm font-normal text-[#504b4bad] ml-[90px]'>Monthly</span></p>
       </p>
       <p className='flex ml-5 mt-5'> <p className="font-bold text-xs text-black">parking space:
        <span className='text-sm font-normal text-[#504b4bad] ml-[94px]'>2</span></p>
       </p>
      </div>
    </div>
    </div>

    <div className='my-10 mx-10 border rounded w-[800px]'>
      <p className="font-bold text-xl text-black m-5">Location</p>
      <hr />
    <div className='flex'>
      
    </div>
    </div>
    </div>
  )
}

export default Description