import React, { useState, useContext, useEffect } from 'react';
import styles from './styles/todocard.module.css';
import { FaTrash } from 'react-icons/fa';
import { Context } from '../contexts/context';
import uuid from 'react-uuid';
import { AiFillEdit } from 'react-icons/ai';
function TodoCard({ id, title, cardCategory, saved, todos }) {
  const { removeTodoCard, handleTitle, handleSave, updateTodos } = useContext(
    Context
  );
  const [cardTodos, setCardTodos] = useState(todos);
  const [saveCard, setSaveCard] = useState(saved);
  const [inputTodo, setInputTodo] = useState({
    todoId: '',
    name: '',
    completed: false,
  });
  const [todoTitle, setTodoTitle] = useState(title);
  const handleTodoInput = (e) => {
    if (e.target.name === 'addtodo') {
      setInputTodo({
        todoId: uuid(),
        name: e.target.value,
        completed: false,
      });
    }
  };
  const handleAddTodo = (e) => {
    e.preventDefault();
    const newTodos = cardTodos;
    newTodos.push(inputTodo);
    setCardTodos(newTodos);
    setInputTodo({
      todoId: '',
      name: '',
      completed: false,
    });
  };
  useEffect(() => {
    updateTodos(id, cardTodos);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardTodos]);

  const handleDelete = (todoId) => {
    const newCardTodos = cardTodos.filter((item) => item.todoId !== todoId);
    setCardTodos(newCardTodos);
  };
  const handleChange = (e, todoId) => {
    if (e.target.name === 'todotitle') {
      const newTodos = [];
      cardTodos.forEach((todo) => {
        if (todo.todoId === todoId) {
          const newTodo = {
            todoId: todo.todoId,
            name: e.target.value,
            completed: todo.completed,
          };
          newTodos.push(newTodo);
        } else {
          newTodos.push(todo);
        }
      });
      setCardTodos(newTodos);
    }
  };
  const handleComplete = (todoId) => {
    const newTodos = [];
    cardTodos.forEach((todo) => {
      if (todo.todoId === todoId) {
        const newTodo = {
          todoId: todo.todoId,
          name: todo.name,
          completed: !todo.completed,
        };
        newTodos.push(newTodo);
      } else {
        newTodos.push(todo);
      }
    });
    setCardTodos(newTodos);
  };

  return (
    <div className={styles.todocard}>
      {saveCard ? (
        <>
          <h2>Category : {cardCategory}</h2>
          <div>
            <div>
              <h2>{title}</h2>
            </div>
          </div>
          <div>
            <ul className={styles.todos}>
              {cardTodos.map((todo) => {
                return (
                  <li key={todo.todoId} id={todo.todoId}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      className={styles.checkBox}
                      onChange={() => handleComplete(todo.todoId)}
                    />
                    <input
                      type="text"
                      className={
                        todo.completed
                          ? `${styles.todotext} ${styles.completed}`
                          : `${styles.todotext}`
                      }
                      name="todotitle"
                      value={todo.name}
                      onChange={(e) => handleChange(e, todo.todoId)}
                    />
                    <span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(todo.todoId);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.overlay}>
            <button
              onClick={(e) => {
                e.preventDefault();
                setSaveCard(!saveCard);
                handleSave(id, saveCard);
              }}
            >
              <AiFillEdit className={styles.overlayIcon} />
              Edit Card
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                removeTodoCard(id, cardCategory);
              }}
            >
              <FaTrash className={styles.overlayIcon} />
              Delete Card
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <h2>Category : {cardCategory}</h2>
            <div>
              <input
                type="text"
                placeholder="Add your title"
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
                name="title"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleTitle(id, todoTitle);
                }}
              >
                Save Title
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeTodoCard(id, cardCategory);
                }}
              >
                <FaTrash />
              </button>
            </div>
            <div>
              <form onSubmit={handleAddTodo}>
                <input
                  type="text"
                  value={inputTodo.name}
                  onChange={handleTodoInput}
                  placeholder="Add new Todo"
                  name="addtodo"
                />
                <button
                  onSubmit={(e) => {
                    handleAddTodo(e);
                  }}
                >
                  Add Todo
                </button>
              </form>
            </div>
          </div>
          <div>
            <ul className={styles.todos}>
              {cardTodos.map((todo) => {
                return (
                  <li key={todo.todoId} id={todo.todoId}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      className={styles.checkBox}
                      onChange={() => handleComplete(todo.todoId)}
                    />
                    <input
                      type="text"
                      className={
                        todo.completed
                          ? `${styles.todotext} ${styles.completed}`
                          : `${styles.todotext}`
                      }
                      name="todotitle"
                      value={todo.name}
                      onChange={(e) => handleChange(e, todo.todoId)}
                    />
                    <span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(todo.todoId);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              setSaveCard(!saveCard);
              handleSave(id, !saveCard);
            }}
          >
            Save
          </button>
        </>
      )}
    </div>
  );
}

export default TodoCard;
