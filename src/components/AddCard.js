import React, { useContext } from 'react';
import { Context } from '../contexts/context';
import { FaPlus } from 'react-icons/fa';
import styles from './styles/addcard.module.css';
function AddCard() {
  const { addTodoCards, category, setCategory } = useContext(Context);

  return (
    <div className={styles.addtodo}>
      <h1>Create New Card</h1>
      <div>
        <input
          type="text"
          placeholder="Add Category"
          value={category}
          name="category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          required
        />
        <FaPlus
          className={styles.addCard}
          size={40}
          onClick={() => {
            if (category !== '') {
              addTodoCards();
            }
          }}
        />
      </div>
    </div>
  );
}

export default AddCard;
