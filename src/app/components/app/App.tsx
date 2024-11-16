import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './style/app.module.scss';
import { ListCompanies } from '../../pages/ListCompanies/ListCompanies';

const App: React.FC = () => {
  return (
    <div>
      <section>
        <Routes>
          <Route path="/ListCompanies" element={<ListCompanies />} />
        </Routes>
      </section>
    </div>
  );
};

export default App;
