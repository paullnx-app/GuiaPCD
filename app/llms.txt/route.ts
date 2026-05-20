import { getPosts } from "@/lib/blog";
import { getSiteUrl } from "@/lib/siteUrl";

export const dynamic = "force-static";
export const runtime = "nodejs";

export async function GET(): Promise<Response> {
  const baseUrl = getSiteUrl();
  const posts = getPosts();

  const blogLines = posts.map(
    (post) => `- [${post.title}](${baseUrl}/blog/${post.slug}): ${post.excerpt}`
  );

  const body = [
    "# Guia PCD",
    "",
    "> Despachante em Belo Horizonte e Minas Gerais, especializado em isenção veicular para Pessoas com Deficiência (PcD): IPI, ICMS, IPVA e IOF. Atuação desde 2013, com mais de 1.000 processos acompanhados.",
    "",
    "## Sobre",
    "",
    "O Guia PCD orienta e conduz processos de isenção na compra de veículos para PcD: análise do direito, organização de laudos e documentos, protocolo e acompanhamento até a autorização. O site oferece artigos no blog, formulário de contato e assistente virtual (Lia) para dúvidas com base no conteúdo publicado.",
    "",
    "## Páginas principais",
    "",
    `- [Página inicial](${baseUrl}/): serviços, benefícios, processo em 4 passos, depoimentos e contato`,
    `- [Sobre nós](${baseUrl}/sobre-nos/): história, valores e equipe`,
    `- [Blog](${baseUrl}/blog/): artigos sobre isenção veicular, laudos e documentação`,
    "",
    "## Blog (artigos)",
    "",
    ...blogLines,
    "",
    "## Contato",
    "",
    "- Telefone e WhatsApp: (31) 3236-1498",
    "- E-mail: contato@guiapcd.com.br",
    "- Endereço: Av. Contorno, 2905, Sl. 405, Santa Efigênia, Belo Horizonte / MG, 30110-915",
    "",
    "## Para crawlers",
    "",
    `- [Sitemap](${baseUrl}/sitemap.xml)`,
    `- [Robots](${baseUrl}/robots.txt)`,
    `- [Este arquivo](${baseUrl}/llms.txt)`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
