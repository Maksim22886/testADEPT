import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCompany } from './ListCompaniesSlice';
import style from './style/addCompanyForm.module.scss';

const AddCompanyForm: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '') {
      setError('Поле name не может быть пустым');
    } else if (address.trim() === '') {
      setError('Поле address не может быть пустым');
    } else {
      const newCompany = {
        id: Date.now(),
        name: name.trim(),
        address: address.trim(),
      };
      dispatch(addCompany(newCompany));
      setName('');
      setAddress('');
    }
  };

  return (
    <form className={style.add_block} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="company-name">Название компании:</label>
        <input
          type="text"
          id="company-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={style.valustyled_input}
          placeholder="Название компании"
        />
      </div>
      <div>
        <label htmlFor="company-address">Адрес компании:</label>
        <input
          type="text"
          id="company-address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={style.valustyled_input}
          placeholder="Адрес компании"
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button className={style.button_add} type="submit">
        Добавить компанию
      </button>
    </form>
  );
};

export default AddCompanyForm;
