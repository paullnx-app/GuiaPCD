/**
 * Regex para e-mail válido: local@domínio.tld (sem espaços, com @ e ponto no domínio).
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Validação de e-mail: obrigatório e formato válido.
 */
export function validateEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "E-mail é obrigatório.";
  if (!EMAIL_REGEX.test(trimmed)) return "Informe um e-mail válido.";
  return null;
}

/**
 * Validação de telefone brasileiro: 10 ou 11 dígitos (apenas números).
 */
export function validatePhoneBR(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 0) return "Telefone é obrigatório.";
  if (digits.length < 10 || digits.length > 11) return "Informe um telefone válido (DDD + número).";
  return null;
}

/**
 * Valida nome não vazio.
 */
export function validateName(value: string): string | null {
  if (!value.trim()) return "Nome é obrigatório.";
  return null;
}

/**
 * Valida mensagem não vazia.
 */
export function validateMessage(value: string): string | null {
  if (!value.trim()) return "Mensagem é obrigatória.";
  return null;
}

/**
 * Aplica máscara de telefone brasileiro: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.
 * Aceita só números; limita a 11 dígitos.
 */
export function formatPhoneBR(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7, 11)}`;
}
