import { GoogleGenAI } from "@google/genai";
import { AppSettings } from "../types";

export const sendMessageToGemini = async (
  message: string,
  settings: AppSettings,
  userLocation?: GeolocationCoordinates
) => {
  // Inicialização obrigatória dentro da função para garantir o uso da chave mais atualizada
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // System instruction para dar a persona de Jangadeiro Virtual
  const systemInstruction = `
    Você é o "Jangadeiro Virtual", o assistente inteligente da 'Barraca do Jangadeiro' em Fortaleza.
    Sua tonalidade é acolhedora, praiana e prestativa.
    
    INFORMAÇÕES DA BARRACA:
    - Endereço: ${settings.address}
    - Localização Fixa: Latitude ${settings.locationLat}, Longitude ${settings.locationLng}
    - Instagram: @${settings.instagram}
    
    SEUS OBJETIVOS:
    1. Responder perguntas sobre o clima atual na praia de Fortaleza (use googleSearch).
    2. Ajudar a encontrar locais próximos (farmácias, hotéis, pontos turísticos) usando googleMaps.
    3. Falar sobre pratos típicos de praia se perguntado.
    
    REGRAS DE GROUNDING:
    - SEMPRE forneça os links/URLs encontrados nas fontes de busca ou mapas.
    - Se o usuário perguntar sobre fatos atuais, use a ferramenta de busca.
    - Se o usuário perguntar por locais ou distâncias, use a ferramenta de mapas.
    - Considere a localização da Barraca (${settings.locationLat}, ${settings.locationLng}) como ponto central se o usuário não fornecer a dele.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite-latest',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
        tools: [
          { googleSearch: {} },
          { googleMaps: {} }
        ],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: userLocation?.latitude || settings.locationLat,
              longitude: userLocation?.longitude || settings.locationLng
            }
          }
        }
      }
    });

    return response;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};