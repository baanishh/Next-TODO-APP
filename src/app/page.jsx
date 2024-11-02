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
      <div className="w-full max-w-[1200px] min-h-[800px] bg-white rounded-[40px] shadow-sm border-2 pt-20 px-[250px] flex flex-col">
        <h1 className="text-[53px] font-extrabold mb-4 text-left text-[#10195e]">
          Daily To Do List
        </h1>

        <div className="flex items-center mb-4 border rounded-lg p-1">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new list item"
            className="flex-1 p-2 rounded-l-lg focus:outline-none text-black text-[19px]"
          />
          <button
            onClick={addTodo}
            className="p-3 px-10 bg-[#2e70fc] text-white rounded-md"
          >
            Add
          </button>
        </div>

        {/* Todo List with Scroll */}
        <div className="flex-1 max-h-[400px] overflow-y-scroll mb-4 mt-8 scrollbar-hide">
          <ul className="flex flex-col gap-4 px-5">
            {todos.map((todo, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2"
              >
                <div className="flex items-center">
                  {/* Outlined Circle and Checked Circle */}
                  <span
                    onClick={() => toggleTodo(index)}
                    className={`cursor-pointer flex items-center justify-center w-10 h-10 rounded-full border-2 ${todo.completed
                        ? "bg-green-500 text-white border-green-500"
                        : "border-gray-200 text-transparent"
                      }`}
                  >
                    <FaCheck />
                  </span>

                  {/* Todo Text */}
                  <span
                    onClick={() => toggleTodo(index)}
                    className={`flex-1 ml-2 text-[#23325d] text-extrabold hover:text-[#2e70fc] text-2xl cursor-pointer select-none max-w-[350px] truncate ${todo.completed ? "line-through text-gray-400" : ""
                      }`}
                  >
                    {todo.text}
                  </span>
                </div>

                <div className="flex gap-5">
                  <button
                    onClick={() => openModal(index)}
                    className="text-[#2e70fc] text-extrabold text-2xl"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(index)}
                    className="text-red-500 "
                  >
                   <IoCloseSharp size={35}/>
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

        {/* all clear and item count */}
        <div className="flex items-center justify-between border-t pb-12 p-5">
          <p className="text-[#b4bace]">
            <span className="text-xl">{todos.length}</span> <span className="text-xl">items</span>
          </p>
          <button
            onClick={clearTodos}
            className="text-xl text-[#b4bace]"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
