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

## Recebimento de leads (FormSubmit)

Os formulários de lead enviam os dados para o e-mail configurado em `NEXT_PUBLIC_LEAD_EMAIL` (ver `.env.local`), usando o [FormSubmit](https://formsubmit.co).

**Se você não está recebendo os e-mails:**

1. **Primeira vez:** o FormSubmit envia um **e-mail de ativação** para a caixa de entrada (ex.: contato@guiapcd.com.br). É obrigatório **clicar no link** desse e-mail para ativar; até lá, os envios não chegam como lead.
2. **Confira o spam/lixo eletrônico:** o e-mail de ativação (e os próprios leads) podem cair na pasta de spam. Marque como “não é spam” se for o caso.
3. Depois de ativar, os próximos envios passam a chegar normalmente no endereço configurado.

O **resumo do chat** (ao fechar o assistente, com pelo menos 5 mensagens na conversa) também usa o FormSubmit **direto do navegador**, como o formulário de lead — o FormSubmit costuma falhar se o envio partir só do servidor.
