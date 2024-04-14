import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, toggleTodo, updateTodo } from "../features/todo/todoSlice";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      dispatch(updateTodo(storedTodos)); // Dispatching updateTodo action directly
    }
  }, [dispatch]);

  const [editText, setEditText] = useState(""); // State to hold edited text
  const [editingTodoId, setEditingTodoId] = useState(null); // State to hold the id of todo being edited

  const toggleEdit = (id, text) => {
    setEditingTodoId(id);
    setEditText(text);
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleSaveEdit = (id) => {
    dispatch(updateTodo({ id, text: editText }));
    setEditingTodoId(null);
  };

  return (
    <>
      <div className=" text-white  mt-6 italic text-2xl  ">Todos</div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className={`mt-4 flex   justify-between items-center px-4 py-2 rounded ${
              todo.completed ? "bg-green-500" : " bg-white "
            }`}
            key={todo.id}
          >
            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={handleEditChange}
                  className="  bg-gray-200 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                <button
                  onClick={() => handleSaveEdit(todo.id)}
                  className="text-white bg-indigo-500 border-0 py-1 px-4 ml-2 focus:outline-none hover:bg-indigo-600 rounded text-md"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <div
                  className={` text-black  ${
                    todo.completed ? "line-through" : ""
                  }`}
                >
                  {todo.text}
                </div>
                <div>
                  <button
                    onClick={() => toggleEdit(todo.id, todo.text)}
                    className="text-white bg-yellow-500 border-0 py-1 px-4 mr-2 focus:outline-none hover:bg-yellow-600 rounded text-md"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => dispatch(toggleTodo(todo.id))}
                    className="text-white border-white border-2 bg-green-500 border-0 py-1 px-4 mr-2 focus:outline-none hover:bg-green-600 rounded text-md"
                  >
                    {todo.completed ? "✔" : "✔"}
                  </button>
                  <button
                    onClick={() => dispatch(removeTodo(todo.id))}
                    className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
