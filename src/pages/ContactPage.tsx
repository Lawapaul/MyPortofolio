import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";
import { CONTACT_DATA } from "@/data/portfolioData";
import { PageShell } from "@/components/common/PageShell";
import { AppleHeroUnbox } from "@/components/common/AppleUnboxStage";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const lastSubmittedRef = useRef<number>(0);

  useEffect(() => {
    emailjs.init(CONTACT_DATA.emailJsConfig.publicKey);
  }, []);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (trimmedName.length < 2) {
      nextErrors.name = "Please enter your name (at least 2 characters).";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (trimmedMessage.length < 10) {
      nextErrors.message = "Please enter a message with at least 10 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (formData.honeypot.trim() !== "") {
      setStatus("success");
      return;
    }

    const now = Date.now();
    if (now - lastSubmittedRef.current < 15000) {
      setStatus("error");
      setErrorMessage("Please wait a moment before sending another message.");
      return;
    }

    if (!validate()) {
      return;
    }

    setStatus("submitting");

    try {
      await emailjs.send(
        CONTACT_DATA.emailJsConfig.serviceId,
        CONTACT_DATA.emailJsConfig.templateId,
        {
          to_email: CONTACT_DATA.recipientEmail,
          reply_to: formData.email.trim(),
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          message: formData.message.trim(),
        }
      );

      lastSubmittedRef.current = Date.now();
      setStatus("success");
      setFormData({ name: "", email: "", message: "", honeypot: "" });
      setErrors({});
      toast.success("Message sent! I'll get back to you soon.");
    } catch (err) {
      console.error("EmailJS submission error:", err);
      setStatus("error");
      const providerError = err as { status?: number; text?: string; message?: string };
      const providerDetails = `${providerError.text ?? ""} ${providerError.message ?? ""}`;
      const needsReconnect = /invalid grant|reconnect your gmail/i.test(providerDetails);
      setErrorMessage(
        needsReconnect
          ? `Email delivery is temporarily unavailable. Please contact me directly at ${CONTACT_DATA.email} while the mail connection is restored.`
          : `Unable to send right now. Please contact me directly at ${CONTACT_DATA.email}.`
      );
      toast.error("Failed to send message. Please try again later.");
    }
  };

  const contactChannels = [
    {
      label: "Email",
      value: CONTACT_DATA.email,
      href: CONTACT_DATA.emailHref,
      icon: Mail,
      accent: "#E86A33",
    },
    {
      label: "GitHub",
      value: "github.com/Lawapaul",
      href: CONTACT_DATA.github,
      icon: Github,
      accent: "#C8C2BC",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/harshitshekhawat",
      href: CONTACT_DATA.linkedin,
      icon: Linkedin,
      accent: "#F29A4A",
    },
  ];

  return (
    <PageShell
      variant="contact-terminal"
      title="Contact | Harshit Singh Shekhawat — AI / ML Engineer"
    >
      <AppleHeroUnbox frameLabel="Direct Collaboration & Engineering Inquiries">
        <div className="pt-24 pb-14 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
          <section className="container">
            <div className="max-w-4xl mb-10 md:mb-16">
              <h1 className="display-section">{CONTACT_DATA.heading}</h1>

              <p className="mt-5 sm:mt-6 body-large max-w-[58ch]">
                {CONTACT_DATA.introduction}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
              {/* Left Column: Direct Contact Channels */}
              <div className="lg:col-span-5 space-y-5 sm:space-y-6 min-w-0">
                <div className="space-y-2">
                  <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">
                    Reach Out Directly
                  </h2>
                </div>

                <div className="space-y-3.5 sm:space-y-4">
                  {contactChannels.map((channel) => {
                    const Icon = channel.icon;
                    return (
                      <a
                        key={channel.label}
                        href={channel.href}
                        target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={
                          channel.href.startsWith("mailto:")
                            ? undefined
                            : "noopener noreferrer"
                        }
                        className="group rounded-2xl sm:rounded-3xl surface-graphite surface-interactive p-5 sm:p-6 flex items-center justify-between gap-3 sm:gap-4 border border-white/14 min-w-0"
                      >
                        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
                          <div
                            className="w-12 h-12 sm:w-14 sm:h-14 p-3 rounded-2xl bg-[#141519] border border-[#FF6B2B]/35 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,107,43,0.15)]"
                            style={{ color: channel.accent }}
                          >
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-heading text-lg sm:text-xl font-bold text-[#F5F3F0] transition-colors">
                              {channel.label}
                            </p>
                            <p className="font-mono text-xs sm:text-sm font-normal text-[#C8C5BF] truncate mt-0.5">
                              {channel.value}
                            </p>
                          </div>
                        </div>

                        <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#141519]/90 border border-white/10 flex items-center justify-center text-[#C8C5BF] group-hover:text-[#101114] group-hover:bg-[#E86A33] group-hover:border-[#E86A33] transition-all shrink-0">
                          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: High-Craft Accessible Contact Form */}
              <div className="lg:col-span-7 min-w-0">
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="rounded-[1.75rem] sm:rounded-[2.25rem] surface-glass border border-[#FF6B2B]/30 p-6 sm:p-10 lg:p-12 space-y-6"
                >
                  <div className="space-y-1.5">
                    <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">
                      Send a Message
                    </h2>
                    <p className="text-sm sm:text-base text-[#D6D2CC]">
                      Fill out the form below and I will get back to you promptly.
                    </p>
                  </div>

                  {/* Honeypot Spam Field */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="company_website">Company Website</label>
                    <input
                      id="company_website"
                      name="company_website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) =>
                        setFormData({ ...formData, honeypot: e.target.value })
                      }
                    />
                  </div>

                  {/* Field 1: Your name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-name"
                      className="block font-heading text-sm sm:text-base font-bold text-[#F5F3F0]"
                    >
                      Your name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      className="w-full rounded-2xl bg-[#141519]/90 border border-[#F5F3F0]/18 focus:border-[#E86A33] px-4 sm:px-5 py-3.5 text-sm sm:text-base text-[#F5F3F0] placeholder:text-[#C4BFB9]/45 transition-colors focus:outline-none"
                    />
                    {errors.name && (
                      <p
                        id="contact-name-error"
                        role="alert"
                        className="text-xs sm:text-sm font-semibold text-red-400 flex items-center gap-1.5"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Field 2: Your email */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-email"
                      className="block font-heading text-sm sm:text-base font-bold text-[#F5F3F0]"
                    >
                      Your email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="Your email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      className="w-full rounded-2xl bg-[#141519]/90 border border-[#F5F3F0]/18 focus:border-[#E86A33] px-4 sm:px-5 py-3.5 text-sm sm:text-base text-[#F5F3F0] placeholder:text-[#C4BFB9]/45 transition-colors focus:outline-none"
                    />
                    {errors.email && (
                      <p
                        id="contact-email-error"
                        role="alert"
                        className="text-xs sm:text-sm font-semibold text-red-400 flex items-center gap-1.5"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Field 3: Your message */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-message"
                      className="block font-heading text-sm sm:text-base font-bold text-[#F5F3F0]"
                    >
                      Your message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Your message"
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message)
                          setErrors({ ...errors, message: undefined });
                      }}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? "contact-message-error" : undefined
                      }
                      className="w-full rounded-2xl bg-[#141519]/90 border border-[#F5F3F0]/18 focus:border-[#E86A33] px-4 sm:px-5 py-3.5 text-sm sm:text-base text-[#F5F3F0] placeholder:text-[#C4BFB9]/45 transition-colors resize-none focus:outline-none"
                    />
                    {errors.message && (
                      <p
                        id="contact-message-error"
                        role="alert"
                        className="text-xs sm:text-sm font-semibold text-red-400 flex items-center gap-1.5"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Status Banners */}
                  {status === "success" && (
                    <div
                      role="status"
                      className="rounded-2xl bg-[#E86A33]/18 border border-[#E86A33]/50 p-4 flex items-center gap-3 text-sm sm:text-base text-[#F5F3F0]"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#E86A33] shrink-0" />
                      <span>
                        Thank you! Your message has been sent. I will get back to you soon.
                      </span>
                    </div>
                  )}

                  {status === "error" && errorMessage && (
                    <div
                      role="alert"
                      className="rounded-2xl bg-red-500/15 border border-red-400/45 p-4 flex items-center gap-3 text-sm sm:text-base text-[#F5F3F0]"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#FF6B2B] hover:bg-[#FFA048] disabled:opacity-60 text-[#0A0B0E] font-heading font-semibold text-sm sm:text-base transition-all shadow-[0_14px_38px_-8px_rgba(255,107,43,0.55)]"
                  >
                    <span>
                      {status === "submitting" ? "Sending Message..." : "Send Message"}
                    </span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </AppleHeroUnbox>
    </PageShell>
  );
};

export default ContactPage;
