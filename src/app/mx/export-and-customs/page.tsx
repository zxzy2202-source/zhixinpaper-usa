import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, FileCheck2, PackageCheck, Ship } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import FaqSection from "@/components/ui/FaqSection";
import { buildMetadata, breadcrumbSchema, canonicalUrl, faqSchema } from "@/lib/seo";

const TITLE = "Exportación y Aduana para Pedidos de Papel Térmico a México";
const DESCRIPTION =
  "Prepare una cotización comparable de papel térmico y etiquetas para México: especificación, documentos por grado, empaque de exportación, destino y responsabilidades de Incoterm.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/mx/export-and-customs",
  locale: "es_MX",
  languages: {
    "es-MX": "https://www.zhixinpaper.com/mx/export-and-customs",
    "x-default": "https://www.zhixinpaper.com/mx/export-and-customs",
  },
});

const FAQS = [
  {
    question: "¿Qué información debe proporcionar un distribuidor en México para una cotización?",
    answer:
      "Comparta el tipo de producto, el ancho, la longitud o el diámetro exterior, el núcleo, el sentido de bobinado, la impresora o aplicación, la cantidad por SKU, la preferencia de empaque, la ciudad o el código postal de destino y el término de entrega solicitado.",
  },
  {
    question: "¿Pueden cotizar entrega FOB o CIF a México?",
    answer:
      "Los términos FOB, CIF y otros se pueden revisar por proyecto. La oferta comercial debe indicar el destino, el alcance del embarque, la responsabilidad aduanera, la responsabilidad de entrega en destino y cualquier exclusión antes de la aprobación.",
  },
  {
    question: "¿Qué documentos de exportación se pueden revisar antes del embarque?",
    answer:
      "El paquete de documentos disponible depende del material seleccionado y del pedido. El comprador puede solicitar la revisión de la factura comercial, la información de empaque, los documentos de embarque, las declaraciones de material y cualquier documento de cumplimiento específico del grado que requiera el proyecto.",
  },
  {
    question: "¿Cómo ayudan las muestras antes de un pedido a México?",
    answer:
      "Una muestra física o la especificación de la impresora ayuda a confirmar dimensiones, núcleo, bobinado, desempeño de impresión, adhesión de la etiqueta, empaque y manejo antes de aprobar la cotización final y el plan de producción.",
  },
];

const CHECKLIST = [
  {
    icon: ClipboardCheck,
    title: "Especificación del producto",
    text: "Confirme ancho, longitud o diámetro, núcleo, sentido de bobinado, gramaje, sustrato (facestock), adhesivo e impresora o aplicación.",
  },
  {
    icon: FileCheck2,
    title: "Documentos por grado",
    text: "Asocie declaraciones, reportes de prueba y alcance del material al grado seleccionado y al uso previsto, en lugar de asumir que todos los grados tienen los mismos documentos.",
  },
  {
    icon: PackageCheck,
    title: "Empaque de exportación",
    text: "Confirme marcas de caja, configuración de tarima, manejo de SKU mixto, arte de marca privada y el punto de aprobación de las instrucciones de empaque.",
  },
  {
    icon: Ship,
    title: "Destino y términos",
    text: "Indique ciudad, código postal, puerto o punto de entrega, tipo de embarque, Incoterm solicitado y qué parte gestiona la aduana y la entrega en destino.",
  },
];

export default function MexicoExportAndCustomsPage() {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: "/" },
      { name: "México", url: "/mx" },
      { name: "Exportación y aduana", url: "/mx/export-and-customs" },
    ]),
    faqSchema(FAQS),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: TITLE,
      description: DESCRIPTION,
      url: canonicalUrl("/mx/export-and-customs"),
      inLanguage: "es-MX",
      areaServed: { "@type": "Country", name: "Mexico" },
      about: ["Exportación de papel térmico", "Información aduanera de México", "Planeación de embarque de etiquetas térmicas"],
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
        <section className="bg-[#101b19] py-20 text-white md:py-28">
          <div className="container-site">
            <nav className="mb-8 text-sm text-[#b9c5be]">
              <Link href="/" className="hover:text-white">Inicio</Link>
              <span className="mx-2">/</span>
              <Link href="/mx" className="hover:text-white">Proveedor de papel térmico para México</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Exportación y aduana</span>
            </nav>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#d6b273]">Planeación de embarque a México</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-6xl">
                Exportación y aduana para pedidos de papel térmico a México
              </h1>
              <p className="mt-6 text-base leading-8 text-[#dce4df] md:text-lg">
                Prepare la información necesaria para una cotización comparable y una revisión de embarque más ágil. La especificación del producto, los documentos del material, el empaque de exportación, el destino y las responsabilidades de entrega deben confirmarse en conjunto.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact?mode=quote#contact-form" className="inline-flex min-h-12 items-center gap-2 bg-[#9c661d] px-7 py-3.5 text-sm font-bold text-white hover:bg-[#7d4f16]">
                  Solicitar una cotización para México <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/mx" className="inline-flex min-h-12 items-center border border-white/45 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10">
                  Volver a la página de México
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container-site">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#9c661d]">Lista de verificación para cotizar</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#14211f] md:text-4xl">
                Cuatro datos mantienen comparable una cotización de papel térmico para México
              </h2>
              <p className="mt-4 text-base leading-8 text-[#4f5f5a]">
                Un precio unitario bajo no es comparable cuando el tamaño del rollo, el grado del material, el empaque o la responsabilidad de entrega son distintos. Confirme estos datos antes de comparar ofertas.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {CHECKLIST.map((item) => (
                <div key={item.title} className="border border-[#ded6c8] bg-white p-6">
                  <item.icon className="h-6 w-6 text-[#0f5f5c]" />
                  <h3 className="mt-5 text-xl font-bold text-[#14211f]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#4f5f5a]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#ded6c8] bg-white py-20 md:py-24">
          <div className="container-site grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold text-[#9c661d]">Revisión de responsabilidades</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#14211f] md:text-4xl">
                Defina el límite del embarque antes de aprobar
              </h2>
              <p className="mt-5 text-base leading-8 text-[#4f5f5a]">
                El destino, el puerto o punto de entrega, el alcance aduanero, el tratamiento fiscal, el transporte en destino y la responsabilidad de los documentos deben quedar por escrito en la oferta comercial. El proceso de importación final queda sujeto a los agentes aduanales y de logística designados por el comprador.
              </p>
              <Link href="/contact" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c]">
                Comentar un plan de embarque <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Ciudad y código postal de destino",
                "Puerto o punto de entrega",
                "Incoterm solicitado",
                "Responsabilidad de aduana e impuestos",
                "Marcas de caja y tarima",
                "Documentos comerciales y de material",
              ].map((item) => (
                <div key={item} className="border border-[#ded6c8] bg-[#fbfaf6] p-5 text-sm font-semibold leading-6 text-[#33413e]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <FaqSection
          id="faq"
          faqs={FAQS}
          title="Preguntas sobre planeación de exportación a México"
          intro="Use estas preguntas para preparar los datos necesarios para una cotización basada en la especificación."
          eyebrow="Preguntas frecuentes"
          tone="light"
        />

        <section className="border-t border-[#ded6c8] bg-[#e7eee9] py-16">
          <div className="container-site flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-[#14211f]">Envíe la especificación y el destino juntos</h2>
              <p className="mt-3 text-sm leading-7 text-[#4f5f5a]">
                Revisaremos la información de producto, documentos, empaque y entrega necesaria para una cotización comparable para México.
              </p>
            </div>
            <Link href="/contact?mode=quote#contact-form" className="inline-flex min-h-12 items-center gap-2 bg-[#0f5f5c] px-7 py-3 text-sm font-bold text-white">
              Iniciar una cotización <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <CTABanner />
      <Footer />
    </>
  );
}
