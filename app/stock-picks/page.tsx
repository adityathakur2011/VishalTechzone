import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function StockPicksPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Stock Picks
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Stock picks page
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

