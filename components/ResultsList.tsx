"use client";

import { useState, useEffect } from "react";
import { Lead } from "@/types";
import { Button } from "./ui/button";
import {
  LayoutGrid,
  List,
  Star,
  MapPin,
  Building2,
  ExternalLink,
  Phone,
  MessageSquare,
  Instagram,
  Facebook,
} from "lucide-react";
import {
  isMobileNumber,
  formatWhatsAppLink,
  formatPhoneNumber,
} from "@/lib/phone";
import { cn } from "@/lib/utils";

interface ResultsListProps {
  results: Lead[];
  onSelectLead: (lead: Lead) => void;
}

export function ResultsList({ results, onSelectLead }: ResultsListProps) {
  const [viewMode, setViewMode] = useState<"card" | "table">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("prospectai-view-mode");
      if (saved === "card" || saved === "table") {
        return saved;
      }
    }
    return "card";
  });

  const toggleViewMode = (mode: "card" | "table") => {
    setViewMode(mode);
    localStorage.setItem("prospectai-view-mode", mode);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {results.length} Resultados{" "}
            <span className="text-slate-500">
              ({results.filter((r) => r.selected).length} selecionados)
            </span>
          </h2>
        </div>

        <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1">
          <button
            onClick={() => toggleViewMode("card")}
            className={cn(
              "p-2 rounded-md transition-colors",
              viewMode === "card"
                ? "bg-slate-100 text-slate-900"
                : "text-slate-500 hover:text-slate-900",
            )}
            title="Visualização em Cards"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleViewMode("table")}
            className={cn(
              "p-2 rounded-md transition-colors",
              viewMode === "table"
                ? "bg-slate-100 text-slate-900"
                : "text-slate-500 hover:text-slate-900",
            )}
            title="Visualização em Tabela"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {viewMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-slate-900 line-clamp-2">
                    {lead.name}
                  </h3>
                </div>

                <div className="space-y-2 mb-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">
                      {lead.primaryType?.replace(/_/g, " ") || "Negócio Local"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">
                      {lead.city}, {lead.state}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-400 shrink-0 fill-amber-400" />
                    <span>
                      {lead.rating || "N/A"} ({lead.userRatingCount || 0}{" "}
                      avaliações)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 min-h-[32px] pt-1">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    {lead.phoneNumbers && lead.phoneNumbers.length > 0 ? (
                      lead.phoneNumbers.map((phone, index) => (
                        <div
                          className="flex items-center gap-2 flex-1 min-w-0"
                          key={index}
                        >
                          <span className="truncate">
                            {formatPhoneNumber(phone)}
                          </span>
                          {isMobileNumber(phone) && (
                            <a
                              href={formatWhatsAppLink(phone)}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-100 hover:bg-emerald-100 transition-colors shrink-0"
                            >
                              <MessageSquare className="w-3 h-3 fill-emerald-700" />
                              WHATSAPP
                            </a>
                          )}
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-400 italic">
                        Não disponível
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Nome</th>
                <th className="px-6 py-4 font-medium">Local</th>
                <th className="px-6 py-4 font-medium">Avaliação</th>
                <th className="px-6 py-4 font-medium">Contato</th>
                {/* <th className="px-6 py-4 font-medium text-right">Ação</th> */}
              </tr>
            </thead>
            <tbody>
              {results.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => onSelectLead(lead)}
                  className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${lead.selected ? "bg-slate-100" : ""}`}
                >
                  <td
                    className="px-6 py-4 font-medium text-slate-900 max-w-[200px] truncate"
                    title={lead.name}
                  >
                    {lead.name}
                    <div className="text-xs text-slate-500 font-normal mt-1">
                      {lead.primaryType?.replace(/_/g, " ")}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                    {lead.city}, {lead.state}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-medium">{lead.rating || "-"}</span>
                      <span className="text-slate-400 text-xs">
                        ({lead.userRatingCount || 0})
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      {lead.googleMapsUri ? (
                        <a
                          href={lead.googleMapsUri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-blue-600 transition-colors"
                          title="Google Maps"
                        >
                          <MapPin className="w-4 h-4" />
                        </a>
                      ) : (
                        <MapPin className="w-4 h-4 text-slate-300" />
                      )}
                      {lead.phoneNumbers && lead.phoneNumbers.length > 0 ? (
                        lead.phoneNumbers.map((phone, index) => (
                          <div key={index} className="flex gap-2">
                            <a
                              href={`tel:${phone}`}
                              className="text-slate-400 hover:text-blue-600 transition-colors"
                              title={phone}
                            >
                              <Phone className="w-4 h-4" />
                            </a>
                            {isMobileNumber(phone) && (
                              <a
                                href={formatWhatsAppLink(phone)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-500 hover:text-emerald-700 transition-colors"
                                title="WhatsApp"
                              >
                                <MessageSquare className="w-4 h-4 fill-emerald-500 hover:fill-emerald-700 transition-colors" />
                              </a>
                            )}
                          </div>
                        ))
                      ) : (
                        <Phone className="w-4 h-4 text-slate-300" />
                      )}
                      {lead.websiteUri ? (
                        <a
                          href={lead.websiteUri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-blue-600 transition-colors"
                          title="Website"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <ExternalLink className="w-4 h-4 text-slate-300" />
                      )}
                      {lead.instagramUri ? (
                        <a
                          href={lead.instagramUri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-blue-600 transition-colors"
                          title="Instagram"
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      ) : (
                        <Instagram className="w-4 h-4 text-slate-300" />
                      )}
                      {lead.facebookUri ? (
                        <a
                          href={lead.facebookUri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-blue-600 transition-colors"
                          title="Facebook"
                        >
                          <Facebook className="w-4 h-4" />
                        </a>
                      ) : (
                        <Facebook className="w-4 h-4 text-slate-300" />
                      )}
                    </div>
                  </td>
                  {/* <td className="px-6 py-4 text-right">
                    <Button variant="outline" size="sm">
                      Mensagem
                    </Button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
