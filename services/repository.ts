import { localDB } from './db';
import { db as firestore, auth } from './firebaseConfig';
import { collection, doc, setDoc, getDocs, writeBatch } from 'firebase/firestore';
import { Transaction, Category, UserSettings } from '../types';

// Repositório Unificado
// Estratégia: "Local First". A UI interage com isso.
// 1. Lê/Escreve no Dexie (Rápido, Offline)
// 2. Se logado, empurra pro Firestore (Backup/Sync)

export const Repository = {
  // --- TRANSAÇÕES ---
  
  async addTransaction(transaction: Transaction) {
    // 1. Salva Local
    await localDB.transactions.put(transaction);
    
    // 2. Tenta salvar Nuvem (Fire-and-forget)
    if (auth.currentUser) {
      try {
        await setDoc(doc(firestore, `users/${auth.currentUser.uid}/transactions`, transaction.id), transaction);
      } catch (e) {
        console.warn("Offline: Transação salva apenas localmente por enquanto.");
      }
    }
  },

  async deleteTransaction(id: string) {
    await localDB.transactions.delete(id);
    // TODO: Implementar delete na nuvem se necessário
  },

  async getAllTransactions(): Promise<Transaction[]> {
    return await localDB.transactions.orderBy('date').reverse().toArray();
  },

  // --- SINCRONIZAÇÃO ---

  async syncFromCloud() {
    if (!auth.currentUser) return;

    try {
      // Baixar transações do Firebase
      const querySnapshot = await getDocs(collection(firestore, `users/${auth.currentUser.uid}/transactions`));
      const cloudTransactions: Transaction[] = [];
      querySnapshot.forEach((doc) => {
        cloudTransactions.push(doc.data() as Transaction);
      });

      if (cloudTransactions.length > 0) {
        // Merge com local (Sobrescreve local com dados da nuvem em caso de conflito de ID)
        await localDB.transactions.bulkPut(cloudTransactions);
        console.log(`Sincronizado: ${cloudTransactions.length} itens baixados.`);
      }
    } catch (e) {
      console.error("Erro no sync:", e);
    }
  },

  // --- SETTINGS & CATEGORIES (Simplificado para demo) ---
  
  async getSettings(): Promise<UserSettings> {
    const s = await localDB.settings.get('user_settings');
    return s ? (s as any) : { hasConsented: false, theme: 'light', currency: 'BRL' };
  },

  async saveSettings(settings: UserSettings) {
    await localDB.settings.put({ ...settings, id: 'user_settings' } as any);
  },

  async getCategories(): Promise<Category[]> {
    const cats = await localDB.categories.toArray();
    return cats.length > 0 ? cats : []; // Categories são populadas no init do DB
  },

  async clearLocalData() {
    await localDB.transactions.clear();
    await localDB.settings.clear();
    // Recriar settings default
    await localDB.settings.add({ 
        id: 'user_settings',
        hasConsented: false, 
        theme: 'light', 
        currency: 'BRL' 
      } as any);
  }
};