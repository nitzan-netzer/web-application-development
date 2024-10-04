'use server';

import { getSession } from '@/srcapp/lib/session';
import { Product } from '../types/products.type';
import { Session } from '../types/session.type';

const API_ORIGIN = 'http://localhost:3001';
const API_REQUEST_TO_SELL = '/api/auth/requestToSell'
const API_PRODUCT_CREATE = '/api/product/create';
const API_PRODUCT_UPDATE = '/api/product/update';
const API_PRODUCT_DELETE = '/api/product/product';
const API_GET_PRODUCT = '/api/product/product';
const API_ALL_PRODUCTS = '/api/product/allProducts';
const API_STATISTICS = '/api/product/getAllStatisticsOnProducts';
const API_MAKE_TRANS = '/api/purchase/makeTransaction';
const API_DELETE_USER = '/api/adminRoutes/deleteUser';
const API_BLOCK_USER = '/api/adminRoutes/blockeUser';


// Utility function to get headers with authentication
async function getAuthHeaders(): Promise<HeadersInit> {
  const session = await getSession() as Session | null;
  if (!session) {
    throw new Error('Session is missing.');
  }
  if (!session || !session.token) {
    throw new Error('Authentication token is missing.');
  }
  console.log(session.token);
  return {
    'Content-Type': 'application/json',
    'x-auth-token': session.token,
  };
}

// Generic function to handle API requests
async function callApi<T>(url: string, options: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);
    console.log(url);
    console.log(response);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API request failed');
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    // Handle or log the error as needed
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}

export async function PostRequestToSell(): Promise<any> {
    const url = `${API_ORIGIN}${API_REQUEST_TO_SELL}`;
    const headers = await getAuthHeaders();
    const session = await getSession() as Session | null;
    if (!session || !session.user.userId) {
        throw new Error('User ID is missing.');
    }
    const userId = session.user.userId;
    const body = JSON.stringify({ userId });
    return callApi<any>(url, {
        method: 'POST',
        headers,
        body
    });
}

// Create a new product
export async function createProduct(product: Product): Promise<any> {
    const url = `${API_ORIGIN}${API_PRODUCT_CREATE}`;
    const { name, image, category, description, price, quantity } = product;
    const session = await getSession() as Session | null;
  
    if (!session || !session.user.userId) {
      throw new Error('User ID is missing.');
    }
  
    const headers = await getAuthHeaders();
    const body = JSON.stringify({
      name,
      image,
      category,
      status: 'available',
      description,
      price,
      quantity,
      userId: session.user.userId,
    });
    
    return callApi<any>(url, {
      method: 'POST',
      headers,
      body,
    });
  }
// Update an existing product
export async function updateProduct(product: Product): Promise<any> {
  const url = `${API_ORIGIN}${API_PRODUCT_UPDATE}`;
  const headers = await getAuthHeaders();
  const body = JSON.stringify(product);

  return callApi<any>(url, {
    method: 'PUT',
    headers,
    body,
  });
}

// Delete a product by ID
export async function deleteProduct(productId: string): Promise<any> {
    if (!productId) {
      throw new Error('Product ID is required for deletion.');
    }
  
    const url = `${API_ORIGIN}${API_PRODUCT_DELETE}/${productId}`;
    const headers = await getAuthHeaders();
  
    return callApi<any>(url, {
      method: 'DELETE',
      headers,
    });
  }
// Fetch a product by ID
export async function getProductById(productId: string): Promise<any> {
  if (!productId) {
    throw new Error('Product ID is required.');
  }

  const url = `${API_ORIGIN}${API_GET_PRODUCT}/${productId}`;
  const headers = await getAuthHeaders();

  return callApi<any>(url, {
    method: 'GET',
    headers,
  });
}

// Fetch all products
export async function getAllProducts(): Promise<any> {
  try {
    const url = `${API_ORIGIN}${API_ALL_PRODUCTS}`;
    const headers = await getAuthHeaders();

    const data = await callApi<any>(url, {
      method: 'GET',
      headers,
    });

    // Extract the products array from the data
    const products = data.products;

    return products; // Return the array of products directly
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// Fetch all statistics
export async function getAllStatistics(): Promise<any> {
  const url = `${API_ORIGIN}${API_STATISTICS}`;
  const headers = await getAuthHeaders();

  return callApi<any>(url, {
    method: 'GET',
    headers,
  });
}

// Make a transaction
export async function makeTransaction(productId: string, quantity: number): Promise<any> {
    const url = `${API_ORIGIN}${API_MAKE_TRANS}`;
    const headers = await getAuthHeaders();
    const session = await getSession() as Session | null;
    if (!session || !session.user.userId) {
        throw new Error('User ID is missing.');
    }
    const userId = session.user.userId;
    const body = JSON.stringify({ userId, productId, quantity });
    return callApi<any>(url, {
        method: 'POST',
        headers,
        body
    });
}

// Delete a user by ID
export async function deleteUser(userId: string): Promise<any> {
    if (!userId) {
      throw new Error('User ID is required for deletion.');
    }
  
    const url = `${API_ORIGIN}${API_DELETE_USER}/${userId}`;
    const headers = await getAuthHeaders();
  
    return callApi<any>(url, {
      method: 'DELETE',
      headers,
    });
  }

// Block a user by ID
export async function blockUser(userId: string): Promise<any> {
    if (!userId) {
      throw new Error('User ID is required for blocking.');
    }
  
    const url = `${API_ORIGIN}${API_BLOCK_USER}/${userId}`;
    const headers = await getAuthHeaders();
  
    return callApi<any>(url, {
      method: 'POST',
      headers,
    });
  }