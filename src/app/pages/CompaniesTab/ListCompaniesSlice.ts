import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Company {
  id: number;
  name: string;
  address: string;
}

interface CompaniesState {
  companies: Company[];
  checkedState: { [key: number]: boolean };
  currentPage: number;
  pageSize: number;
  hasMore: boolean;
}

const loadState = (): CompaniesState | undefined => {
  try {
    const serializedState = localStorage.getItem('companiesState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state', err);
    return undefined;
  }
};

const initialState: CompaniesState = loadState() || {
  companies: [
    { id: 1, name: 'Company A', address: 'Address A' },
    { id: 2, name: 'Company B', address: 'Address B' },
    { id: 3, name: 'Company C', address: 'Address C' },
    { id: 4, name: 'Company D', address: 'Address D' },
    { id: 5, name: 'Company E', address: 'Address E' },
  ],
  checkedState: {},
  currentPage: 0,
  pageSize: 100,
  hasMore: true,
};

initialState.checkedState = initialState.companies.reduce((acc, company) => {
  acc[company.id] = false;
  return acc;
}, {} as { [key: number]: boolean });

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    toggleCompanyChecked(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.companies.findIndex((company) => company.id === id);
      state.checkedState[id] = !state.checkedState[id];
    },
    addCompany(state, action: PayloadAction<Company>) {
      const newCompany = action.payload;
      state.companies.push(newCompany);
      state.checkedState[newCompany.id] = false;
      console.log(state.checkedState[newCompany.id]);
    },
    removeCompany(state, action: PayloadAction<number>) {
      const id = action.payload;
      const index = state.companies.findIndex((company) => company.id === id);
      state.companies.splice(index, 1);
      delete state.checkedState[id];
    },
    toggleAllCompaniesChecked(state) {
      const allChecked = Object.values(state.checkedState).every(
        (checked) => checked,
      );
      const newCheckedState: boolean[] = new Array(state.companies.length);
      state.companies.forEach((company) => {
        newCheckedState[company.id] = !allChecked;
      });
      state.checkedState = newCheckedState;
    },
    removeAllCompanies(state) {
      state.companies = state.companies.filter(
        (company) => !state.checkedState[company.id],
      );
    },
    updateCompany(state, action: PayloadAction<Company>) {
      const { id, name, address } = action.payload;
      const company = state.companies.find((company) => company.id === id);
      console.log(name, address);

      if (company) {
        company.name = name;
        company.address = address;
      }
    },
    setCompanies(state, action: PayloadAction<Company[]>) {
      state.companies = [...state.companies, ...action.payload];
      action.payload.forEach((company) => {
        state.checkedState[company.id] = false;
      });
      state.hasMore = action.payload.length === state.pageSize;
    },
    loadMoreCompanies(state) {
      state.currentPage += 1;
    },
  },
});

export const {
  setCompanies,
  loadMoreCompanies,
  addCompany,
  toggleCompanyChecked,
  removeCompany,
  removeAllCompanies,
  toggleAllCompaniesChecked,
  updateCompany,
} = companiesSlice.actions;
export default companiesSlice.reducer;
