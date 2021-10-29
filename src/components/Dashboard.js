import React, { useContext, useState } from 'react';
import styles from './styles/dashboard.module.css';
import profileicon from '../img/todos.png';
import { Context } from '../contexts/context';
import AddCard from './AddCard';
import TodoCard from './TodoCard';
import uuid from 'react-uuid';
const Dashboard = () => {
  const nameSurname = localStorage.getItem('nameSurname');
  const { items, categories } = useContext(Context);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <div className={styles.profile}>
          <div className={styles.profileIconContainer}>
            <img src={profileicon} alt="" className={styles.profileIcon} />
          </div>
          <div className={styles.user}>
            <p>{nameSurname}</p>
          </div>
        </div>
        <div className={styles.categories}>
          <h5>Categories</h5>
          <select value={selectedCategory} onChange={handleChange}>
            <option value="All">All</option>
            {categories !== undefined
              ? categories.map((category) => {
                  return (
                    <option key={uuid()} value={category}>
                      {category}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
      </div>
      <div className={styles.todo}>
        {items.todocards !== undefined
          ? items.todocards.map((todocard) => {
              if (selectedCategory === 'All') {
                return (
                  <TodoCard
                    key={todocard.id}
                    id={todocard.id}
                    title={todocard.title}
                    cardCategory={todocard.category}
                    saved={todocard.saved}
                    todos={todocard.todos}
                  />
                );
              } else {
                if (todocard.category === selectedCategory) {
                  return (
                    <TodoCard
                      key={todocard.id}
                      id={todocard.id}
                      title={todocard.title}
                      cardCategory={todocard.category}
                      saved={todocard.saved}
                      todos={todocard.todos}
                    />
                  );
                }
              }
              return '';
            })
          : null}
        <AddCard />
      </div>
    </div>
  );
};

export default Dashboard;
