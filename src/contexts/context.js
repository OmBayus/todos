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
        categories,
        handleTitle,
        handleSave,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export const Consumer = Context.Consumer;
