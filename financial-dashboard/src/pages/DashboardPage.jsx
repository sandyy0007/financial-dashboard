import React from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from "../components/UI/Layout";
import Overview from "../components/Dashboard/Overview";
import TransactionList from "../components/Transactions/TransactionList";
import TransactionsPage from "../components/Transactions/TransactionsPage";
import Insights from "../components/Insights/Insights";
import AddForm from "../components/Transactions/AddForm";
import useStore from "../store/useStore";

export default function DashboardPage() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Overview />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="insights" element={<Insights />} />
      </Route>
    </Routes>
  );
}
