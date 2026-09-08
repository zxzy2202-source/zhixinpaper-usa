import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ClipboardCheck, ScanLine, Layers, Tag } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FaqSection from "@/components/ui/FaqSection";
import { buildMetadata, breadcrumbSchema, canonicalUrl, faqSchema } from "@/lib/seo";

const TITLE = "Etiquetas de Código de Barras Térmicas para México";
const DESCRIPTION =
  "Etiquetas de código de barras térmicas de mayoreo para almacén, inventario, tarima y envíos en México. Formatos en rollo y continuo, 4x6 y a la medida, con muestras.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/mx/etiquetas-codigo-barras",
  locale: "es_MX",
  languages: {
    "es-MX": "https://www.zhixinpaper.com/mx/etiquetas-codigo-barras",
    "x-default": "https://www.zhixinpaper.com/mx/etiquetas-codigo-barras",
  },
});

const TYPES = [
  {
    icon: Layers,
    title: "Térmica directa",
    ribbon: "Sin ribbon",
    text: "Sin cinta (ribbon). Se considera para etiquetas de código de barras con un periodo de uso y almacenamiento definido, como inventario rotativo y envíos.",
    href: "/products/thermal-labels/direct-thermal-labels",
    link: "Ver etiquetas térmicas directas",
  },
  {
    icon: Layers,
    title: "Transferencia térmica",
    ribbon: "Con ribbon",
    text: "Con cinta. Se considera cuando el proyecto requiere mayor resistencia a abrasión, calor o químicos, o retención de imagen más larga.",
    href: "/products/thermal-labels/thermal-transfer-labels",
    link: "Ver etiquetas de transferencia térmica",
  },
];

const SIZES = ["2 x 1 pulg", "3 x 1 pulg", "2 x 2 pulg", "4 x 2 pulg", "4 x 6 pulg", "100 x 150 mm", "A la medida"];

const APPLICATIONS = [
  "Almacén e inventario",
  "Tarima y ubicación de rack",
  "Envíos y paquetería",
  "Retail y trastienda",
];

const CHECKLIST = [
  {
    icon: ClipboardCheck,
    title: "Impresora y formato",
    text: "Modelo de impresora, formato en rollo o continuo (fanfold), núcleo, diámetro y sentido de bobinado.",
  },
  {
    icon: ScanLine,
    title: "Símbolo y lectura",
    text: "Simbología (Code 128, GS1-128, ITF-14, QR o DataMatrix), dimensión X, zona de silencio, tipo de lector y distancia de lectura.",
  },
  {
    icon: Tag,
    title: "Superficie y adhesivo",
    text: "Superficie de aplicación (cartón corrugado, emplaye, rack con pintura en polvo, tote plástico) y adhesivo permanente o removible.",
  },
  {
    icon: Layers,
    title: "Vida útil y volumen",
    text: "Periodo de retención de imagen, exposición en almacén, cantidad por SKU, empaque y destino.",
  },
];

const FAQS = [
  {
    question: "¿Qué diferencia hay entre etiqueta térmica directa y de transferencia térmica para códigos de barras?",
    answer:
      "La térmica directa no usa cinta y se considera para un periodo de uso y almacenamiento definido. La transferencia térmica usa una cinta compatible y se considera cuando se requiere mayor resistencia o retención de imagen más larga. La elección final depende de la construcción completa, los ajustes de impresión, las condiciones de exposición y una prueba representativa.",
  },
  {
    question: "¿Pueden cotizar etiquetas 4x6 para envíos y paquetería?",
    answer:
      "Sí. El formato 4x6 pulg (aproximadamente 100 x 150 mm) está dentro del rango. La especificación final se confirma por dimensiones, núcleo o pila continua, bobinado, adhesivo, simbología y compatibilidad con la impresora.",
  },
  {
    question: "¿Qué símbolos de código de barras manejan?",
    answer:
      "Se pueden producir Code 128, GS1-128, ITF-14, SSCC, GS1 DataMatrix y QR a partir del arte y los datos aprobados por el comprador. La dimensión X y la zona de silencio se ajustan al lector y a la distancia de lectura indicados.",
  },
  {
    question: "¿Cómo se confirma que el código será legible antes de producir?",
    answer:
      "Con una muestra impresa y escaneada. Se confirma el objetivo de grado de verificación y la distancia de lectura contra el escáner del comprador antes de liberar la producción en volumen.",
  },
];

export default function EtiquetasCodigoBarrasPage() {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: "/" },
      { name: "México", url: "/mx" },
      { name: "Etiquetas de código de barras", url: "/mx/etiquetas-codigo-barras" },
    ]),
    faqSchema(FAQS),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: TITLE,
      description: DESCRIPTION,
      url: canonicalUrl("/mx/etiquetas-codigo-barras"),
      inLanguage: "es-MX",
      areaServed: { "@type": "Country", name: "Mexico" },
      about: ["Etiquetas de código de barras", "Etiquetas térmicas", "Etiquetas para envíos"],
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
      <main id="main-content" lang="es" className="bg-[#fbfaf6] pt-[64px] md:pt-[92px]">
        <section className="bg-[#101b19] pb-12 pt-6 text-white md:pb-16 md:pt-8">
          <div className="container-site">
            <nav aria-label="Ruta de navegación" className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-6 text-[#b9c5be] md:mb-12 md:text-sm">
              <Link href="/" className="hover:text-white">Inicio</Link>
              <span aria-hidden="true">/</span>
              <Link href="/mx" className="hover:text-white">México</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-white">Etiquetas de código de barras</span>
            </nav>
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[#d6b273]">Suministro B2B para México</p>
              <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl xl:text-6xl">
                Etiquetas de código de barras <span className="text-[#d6b273]">térmicas para México</span>
              </h1>
              <p className="mt-6 max-w-prose text-base leading-7 text-[#dce4df] md:text-lg">
                Etiquetas para inventario, tarimas y envíos. Suministro de mayoreo para distribuidores, importadores y operaciones de almacén en México.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact?mode=quote#contact-form" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#9c661d] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#7d4f16] sm:w-auto">
                  Solicitar cotización <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#tipos" className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-white/45 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto">
                  Comparar tipos
                </Link>
              </div>
              <p className="mt-6 text-sm leading-6 text-[#b9c5be]">En rollo o continuo · Medidas estándar y a la medida</p>
            </div>
            <figure className="overflow-hidden rounded-xl border border-white/15 bg-[#1b2926]">
              <Image src="/images/thermal-labels-product.jpg" alt="Rollos y hojas de etiquetas con códigos de barras en distintos formatos" width={800} height={597} sizes="(min-width: 1024px) 44vw, 100vw" preload className="aspect-[4/3] w-full object-cover" />
              <figcaption className="flex items-center gap-3 p-4 text-sm leading-6 text-[#dce4df] md:p-6">
                <ScanLine aria-hidden="true" className="h-6 w-6 shrink-0 text-[#d6b273]" />
                Material, adhesivo y lectura: valide la especificación con una muestra.
              </figcaption>
            </figure>
            </div>
          </div>
        </section>

        <section id="tipos" className="py-12 md:py-16">
          <div className="container-site">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#9c661d]">Tipos de etiqueta</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#14211f] md:text-4xl">
                Térmica directa o transferencia térmica
              </h2>
              <p className="mt-4 text-base leading-8 text-[#4f5f5a]">
                Ambas familias sirven para códigos de barras y etiquetas térmicas de almacén. La construcción correcta se define por la vida útil de imagen y la exposición del proyecto, y se valida con una muestra escaneada.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {TYPES.map((item) => (
                <div key={item.title} className="flex flex-col rounded-xl border border-[#ded6c8] bg-white p-6 md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <item.icon aria-hidden="true" className="h-8 w-8 text-[#0f5f5c]" />
                    <span className="rounded-full bg-[#e7eee9] px-3 py-1 text-sm font-medium text-[#0f5f5c]">{item.ribbon}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-[#14211f]">{item.title}</h3>
                  <p className="mb-6 mt-3 text-sm leading-7 text-[#4f5f5a]">{item.text}</p>
                  <Link href={item.href} className="mt-auto inline-flex min-h-12 items-center justify-between gap-4 border-t border-[#ded6c8] pt-4 text-sm font-bold text-[#0f5f5c] underline-offset-4 hover:underline">
                    {item.link} <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#ded6c8] bg-white py-16 md:py-20">
          <div className="container-site grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-semibold text-[#9c661d]">Tamaños comunes</p>
              <h2 className="mt-3 text-2xl font-bold text-[#14211f] md:text-3xl">Formatos en rollo, continuo y 4x6</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <span key={size} className="rounded-md border border-[#ded6c8] bg-[#fbfaf6] px-4 py-3 text-sm font-semibold tabular-nums text-[#33413e]">
                    {size}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-[#4f5f5a]">
                Las medidas son de referencia. El ancho, la longitud, el núcleo, el paso (gap) o la marca negra y el adhesivo se confirman contra la impresora y la superficie de aplicación.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#9c661d]">Aplicaciones</p>
              <h2 className="mt-3 text-2xl font-bold text-[#14211f] md:text-3xl">Dónde se usan</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {APPLICATIONS.map((app) => (
                  <div key={app} className="border-l-2 border-[#0f5f5c] bg-[#fbfaf6] p-4 text-sm font-semibold leading-6 text-[#33413e]">
                    {app}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="especificaciones" className="py-12 md:py-16">
          <div className="container-site">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#9c661d]">Para una cotización comparable</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#14211f] md:text-4xl">
                Prepare su cotización en cuatro pasos
              </h2>
              <p className="mt-4 text-base leading-8 text-[#4f5f5a]">
                Un precio unitario bajo no es comparable si el material, la simbología, el adhesivo o el formato son distintos. Confirme estos datos antes de comparar ofertas.
              </p>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {CHECKLIST.map((item, index) => (
                <div key={item.title} className="border-t border-[#c8bcaa] pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold tabular-nums text-[#9c661d]">0{index + 1}</span>
                    <item.icon aria-hidden="true" className="h-6 w-6 text-[#0f5f5c]" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-[#14211f]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#4f5f5a]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FaqSection
          id="faq"
          faqs={FAQS}
          title="Preguntas sobre etiquetas de código de barras"
          intro="Use estas preguntas para preparar los datos necesarios para una cotización basada en la especificación."
          eyebrow="Preguntas frecuentes"
          tone="light"
        />

        <section className="border-t border-[#ded6c8] bg-[#e7eee9] py-16">
          <div className="container-site flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-[#14211f]">Envíe la especificación, la simbología y el destino</h2>
              <p className="mt-3 text-sm leading-7 text-[#4f5f5a]">
                Revisaremos la impresora, el material, el símbolo del código, el adhesivo, el empaque y la entrega necesarios para una cotización comparable y, cuando corresponda, un plan de muestras.
              </p>
            </div>
            <Link href="/contact?mode=quote#contact-form" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-[#0f5f5c] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0a4745]">
              Iniciar una cotización <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
