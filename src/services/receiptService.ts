import { http, endpoints } from './api';
import { Receipt } from '../store/receiptStore';

export interface CreateReceiptData {
  imageUrl: string;
  merchantName?: string;
  totalAmount?: number;
  currency?: string;
  date?: string;
  category?: string;
}

export interface UpdateReceiptData {
  merchantName?: string;
  totalAmount?: number;
  currency?: string;
  date?: string;
  category?: string;
}

export interface ReceiptListResponse {
  receipts: Receipt[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ReceiptProcessingResponse {
  receiptId: string;
  status: 'processing' | 'completed' | 'failed';
  extractedData?: Receipt['extractedData'];
  error?: string;
}

export class ReceiptService {
  // Get all receipts with pagination
  static async getReceipts(
    page: number = 1,
    limit: number = 20,
    status?: Receipt['status'],
    category?: string
  ): Promise<ReceiptListResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (status) params.append('status', status);
    if (category) params.append('category', category);
    
    return http.get<ReceiptListResponse>(`${endpoints.receipts.list}?${params}`);
  }

  // Get a single receipt by ID
  static async getReceipt(id: string): Promise<Receipt> {
    return http.get<Receipt>(endpoints.receipts.get(id));
  }

  // Create a new receipt
  static async createReceipt(data: CreateReceiptData): Promise<Receipt> {
    return http.post<Receipt>(endpoints.receipts.create, data);
  }

  // Update an existing receipt
  static async updateReceipt(id: string, data: UpdateReceiptData): Promise<Receipt> {
    return http.put<Receipt>(endpoints.receipts.update(id), data);
  }

  // Delete a receipt
  static async deleteReceipt(id: string): Promise<void> {
    return http.delete(endpoints.receipts.delete(id));
  }

  // Process a receipt image for data extraction
  static async processReceipt(id: string): Promise<ReceiptProcessingResponse> {
    return http.post<ReceiptProcessingResponse>(endpoints.receipts.process(id));
  }

  // Upload receipt image
  static async uploadReceiptImage(imageUri: string): Promise<{ imageUrl: string }> {
    // In a real app, you'd use FormData to upload the image
    // For now, we'll simulate the upload
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'receipt.jpg',
    } as any);
    
    return http.post<{ imageUrl: string }>('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // Get receipt statistics
  static async getReceiptStats(): Promise<{
    totalReceipts: number;
    totalSpent: number;
    averageAmount: number;
    receiptsThisMonth: number;
    spendingThisMonth: number;
    topCategories: Array<{ category: string; count: number; total: number }>;
  }> {
    return http.get('/receipts/stats');
  }

  // Search receipts
  static async searchReceipts(
    query: string,
    page: number = 1,
    limit: number = 20
  ): Promise<ReceiptListResponse> {
    const params = new URLSearchParams({
      q: query,
      page: page.toString(),
      limit: limit.toString(),
    });
    
    return http.get<ReceiptListResponse>(`${endpoints.receipts.list}/search?${params}`);
  }
}

export default ReceiptService; 