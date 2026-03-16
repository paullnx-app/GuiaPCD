# Guideline — Produção e publicação de artigos no blog Guia PCD

Documento interno e confidencial. **Não publicar.** Serve como referência unificada para redação, SEO, linkagem interna e publicação de artigos.

---

## 1. Função, objetivo e público

### 1.1 Função do redator

Atuar como redator/publicador altamente versátil, capaz de adaptar-se a diferentes temas, estilos e finalidades. Todo conteúdo deve ser otimizado para **SEO** (Search Engine Optimization), **GEO** (Generative Engine Optimization), **AEO** (Answer Engine Optimization) e consumo por **LLMs**, garantindo máximo alcance e impacto.

### 1.2 Objetivo do blog

Produzir conteúdo útil, claro e acessível sobre isenção veicular, direitos da pessoa com deficiência (PcD), documentação, laudos e temas relacionados à inclusão e mobilidade.

### 1.3 Público-alvo

Pessoas com deficiência, familiares de PcD, taxistas, portadores de doenças crônicas e qualquer pessoa que busque informações sobre benefícios fiscais na aquisição de veículos.

### 1.4 Tom e linguagem

- Português brasileiro, claro e direto.
- Informativo, acolhedor e respeitoso.
- Evitar jargão excessivo; explicar siglas na primeira menção (ex.: "Pessoa com Deficiência (PcD)", "Imposto sobre Produtos Industrializados (IPI)").
- Usar "pessoa com deficiência" ou "PcD" de forma consistente; evitar termos que reforcem estigma.
- Evitar superlativos, adjetivos exagerados e termos sensacionalistas.

---

## 2. Qualidade do conteúdo e E-E-A-T

### 2.1 Princípios fundamentais

- O artigo deve esclarecer com máxima qualidade e assertividade o tema proposto.
- Apresentar informações, relatos, pesquisas ou análises originais. Quando baseado em outras fontes, reconstrua e adicione valor — nunca copie ou reescreva com sinônimos.
- Incluir descrição significativa, completa e abrangente do assunto.
- Apresentar análises relevantes e informações interessantes que justifiquem a leitura.
- Criar artigos dignos de favoritar, compartilhar e publicar em revista, enciclopédia ou livro.
- Oferecer conteúdo humano, escrito para pessoas, com valor significativo em relação às páginas concorrentes.
- Sempre que possível, linkar para fontes oficiais (leis, decretos, sites governamentais). Links externos: no máximo 2 por artigo, abrindo em nova aba.
- Ao citar lei, decreto ou órgão, usar o nome oficial (ex.: Receita Federal, Secretaria da Fazenda do Estado).
- Evitar promessas absolutas ("tudo que você precisa"); preferir "principais documentos" ou "o que costuma ser exigido".
- Revisar erros de português rigorosamente antes da entrega final.

### 2.2 Padrões de E-E-A-T (Experiência, Especialização, Autoridade, Confiança)

- **Autoria:** Todo artigo deve ter autor definido (nunca "Admin"). Autores disponíveis: `carmen` e `paul` (ver `lib/blog.ts`).
- **Experiência real:** Incluir exemplos práticos, estudos de caso ou opiniões baseadas em vivência profissional.
- **Multimídia:** Usar imagens relevantes com alt text descritivo. Prints de ferramentas e vídeos quando aplicável.
- **Fontes confiáveis:** Citar e linkar legislação, órgãos oficiais e pesquisas.

---

## 3. Estrutura técnica do artigo (Markdown)

Cada artigo é um arquivo `.md` em `content/blog/` com **frontmatter YAML** no topo.

### 3.1 Frontmatter obrigatório

```yaml
title: "Título do artigo (até ~60 caracteres para SEO)"
slug: titulo-em-kebab-case-sem-acentos
date: "AAAA-MM-DD"
author: carmen   # ou paul (conforme lib/blog.ts)
category: Nome da Categoria   # ex.: Impostos, Documentação, Direitos
excerpt: "Resumo em 1–2 frases, até ~155 caracteres. Aparece em listagens e meta description."
```

### 3.2 Frontmatter recomendado

```yaml
keyTakeaways:
  - "Primeiro ponto principal em uma frase."
  - "Segundo ponto principal."
  - "Até 5–7 tópicos objetivos; aparecem na página do artigo."
featuredImage: "/images/blog/SEU-SLUG/featured.webp"
images:
  - src: "/images/blog/SEU-SLUG/01.webp"
    alt: "Descrição acessível da primeira imagem"
  - src: "/images/blog/SEU-SLUG/02.webp"
    alt: "Descrição acessível da segunda imagem"
```

### 3.3 Regras do frontmatter

- **slug:** único, minúsculas, com hífens (ex.: `como-fazer-isencao-veicular`). O nome do arquivo deve ser `{slug}.md`.
- **title:** objetivo, com palavra-chave principal integrada naturalmente.
- **excerpt:** não repetir o título; destacar o benefício ou a pergunta que o artigo responde. Pode incluir variações de busca.
- **keyTakeaways:** frases curtas e objetivas; funcionam como resumo do artigo.

---

## 4. Imagens

- **Quantidade:** até 3 imagens por artigo (1 de destaque + 2 no corpo). Meta: ao menos 1 imagem a cada 300 palavras.
- **Formato:** WebP (preferencial). Aceitos: `.webp`, `.png`, `.svg`.
- **Dimensões:**

| Imagem   | Dimensões              | Uso                                       |
|----------|------------------------|--------------------------------------------|
| Featured | **1200×630 px**        | Destaque, Open Graph, schema Article       |
| 01 e 02  | **800×450** ou **1200×600 px** | Inline no corpo (16:9 ou 2:1)       |

- **Onde colocar:** `public/images/blog/{slug}/` com os arquivos `featured.webp`, `01.webp` e `02.webp`.
- **Alt text:** obrigatório e descritivo em cada imagem; não use "imagem de…", descreva o conteúdo ou a ideia transmitida.
- **Posicionamento automático:** a primeira imagem do corpo é inserida após o bloco de abertura (antes do primeiro `##`); a segunda, após o primeiro `##`. Não é necessário inserir tags de imagem no corpo do Markdown.

---

## 5. Estrutura e legibilidade do texto

### 5.1 Estrutura do artigo

1. **Introdução (1–2 parágrafos — primeiros 150 caracteres são críticos)**
   - Hook forte: pergunta, estatística ou afirmação impactante.
   - Resposta direta e breve à pergunta do título.
   - Palavra-chave integrada naturalmente.
   - Promessa de valor: o que o leitor vai aprender.

2. **Seções com H2**
   - Use `##` para títulos de seção. Prefira títulos descritivos ou em forma de pergunta (ex.: "Quem tem direito à isenção?").
   - Subtítulo H2 ou H3 a cada 300 palavras no máximo.
   - Numeração (1., 2., 3.) é opcional e funciona bem em guias passo a passo.

3. **Subseções com H3**
   - Use `###` para desdobrar um H2 (ex.: "Impostos que podem ser isentos" dentro de "Quem tem direito").

4. **Listas e passos**
   - Listas numeradas para procedimentos sequenciais.
   - Listas com marcadores para conjuntos de itens ou dicas (quando houver 3+ itens).
   - Manter itens paralelos (mesmo tipo de informação).

5. **Conclusão poderosa**
   - Recapitular os pontos principais de forma breve.
   - CTA claro e relevante: relacionado ao conteúdo (serviço, leitura complementar ou próximo passo).
   - Link interno estratégico.
   - Reforçar a mensagem central sem repetir trechos longos.

6. **Perguntas frequentes (obrigatório)**
   - Seção ao final: `## Perguntas frequentes sobre [tema]`.
   - Cada pergunta em `###`, resposta em texto corrido logo abaixo (40–60 palavras ideais para featured snippets).
   - Mínimo de 5 perguntas.
   - O sistema extrai FAQ automaticamente para FAQ-Schema (rich results).
   - Usar perguntas que o público realmente faz.

### 5.2 Métricas de legibilidade

| Métrica                     | Meta                          |
|-----------------------------|-------------------------------|
| Palavras por frase          | Máximo 20                     |
| Palavras por parágrafo      | Máximo 150 (ideal: 50–75)     |
| Voz ativa                   | Mínimo 80% das frases         |
| Palavras de transição        | Mínimo 30% do texto           |
| Flesch Reading Ease         | Acima de 60 pontos            |
| Subtítulos                  | H2/H3 a cada 300 palavras     |

### 5.3 Formatação visual

- **Negrito:** Usar em 2–3 termos-chave por seção para escaneabilidade.
- **Hierarquia:** Apenas 1 H1 (vem do frontmatter `title`), depois H2 → H3.
- **Espaçamento:** Margens generosas entre parágrafos e seções.
- **Números e prazos:** Especificar sempre que possível (ex.: "últimos três meses"). Se algo varia por estado, deixar explícito.

---

## 6. Otimização estratégica (SEO, GEO, AEO, LLM)

### 6.1 Palavra-chave e LSI

- **Densidade:** 0,5% a 2%.
- **Presença obrigatória em:** H1, primeiro parágrafo (primeiros 100–150 caracteres), ao menos um H2, slug, excerpt (meta description) e conclusão.
- **Variações:** Usar sinônimos e termos relacionados (LSI) de forma natural ao longo do texto.

### 6.2 Otimização para GEO (IA generativa)

- Tópicos bem definidos com clareza e estrutura.
- Iniciar seções com definições diretas: frases no formato "X é…".
- Afirmações objetivas com citação de fontes.
- Destacar casos reais e experiência prática.

### 6.3 Otimização para AEO (respostas diretas)

- Usar perguntas como headings H2/H3 quando natural.
- Responder em 40–60 palavras logo após a pergunta (snippet-friendly).
- Seção FAQ obrigatória ao final (mín. 5 perguntas), com FAQ-Schema gerado automaticamente pelo sistema.

### 6.4 Intenção de busca (Search Intent)

Identificar antes de escrever e alinhar 100% do conteúdo:

| Tipo             | Sinais                              | Formato ideal                         |
|------------------|--------------------------------------|---------------------------------------|
| Informacional    | "O que é", "Como funciona"          | Guia, tutorial, passo a passo         |
| Navegacional     | Busca por marca ou página específica | Página institucional                  |
| Transacional     | "Preço", "Contratar"               | Landing page, CTA direto             |
| Investigacional  | "Melhor", "Comparar", "Review"      | Comparativo, lista, análise           |

---

## 7. Estratégia de linkagem interna

A linkagem interna distribui autoridade (link juice), melhora a navegabilidade e aumenta o tempo de permanência.

### 7.1 Volume e densidade

- **Meta:** 3 a 8 links internos para cada 1.000 palavras.
- **Qualidade:** Cada link deve adicionar valor real ao leitor, oferecendo aprofundamento ou contexto. Não forçar links irrelevantes. **Nunca inventar URLs.**

### 7.2 Posicionamento estratégico

- **Início do texto (prioridade):** Links mais importantes (páginas de conversão, artigos-pilar) nos primeiros parágrafos. Reduz taxa de rejeição e engaja rapidamente.
- **Corpo:** Espalhar os demais links naturalmente ao longo do texto.
- **Final (CTA):** Sempre terminar com link para serviço ou próximo artigo relacionado.

### 7.3 Texto âncora (anchor text)

- **Descritivo:** A âncora deve descrever o conteúdo de destino.
  - Bom: "Veja nosso [guia completo de isenção veicular]."
  - Ruim: "Para saber mais, [clique aqui]."
- **Variação:** Evitar usar sempre o mesmo texto âncora para o mesmo link. Variar as palavras-chave.

### 7.4 Estrutura de clusters

- Linkar artigos novos para artigos-pilar (conteúdos mais completos e antigos).
- Linkar artigos-pilar para artigos satélites (novos e específicos).
- Conectar tópicos relacionados (ex.: artigo sobre laudos deve linkar para artigo sobre isenção de impostos).
- Verificar sempre a disponibilidade de links internos no site atual antes de inserir.

---

## 8. Estilo e boas práticas de escrita

- Escrever com calma — ativar os modos mais humanos, criativos e inteligentes; evitar produção apressada.
- Usar linguagem inclusiva: "pessoa com deficiência" ou "PcD"; evitar termos estigmatizantes.
- Siglas: na primeira aparição, por extenso + sigla entre parênteses. Depois, só a sigla.
- Se citar dados que variam por estado, deixar isso explícito.
- Preferir voz ativa. Frases curtas e diretas.
- Usar palavras de transição para fluidez (ex.: além disso, por outro lado, em resumo, portanto).
- Revisar ortografia, concordância e clareza antes da entrega final. **Não falhar nisso.**

---

## 9. Checklist final antes de publicar

### Frontmatter e arquivos
- [ ] Frontmatter completo: `title`, `slug`, `date`, `author`, `category`, `excerpt`.
- [ ] `slug` igual ao nome do arquivo (sem `.md`) e à pasta de imagens.
- [ ] `keyTakeaways` com 5–7 itens objetivos.
- [ ] Imagens em `public/images/blog/{slug}/`: `featured.webp`, `01.webp`, `02.webp`.
- [ ] Alt text definido em cada item do array `images` no frontmatter.

### SEO e palavra-chave
- [ ] Palavra-chave presente no H1, primeiro parágrafo, ao menos um H2, conclusão e excerpt.
- [ ] Slug contém a palavra-chave.
- [ ] Links internos: 3–8 por mil palavras (início + corpo + CTA final).
- [ ] Links externos: 1–2 para fontes confiáveis, abrindo em nova aba.

### Legibilidade e estrutura
- [ ] Apenas 1 H1; hierarquia H2 → H3 correta.
- [ ] Frases curtas (máx. 20 palavras), voz ativa (mín. 80%).
- [ ] Parágrafos concisos (máx. 150 palavras).
- [ ] Subtítulos H2/H3 a cada 300 palavras.
- [ ] Negrito em 2–3 termos-chave por seção.

### AEO / GEO / FAQ
- [ ] Seção FAQ presente com mínimo de 5 perguntas (FAQ-Schema gerado automaticamente).
- [ ] Definições claras no início de seções relevantes.
- [ ] Respostas diretas (40–60 palavras) logo após perguntas em headings.

### Qualidade e E-E-A-T
- [ ] Conteúdo original, sem plágio, com valor agregado.
- [ ] Autor definido (nunca "Admin").
- [ ] Exemplos práticos ou experiência real demonstrada.
- [ ] Revisão de ortografia, concordância e clareza finalizada.
- [ ] Linguagem inclusiva e tom alinhado ao Guia PCD.
- [ ] CTA claro e relevante no final do artigo.

---

## 10. Referências no projeto

| Recurso                      | Caminho                                          |
|------------------------------|--------------------------------------------------|
| Autores disponíveis          | `lib/blog.ts` (objeto `authors`)                 |
| Estrutura de imagens do blog | `public/images/blog/README.md`                   |
| Artigo de exemplo            | `content/blog/como-fazer-isencao-veicular.md`    |
| Tipo do frontmatter          | `lib/markdown.ts` (interface `MarkdownFrontmatter`) |

---

*Documento interno e confidencial — não publicar no site.*
*Última atualização: março de 2026.*
