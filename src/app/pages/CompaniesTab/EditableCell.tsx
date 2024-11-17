import React, { useState } from 'react';
import { Pencil, Trash } from '../../assets/images/index';
import style from './style/editableCell.module.scss';
import { PlusCircle } from '../../assets/images';

type EditableCellProps = {
  value: string;
  onChange: (newValue: string) => void;
  handleUpdateCompany: (
    id: number,
    newNameValue: string | undefined,
    newAddressValue: string | undefined,
  ) => void;
  companyId: number;
  field: 'name' | 'address';
  handleRemoveCompany?: (id: number) => void;
};

export const EditableCell: React.FC<EditableCellProps> = ({
  value,
  onChange,
  handleUpdateCompany,
  companyId,
  field,
  handleRemoveCompany,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState<string>('');

  const handleEditClick = () => {
    setIsEditing(true);
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSaveClick = () => {
    if (inputValue.trim() === '') {
      setError('Поле не должно быть пустым');
      return;
    }

    if (handleUpdateCompany) {
      if (field === 'name') {
        handleUpdateCompany(companyId, inputValue, undefined);
      } else if (field === 'address') {
        handleUpdateCompany(companyId, undefined, inputValue);
      }
    }
    setIsEditing(false);
    if (inputValue !== value) {
      onChange(inputValue);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSaveClick();
    }
  };

  return (
    <div className={style.editCell}>
      {isEditing ? (
        <div>
          <div className={style.textIcon}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              autoFocus
              onKeyPress={handleKeyPress}
            />
            <PlusCircle
              className={style.plusCircle}
              onClick={handleSaveClick}
            />
            {field == 'address' && handleRemoveCompany && (
              <Trash
                className={style.trash}
                onClick={() => handleRemoveCompany(companyId)}
              />
            )}
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      ) : (
        <>
          <div className={style.put_block}>
            <span className={style.value}>{value}</span>
          </div>
          <Pencil className={style.pencil} onClick={handleEditClick} />
          {field == 'address' && handleRemoveCompany && (
            <Trash
              className={style.trash}
              onClick={() => handleRemoveCompany(companyId)}
            />
          )}
        </>
      )}
    </div>
  );
};
