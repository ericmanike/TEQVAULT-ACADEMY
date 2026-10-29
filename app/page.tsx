import Image from "next/image";
import ApplicationForm from "@/components/ApplicationForm";
import { ArrowBigDown, Send } from "lucide-react";

const outcomes = [
  ["01", "Learn by building", "Ship real projects with a small, supportive cohort."],
  ["02", "Career-ready skills", "Master the tools and habits modern product teams use."],
  ["03", "A community for life", "Meet your people and keep growing together after demo day."],
];

export default function Home() {
  return (
    <main>
      <nav className="site-nav">
        <a className="brand" href="#" aria-label="TEQVAULT Academy home">
          <span className="brand-name">TEQVAULT<span className="brand-dot">.</span></span>
          <span className="brand-academy">ACADEMY</span>
        </a>
        <a className="button-dark p-3 " href="#apply">APPLY FOR THE NEXT COHORT </a>
      </nav>

      <section className="hero max-md:p-0 max-md:text-2xl">
        <div className="hero-copy">
         <p className="eyebrow"><span className="eyebrow-line" /> START YOUR TECH JOURNEY</p>
         <h1 className=" text-1xl md:text-3xl">Code your future.<br /><em>one line at a time.</em></h1>
          <p className="hero-lede">
            An 3 to 7-week, hands-on journey from curious beginner to confident builder. Just the skills, support, and momentum to start your next chapter.
          </p>
          <a className="button button-dark" href="#apply">Start your application <ArrowBigDown/></a>
          <p className="hero-note">Next cohort starts Soon <span>·</span> 10 seats</p>
        </div>
        <div className="hero-art">
          <Image
            src="/teqvault-training-flyer.png"
            alt="TEQVAULT website development mentorship flyer"
            fill
            priority
            sizes="(max-width: 800px) 90vw, 40vw"
            className="hero-image"
          />
        </div>
      </section>

      <section className="outcomes">
        <p className="eyebrow"><span className="eyebrow-line" /> WHY TEQVAULT</p>
        <div className="outcome-grid">
          {outcomes.map(([number, title, copy]) => (
            <article className="outcome" key={number}>
              <span className="outcome-number">{number}</span>
              <h2>{title}</h2>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="application-section" id="apply">
        <div className="application-intro">
          <p className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT CHAPTER</p>
          <h2>Ready to level up? <br /><em>apply here</em></h2>
          <p>Turn your curiosity into a career.</p>
          <div className="application-meta"><span>⟡</span> Applications are currently open</div>
        </div>
        <ApplicationForm />
      </section>

      <footer>
        <div className="footer-left">
                  <a className="brand" href="#" aria-label="TEQVAULT Academy home">
          <span className="brand-name">TEQVAULT<span className="brand-dot">.</span></span>
          <span className="brand-academy">ACADEMY</span>
        </a>
   
          <a
            className="community-button"
            href="https://whatsapp.com/channel/0029VbBcIbS7T8beipl8aZ1x"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join the community <Send />
          </a>
        </div>
        <p>Build boldly. Stay curious.</p>
        <span>© 2026 TEQVAULT</span>
      </footer>
    </main>
  );
}
