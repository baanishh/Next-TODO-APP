import React from 'react'

const modal = ({editText,updateTodo,setIsModalOpen,setEditText}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white min-w-[500px] min-h-[350px] px-20 py-10 rounded-[30px] w-64 space-y-8">
            <h1 className='text-[#10195e] font-extrabold text-[35px]'>Edit To Do Item</h1>
            <textarea
              rows={4}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-2 border mb-2 text-[#10195e] text-2xl"
            />
            <button onClick={updateTodo} className="bg-blue-500 text-white px-4 py-1 rounded mr-2 text-2xl">
              Save
            </button>
            <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 px-4 py-1 rounded text-2xl">
              Cancel
            </button>
          </div>
        </div>
  )
}

export default modal
