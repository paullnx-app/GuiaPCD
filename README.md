# Guia PCD - Clone Website

Este é um clone do site [guiapcd.com.br](https://www.guiapcd.com.br/) desenvolvido com Next.js 15 e Tailwind CSS.

## Tecnologias

- **Next.js 15** - Framework React para produção
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **React 19** - Biblioteca JavaScript para interfaces

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Build para Produção

```bash
npm run build
npm start
```

## Estrutura do Projeto

- `/app` - Páginas e layouts do Next.js
- `/components` - Componentes React reutilizáveis
- `/public` - Arquivos estáticos

## Componentes Principais

- **Header** - Navegação principal
- **Hero** - Seção hero com call-to-action
- **Services** - Serviços oferecidos (ICMS, IPVA, IPI)
- **Timeline** - Linha do tempo da empresa
- **WhyChooseUs** - Motivos para escolher o serviço
- **ProcessSteps** - Passos do processo
- **Testimonials** - Depoimentos
- **Countdown** - Contador regressivo
- **Benefits** - Benefícios exclusivos
- **Contact** - Formulário de contato
- **Blog** - Artigos do blog
- **Footer** - Rodapé com links e informações

## Recursos

- Design responsivo
- Navegação suave (smooth scroll)
- Links para WhatsApp
- Formulário de contato funcional
- Contador regressivo em tempo real

## Recebimento de leads (Resend)

Formulários e resumo do chat enviam via **`POST /api/lead`** usando [Resend](https://resend.com).

### Variáveis (`.env.local` e Vercel)

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_LEAD_EMAIL` | Quem recebe os leads (ex.: `contato@guiapcd.com.br`) |
| `RESEND_API_KEY` | API Key em Resend → API Keys |
| `RESEND_FROM` | Remetente após verificar domínio: `Site Guia PcD <contato@guiapcd.com.br>` |

### Configurar domínio no Resend

1. Resend → **Domains** → Add `guiapcd.com.br`
2. No **Cloudflare** (DNS only / proxy desligado nos registros que o Resend pedir), adicione os registros SPF/DKIM/MX que o Resend mostrar
3. Aguarde status **Verified**
4. Coloque `RESEND_FROM=Site Guia PcD <contato@guiapcd.com.br>` na Vercel e faça redeploy

**Teste sem domínio:** com só `RESEND_API_KEY`, o remetente padrão é `onboarding@resend.dev` (só para testes; em produção use o domínio verificado).

## SEO e crawlers

- **`/sitemap.xml`**: gerado por `app/sitemap.ts` (home, sobre, blog e todos os artigos).
- **`/robots.txt`**: gerado por `app/robots.ts` (permite Google, Bing e principais bots de IA; bloqueia `/api/`).
- **`/llms.txt`**: gerado por `app/llms.txt/route.ts` (resumo do site para assistentes de IA).

Configure `NEXT_PUBLIC_SITE_URL=https://www.guiapcd.com.br` na Vercel. No Google Search Console e no Bing Webmaster Tools, envie o sitemap: `https://www.guiapcd.com.br/sitemap.xml`.

## Chat (Lia)

- Antes de conversar, o visitante informa **nome e e-mail** (guardados na sessão do navegador).
- O botão **WhatsApp** aparece **só nas respostas da Lia**, quando ela incluir `[CTA_WHATSAPP]` (incluindo pedidos de agendar) — não há botão fixo no cabeçalho do chat.
- Ao fechar o chat ou sair da página, um **resumo por e-mail** é enviado para `NEXT_PUBLIC_LEAD_EMAIL` sempre que o visitante tiver informado **nome e e-mail** e enviado **pelo menos uma mensagem** (transcrição + ID da sessão).

## Calendly (standby)

Agendamento online via Calendly está **em standby**: o chat e a Lia usam apenas **WhatsApp** (`[CTA_WHATSAPP]`). O código antigo foi mantido para reativar depois, sem apagar.

| Arquivo | Função |
|--------|--------|
| `src/lib/calendly.ts` | Lê `NEXT_PUBLIC_CALENDLY_URL` / `CALENDLY_URL` |
| `app/api/calendly-url/route.ts` | Expõe a URL (não é chamada pelo chat hoje) |
| `chat-rules.md` | Regras atuais: sem `[CTA_CALENDLY]`, agendar → WhatsApp |

**Para reativar no futuro:** restaurar regras com `[CTA_CALENDLY]` em `chat-rules.md` e `chatRulesBundled.ts`, botão `CtaCalendly` e `fetch("/api/calendly-url")` em `ChatWindow.tsx`, lógica em `app/api/chat/route.ts`, variáveis Calendly na Vercel e deploy.
