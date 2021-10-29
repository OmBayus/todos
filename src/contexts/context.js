import React, { createContext, useState } from 'react';
import uuid from 'react-uuid';
export const Context = createContext();

export const Provider = (props) => {
  const [items, setItems] = useState([
    {
      todocards: [],
    },
  ]);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const initTodo = ()=>{
    setItems(JSON.parse(localStorage.getItem('items')) || [
      {
        todocards: [],
      },
    ])
    setCategories(JSON.parse(localStorage.getItem('categories')) || [])
  }

  const addTodoCards = () => {
    if (items.todocards !== undefined) {
      setItems({
        todocards: [
          ...items.todocards,
          {
            category: category,
            id: uuid(),
            title: 'New Todo',
            saved: false,
            todos: [],
          },
        ],
      });
    } else {
      setItems({
        todocards: [
          {
            category: category,
            id: uuid(),
            title: 'New Todo',
            saved: false,
            todos: [],
          },
        ],
      });
    }
    if (categories.length === 0) {
      const newCategories = [];
      newCategories.push(category);
      setCategories(newCategories);
    } else {
      const sameCategory = categories.find((name) => name === category);
      if (sameCategory === undefined) {
        const newCategories = categories;
        newCategories.push(category);
        setCategories(newCategories);
      }
    }
    setCategory('');
  };

  const removeTodoCard = (id, cardCategory) => {
    const newTodoCards = items.todocards.filter((item) => item.id !== id);
    setItems({
      todocards: newTodoCards,
    });
    const sameCategory = newTodoCards.find(
      (todocard) => todocard.category === cardCategory
    );
    if (sameCategory === undefined) {
      const newCategories = categories.filter(
        (category) => category !== cardCategory
      );
      setCategories(newCategories);
    }
  };
  const handleTitle = (id, newTitle) => {
    const newTodoCards = [];
    items.todocards.forEach((todocard) => {
      if (todocard.id === id) {
        const newTodoCard = {
          category: todocard.category,
          id: todocard.id,
          title: newTitle,
          saved: todocard.saved,
          todos: todocard.todos,
        };
        newTodoCards.push(newTodoCard);
      } else {
        newTodoCards.push(todocard);
      }
      return;
    });
    setItems({
      todocards: newTodoCards,
    });
  };
  const handleSave = (id, saveCard) => {
    const newTodoCards = [];
    items.todocards.forEach((todocard) => {
      if (todocard.id === id) {
        const newTodoCard = {
          category: todocard.category,
          id: todocard.id,
          title: todocard.title,
          saved: saveCard,
          todos: todocard.todos,
        };
        newTodoCards.push(newTodoCard);
      } else {
        newTodoCards.push(todocard);
      }
    });
    setItems({
      todocards: newTodoCards,
    });
  };
  const updateTodos = (id, cardTodos) => {
    const newTodoCards = [];
    items.todocards.forEach((todocard) => {
      if (todocard.id === id) {
        const newTodoCard = {
          category: todocard.category,
          id: todocard.id,
          title: todocard.title,
          saved: todocard.saved,
          todos: cardTodos,
        };
        newTodoCards.push(newTodoCard);
      } else {
        newTodoCards.push(todocard);
      }
    });
    setItems({
      todocards: newTodoCards,
    });
  };

  return (
    <Context.Provider
      value={{
        items,
        addTodoCards,
        removeTodoCard,
        category,
        setCategory,
        initTodo,
        categories,
        handleTitle,
        handleSave,
        updateTodos,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export const Consumer = Context.Consumer;
