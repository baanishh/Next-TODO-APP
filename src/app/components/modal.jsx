import React from 'react';

const Modal = ({ editText, updateTodo, setIsModalOpen, setEditText }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white w-full max-w-[90%] md:max-w-[500px] px-6 md:px-10 py-8 md:py-10 rounded-[20px] md:rounded-[30px] space-y-6 md:space-y-8">
        <h1 className="text-[#10195e] font-extrabold text-2xl md:text-[35px]">Edit To Do Item</h1>
        
        <textarea
          rows={4}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="w-full p-2 border mb-2 text-[#10195e] text-lg md:text-2xl"
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={updateTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded text-lg md:text-2xl"
          >
            Save
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded text-lg md:text-2xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
