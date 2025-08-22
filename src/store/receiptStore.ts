import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Receipt {
  id: string;
  userId: string;
  imageUrl: string;
  merchantName: string;
  totalAmount: number;
  currency: string;
  date: string;
  category: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  extractedData?: {
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    subtotal: number;
    tax: number;
    total: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface ReceiptState {
  receipts: Receipt[];
  currentReceipt: Receipt | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setReceipts: (receipts: Receipt[]) => void;
  addReceipt: (receipt: Receipt) => void;
  updateReceipt: (id: string, updates: Partial<Receipt>) => void;
  deleteReceipt: (id: string) => void;
  setCurrentReceipt: (receipt: Receipt | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  
  // Computed
  getReceiptById: (id: string) => Receipt | undefined;
  getReceiptsByStatus: (status: Receipt['status']) => Receipt[];
  getTotalSpent: () => number;
}

export const useReceiptStore = create<ReceiptState>()(
  persist(
    (set, get) => ({
      receipts: [],
      currentReceipt: null,
      isLoading: false,
      error: null,
      
      setReceipts: (receipts) => set({ receipts, error: null }),
      
      addReceipt: (receipt) => set((state) => ({ 
        receipts: [receipt, ...state.receipts],
        error: null 
      })),
      
      updateReceipt: (id, updates) => set((state) => ({
        receipts: state.receipts.map((receipt) =>
          receipt.id === id
            ? { ...receipt, ...updates, updatedAt: new Date().toISOString() }
            : receipt
        ),
        currentReceipt: state.currentReceipt?.id === id
          ? { ...state.currentReceipt, ...updates, updatedAt: new Date().toISOString() }
          : state.currentReceipt,
        error: null
      })),
      
      deleteReceipt: (id) => set((state) => ({
        receipts: state.receipts.filter((receipt) => receipt.id !== id),
        currentReceipt: state.currentReceipt?.id === id ? null : state.currentReceipt,
        error: null
      })),
      
      setCurrentReceipt: (receipt) => set({ currentReceipt: receipt }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error }),
      
      clearError: () => set({ error: null }),
      
      // Computed methods
      getReceiptById: (id) => get().receipts.find((receipt) => receipt.id === id),
      
      getReceiptsByStatus: (status) => get().receipts.filter((receipt) => receipt.status === status),
      
      getTotalSpent: () => {
        const completedReceipts = get().receipts.filter((receipt) => receipt.status === 'completed');
        return completedReceipts.reduce((total, receipt) => total + receipt.totalAmount, 0);
      },
    }),
    {
      name: 'receipt-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        receipts: state.receipts,
        currentReceipt: state.currentReceipt 
      }),
    }
  )
); 