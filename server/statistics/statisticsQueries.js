import { Product } from "../models/product.js";
import {Transaction} from "../models/transactions.js";

// Top 5 Best-Selling Categories
function getTop5Categories() {
    return Product.aggregate([
        { $match: { status: 'soldOut' } },
        { $group: { _id: '$category', totalSales: { $sum: '$quantity' } } },
        { $sort: { totalSales: -1 } },
        { $limit: 5 }
    ]).exec();
}

// Average Price Per Product
function getAveragePricePerProduct() {
    return Product.aggregate([
        { $group: { _id: null, avgPrice: { $avg: '$price' } } }
    ]).exec();
}

// Seller Ranking by Sales Quantity
function getSellerRankingBySales() {
    return Product.aggregate([
        { $match: { status: 'soldOut' } },
        { $group: { _id: '$product.username', totalSales: { $sum: '$quantity' } } },
        { $sort: { totalSales: -1 } }
    ]).exec();
}

// Average Price Per Category
function getAveragePricePerCategory() {
    return Product.aggregate([
        { $group: { _id: '$category', avgPrice: { $avg: '$price' } } }
    ]).exec();
}

const getSoldOutProductsCountPerSellerByUsername = async () => {
    try {
        const result = await Product.aggregate([
            { $match: { status: 'soldOut' } }, // Match documents with status 'soldOut'
            {
                $group: {
                    _id: "$username", // Group by username
                    soldOutProductsCount: { $sum: 1 } // Sum up the number of documents per group
                }
            },
            { $project: { _id: 0, username: "$_id", soldOutProductsCount: 1 } } // Project to format the output
        ]);

        console.log(result);
        return result;
    } catch (error) {
        console.error('Error getting sold out products count per seller by username:', error);
        throw error;
    }
};
// Average Sales Per Seller
function getAverageSalesPerSeller() {
    return Transaction.aggregate([
        { $group: { _id: '$username', avgSales: { $avg: '$quantity' } } }
    ]).exec();
}

// Recently Sold Products Per Seller
function getRecentlySoldProducts() {
    return Product.find({ status: 'soldOut' })
        .sort({ updatedAt: -1 }) // Assuming updatedAt encodes the order of creation
        .exec();
}

// Sales Quantity Per Seller - Today / This Week / This Month
function getSalesQuantityPerSeller(period) {
    let date;
    if (period === 'today') {
        date = new Date();
        date.setHours(0, 0, 0, 0);
    } else if (period === 'thisWeek') {
        date = new Date();
        date.setDate(date.getDate() - date.getDay());
        date.setHours(0, 0, 0, 0);
    } else if (period === 'thisMonth') {
        date = new Date();
        date.setDate(1);
        date.setHours(0, 0, 0, 0);
    }
    return Product.aggregate([
        { $match: { status: 'soldOut', updatedAt: { $gte: date } } },
        { $group: { _id: '$userId', totalSales: { $sum: '$quantity' } } }
    ]).exec();
}

// Income Per Seller - This Month/This Year
function getIncomePerSeller(period) {
    let date;
    if (period === 'thisMonth') {
        date = new Date();
        date.setDate(1);
        date.setHours(0, 0, 0, 0);
    } else if (period === 'thisYear') {
        date = new Date();
        date.setMonth(0, 1);
        date.setHours(0, 0, 0, 0);
    }
    return Product.aggregate([
        { $match: { status: 'soldOut', updatedAt: { $gte: date } } },
        { $group: { _id: '$userId', totalIncome: { $sum: { $multiply: ['$price', '$quantity'] } } } }
    ]).exec();
}


export async function getAllStatistics() {
    try {
        const top5Categories = await getTop5Categories();
        const avgPricePerProduct = await getAveragePricePerProduct();
        const sellerRanking = await getSellerRankingBySales();
        const avgPricePerCategory = await getAveragePricePerCategory();
        const avgSalesPerSeller = await getAverageSalesPerSeller();
        const soldOutProductsPerSeller = await getSoldOutProductsCountPerSellerByUsername();
        const recentSales = await getRecentlySoldProducts();
        const salesToday = await getSalesQuantityPerSeller('today');
        const salesThisWeek = await getSalesQuantityPerSeller('thisWeek');
        const salesThisMonth = await getSalesQuantityPerSeller('thisMonth');
        const incomeThisMonth = await getIncomePerSeller('thisMonth');
        const incomeThisYear = await getIncomePerSeller('thisYear');

        return {
            top5Categories,
            soldOutProductsPerSeller,
            avgPricePerProduct,
            sellerRanking,
            avgPricePerCategory,
            avgSalesPerSeller,
            recentSales,
            salesToday,
            salesThisWeek,
            salesThisMonth,
            incomeThisMonth,
            incomeThisYear
        }
    } catch (err) {
        console.error(err);
    }
};
