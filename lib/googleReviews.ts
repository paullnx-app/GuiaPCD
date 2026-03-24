import { unstable_cache } from "next/cache";

export type DisplayReview = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhoto?: string;
  source: "google" | "fallback";
};

const FALLBACK_REVIEWS: DisplayReview[] = [
  {
    author: "Cliente Guia PCD",
    rating: 5,
    text: "O Guia PCD Despachante fez toda a diferença na minha busca por isenções fiscais. Eu não fazia ideia por onde começar e, com a ajuda deles, consegui organizar documentos, cumprir prazos e acompanhar tudo pelo WhatsApp. Hoje, tenho meu carro adaptado e pagando muito menos imposto.",
    relativeTime: "",
    source: "fallback",
  },
  {
    author: "Cliente Guia PCD",
    rating: 5,
    text: "Atendimento humanizado e claro. A equipe explicou cada etapa do processo de isenção e me deu segurança até a autorização sair.",
    relativeTime: "",
    source: "fallback",
  },
  {
    author: "Cliente Guia PCD",
    rating: 5,
    text: "Profissionais que entendem a legislação PCD e as exigências dos órgãos. Recomendo para quem quer evitar retrabalho e atrasos.",
    relativeTime: "",
    source: "fallback",
  },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type PlacesReview = {
  author_name?: string;
  rating?: number;
  text?: string;
  relative_time_description?: string;
  profile_photo_url?: string;
};

async function fetchFromGooglePlaces(): Promise<DisplayReview[]> {
  const key = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const placeId = process.env.GOOGLE_PLACE_ID?.trim();
  if (!key || !placeId) return FALLBACK_REVIEWS;

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "reviews,rating,user_ratings_total");
  url.searchParams.set("key", key);
  url.searchParams.set("language", "pt-BR");

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  const data = (await res.json()) as {
    status?: string;
    error_message?: string;
    result?: { reviews?: PlacesReview[] };
  };

  if (data.status !== "OK" || !data.result?.reviews?.length) {
    if (data.status && data.status !== "ZERO_RESULTS") {
      console.error("[googleReviews] Places API:", data.status, data.error_message);
    }
    return FALLBACK_REVIEWS;
  }

  return data.result.reviews.map((r) => ({
    author: r.author_name?.trim() || "Avaliação no Google",
    rating: Math.min(5, Math.max(1, Number(r.rating) || 5)),
    text: (r.text || "").trim(),
    relativeTime: r.relative_time_description || "",
    profilePhoto: r.profile_photo_url,
    source: "google" as const,
  }));
}

const getCachedReviews = unstable_cache(
  async () => fetchFromGooglePlaces(),
  ["google-place-reviews-raw"],
  { revalidate: 3600 }
);

/**
 * Retorna até `limit` depoimentos em ordem aleatória (a cada render no servidor).
 * Os dados do Google são cacheados 1h; o embaralhamento muda a cada requisição.
 */
export async function getShuffledReviewsForDisplay(
  limit = 3
): Promise<DisplayReview[]> {
  const raw = await getCachedReviews();
  const valid = raw.filter((r) => r.text.length > 0);
  const pool = valid.length ? valid : FALLBACK_REVIEWS;
  return shuffle(pool).slice(0, Math.min(limit, pool.length));
}

export function getGoogleMapsReviewUrl(): string | null {
  const custom = process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL?.trim();
  if (custom) return custom;
  const placeId = process.env.GOOGLE_PLACE_ID?.trim();
  if (placeId) {
    return `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${encodeURIComponent(placeId)}`;
  }
  return null;
}
