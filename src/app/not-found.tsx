import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="min-h-[70vh] flex items-center bg-white">
          <div className="container-site text-center">
            <div className="font-bold text-blue-600 text-[120px] leading-none mb-4">404</div>
            <h1 className="font-bold text-slate-900 text-4xl mb-4">Page Not Found</h1>
            <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto">
              The page you are looking for does not exist or has been moved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm text-sm">Back to Home <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/products" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all text-sm">View Products</Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all text-sm">Contact Us</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
