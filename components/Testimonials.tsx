import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";

const reviews = [
    {
      name: "Ramesh Yadav",
      username: "किसान, उत्तर प्रदेश",
      body: "Krishi Saathi ने मेरी फसल में बीमारी को जल्दी पकड़ लिया। इससे मेरी मेहनत और पैसा दोनों बचा।",
      img: "https://avatar.vercel.sh/jack",
    },
    {
      name: "Sita Devi",
      username: "किसान, बिहार",
      body: "अब सरकार की योजनाओं की जानकारी समय पर मिल जाती है, धन्यवाद Krishi Saathi!",
      img: "https://avatar.vercel.sh/jill",
    },
    {
      name: "Mukesh Patel",
      username: "Farmer, Gujarat",
      body: "Smart irrigation alerts from Krishi Saathi helped me reduce water usage and improve my yield.",
      img: "https://avatar.vercel.sh/john",
    },
    {
      name: "Lakshmi Bai",
      username: "शेतकरी, महाराष्ट्र",
      body: "Krishi Saathi मुळे मला स्थानिक भाषेत मार्गदर्शन मिळालं, त्यामुळे निर्णय घेणं सोपं झालं.",
      img: "https://avatar.vercel.sh/jane",
    },
    {
      name: "Harbhajan Singh",
      username: "ਕਿਸਾਨ, Punjab",
      body: "The AI predictions for weather and soil health are spot on. Very helpful!",
      img: "https://avatar.vercel.sh/jenny",
    },
    {
      name: "Anita Kumari",
      username: "शेतकरी, नागपूर",
      body: "फसल विक्री थेट बाजारात करता आली. दलालांशिवाय जास्त नफा मिळाला.",
      img: "https://avatar.vercel.sh/james",
    },
  ];  

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function Testimonials() {
  return (
    <div className="mx-48 my-10">
        <h2 className="mb-8 text-center text-4xl font-bold text-gray-900 dark:text-white font-cormorant-garamond">
          What our users say !
        </h2>
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
    </div>
  );
}
