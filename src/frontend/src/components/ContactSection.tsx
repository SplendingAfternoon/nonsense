import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { Send } from "lucide-react";
import { useState } from "react";
import GlitchText from "./GlitchText";
import TextReveal from "./TextReveal";

export default function ContactSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { actor, isFetching: isActorLoading } = useActor(createActor);

  const isReady = !!actor && !isActorLoading;
  const isDisabled = !isReady || isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isReady) return;
    setError(null);
    setIsPending(true);

    try {
      await actor.submitContactForm(email, message);
      setSubmitted(true);
      setEmail("");
      setMessage("");
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  const buttonLabel = !isReady
    ? "Initialising..."
    : isPending
      ? "Transmitting..."
      : "Send Message";

  return (
    <section id="contact" className="relative pt-24 pb-36 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto">
          <h2
            className="font-serif uppercase text-[#e8e4de] text-center mb-10 tracking-[0.1em] font-medium"
            style={{ fontSize: "clamp(24px, 3vw, 32px)" }}
          >
            <GlitchText text="CONTACT" durationMs={180} />
          </h2>

          <div className="space-y-10">
            <div className="text-center space-y-5">
              <div className="relative h-px mb-6">
                <div className="absolute left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-[#9e1a1a] glow-red-line" />
              </div>
              <TextReveal>
                <p className="font-sans text-[13px] tracking-[0.24em] text-[#9e1a1a] uppercase mb-3 glow-red-text">
                  Purchasing Coming Soon
                </p>
              </TextReveal>
              <TextReveal delay={100}>
                <p className="font-sans text-[14px] text-[#7a7570] tracking-[0.12em]">
                  Reach out for inquiries. We monitor all transmissions.
                </p>
              </TextReveal>
              <div className="relative h-px mt-6">
                <div className="absolute left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-[#9e1a1a] glow-red-line" />
              </div>
            </div>

            {submitted && (
              <div
                data-ocid="contact.success_state"
                className="text-center py-4 border border-[#9e1a1a]/30 bg-[#9e1a1a]/5"
              >
                <p className="font-sans text-[12px] text-[#9e1a1a] tracking-[0.16em] uppercase glow-red-text">
                  Message Received. We Will Contact You.
                </p>
              </div>
            )}

            {error && (
              <div
                data-ocid="contact.error_state"
                className="text-center py-4 border border-[#9e1a1a]/30"
              >
                <p className="font-sans text-[12px] text-[#9e1a1a] tracking-[0.16em] uppercase">
                  {error}
                </p>
              </div>
            )}

            <TextReveal delay={200}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="email"
                    data-ocid="contact.input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="YOUR EMAIL"
                    className="w-full px-6 py-4 bg-[#111111] border border-white/10 text-[#e8e4de] text-[12px] placeholder:text-[#7a7570] placeholder:text-[0.65rem] focus:border-[#9e1a1a] focus:outline-none transition-colors duration-300 tracking-[0.18em]"
                    required
                    disabled={isDisabled}
                  />
                </div>

                <div>
                  <textarea
                    data-ocid="contact.textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="YOUR MESSAGE"
                    rows={6}
                    className="w-full px-6 py-4 bg-[#111111] border border-white/10 text-[#e8e4de] text-[12px] placeholder:text-[#7a7570] placeholder:text-[0.65rem] focus:border-[#9e1a1a] focus:outline-none transition-colors duration-300 tracking-[0.18em] resize-none"
                    required
                    disabled={isDisabled}
                  />
                </div>

                <button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={isDisabled}
                  className="w-full px-7 py-4 bg-[#111111] border border-white/20 text-[#e8e4de] text-[12px] hover:border-[#9e1a1a] hover:text-[#9e1a1a] transition-colors duration-300 flex items-center justify-center gap-2.5 group tracking-[0.18em] uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{buttonLabel}</span>
                  <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>
            </TextReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
