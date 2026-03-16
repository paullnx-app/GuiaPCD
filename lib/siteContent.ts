import fs from "fs";
import path from "path";
import { parseMarkdown } from "./markdown";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function loadBlogPosts(): string {
  if (!fs.existsSync(BLOG_DIR)) return "";

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { frontmatter, content } = parseMarkdown(raw);
      return `## Artigo: ${frontmatter.title}\nCategoria: ${frontmatter.category}\nResumo: ${frontmatter.excerpt}\n\n${content}`;
    })
    .join("\n\n---\n\n");
}

const SITE_INFO = `
## Sobre o Guia PCD Despachante

O Guia PCD é uma equipe de Belo Horizonte especializada em isenção veicular para Pessoas com Deficiência (PcD). Atua desde 2013 ajudando pessoas com deficiência a conquistar isenção de impostos na compra de veículos.

### Dados da empresa
- Endereço: Av. Contorno, 2905 – Sl. 405 – Santa Efigênia, Belo Horizonte / MG – 30110-915
- E-mail: contato@guiapcd.com.br
- Telefone / WhatsApp: (31) 3236-1498
- Mais de 1.000 casos de sucesso
- 11+ anos de experiência

### Valores
- Cada pessoa é uma história: atendimento humanizado e individualizado.
- Falar claro: sem juridiquês, cada etapa explicada de forma simples.
- Ir até o fim com você: acompanhamento do início ao resultado.
- Respeitar seu tempo: burocracia enxuta e comunicação objetiva.

### Serviços oferecidos
1. Isenção de ICMS: isenção estadual sobre o valor do veículo zero km.
2. Isenção de IPVA: isenção do imposto anual sobre a propriedade do veículo.
3. Isenção de IPI: benefício federal que reduz o valor total na nota fiscal.

A equipe atua de ponta a ponta: análise do direito, organização de documentos, protocolo e acompanhamento até a emissão da autorização.

### Como funciona o processo (4 passos)
1. Laudo médico: o cliente envia os laudos e a equipe analisa se atendem aos critérios.
2. Análise do especialista: avaliação do caso e definição dos tributos com direito a isenção.
3. Documentação: organização dos documentos exigidos por cada órgão (Receita Federal, Secretaria da Fazenda, DETRAN).
4. Obtenção das isenções: acompanhamento do trâmite até a concessão da autorização.

### Benefícios de escolher o Guia PCD
- Agilidade e eficiência com comunicação clara sobre prazos.
- Expertise especializada na legislação PCD e secretarias estaduais.
- Suporte abrangente da primeira dúvida até a autorização.
- Transparência total sobre documentos, prazos e custos.
- Acompanhamento via WhatsApp e canais digitais.
`;

export function getSiteContent(): string {
  const blogContent = loadBlogPosts();
  return `# Conteúdo completo do site Guia PCD\n\n${SITE_INFO}\n\n---\n\n# Artigos do Blog\n\n${blogContent}`;
}
