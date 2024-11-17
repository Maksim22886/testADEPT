import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import {
  toggleCompanyChecked,
  removeCompany,
  removeAllCompanies,
  toggleAllCompaniesChecked,
  updateCompany,
  setCompanies,
  loadMoreCompanies,
} from './ListCompaniesSlice';
import AddCompanyForm from './AddCompanyForm';
import { CompaniesList } from './CompaniesList';
import { Trash, PlusCircle } from '../../assets/images';
import style from './style/companiesTab.module.scss';
import { Modal } from '../../shared-components/modal/Modal';

export const CompaniesTab: React.FC = () => {
  const dispatch = useDispatch();

  const checkedState = useSelector(
    (state: RootState) => state.companies.checkedState,
  );

  const { currentPage, pageSize, hasMore, companies } = useSelector(
    (state: RootState) => state.companies,
  );

  const [inputs, setInputs] = useState<{
    [key: number]: { name: string; address: string };
  }>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCheckboxChange = (id: number) => {
    dispatch(toggleCompanyChecked(id));
  };

  const handleRemoveCompany = (id: number) => {
    dispatch(removeCompany(id));
  };

  const handleToggleAllCompaniesChecked = () => {
    dispatch(toggleAllCompaniesChecked());
  };

  const handleRemoveCompanyAll = () => {
    dispatch(removeAllCompanies());
  };

  const handleInputChange = (
    id: number,
    field: 'name' | 'address',
    value: string,
  ) => {
    console.log(value, 'value');

    setInputs((prev) => ({
      ...prev,

      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleUpdateCompany = (
    id: number,
    newName?: string,
    newAddress?: string,
  ) => {
    const company = companies.find((c) => c.id === id);
    dispatch(
      updateCompany({
        id,
        name: newName ?? company?.name ?? '',
        address: newAddress ?? company?.address ?? '',
      }),
    );
  };

  useEffect(() => {
    if (hasMore) {
      fetch(`/api/companies?page=${currentPage}&size=${pageSize}`)
        .then((response) => response.json())
        .then((data) => {
          dispatch(setCompanies(data));
        });
    }
  }, [currentPage, dispatch, hasMore, pageSize]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight && hasMore) {
      dispatch(loadMoreCompanies());
    }
  };

  return (
    <>
      <div className={style.option_block}>
        <div className={style.addCompany} onClick={openModal}>
          <p>Добавить компанию</p>
          <PlusCircle />
        </div>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <AddCompanyForm />
          </Modal>
        )}
        <div className={style.deleteAll} onClick={handleRemoveCompanyAll}>
          <p>Удалить все выбранные</p>
          <Trash className={style.trash} />
        </div>
      </div>
      <table className={style.company_table}>
        <thead>
          <tr>
            <th>
              <div className={style.checkedAll}>
                <input
                  type="checkbox"
                  onChange={handleToggleAllCompaniesChecked}
                  checked={Object.values(checkedState).every(Boolean)}
                />
                Выделить всё
              </div>
            </th>
            <th>Название компании</th>
            <th>Адрес</th>
          </tr>
        </thead>
        <CompaniesList
          companies={companies}
          checkedState={checkedState}
          inputs={inputs}
          handleCheckboxChange={handleCheckboxChange}
          handleInputChange={handleInputChange}
          handleRemoveCompany={handleRemoveCompany}
          handleUpdateCompany={handleUpdateCompany}
          handleScroll={handleScroll}
        />
      </table>
    </>
  );
};
