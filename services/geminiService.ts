import { GoogleGenAI } from "@google/genai";
import { Transaction, Category } from "../types";

// Note: In a real production app, this key should be proxied through a backend.
// For this demo, we assume process.env.API_KEY is available.
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const getFinancialAdvice = async (
  transactions: Transaction[],
  categories: Category[]
): Promise<string> => {
  if (!apiKey) {
    return "Chave de API não configurada. Por favor, verifique suas configurações.";
  }

  // Summarize data for the prompt to save tokens
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
  
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const breakdown = categories.map(cat => {
    const sum = transactions
      .filter(t => t.categoryId === cat.id && t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
    return sum > 0 ? `${cat.name}: R$ ${sum.toFixed(2)}` : null;
  }).filter(Boolean).join(', ');

  const prompt = `
    Atue como um consultor financeiro pessoal experiente.
    Analise os seguintes dados financeiros mensais de um usuário brasileiro:
    
    Total Receitas: R$ ${totalIncome.toFixed(2)}
    Total Despesas: R$ ${totalExpense.toFixed(2)}
    Saldo: R$ ${(totalIncome - totalExpense).toFixed(2)}
    
    Gastos por Categoria:
    ${breakdown}
    
    Forneça 3 conselhos curtos, diretos e acionáveis em formato de lista (Markdown) para melhorar a saúde financeira.
    Seja amigável e motivador. Use emojis.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Não foi possível gerar uma análise no momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao conectar com a IA. Tente novamente mais tarde.";
  }
};
