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

## Chat (Lia)

- Antes de conversar, o visitante informa **nome e e-mail** (guardados na sessão do navegador).
- Botões **Agendar** e **WhatsApp** aparecem **só nas respostas da Lia**, quando ela incluir `[CTA_CALENDLY]` ou `[CTA_WHATSAPP]` — não há botão fixo no cabeçalho do chat.
- Ao fechar o chat ou sair da página (com **5+ mensagens** na conversa), um **resumo por e-mail** é enviado para `NEXT_PUBLIC_LEAD_EMAIL` com nome, e-mail, transcrição e ID da sessão.
