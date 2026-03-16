import Link from "next/link";
import OpenLeadButton from "@/components/OpenLeadButton";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contato */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <p className="text-gray-400 mb-2">Av. Contorno, 2905 – Sl. 405 – Santa Efigênia, Belo Horizonte / MG</p>
            <a href="mailto:[email protected]" className="text-gray-400 hover:text-white transition mb-2 block">[email protected]</a>
            <a href="tel:3132361498" className="text-gray-400 hover:text-white transition block">(31) 3236-1498</a>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link href="#sobre" className="text-gray-400 hover:text-white transition">Sobre</Link></li>
              <li><Link href="#servicos" className="text-gray-400 hover:text-white transition">Serviços</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
              <li><OpenLeadButton source="footer" as="a" className="text-gray-400 hover:text-white transition">Contato</OpenLeadButton></li>
            </ul>
          </div>

          {/* Outros Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Outros Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Política de Privacidade</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Termos de Serviço</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Mapa do Site</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Youtube</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Linkedin</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 Guia PCD Despachante. Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
}
