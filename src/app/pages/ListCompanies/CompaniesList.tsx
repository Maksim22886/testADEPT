import React, { useEffect } from 'react';
import classNames from 'classnames';
import style from './style/companiesList.module.scss';
import type { Company } from './ListCompaniesSlice';
import { EditableCell } from './EditableCell';

type CompaniesList = {
  companies: Company[];
  checkedState: Record<number, boolean>;
  inputs: Record<number, { name: string; address: string }>;
  handleCheckboxChange: (id: number) => void;
  handleInputChange: (
    id: number,
    field: 'name' | 'address',
    value: string,
  ) => void;
  handleRemoveCompany: (id: number) => void;
  handleUpdateCompany: (id: number) => void;
  handleScroll: React.UIEventHandler<HTMLDivElement>;
};

export const CompaniesList: React.FC<CompaniesList> = ({
  companies,
  checkedState,
  inputs,
  handleCheckboxChange,
  handleInputChange,
  handleRemoveCompany,
  handleUpdateCompany,
  handleScroll,
}) => {
  return (
    <tbody onScroll={handleScroll}>
      {companies.map((company) => (
        <tr
          className={classNames({
            [style.checked]: checkedState[company.id],
          })}
          key={company.id}
        >
          <td>
            <input
              type="checkbox"
              checked={!!checkedState[company.id]}
              onChange={() => handleCheckboxChange(company.id)}
            />
          </td>
          <td>
            <EditableCell
              value={inputs[company.id]?.name ?? company.name}
              handleUpdateCompany={handleUpdateCompany}
              onChange={(newName) =>
                handleInputChange(company.id, 'name', newName)
              }
              companyId={company.id}
              field={'name'}
            />
          </td>
          <td>
            <EditableCell
              value={inputs[company.id]?.address ?? company.address}
              onChange={(newAddress) =>
                handleInputChange(company.id, 'address', newAddress)
              }
              companyId={company.id}
              handleUpdateCompany={handleUpdateCompany}
              field={'address'}
              handleRemoveCompany={handleRemoveCompany}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
};
