
import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

export const getFinancialInsights = async (transactions: Transaction[]): Promise<string> => {
  // Fix: Always use new GoogleGenAI({apiKey: process.env.API_KEY}) to initialize the client.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const summary = transactions.map(t => 
    `${t.date}: ${t.type === 'receita' ? '+' : '-'}${t.amount} (${t.category} - ${t.description})`
  ).join('\n');

  const prompt = `
    Como um consultor financeiro especializado em casais, analise o seguinte histórico de transações do mês:
    
    ${summary}
    
    Por favor, forneça:
    1. Uma breve análise dos maiores gastos.
    2. Dicas práticas para economizar baseado nas categorias.
    3. Uma mensagem motivadora para o casal.
    
    Mantenha o tom amigável, acolhedor e em Português do Brasil.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    // Fix: Access generated text output via the .text property (not a method).
    return response.text || "Não foi possível gerar insights no momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao conectar com a IA para obter conselhos financeiros.";
  }
};
