import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './style/app.module.scss';
import { CompaniesTab } from '../../pages/ListCompanies/CompaniesTab';

const App: React.FC = () => {
  return (
    <div>
      <section>
        <Routes>
          <Route path="/" element={<Navigate to="/testADEPT" />} />
          <Route path="/testADEPT" element={<CompaniesTab />} />
        </Routes>
      </section>
    </div>
  );
};

export default App;
