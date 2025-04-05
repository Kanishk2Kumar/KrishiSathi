import DownloadApp from "@/components/DownloadApp";
import { Features } from "@/components/Features";
import Hero from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <Testimonials />
      <DownloadApp />
    </div>
  );
}
