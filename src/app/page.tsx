import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { NowSection } from "@/components/site/now-section";
import { Reading } from "@/components/site/reading";
import { Experiments } from "@/components/site/experiments";
import { Elsewhere } from "@/components/site/elsewhere";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="hairline h-px w-full" aria-hidden />
        </div>
        <NowSection />
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="hairline h-px w-full" aria-hidden />
        </div>
        <Reading />
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="hairline h-px w-full" aria-hidden />
        </div>
        <Experiments />
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="hairline h-px w-full" aria-hidden />
        </div>
        <Elsewhere />
      </main>
      <Footer />
    </div>
  );
}
