import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

const fields = [
  {
    name: "fullName",
    label: "Full name",
    type: "text",
    placeholder: "Your full name",
    autoComplete: "name",
  },
  {
    name: "mobile",
    label: "Mobile number",
    type: "tel",
    placeholder: "Best number to reach you",
    autoComplete: "tel",
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    placeholder: "you@clinic.com",
    autoComplete: "email",
  },
  {
    name: "message",
    label: "Message (optional)",
    type: "textarea",
    placeholder: "Any questions about the course? Tell us here.",
    autoComplete: "off",
  },
];

/* ---------- Underline-style input with animated focus line ---------- */
const Field = ({ field, value, error, onChange }) => {
  const [focused, setFocused] = useState(false);
  const { name, label, type, placeholder, autoComplete } = field;

  const inputProps = {
    id: name,
    name,
    value,
    placeholder,
    autoComplete,
    onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    "aria-invalid": !!error,
    "aria-describedby": error ? `${name}-error` : undefined,
    className:
      "w-full pb-2.5 text-[12px] text-white bg-transparent border-b outline-none placeholder:text-white/35 border-white/15",
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[8.5px] font-semibold uppercase tracking-[0.2em] text-white/45"
      >
        {label}
      </label>

      <div className="relative mt-2">
        {type === "textarea" ? (
          <textarea
            {...inputProps}
            rows={3}
            maxLength={500}
            className={`${inputProps.className} resize-none leading-relaxed`}
          />
        ) : (
          <input type={type} {...inputProps} />
        )}
        {/* animated focus underline */}
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="absolute left-0 -bottom-px h-px w-full origin-left bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]"
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            id={`${name}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-1.5 text-[10px] text-red-400/90"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const Form = () => {
  const reduce = useReducedMotion();

  const [values, setValues] = useState({ fullName: "", mobile: "", email: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  /* shared reveal helpers */
  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, ease: EASE, delay },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!values.fullName.trim()) er.fullName = "Please enter your full name.";
    if (!/^[+()\d\s-]{7,}$/.test(values.mobile.trim()))
      er.mobile = "Please enter a valid mobile number.";
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim()))
      er.email = "Please enter a valid email address.";
    if (!consent) er.consent = "Please tick the consent box to continue.";
    return er;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const er = validate();
    setErrors(er);
    setServerError("");

    if (Object.keys(er).length) {
      setShakeKey((k) => k + 1);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, consent }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // server-side field errors thakle field er niche dekhao
        if (data.errors) setErrors(data.errors);
        setServerError(data.message || "Something went wrong. Please try again.");
        setShakeKey((k) => k + 1);
        return;
      }

      setSubmitted(true);
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    document
      .getElementById("course-enquiry")
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };

  return (
    <section id="enquire" className="px-4 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[560px] text-center">
        {/* Heading */}
        <h2 className="font-serif font-bold uppercase leading-[1.05] tracking-tight text-white text-[34px] sm:text-[48px] lg:text-[56px]">
          <motion.span
            className="block"
            {...reveal(0)}
          >
            Ready to learn
          </motion.span>
          <motion.span className="block" {...reveal(0.12)}>
            <motion.span
              className="text-cyan-400"
              animate={
                reduce
                  ? undefined
                  : {
                      textShadow: [
                        "0 0 18px rgba(34,211,238,0.35)",
                        "0 0 34px rgba(34,211,238,0.65)",
                        "0 0 18px rgba(34,211,238,0.35)",
                      ],
                    }
              }
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ textShadow: "0 0 26px rgba(34,211,238,0.45)" }}
            >
              Sculptra
            </motion.span>
            ?
          </motion.span>
        </h2>

        <motion.p
          className="mx-auto mt-6 max-w-[460px] text-[12.5px] leading-relaxed text-white/65"
          {...reveal(0.22)}
        >
          Take the next step in your aesthetics training journey. Request
          course information, pricing and upcoming availability from our team.
        </motion.p>

        {/* Top CTA */}
        <motion.button
          type="button"
          onClick={scrollToForm}
          {...reveal(0.3)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-3 px-6 h-[42px] mt-8 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#06222a] bg-cyan-400 rounded-md shadow-[0_0_28px_rgba(34,211,238,0.35)] hover:bg-cyan-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          Get course details &amp; prices
          <motion.span
            animate={reduce ? undefined : { x: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <ArrowRight size={14} />
          </motion.span>
        </motion.button>

        {/* Form card */}
        <motion.div
          id="course-enquiry"
          {...reveal(0.1)}
          className="relative p-6 mt-12 overflow-hidden text-left rounded-xl border border-white/10 bg-[#141a1b]/80 backdrop-blur-sm sm:p-8"
        >
          {/* soft glow */}
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 w-56 h-56 rounded-full pointer-events-none bg-cyan-400/10 blur-3xl"
          />

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative flex flex-col items-center py-10 text-center"
                role="status"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
                  className="flex items-center justify-center w-14 h-14 rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                >
                  <Check size={24} strokeWidth={2} />
                </motion.span>
                <h3 className="mt-6 font-serif text-[20px] font-bold text-white">
                  Thank you, {values.fullName.split(" ")[0]}
                </h3>
                <p className="mt-2 max-w-[320px] text-[12px] leading-relaxed text-white/60">
                  Your enquiry has been received. Our team will be in touch
                  shortly with course details and pricing.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                exit={{ opacity: 0, y: -10 }}
                className="relative"
              >
                {/* Card header */}
                <motion.div
                  className="flex items-center justify-between gap-3"
                  {...reveal(0.1)}
                >
                  <p className="text-[8.5px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
                    [ Course enquiry ]
                  </p>
                  <span className="px-2.5 py-1 text-[7.5px] font-semibold uppercase tracking-[0.16em] text-cyan-300 border rounded-full border-cyan-400/40">
                    No obligation
                  </span>
                </motion.div>

                <motion.h3
                  className="mt-4 font-serif text-[22px] font-bold leading-tight text-white"
                  {...reveal(0.16)}
                >
                  Request details &amp; prices
                </motion.h3>

                {/* Fields (staggered) */}
                <motion.div
                  key={shakeKey}
                  animate={
                    shakeKey && !reduce
                      ? { x: [0, -8, 8, -6, 6, 0] }
                      : { x: 0 }
                  }
                  transition={{ duration: 0.4 }}
                  className="mt-6 space-y-6"
                >
                  {fields.map((field, i) => (
                    <motion.div key={field.name} {...reveal(0.22 + i * 0.08)}>
                      <Field
                        field={field}
                        value={values[field.name]}
                        error={errors[field.name]}
                        onChange={handleChange}
                      />
                    </motion.div>
                  ))}

                  {/* Consent */}
                  <motion.div {...reveal(0.58)}>
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => {
                          setConsent(e.target.checked);
                          if (errors.consent)
                            setErrors((er) => ({ ...er, consent: undefined }));
                        }}
                        className="sr-only peer"
                      />
                      <span className="flex items-center justify-center w-3.5 h-3.5 mt-0.5 border rounded-[3px] shrink-0 border-cyan-400/60 bg-transparent transition-colors peer-checked:bg-cyan-400 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cyan-300">
                        <AnimatePresence>
                          {consent && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              className="text-[#06222a]"
                            >
                              <Check size={10} strokeWidth={3.5} />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                      <span className="text-[10px] leading-relaxed text-white/60">
                        I agree to my details being used to respond to this
                        enquiry, as described in the{" "}
                        <a
                          href="/privacy"
                          className="underline text-cyan-300 hover:text-cyan-200"
                        >
                          privacy notice
                        </a>
                        .
                      </span>
                    </label>
                    <AnimatePresence>
                      {errors.consent && (
                        <motion.p
                          role="alert"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-1.5 text-[10px] text-red-400/90"
                        >
                          {errors.consent}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  {...reveal(0.66)}
                  whileHover={loading ? undefined : { scale: 1.02 }}
                  whileTap={loading ? undefined : { scale: 0.98 }}
                  className="flex items-center justify-center w-full gap-3 h-[44px] mt-7 disabled:opacity-70 disabled:cursor-not-allowed text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#06222a] bg-cyan-400 rounded-md shadow-[0_0_28px_rgba(34,211,238,0.3)] hover:bg-cyan-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                >
                  {loading ? "Sending..." : "Get course details & prices"}
                  {!loading && <ArrowRight size={14} />}
                </motion.button>

                <AnimatePresence>
                  {serverError && (
                    <motion.p
                      role="alert"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-3 text-center text-[11px] text-red-400/90"
                    >
                      {serverError}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.p
                  className="flex items-center justify-center gap-1.5 mt-4 text-[8px] uppercase tracking-[0.18em] text-white/40"
                  {...reveal(0.72)}
                >
                  <ShieldCheck size={10} className="text-cyan-400/70" />
                  Your details stay private. No obligation to book.
                </motion.p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p
          className="mt-6 text-[9px] leading-relaxed text-white/40"
          {...reveal(0.1)}
        >
          Our team will confirm qualifications, eligibility and other course
          details when they contact you.
        </motion.p>
      </div>
    </section>
  );
};

export default Form;