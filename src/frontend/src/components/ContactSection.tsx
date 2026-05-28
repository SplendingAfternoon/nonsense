import { Send } from "lucide-react";
import { useState } from "react";
import { useSubmitContactForm } from "../hooks/useQueries";
import HackerText from "./HackerText";
import TextReveal from "./TextReveal";

export default function ContactSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const submitForm = useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitForm.mutateAsync({ email, message });
      setSubmitted(true);
      setEmail("");
      setMessage("");

      // Reset submitted state after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Contact form submission error:", error);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[2.5rem] md:text-[4rem] font-extralight mb-20 text-center">
            <HackerText text="CONTACT" />
          </h2>

          <div className="space-y-10">
            <div className="text-center space-y-5">
              <div className="relative h-px mb-6">
                <div className="absolute left-1/2 -translate-x-1/2 w-3/4 h-full bg-blood-red glow-red-line" />
              </div>
              <TextReveal>
                <p className="text-lg md:text-xl font-extralight tracking-[0.24em] text-blood-red uppercase mb-3 glow-red-text">
                  Purchasing Coming Soon
                </p>
              </TextReveal>
              <TextReveal delay={100}>
                <p className="text-sm text-white/60 tracking-[0.12em]">
                  Reach out for inquiries. We monitor all transmissions.
                </p>
              </TextReveal>
              <div className="relative h-px mt-6">
                <div className="absolute left-1/2 -translate-x-1/2 w-3/4 h-full bg-blood-red glow-red-line" />
              </div>
            </div>

            {submitted && (
              <div className="text-center py-4 border border-blood-red/30 bg-blood-red/5 animate-flicker-in">
                <p className="text-sm text-blood-red tracking-[0.16em] uppercase glow-red-text">
                  Message Received. We Will Contact You.
                </p>
              </div>
            )}

            <TextReveal delay={200}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="YOUR EMAIL"
                    className="w-full px-6 py-4 bg-rich-black border border-white/10 text-white text-xs placeholder:text-white/30 placeholder:text-[0.65rem] focus:border-blood-red focus:outline-none transition-all duration-600 tracking-[0.18em] focus:glow-red-border"
                    style={{
                      transitionTimingFunction:
                        "cubic-bezier(0.4, 0.0, 0.2, 1)",
                    }}
                    required
                    disabled={submitForm.isPending}
                  />
                </div>

                <div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="YOUR MESSAGE"
                    rows={6}
                    className="w-full px-6 py-4 bg-rich-black border border-white/10 text-white text-xs placeholder:text-white/30 placeholder:text-[0.65rem] focus:border-blood-red focus:outline-none transition-all duration-600 tracking-[0.18em] resize-none focus:glow-red-border"
                    style={{
                      transitionTimingFunction:
                        "cubic-bezier(0.4, 0.0, 0.2, 1)",
                    }}
                    required
                    disabled={submitForm.isPending}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitForm.isPending}
                  className="w-full px-7 py-4 bg-rich-black border border-white/20 text-white text-xs hover:border-blood-red hover:text-blood-red transition-all duration-600 flex items-center justify-center gap-2.5 group tracking-[0.18em] uppercase hover:glow-red-border disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)",
                  }}
                >
                  <span className="group-hover:glow-red-text">
                    {submitForm.isPending ? "Transmitting..." : "Send Message"}
                  </span>
                  <Send
                    className="w-3.5 h-3.5 group-hover:translate-x-1 transition-all duration-600"
                    style={{
                      transitionTimingFunction:
                        "cubic-bezier(0.4, 0.0, 0.2, 1)",
                    }}
                  />
                </button>
              </form>
            </TextReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
