'use client';

import React, { useEffect, useRef } from 'react';
import { StatisticsResponse } from '../types/statictics';
import '../styles/ToolkitAdmin.css';

import BarChart from '../components/BarChart';
import HorizontalBarChart from '../components/HorizontalBarChart';
import PieChart from '../components/PieChart';
import DonutChart from '../components/DonutChart';

interface ToolKitAdminProps {
  data: StatisticsResponse;
}

const ToolkitAdmin: React.FC<ToolKitAdminProps> = ({ data }) => {
  const averagePricePerCategory = data.statistics.avgPricePerCategory;
  const adjustedAveragePricePerCategory = averagePricePerCategory.map((item) => ({
    ...item,
    _id: item._id || 'Unknown',
  }));
    
  const averageSalesPerSeller = data.statistics.avgSalesPerSeller;
  const topSellers = data.statistics.sellerRanking;
  const topCategories = data.statistics.top5Categories;

  return (
    <div className="container mt-5" dir="rtl">
      <h1 className="text-center mb-4">ארגז כלים</h1>

      <div className="row">
        <section className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h2 className="h5 mb-0">מחיר ממוצע לכל קטגוריה</h2>
            </div>
            <div className="card-body">
              <BarChart data={adjustedAveragePricePerCategory } />
            </div>
          </div>
        </section>

        <section className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h2 className="h5 mb-0">5 הקטגוריות הנמכרות ביותר</h2>
            </div>
            <div className="card-body">
              <DonutChart data={topCategories} />
            </div>
          </div>
        </section>
      </div>
      </div>


  
  );
};

export default ToolkitAdmin;