

function page({params}) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile Page</h1>
        <h2 className="p-3 bg-blue-500 rounded text-white">{params.id}</h2>
      
    </div>
  )
}

export default page
