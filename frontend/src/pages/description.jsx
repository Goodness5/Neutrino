import React from 'react';

const Description = () => {
  return (
    <div>
        <div style={{ position: 'relative' }} className="text-[#504b4bad]" >
        <img className='h-[400px] container' src="/house.jpg" alt="" />
        <div style={{ position: 'absolute', top: 180, left: 880 }} className="max-w-sm rounded left-0 border mt-5 ml-5 bg-white">
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
    <p>
       Neutrino is revolutionizing the real estate industry by providing a more accessible and transparent way to invest in real <br /> estate. Its decentralized model offers numerous advantages over traditional real estate models, including lower <br /> transaction costs, increased liquidity, and greater transparency. With its user-friendly interface and innovative blockchain <br /> technology, Neutrino is poised to become a major player in the real estate industry in the years to come.
    </p>
    </div>
    </div>
    <div className='my-10 mx-10 border rounded w-[800px]'>
      <p className="font-bold text-xl text-black m-5">Features</p>
      <hr className='w-[170px] ml-5'/>
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
     
    </div>
     <div className='my-10 mx-10 border rounded w-[800px]'>
      <p className="font-bold text-xl text-black m-5">Nearby</p>
      <div>
        <a href="/Description">
        <button className="font-bold text-sm text-black hover:bg-[#00B4A2] rounded hover:text-white ml-7">School</button></a>
        <a href="/Nearby">
        <button className="font-bold text-sm text-black hover:bg-[#00B4A2] rounded hover:text-white ml-7">Bank</button></a>
        <a href="/Nearby">
        <button className="font-bold text-sm text-black hover:bg-[#00B4A2] rounded hover:text-white ml-7">Food service</button></a>
        <a href="/Nearby">
        <button className="font-bold text-sm text-black hover:bg-[#00B4A2] rounded hover:text-white ml-7">Park</button></a>
        <a href="/Nearby">
        <button className="font-bold text-sm text-black hover:bg-[#00B4A2] rounded hover:text-white ml-7">Store</button></a>
        <a href="/Nearby">
        <button className="font-bold text-sm text-black hover:bg-[#00B4A2] rounded hover:text-white ml-7">Laundromat</button></a>
        <a href="/Nearby">
        <button className="font-bold text-sm text-black hover:bg-[#00B4A2] rounded hover:text-white ml-7">other</button></a>
       
      </div>
      <hr />
   <div className='flex my-5'>
      <div className='border w-[260px]  ml-5 '>
        <div className='flex mt-6 ml-14'>
          <button className='border w-14  h-14 rounded-full '>
        k-5
          </button> 
            <button className='border w-14 h-14 bg-[#00B4A2] content-center rounded-full'>B+</button>
        </div>
        <p className='font-bold text-center mx-3 my-3 text-black'>Castle height elementary School</p><p className='font-normal text-center  text-black'>4ml</p>

      </div>
      <div className='border w-[260px]  ml-5 '>
        <div className='flex mt-6 ml-14'>
          <button className='border w-14  h-14 rounded-full '>
        6-8
          </button>
            <button className='border w-14 h-14 bg-[#e6db47] content-center rounded-full'>C+</button>
        </div>
        <p className='font-bold text-center mx-3 my-3 text-black'>William Mulholland Middle School</p><p className='font-normal text-center  text-black'>12ml</p>

      </div>
      <div className='border w-[260px]  mx-5 '>
        <div className='flex mt-6 ml-14'>
          <button className='border w-14  h-14 rounded-full '>
        9-12
          </button>
            <button className='border w-14 h-14 bg-[#00B4A2] content-center rounded-full'>B+</button>
        </div>
        <p className='font-bold text-center mx-3 my-3 text-black'>Birmingham Community Charter High School</p><p className='font-normal text-center  text-black'>3ml</p>

      </div>
     
  </div>
  <div className='flex my-5'>
     <div className='border w-[260px]  ml-5 '>
        <div className='flex mt-6 ml-14'>
          <button className='border w-14  h-14 rounded-full '>
        6-8
          </button>
            <button className='border w-14 h-14 bg-[#e6db47] content-center rounded-full'>C+</button>
        </div>
        <p className='font-bold text-center mx-3 my-3 text-black'>Studio</p><p className='font-normal text-center  text-black'>4ml</p>

      </div>
      <div className='border w-[260px]  ml-5 '>
        <div className='flex mt-6 ml-14'>
          <button className='border w-14  h-14 rounded-full '>
        k-5
          </button>
            <button className='border w-14 h-14 bg-[#e6db47] content-center rounded-full'>B+</button>
        </div>
        <p className='font-bold text-center mx-3 my-3 text-black'>The incubator solo height</p><p className='font-normal text-center  text-black'>4ml</p>

      </div>
       <div className='border w-[260px]  ml-5 '>
        <div className='flex mt-6 ml-14'>
          <button className='border w-14  h-14 rounded-full '>
        k-5
          </button>
            <button className='border w-14 h-14 bg-[#00B4A2] content-center rounded-full'>B+</button>
        </div>
        <p className='font-bold text-center mx-3 my-3 text-black'>Supermarket</p><p className='font-normal text-center  text-black'>4ml</p>

      </div>
      
    </div>
    </div>
    <div className='my-10 mx-10 border rounded w-[800px]'>
      <div className='flex'>
      <p className="font-bold text-xl text-black m-5">Property Valuation</p>
      <button className='border h-10 text-white my-auto ml-[300px] px-3 bg-[#00B4A2] content-center rounded'> 4.3/5  |  This rating is very high</button>
      </div>
      <hr className='mx-5' />
     <div className='flex'>
      <div className='my-5'>
      <p className='flex ml-5'> <p className="font-bold text-xs text-black">Property Types:
        <span className='text-sm font-normal text-[#504b4bad] ml-[125px]'>Location rating</span></p>
       </p><p className='flex ml-5 mt-5'> <p className="font-bold text-xs text-black">Crime Level:
        <span className='text-sm font-normal text-[#504b4bad] ml-[142px]'>Content</span></p>
       </p>
       <p className='flex ml-5 mt-5'> <p className="font-bold text-xs text-black">Ecological state:
        <span className='text-sm font-normal text-[#504b4bad] ml-[117px]'>1981</span></p>
       </p>
      </div>
       <div className='mt-5 ml-16'>
      <p className='flex ml-5'> <p className="font-bold text-xs text-black">Noise level:
        <span className='text-sm font-normal text-[#504b4bad] ml-[128px]'>7800 club</span></p>
       </p><p className='flex ml-5 mt-5'> <p className="font-bold text-xs text-black">Infracture assessment:
        <span className='text-sm font-normal text-[#504b4bad] ml-16'>$345</span></p>
       </p>
     
      </div>
    </div>
    </div>
     <div className='mt-10 mb-5 mx-10 border rounded w-[800px]'>
      <p className="font-bold text-xl text-black mx-5 mt-5">1,749,000</p>
      <span className=" text-xs text-[#504b4bad] ml-5">Purchase price</span>
      <hr  className='mx-5'/>
    <div className='flex'>
      <div className='my-5'>
      <p className='flex-col ml-5'> <p className="font-bold text-sm text-black">Monthly Expenses
        <span className='text-sm font-bold  text-black ml-[74px]'>$1,749,000</span></p>
       </p><p className='flex ml-5 mt-5'> <p className="font-normal text-xs text-[#504b4bad]">Martgage
        <span className='text-sm font-bold text-black  ml-[145px]'>$8,874</span></p>
       </p>
       <p className='flex ml-5 mt-5'> <p className="font-normal text-[#504b4bad] text-xs">Property Tax
        <span className='text-sm font-bold  text-black ml-[130px]'>$1,851</span></p>
       </p>
       <p className='flex ml-5 mt-5'> <p className=" text-[#504b4bad] font-normal text-xs ">Homeowner insurance
        <span className='text-sm font-bold text-black ml-[78px]'>$320</span></p>
       </p>
      </div>
       <div className='my-5'>
      <p className='flex-col ml-5'> <p className="font-bold text-sm text-black">Due at close
        <span className='text-sm font-bold  text-black ml-[122px]'>$353,744</span></p>
       </p><p className='flex ml-5 mt-5'> <p className="font-normal text-xs text-[#504b4bad]">Down payment 20%
        <span className='text-sm font-bold text-black  ml-[95px]'>$345,000</span></p>
       </p>
       <p className='flex ml-5 mt-5'> <p className="font-normal text-[#504b4bad] text-xs">closing cost
        <span className='text-sm font-bold  text-black ml-[140px]'>$1,851</span></p>
       </p>
       <p className='flex ml-5 mt-5'> <p className=" text-[#504b4bad] font-normal text-xs ">OL refund Estimate
        <span className='text-sm font-bold text-black ml-[100px]'>$21.9k</span></p>
       </p>
      </div>
    </div>
    </div>
    < p className='text-xl font-bold text-black ml-10 mb-5'>
      Share
    </p>
    <div className='ml-5 flex'>
      <button className='bg-[#4686da] w-20  rounded text-white font-bold text-l ml-5 flex'>
        Twiter
      </button>
      <button className='bg-[#0e4894] ml-5 w-[100px]  rounded text-white font-bold text-l flex'>
       Facebook
      </button>
     <button className='bg-[#00B4A2] ml-5 w-[100px] rounded text-white font-bold text-l flex'>
      Send mail
      </button>
       <button className='bg-[#7377749c] ml-5   rounded text-white border font-bold text-l flex'>
      Copy share link
      </button>
    </div>
    
    <div className='mt-10 mb-5 ml-10'>
      <p className='font-bold text-xl '>Nearby Similar Homes</p>
    <div className='flex my-5'>

      <div >
        <img className=' w-[360px]' src="/house.jpg" alt="" />
        <div className='flex'>
       <p className='text-sm font-bold text-black '>4666 pine valley cir. <br />
          <span className=" text-[#504b4bad] font-normal text-xs ">south park los-angelos C.A 90017
          </span></p>
          <p className='text-sm font-bold text-[#00B4A2] ml-24'>$300,000</p>
          </div>
        <hr />
    <div className='flex my-5'>
     <p className='flex '> <img className='w-4 h-4' src="/square.png" alt="" />
     <p className='text-sm font-normal text-[#504b4bad] ml-2'>1100SQ</p>
     </p>
      <p className='flex ml-5'> <img className='w-4 h-4' src="/bed.png" alt="" />
     <p className='text-sm font-normal text-[#504b4bad] ml-2'>3bd</p>
     </p>
      <p className='flex ml-5'> <img className='w-4 h-4' src="/bath.png" alt="" />
     <p className='text-sm font-normal text-[#504b4bad] ml-2'>2bt</p>
     </p>
      <p className='ttext-sm font-normal text-[#504b4bad] ml-[60px]'>3hour ago</p>
    </div>
    
      </div>
       <div >
        <img className='ml-5 w-[360px]' src="/house.jpg" alt="" />
        <div className='flex'>
       <p className='text-sm font-bold text-black '>4666 pine valley cir. <br />
          <span className=" text-[#504b4bad] font-normal text-xs ">south park los-angelos C.A 90017
          </span></p>
          <p className='text-sm font-bold text-[#00B4A2] ml-24'>$300,000</p>
          </div>
        <hr />
    <div className='flex my-5'>
     <p className='flex '> <img className='w-4 h-4' src="/squarclassName='ml-5 w-[360px]e.png" alt="" />
     <p className='text-sm font-normal text-[#504b4bad] ml-2'>1100SQ</p>
     </p>
      <p className='flex ml-5'> <img className='w-4 h-4' src="/bed.png" alt="" />
     <p className='text-sm font-normal text-[#504b4bad] ml-2'>3bd</p>
     </p>
      <p className='flex ml-5'> <img className='w-4 h-4' src="/bath.png" alt="" />
     <p className='text-sm font-normal text-[#504b4bad] ml-2'>2bt</p>
     </p>
      <p className='ttext-sm font-normal text-[#504b4bad] ml-[60px]'>3hour ago</p>
    </div>
    
      </div>
      <div>
        <img className='ml-5 w-[360px]' src="/house.jpg" alt="" />
        <div className='flex'>
       <p className='text-sm font-bold text-black '>4666 pine valley cir. <br />
          <span className=" text-[#504b4bad] font-normal text-xs ">south park los-angelos C.A 90017
          </span></p>
          <p className='text-sm font-bold text-[#00B4A2] ml-24'>$300,000</p>
          </div>
        <hr />
    <div className='flex my-5'>
     <div className='flex '> <img className='w-4 h-4' src="/square.png" alt="" />
     <p className='text-sm font-normal text-[#504b4bad] ml-2'>1100SQ</p>
     </div>
      <div className='flex ml-5'> <img className='w-4 h-4' src="/bed.png" alt="" />
     <p className='text-sm font-normal text-[#504b4bad] ml-2'>3bd</p>
     </div>
      <div className='flex ml-5'> <img className='w-4 h-4' src="/bath.png" alt="" />
     <p className='text-sm font-normal text-[#504b4bad] ml-2'>2bt</p>
     </div>
      <p className='ttext-sm font-normal text-[#504b4bad] ml-[60px]'>3hour ago</p>
    </div>
    
      </div>
      </div>
    </div>
    
      <button className='ml-[500px] border w-40 h-12  rounded-xl'>Load more</button>
    
    </div>
  )
}

export default Description