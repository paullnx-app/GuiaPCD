# Imagens do blog

Cada artigo pode ter **até 3 imagens em formato WebP**:

1. **Imagem de destaque** (`featured.webp`) – exibida no topo do artigo e em redes sociais (Open Graph).
2. **Duas imagens no corpo** (`01.webp`, `02.webp`) – inseridas automaticamente após o primeiro e o segundo bloco de texto (seção H2).

## Estrutura de pastas

Coloque os arquivos na pasta do slug do artigo:

```
public/images/blog/
  como-fazer-isencao-veicular/
    featured.webp
    01.webp
    02.webp
  pessoa-com-deficiencia/
    featured.webp
    01.webp
    02.webp
  quais-os-laudos-para-isencao/
    featured.webp
    01.webp
    02.webp
  como-adquirir-veiculo-com-isencao-de-impostos/
    featured.webp
    01.webp
    02.webp
```

Para **novos artigos**, crie uma pasta com o mesmo `slug` do post e adicione os três arquivos WebP.

## Resolução recomendada

| Imagem   | Dimensões   | Uso |
|----------|-------------|-----|
| Featured | **1200×630 px** | Destaque, redes sociais, schema Article |
| 01 e 02  | **800×450 px** ou **1200×600 px** | Inline no texto (16:9 ou 2:1) |

- Formato: **WebP** (melhor compressão e performance).
- Proporção da featured: 1,91:1 (ideal para Open Graph).

## Frontmatter no artigo (obrigatório para as imagens aparecerem)

No `.md` do artigo, use **exatamente** este formato. Os caminhos **devem começar com `/`** (path absoluto):

```yaml
featuredImage: "/images/blog/SEU-SLUG/featured.webp"
images:
  - src: "/images/blog/SEU-SLUG/01.webp"
    alt: "Descrição da primeira imagem"
  - src: "/images/blog/SEU-SLUG/02.webp"
    alt: "Descrição da segunda imagem"
```

- **src** e **alt** são obrigatórios em cada item de `images`.
- Formatos aceitos: `.webp`, `.png`, `.svg` (featured e imagens do corpo).
- As duas imagens do array são posicionadas automaticamente: a primeira após o bloco inicial (antes do primeiro `##`), a segunda após o primeiro `##`.
