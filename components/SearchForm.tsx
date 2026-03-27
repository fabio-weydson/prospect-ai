"use client";

import { useState, useEffect } from "react";
import { BRAZILIAN_STATES } from "@/lib/constants";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { SearchParams } from "@/types";
import { Search, MapPin, Target, Briefcase } from "lucide-react";

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [icp, setIcp] = useState("");
  const [service, setService] = useState("");
  const [state, setState] = useState("SP");
  const [city, setCity] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("prospectai-last-search");
    if (saved) {
      try {
        const params: SearchParams = JSON.parse(saved);
        if (params.icp) setIcp(params.icp);
        if (params.service) setService(params.service);
        if (params.state) setState(params.state);
        if (params.city) setCity(params.city);
      } catch (err) {
        console.error("Failed to load saved search:", err);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = { icp, service, state, city };
    localStorage.setItem("prospectai-last-search", JSON.stringify(params));
    onSearch(params);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-500" />
              Perfil de Cliente Ideal (ICP)
            </label>
            <Input
              required
              value={icp}
              onChange={(e) => setIcp(e.target.value)}
              placeholder="Ex: Clínicas odontológicas com 3+ anos..."
            />
          </div>

          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                Estado
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <option value="Todo o Brasil">Todo o Brasil</option>
                {BRAZILIAN_STATES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label} ({s.value})
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Cidade (Opcional)
              </label>
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ex: São Paulo"
              />
            </div>
          </div>

          <div className="lg:col-span-3 lg:flex lg:flex-col lg:justify-end pb-0.5">
            <Button
              type="submit"
              className="w-full h-10 text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Buscando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Buscar Leads
                </span>
              )}
            </Button>
          </div>
        </div>
        <p className="text-center text-[10px] text-slate-400">
          Powered by Google Maps via Gemini AI
        </p>
      </form>
    </div>
  );
}
