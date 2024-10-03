type CategorySales = {
    _id: string;
    totalSales: number;
  };
  
  type AvgPrice = {
    _id: string | null;
    avgPrice: number;
  };
  
  type SellerRanking = {
    _id: string;
    totalSales: number;
  };
  
  type AvgSales = {
    _id: string;
    avgSales: number;
  };
  
  type RecentSale = {
    _id: string;
    name: string;
    image: string;
    category: string;
    status: string;
    description: string;
    price: number;
    userId: string;
    productId: string;
    quantity: number;
    __v: number;
  };

  // Define the main type for statistics
  type Statistics = {
    top5Categories: CategorySales[];
    avgPricePerProduct: AvgPrice[];
    sellerRanking: SellerRanking[];
    avgPricePerCategory: AvgPrice[];
    avgSalesPerSeller: AvgSales[];
    recentSales: RecentSale[];
    salesToday: RecentSale[];
    salesThisWeek: RecentSale[];
    salesThisMonth: RecentSale[];
    incomeThisMonth: string[]; // Assuming the structure of the income array isn't provided, using `any[]` here
    incomeThisYear: string[]; // Same as above
  };
  
  // Define the root object type
  export type StatisticsResponse = {
    statistics: Statistics;
  };