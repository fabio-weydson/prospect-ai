"use client";

import { useState } from "react";
import { SearchForm } from "@/components/SearchForm";
import { ResultsList } from "@/components/ResultsList";
import { Lead, SearchParams } from "@/types";
import { Sparkles } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

export default function Home() {
  const [step, setStep] = useState<"main" | "detail">("main");
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [results, setResults] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (params: SearchParams) => {
    setIsLoading(true);
    setError(null);
    setSearchParams(params);

    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
      });
      const { icp, service, state, city } = params;
      const locationStr = city
        ? `${city}, ${state}, Brasil`
        : `${state}, Brasil`;

      const prompt = `
        Você é um especialista em prospecção B2B.
        O usuário está procurando por leads com o seguinte Perfil de Cliente Ideal (ICP): "${icp}".
        A localização alvo é: "${locationStr}".
        
        Use o Google Maps para encontrar cerca de 50 negócios reais que correspondam a este ICP nesta localização.
        
        Para cada negócio encontrado, forneça os seguintes dados em formato JSON estrito (uma array de objetos):
        [
          {
            "id": "um identificador único gerado por você",
            "name": "Nome do negócio",
            "address": "Endereço completo",
            "city": "Cidade",
            "state": "Estado",
            "rating": 4.5,
            "userRatingCount": 120,
            "primaryType": "Categoria principal",
            "phoneNumbers": "Array de Telefones se disponível, ou []",
            "websiteUri": "Website se disponível, ou null",
            "googleMapsUri": "Link do Google Maps se disponível, ou null",
            "instagramUri": "Link do Instagram se disponível, ou null",
            "facebookUri": "Link do Facebook se disponível, ou null"
          }
        ]
        
        Retorne APENAS o JSON válido, sem blocos de código markdown (\`\`\`json) e sem texto adicional.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          tools: [{ googleMaps: {} }],
          temperature: 0.2,
        },
      });

      let text = response.text || "[]";
      text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      let searchResults = [];
      try {
        searchResults = JSON.parse(text);
      } catch (e) {
        const match = text.match(/\[[\s\S]*\]/);
        if (match) {
          searchResults = JSON.parse(match[0]);
        } else {
          throw new Error("Invalid JSON response from Gemini");
        }
      }

      const chunks =
        response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        chunks.forEach((chunk: any) => {
          if (chunk.maps?.uri && chunk.maps?.title) {
            const matchedResult = searchResults.find(
              (r: any) =>
                r.name.toLowerCase().includes(chunk.maps.title.toLowerCase()) ||
                chunk.maps.title.toLowerCase().includes(r.name.toLowerCase()),
            );
            if (matchedResult && !matchedResult.googleMapsUri) {
              matchedResult.googleMapsUri = chunk.maps.uri;
            }
          }
        });
      }

      searchResults.sort(
        (a: any, b: any) =>
          (b.digitalPainScore || 0) - (a.digitalPainScore || 0),
      );

      setResults(searchResults || []);
      // No longer changing step to "results", staying in "main"
    } catch (err: any) {
      console.error("Search error:", err);
      setError(err.message || "Ocorreu um erro inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead);
    results.map((r) => {
      if (r.id === lead.id) {
        r.selected = !r.selected;
      }
    });
    setResults([...results]);
  };

  const handleBackToSearch = () => {
    setResults([]);
    setSelectedLead(null);
    setStep("main");
  };

  const handleBackToResults = () => {
    setStep("main");
    setSelectedLead(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleBackToSearch}
          >
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">ProspectAI</span>
          </div>
          <div className="text-sm text-slate-400 hidden sm:block">
            Prospecção Inteligente B2B
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-rose-500 hover:text-rose-700 font-bold"
            >
              &times;
            </button>
          </div>
        )}

        {step === "main" && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />

            {results.length > 0 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ResultsList
                  results={results}
                  onSelectLead={handleSelectLead}
                />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
