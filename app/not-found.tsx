import {
    AnimatedSpan,
    Terminal,
    TypingAnimation,
  } from "@/components/magicui/terminal";
  import Link from "next/link";
  
  export default function NotFound() {
    return (
      <div className="flex min-h-screen justify-center items-center min-w-screen">
        <Terminal className="min-h-56">
          <TypingAnimation>&gt; system-check --run</TypingAnimation>
  
          <AnimatedSpan delay={1500} className="text-red-500">
            <span>✖ Boot sequence failed.</span>
          </AnimatedSpan>
  
          <AnimatedSpan delay={3500} className="text-red-500">
            <span>✖ Unable to locate requested resource.</span>
          </AnimatedSpan>
  
          <TypingAnimation delay={4000} className="text-yellow-400">
            ⚠ ERROR 404: Page Not Found
          </TypingAnimation>
  
          <TypingAnimation delay={5000} className="text-muted-foreground">
            The system encountered a fatal exception and couldn't recover.
          </TypingAnimation>
  
          <AnimatedSpan delay={6500} className="text-muted-foreground">
            <span>
              Please return to the{" "}
              <Link href="/" className="underline inline-block mr-1">homepage</Link>.
            </span>
          </AnimatedSpan>
        </Terminal>
      </div>
    );
  }
  