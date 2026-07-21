import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  PackageCheck,
  Ruler,
  Ship,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { breadcrumbSchema, canonicalUrl, faqSchema } from "@/lib/seo";

const TITLE = "Proveedor de Papel Térmico en México";
const DESCRIPTION =
  "Rollos de papel térmico y etiquetas térmicas para distribuidores en México. Confirme medidas, grado, empaque, documentos, muestras y condiciones de entrega.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: canonicalUrl("/mx") },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: canonicalUrl("/mx"),
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Zhixin Paper",
    images: [
      {
        url: "/images/thermal-rolls-product.jpg",
        width: 1200,
        height: 630,
        alt: "Rollos de papel térmico para distribuidores en México",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/thermal-rolls-product.jpg"],
  },
};

const PRODUCTS = [
  {
    title: "Rollos para punto de venta",
    description: "Formatos comunes de 80 mm y 57/58 mm, definidos por ancho, diámetro exterior, núcleo, longitud y sentido de bobinado.",
    href: "/products/thermal-paper-rolls/standard-pos-rolls",
    image: "/images/thermal-rolls-product.jpg",
    link: "Ver rollos POS",
  },
  {
    title: "Etiquetas térmicas",
    description: "Etiquetas directas y de transferencia para logística, código de barras, almacén, retail y aplicaciones especiales.",
    href: "/products/thermal-labels",
    image: "/images/thermal-labels-product.jpg",
    link: "Ver etiquetas",
  },
  {
    title: "Impresión y marca privada",
    description: "Opciones de impresión, empaque y marca privada evaluadas según diseño, especificación, volumen y proceso de aprobación.",
    href: "/oem-custom",
    image: "/images/factory-overview.jpg",
    link: "Revisar personalización",
  },
];

const QUOTE_FIELDS = [
  "Ancho, largo o diámetro exterior",
  "Diámetro del núcleo y sentido de bobinado",
  "Modelo de impresora o muestra física",
  "Cantidad por SKU y consumo estimado",
  "Empaque por caja y configuración de pallet",
  "Código postal, ciudad y condición de entrega",
];

const FAQS = [
  {
    question: "¿Qué información necesitan para cotizar rollos térmicos?",
    answer:
      "Indique ancho, longitud o diámetro exterior, núcleo, sentido de bobinado, modelo de impresora, cantidad, empaque y destino. Una muestra o ficha actual ayuda a confirmar la equivalencia.",
  },
  {
    question: "¿Pueden cotizar medidas de 80 mm y 57 o 58 mm?",
    answer:
      "Sí, estas familias de medidas forman parte de la gama. La especificación final se confirma por ancho, longitud real, diámetro, núcleo, gramaje y compatibilidad con la impresora.",
  },
  {
    question: "¿Qué documentos de cumplimiento están disponibles?",
    answer:
      "El paquete documental depende del grado y del uso final. Antes del pedido se confirma por escrito el alcance requerido, por ejemplo BPA, REACH, FSC, contacto alimentario u otros documentos aplicables.",
  },
  {
    question: "¿Cómo se define el envío a México?",
    answer:
      "FOB, CIF u otras condiciones se cotizan según volumen, destino, código postal y tipo de carga. El costo, plazo y responsabilidad aduanal deben quedar confirmados en la oferta comercial.",
  },
];

export default function MexicoPage() {
  const schemas = [
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "México", url: "/mx" },
    ]),
    faqSchema(FAQS),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: TITLE,
      description: DESCRIPTION,
      url: canonicalUrl("/mx"),
      inLanguage: "es-MX",
      areaServed: { "@type": "Country", name: "Mexico" },
      about: ["Papel térmico", "Rollos térmicos", "Etiquetas térmicas"],
    },
  ];

  return (
    <>
      <Header />
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}

      <main id="main-content" lang="es-MX" className="bg-[#fbfaf6] pt-[64px] md:pt-[92px]">
        <section className="relative isolate min-h-[620px] overflow-hidden bg-[#101b19] text-white">
          <Image
            src="/images/thermal-rolls-product.jpg"
            alt="Rollos de papel térmico preparados para suministro mayorista"
            fill
            fetchPriority="high"
            loading="eager"
            quality={76}
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-[#101b19]/78" />
          <div className="container-site flex min-h-[620px] items-center py-16 md:py-20">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#d6b273]">Abastecimiento B2B para México</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-6xl">
                Proveedor de papel térmico y etiquetas térmicas en México
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#dce4df] md:text-lg">
                Para distribuidores, importadores y compradores de marca privada que necesitan confirmar especificación, compatibilidad, documentos y empaque antes de comprar.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/quote"
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#9c661d] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#7d4f16]"
                >
                  Solicitar cotización <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/samples"
                  className="inline-flex min-h-12 items-center justify-center border border-white/45 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Solicitar muestras
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#ded6c8] bg-white">
          <div className="container-site grid gap-px bg-[#ded6c8] sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Ruler, label: "Medidas", value: "80 mm, 57/58 mm y formatos a medida" },
              { icon: ClipboardCheck, label: "Validación", value: "Impresora, núcleo, diámetro y bobinado" },
              { icon: PackageCheck, label: "Empaque", value: "Caja, pallet y mezcla de SKU por cotizar" },
              { icon: Ship, label: "Entrega", value: "Condición y destino confirmados en oferta" },
            ].map((item) => (
              <div key={item.label} className="bg-white px-6 py-7">
                <item.icon className="h-5 w-5 text-[#9c661d]" />
                <p className="mt-4 text-xs font-bold text-[#87918c]">{item.label}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#14211f]">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container-site">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#9c661d]">Productos principales</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#14211f] md:text-4xl">
                Empiece por la familia de producto y cierre la especificación antes del pedido
              </h2>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {PRODUCTS.map((product) => (
                <article key={product.href} className="border border-[#ded6c8] bg-white">
                  <Link href={product.href} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#101b19]">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.025]"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#14211f]">{product.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#4f5f5a]">{product.description}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c]">
                        {product.link} <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#ded6c8] bg-white py-20 md:py-24">
          <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold text-[#9c661d]">Datos para cotizar</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#14211f] md:text-4xl">
                Una cotización útil empieza con una especificación completa
              </h2>
              <p className="mt-5 text-base leading-8 text-[#4f5f5a]">
                Evite comparar únicamente el precio por rollo. La longitud real, el diámetro, el núcleo, el grado del papel y el empaque cambian el rendimiento y el costo puesto en destino.
              </p>
              <Link href="/quote" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c]">
                Abrir formulario de cotización <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-px border border-[#ded6c8] bg-[#ded6c8] sm:grid-cols-2">
              {QUOTE_FIELDS.map((field) => (
                <div key={field} className="flex min-h-24 items-start gap-3 bg-[#fbfaf6] p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0f5f5c]" />
                  <p className="text-sm font-semibold leading-6 text-[#33413e]">{field}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#101b19] py-20 text-white md:py-24">
          <div className="container-site grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <FileCheck2 className="h-7 w-7 text-[#d6b273]" />
              <h2 className="mt-5 text-3xl font-bold leading-tight text-white md:text-4xl">
                Confirme el alcance documental por grado y aplicación
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#c7d0cb]">
                Los requisitos cambian según mercado, contacto, sustrato y uso final. Antes de aprobar una orden, solicite el nombre del grado y la lista exacta de declaraciones o reportes que deben acompañar el lote.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "BPA y fenoles", href: "/compliance/bpa-free" },
                { label: "REACH y RoHS", href: "/compliance/reach-rohs" },
                { label: "Sistema ISO 9001", href: "/compliance/iso-9001" },
                { label: "Opciones FSC", href: "/compliance/fsc-paper" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex min-h-16 items-center justify-between border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-[#efe7d6] transition hover:border-[#d6b273]/45 hover:bg-white/[0.07]"
                >
                  {item.label} <ArrowRight className="h-4 w-4 text-[#d6b273]" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container-site grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-semibold text-[#9c661d]">Preguntas frecuentes</p>
              <h2 className="mt-3 text-3xl font-bold text-[#14211f]">Antes de solicitar precio</h2>
            </div>
            <div className="divide-y divide-[#ded6c8] border-y border-[#ded6c8]">
              {FAQS.map((faq) => (
                <div key={faq.question} className="py-6">
                  <h3 className="text-lg font-bold text-[#14211f]">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#4f5f5a]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#ded6c8] bg-[#e7eee9] py-16">
          <div className="container-site flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-[#14211f]">Envíe su medida, volumen y destino</h2>
              <p className="mt-3 text-sm leading-7 text-[#4f5f5a]">
                Revisaremos la especificación necesaria para preparar una cotización comparable y una ruta de muestra cuando corresponda.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/quote" className="inline-flex min-h-12 items-center gap-2 bg-[#0f5f5c] px-7 py-3 text-sm font-bold text-white">
                Solicitar cotización <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex min-h-12 items-center border border-[#0f5f5c]/30 px-7 py-3 text-sm font-bold text-[#0f5f5c]">
                Contactar ventas
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
