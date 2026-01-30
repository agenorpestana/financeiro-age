import Dexie, { Table } from 'dexie';
import { Transaction, Category, UserSettings } from '../types';
import { DEFAULT_CATEGORIES } from '../constants';

export class FinanceDatabase extends Dexie {
  transactions!: Table<Transaction>;
  categories!: Table<Category>;
  settings!: Table<UserSettings>;

  constructor() {
    super('MeuFinanceiroDB');
    
    // Definição do Schema (apenas campos indexados precisam ser listados)
    // Usando cast para any para evitar erros de tipagem com métodos do Dexie
    (this as any).version(1).stores({
      transactions: 'id, categoryId, date, type', // id é primary key
      categories: 'id',
      settings: 'id' // Usaremos id='user_settings' para singleton
    });
  }
}

export const localDB = new FinanceDatabase();

// Inicialização de dados padrão
// Usando cast para any para evitar erros de tipagem com métodos do Dexie
(localDB as any).on('populate', () => {
  localDB.categories.bulkAdd(DEFAULT_CATEGORIES);
  localDB.settings.add({ 
    id: 'user_settings', // Hack para salvar settings como objeto único
    hasConsented: false, 
    theme: 'light', 
    currency: 'BRL' 
  } as any);
});