# 🚀 ProspectAI

**Prospecção B2B Inteligente impulsionada pela IA Google Gemini.**

O ProspectAI é uma aplicação web moderna projetada para otimizar o processo de geração de leads. Aproveitando o poder do **Gemini 2.5 Flash** e da **API do Google Maps**, ele identifica leads B2B de alta qualidade com base em Perfis de Cliente Ideal (ICP) específicos e localizações geográficas.

---

## 🌟 Sobre

O ProspectAI transforma a maneira como as empresas encontram novos clientes. Basta descrever seu público-alvo (ICP) e localização, e nosso motor impulsionado por IA irá:

- Escanear o Google Maps em busca de negócios relevantes.
- Extrair informações de contato essenciais (Telefone, Website, Redes Sociais).
- Fornecer um painel centralizado para gestão e qualificação de leads.

---

## ✨ Funcionalidades

- **Busca Impulsionada por IA**: Defina seu ICP em linguagem natural e deixe o Gemini 2.5 Flash fazer o trabalho pesado.
- **Integração com Google Maps**: Acesse dados de negócios em tempo real diretamente do banco de dados global do Google.
- **Pontuação Inteligente de Leads**: Classifique leads automaticamente com base na presença digital e potenciais "pontos de dor".
- **Painel Interativo**: Visualize, filtre e detalhe leads com uma interface premium e responsiva.
- **Abordagem em Um Clique**: Comunicação integrada via WhatsApp para engajamento imediato.
- **Estética Moderna**: Construído com um design sofisticado usando Tailwind CSS 4 e ícones Lucide.

---

## 🛠️ Tecnologias

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Motor de IA**: [Google Generative AI](https://ai.google.dev/) (Gemini 2.5 Flash)
- **Estilização**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Componentes**: [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/)
- **Gestão de Estado**: React Hooks (useState, useEffect)
- **Formulários**: [React Hook Form](https://react-hook-form.com/) com validação Zod
- **Animações**: [Motion](https://motion.dev/)

---

## ⚙️ Configuração

### Pré-requisitos

- Node.js 18+ instalado.
- Uma [Chave de API do Google AI Studio](https://aistudio.google.com/app/apikey).

### Instalação

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/jcarlosamorim/ProspectAI.git
   cd ProspectAI
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente**:
   Crie um arquivo `.env.local` na raiz do projeto e adicione sua chave de API do Gemini:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=sua_chave_api_aqui
   ```

---

## 🚀 Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

### Build para Produção

```bash
npm run build
npm start
```

---

## 🗺️ Roadmap: Próximas Funcionalidades

- [ ] **Integração com CRM**: Exportação de leads diretamente para HubSpot, Salesforce ou Pipedrive.
- [ ] **Automação de E-mails**: Envio de cold emails personalizados gerados por IA.
- [ ] **Enriquecimento Avançado de Dados**: Busca de perfis no LinkedIn e dados financeiros detalhados das empresas.
- [ ] **Ferramentas de Colaboração**: Compartilhamento de listas de leads e notas com sua equipe de vendas.
- [ ] **Agentes de IA Personalizados**: Treine agentes especializados para diferentes nichos de prospecção.
- [ ] **Integração com WhatsApp**: Envio de mensagens diretamente para leads via WhatsApp.

---

Desenvolvido com ❤️ para a próxima geração de profissionais de vendas.
