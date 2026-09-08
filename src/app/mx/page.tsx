import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SlotImage } from "@/components/ui/SlotImage";
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
import FaqSection from "@/components/ui/FaqSection";
import { buildMetadata, breadcrumbSchema, canonicalUrl, faqSchema } from "@/lib/seo";

const TITLE = "Rollos de Papel Térmico y Etiquetas Térmicas para México";
const DESCRIPTION =
  "Rollos de papel térmico y etiquetas térmicas para distribuidores en México. Formatos 80x80 y 57/58 mm, etiquetas 4x6 y de código de barras, con muestras y documentos.";

const DELIVERY_TERMS =
  "Términos FOB, CIF o de entrega específicos según destino, cotizados tras revisar ruta, aduana y responsabilidades";

const HIGHLIGHTS = [
  "Formatos comunes de 80 mm, 57/58 mm y personalizados, confirmados por modelo de impresora y muestra",
  "Grado del papel, dimensiones, bobinado y empaque en caja alineados antes de emitir la cotización",
  "Los documentos de cumplimiento se asocian al grado seleccionado y al uso previsto, no se asumen de forma universal",
  "Planes de empaque de SKU mixto, tarima y marca privada revisados por canal y ruta de entrega",
  "Destino, código postal, alcance aduanero y responsabilidades del Incoterm quedan indicados en la cotización",
  "Impresión OEM y empaque de marca revisados contra el arte, los pasos de aprobación y el volumen anual",
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/mx",
  locale: "es_MX",
  languages: {
    "es-MX": "https://www.zhixinpaper.com/mx",
    "x-default": "https://www.zhixinpaper.com/mx",
  },
});

const PRODUCTS = [
  {
    title: "Rollos para punto de venta",
    description: "Formatos comunes de 80 mm y 57/58 mm, definidos por ancho, diámetro exterior, núcleo, longitud y sentido de bobinado.",
    href: "/products/thermal-paper-rolls/standard-pos-rolls",
    image: "/images/thermal-rolls-product.jpg",
    link: "Ver rollos para punto de venta",
  },
  {
    title: "Etiquetas de código de barras",
    description: "Etiquetas de código de barras, de inventario, de tarima y para envíos (4x6), en térmica directa o transferencia térmica, validadas con muestra escaneada.",
    href: "/mx/etiquetas-codigo-barras",
    image: "/images/thermal-labels-product.jpg",
    link: "Ver etiquetas de código de barras",
  },
  {
    title: "Impresión personalizada y marca privada",
    description: "Opciones de impresión, empaque y marca privada revisadas contra el arte, la especificación, el volumen y el proceso de aprobación.",
    href: "/oem-custom",
    image: "/images/factory-overview.jpg",
    link: "Ver opciones de personalización",
  },
];

const FAQS = [
  {
    question: "¿Qué información se necesita para cotizar rollos de papel térmico?",
    answer:
      "Proporcione el ancho, la longitud o el diámetro exterior, el núcleo, el sentido de bobinado, el modelo de impresora, la cantidad, el empaque y el destino. Una muestra física o la ficha técnica actual ayuda a confirmar la equivalencia.",
  },
  {
    question: "¿Pueden cotizar rollos de 80 mm y de 57 o 58 mm?",
    answer:
      "Sí. Estas familias de medidas están dentro de nuestro rango. La especificación final se confirma por ancho, longitud real, diámetro, núcleo, gramaje y compatibilidad con la impresora.",
  },
  {
    question: "¿Qué documentos de cumplimiento están disponibles?",
    answer:
      "El paquete de documentos depende del grado seleccionado y del uso final. Antes de ordenar, confirmamos por escrito el alcance requerido, como BPA, REACH, FSC, contacto con alimentos u otros documentos aplicables.",
  },
  {
    question: "¿Cómo se cotiza la entrega a México?",
    answer:
      "Los términos FOB, CIF y otros se cotizan según el volumen, el destino, el código postal y el tipo de embarque. El costo, el calendario y las responsabilidades aduaneras deben confirmarse en la oferta comercial.",
  },
];

export default function MexicoPage() {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: "/" },
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
      about: ["Papel térmico", "Rollos de papel térmico", "Etiquetas térmicas"],
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
        <section className="relative isolate min-h-[clamp(380px,50vh,620px)] overflow-hidden bg-[#101b19] text-white">
          <SlotImage
            slotKey="geo.mx.hero"
            alt="Rollos de papel térmico preparados para suministro de mayoreo"
            fill
            fetchPriority="high"
            loading="eager"
            quality={65}
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-[#101b19]/62" />
          <div className="container-site flex min-h-[clamp(380px,50vh,620px)] items-center py-16 md:py-20">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#d6b273]">Suministro B2B para México</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-6xl">
                Rollos de papel térmico y etiquetas térmicas para México
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#dce4df] md:text-lg">
                Rollos de papel térmico y etiquetas térmicas para distribuidores, importadores y compradores de marca privada en México. Antes de cotizar el proyecto se confirman las dimensiones, la compatibilidad con la impresora, el grado del material, los documentos de cumplimiento, el empaque y las responsabilidades de entrega.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact?mode=quote#contact-form"
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#9c661d] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#7d4f16]"
                >
                  Solicitar cotización <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact?mode=samples#contact-form"
                  className="inline-flex min-h-12 items-center justify-center border border-white/45 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Solicitar muestras
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#ded6c8] bg-[#f3efe8] py-6">
          <div className="container-site flex flex-wrap items-center gap-3 text-sm">
            <span className="font-semibold text-[#14211f]">Comparación de mercados en Norteamérica:</span>
            <Link href="/us" className="inline-flex items-center gap-2 font-semibold text-[#0f5f5c] hover:text-[#0a4745]">
              Ver requisitos de papel térmico en EE. UU. <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/ca" className="inline-flex items-center gap-2 font-semibold text-[#0f5f5c] hover:text-[#0a4745]">
              Ver requisitos de papel térmico en Canadá <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="border-b border-[#ded6c8] bg-white">
          <div className="container-site grid gap-px bg-[#ded6c8] sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Ruler, label: "Medidas", value: "80 mm, 57/58 mm y formatos personalizados" },
                { icon: ClipboardCheck, label: "Validación", value: "Impresora, núcleo, diámetro y sentido de bobinado" },
                { icon: PackageCheck, label: "Empaque", value: "Opciones de caja, tarima y SKU mixto cotizadas por proyecto" },
                { icon: Ship, label: "Entrega", value: DELIVERY_TERMS },
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
              <p className="text-sm font-semibold text-[#9c661d]">Líneas de producto para México</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#14211f] md:text-4xl">
                Líneas de producto configuradas para proyectos en México
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#4f5f5a]">
                Cada proyecto en México se revisa contra el grado exacto del producto, la impresora, el uso previsto, los documentos, el empaque y los requisitos de destino antes de emitir una cotización comparable.
              </p>
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
              <p className="text-sm font-semibold text-[#9c661d]">Información para cotizar</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#14211f] md:text-4xl">
                Una cotización útil empieza con una especificación completa
              </h2>
              <p className="mt-5 text-base leading-8 text-[#4f5f5a]">
                No compare únicamente el precio por rollo. La longitud real, el diámetro, el núcleo, el grado del papel y el empaque afectan el desempeño y el costo puesto en destino.
              </p>
              <Link href="/contact?mode=quote#contact-form" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c]">
                Abrir el formulario de cotización <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-px border border-[#ded6c8] bg-[#ded6c8] sm:grid-cols-2">
                {HIGHLIGHTS.map((item) => (
                  <div key={item} className="flex min-h-24 items-start gap-3 bg-[#fbfaf6] p-5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0f5f5c]" />
                    <p className="text-sm font-semibold leading-6 text-[#33413e]">{item}</p>
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
                Confirme el alcance de los documentos según el grado del material y la aplicación
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#c7d0cb]">
                Los requisitos varían según el mercado, las condiciones de contacto, el sustrato y el uso final. Antes de aprobar un pedido, solicite el nombre del grado del material y la lista exacta de declaraciones o reportes que deben acompañar el embarque.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Opciones BPA y fenol", href: "/compliance/bpa-free" },
                { label: "REACH y RoHS", href: "/compliance/reach-rohs" },
                { label: "Sistema de calidad ISO 9001", href: "/compliance/iso-9001" },
                { label: "Opciones FSC", href: "/compliance/fsc-paper" },
                { label: "Planeación de exportación y aduana", href: "/mx/export-and-customs" },
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

        <FaqSection
          id="faq"
          faqs={FAQS}
          title="Antes de solicitar un precio"
          intro="Confirme la especificación del producto, los documentos, el empaque y los datos de destino necesarios para una cotización comparable."
          eyebrow="Preguntas frecuentes"
          tone="light"
        />

        <section className="border-t border-[#ded6c8] bg-[#e7eee9] py-16">
          <div className="container-site flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-[#14211f]">Envíe sus dimensiones, volumen y destino</h2>
              <p className="mt-3 text-sm leading-7 text-[#4f5f5a]">
                Revisaremos la especificación necesaria para preparar una cotización comparable y, cuando corresponda, un plan de muestras.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact?mode=quote#contact-form" className="inline-flex min-h-12 items-center gap-2 bg-[#0f5f5c] px-7 py-3 text-sm font-bold text-white">
                Solicitar cotización <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex min-h-12 items-center border border-[#0f5f5c]/30 px-7 py-3 text-sm font-bold text-[#0f5f5c]">
                Contactar a ventas
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
