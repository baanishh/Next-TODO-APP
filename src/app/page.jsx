"use client";

import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import Modal from "@/app/components/modal";
import { IoCloseSharp } from "react-icons/io5";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  console.log("todos", todos);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editText, setEditText] = useState("");
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);

  const openModal = (index) => {
    setIsModalOpen(true);
    setEditText(todos[index].text);
    setCurrentTodoIndex(index);
  };

  const updateTodo = () => {
    const updatedTodos = [...todos];
    updatedTodos[currentTodoIndex].text = editText;
    setTodos(updatedTodos);
    setIsModalOpen(false);
  };

  // Load todos from local Storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  // Set todos to local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add todo
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  //delete todo
  const deleteTodo = (index) => {
    todos.splice(index, 1);
    setTodos([...todos]);
  };

  //toggle to strike through
  const toggleTodo = (index) => {
    todos[index].completed = !todos[index].completed; 
    setTodos([...todos]); 
  };

  //clear all todo
  const clearTodos = () => {
    setTodos([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f9ff] p-4">
      <div className="w-full max-w-[1200px] min-h-[800px] bg-white rounded-[40px] shadow-sm border-2 pt-10 md:pt-20 px-6 md:px-[50px] lg:px-[150px] flex flex-col">
        <h1 className="text-[36px] md:text-[48px] lg:text-[53px] font-extrabold mb-4 text-left text-[#10195e]">
          Daily To Do List
        </h1>

        <div className="flex items-center mb-4 border rounded-lg p-1">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new list item"
            className="flex-1 p-2 rounded-l-lg focus:outline-none text-black text-[16px] md:text-[19px]"
          />
          <button
            onClick={addTodo}
            className="p-3 px-6 md:px-10 bg-[#2e70fc] text-white font-extrabold rounded-md"
          >
            Add
          </button>
        </div>

        {/* Todo List with Scroll */}
        <div className="flex-1 max-h-[400px] overflow-y-scroll mb-4 mt-4 md:mt-8 scrollbar-hide">
          <ul className="flex flex-col gap-4 px-2 md:px-5">
            {todos.map((todo, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2"
              >
                <div className="flex items-center">
                  {/* Outlined Circle and Checked Circle */}
                  <span
                    onClick={() => toggleTodo(index)}
                    className={`cursor-pointer flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 ${todo.completed
                        ? "bg-green-500 text-white border-green-500"
                        : "border-gray-200 text-transparent"
                      }`}
                  >
                    <FaCheck />
                  </span>

                  {/* Todo Text */}
                  <span
                    onClick={() => toggleTodo(index)}
                    className={`flex-1 ml-2 text-[#23325d] text-bold hover:text-[#2e70fc] text-lg md:text-xl cursor-pointer select-none max-w-[150px] md:max-w-[300px] truncate ${todo.completed ? "line-through text-gray-400" : ""
                      }`}
                  >
                    {todo.text}
                  </span>
                </div>

                <div className="flex gap-3 md:gap-5">
                  <button
                    onClick={() => openModal(index)}
                    className="text-[#2e70fc] text-lg md:text-2xl font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(index)}
                    className="text-red-500 "
                  >
                   <IoCloseSharp size={25}/>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <Modal
            editText={editText}
            updateTodo={updateTodo}
            setIsModalOpen={setIsModalOpen}
            setEditText={setEditText}
          />
        )}

        {/* All clear and item count */}
        <div className="flex items-center justify-between border-t py-4 md:py-8 p-5">
          <p className="text-[#b4bace] text-lg md:text-xl">
            <span>{todos.length}</span> items
          </p>
          <button
            onClick={clearTodos}
            className="text-lg md:text-xl text-[#b4bace]"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
