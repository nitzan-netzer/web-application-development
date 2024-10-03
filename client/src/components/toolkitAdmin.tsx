'use client';

import { _FilterCoreModule } from 'ag-grid-community';
import {StatisticsResponse} from '../types/statictics'

import '../styles/ToolkitAdmin.css'; 

interface ToolKitAdminProps {
    data: StatisticsResponse;
  }
const toolkitAdmin: React.FC<ToolKitAdminProps> = ({ data }) => {
    const averagePricePerCategory = data.statistics.avgPricePerCategory

    const averageSalesPerSeller = data.statistics.avgSalesPerSeller

    const topSellers = data.statistics.sellerRanking

    const topCategories = data.statistics.top5Categories

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">ארגז כלים</h1>

            <div className="row">
                <section className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h2 className="h5 mb-0">מחיר ממוצע לכל קטגוריה</h2>
                        </div>
                        <ul className="list-group list-group-flush">
                            {averagePricePerCategory.map(({_id, avgPrice}) => (
                                <li className="list-group-item" key={_id}>
                                    {_id}: ₪{avgPrice}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-header bg-success text-white">
                            <h2 className="h5 mb-0">ממוצע מכירות לכל מוכר</h2>
                        </div>
                        <ul className="list-group list-group-flush">
                            {averageSalesPerSeller.map(({_id,avgSales}) => (
                                <li className="list-group-item" key={_id}>
                                    {_id}: {avgSales} יחידות
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>

            <div className="row">
                {<section className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-header bg-info text-white">
                            <h2 className="h5 mb-0">5 המוכרים הכי בולטים</h2>
                        </div>
                        <ol className="list-group list-group-numbered">
                            {topSellers.map(({ _id, totalSales }) => (
                                <li className="list-group-item" key={_id}>
                                    {_id}: {totalSales} יחידות שנמכרו
                                </li>
                            ))}
                        </ol>
                    </div>
                </section> }

                <section className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-header bg-warning text-white">
                            <h2 className="h5 mb-0">5 הקטגוריות הנמכרות ביותר</h2>
                        </div>
                        <ol className="list-group list-group-numbered">
                            {topCategories.map(({ _id, totalSales }) => (
                                <li className="list-group-item" key={_id}>
                                    {_id}: {totalSales} יחידות שנמכרו
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default toolkitAdmin;
