"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  HiOutlineGlobeAlt, HiOutlineDevicePhoneMobile, HiOutlineCpuChip,
  HiOutlineCodeBracket, HiCheck, HiArrowRight, HiXMark,
  HiOutlineSparkles, HiOutlineRocketLaunch,
} from "react-icons/hi2";
import { useLang } from "./LanguageProvider";
import { useTheme } from "./ThemeProvider";

const plans = [
  {
    icon: HiOutlineGlobeAlt,
    accent: "#D4A053",
    gradient: "linear-gradient(135deg, #D4A053, #B8860B)",
    priceEs: "Desde $8,000 MXN",
    priceEn: "From $500 USD",
    nameEs: "Desarrollo Web",
    nameEn: "Web Development",
    descEs: "Landing pages, sitios corporativos, e-commerce y aplicaciones web a medida.",
    descEn: "Landing pages, corporate sites, e-commerce and custom web applications.",
    featuresEs: [
      "Diseño responsive y profesional",
      "Animaciones cinematográficas",
      "SEO técnico optimizado",
      "Panel de administración",
      "Hosting y dominio incluidos (1 año)",
      "Soporte post-lanzamiento 30 días",
    ],
    featuresEn: [
      "Responsive professional design",
      "Cinematic animations",
      "Optimized technical SEO",
      "Admin panel",
      "Hosting & domain included (1 year)",
      "30-day post-launch support",
    ],
    popular: false,
  },
  {
    icon: HiOutlineDevicePhoneMobile,
    accent: "#E87461",
    gradient: "linear-gradient(135deg, #E87461, #D4604A)",
    priceEs: "Desde $15,000 MXN",
    priceEn: "From $900 USD",
    nameEs: "App Móvil",
    nameEn: "Mobile App",
    descEs: "Apps nativas para iOS y Android con una sola base de código.",
    descEn: "Native apps for iOS and Android with a single codebase.",
    featuresEs: [
      "iOS y Android nativos",
      "Diseño UI/UX profesional",
      "Autenticación y notificaciones push",
      "Base de datos en la nube",
      "Publicación en App Store y Google Play",
      "Soporte post-lanzamiento 60 días",
    ],
    featuresEn: [
      "Native iOS & Android",
      "Professional UI/UX design",
      "Auth & push notifications",
      "Cloud database",
      "App Store & Google Play publishing",
      "60-day post-launch support",
    ],
    popular: false,
  },
  {
    icon: HiOutlineCpuChip,
    accent: "#C9A96E",
    gradient: "linear-gradient(135deg, #C9A96E, #A07830)",
    priceEs: "Desde $5,000 MXN",
    priceEn: "From $300 USD",
    nameEs: "Automatización & IA",
    nameEn: "Automation & AI",
    descEs: "Flujos automatizados, chatbots inteligentes y agentes de IA para tu negocio.",
    descEn: "Automated flows, intelligent chatbots and AI agents for your business.",
    featuresEs: [
      "Flujos de automatización con n8n",
      "Chatbot con IA en tu sitio web",
      "Integración CRM y marketing",
      "Agentes de IA personalizados",
      "Captación automática de leads",
      "Reportes y métricas automatizadas",
    ],
    featuresEn: [
      "n8n automation flows",
      "AI chatbot on your website",
      "CRM & marketing integration",
      "Custom AI agents",
      "Automatic lead capture",
      "Automated reports & metrics",
    ],
    popular: true,
  },
  {
    icon: HiOutlineCodeBracket,
    accent: "#B5838D",
    gradient: "linear-gradient(135deg, #B5838D, #8B5E6B)",
    priceEs: "Desde $20,000 MXN",
    priceEn: "From $1,200 USD",
    nameEs: "Software a Medida",
    nameEn: "Custom Software",
    descEs: "Sistemas empresariales completos diseñados para tu flujo de trabajo específico.",
    descEn: "Complete enterprise systems designed for your specific workflow.",
    featuresEs: [
      "Análisis y diseño de arquitectura",
      "Desarrollo full-stack completo",
      "APIs RESTful documentadas",
      "Dashboard con analytics",
      "Configuración de servidores",
      "Soporte y mantenimiento continuo",
    ],
    featuresEn: [
      "Architecture analysis & design",
      "Complete full-stack development",
      "Documented RESTful APIs",
      "Dashboard with analytics",
      "Server configuration",
      "Ongoing support & maintenance",
    ],
    popular: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { lang } = useLang();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isEs = lang === "es";

  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [formSent, setFormSent] = useState(false);

  return (
    <section id="cotizar" className="py-24 md:py-32 px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span
            className="text-xs tracking-[0.25em] uppercase font-bold block mb-4"
            style={{ color: "var(--accent-2)" }}
          >
            {isEs ? "Cotización" : "Pricing"}
          </span>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-6"
            style={{ fontFamily: "'Garet', sans-serif", color: "var(--text)" }}
          >
            {isEs ? "Invierte en tu" : "Invest in your"}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--accent-2), var(--accent-3))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {isEs ? "futuro digital" : "digital future"}
            </span>
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            {isEs
              ? "Precios transparentes. Sin costos ocultos. Cada proyecto incluye diseño, desarrollo y soporte."
              : "Transparent pricing. No hidden costs. Every project includes design, development and support."}
          </p>
        </motion.div>

        {/* Pricing Grid — 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              className="group relative rounded-3xl p-7 md:p-8 cursor-pointer overflow-hidden card-shadow"
              style={{
                background: "var(--bg-card)",
                border: plan.popular
                  ? `1px solid ${plan.accent}40`
                  : "1px solid var(--border-subtle)",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              onClick={() => setSelectedPlan(i)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${plan.accent}40`;
                e.currentTarget.style.boxShadow = `0 20px 60px -15px ${plan.accent}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = plan.popular ? `${plan.accent}40` : "var(--border-subtle)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div
                  className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                  style={{ background: plan.gradient }}
                >
                  <HiOutlineSparkles className="w-3 h-3" />
                  {isEs ? "Popular" : "Popular"}
                </div>
              )}

              {/* Subtle gradient bg */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"
                style={{
                  background: `radial-gradient(ellipse at top right, ${plan.accent}06 0%, transparent 60%)`,
                }}
              />

              {/* Icon */}
              <div className="relative z-10 flex items-center gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${plan.accent}10`,
                    border: `1px solid ${plan.accent}20`,
                  }}
                >
                  <plan.icon className="text-xl" style={{ color: plan.accent }} />
                </div>
                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{ fontFamily: "'Garet', sans-serif", color: "var(--text)" }}
                  >
                    {isEs ? plan.nameEs : plan.nameEn}
                  </h3>
                  <p className="text-xs" style={{ color: "var(--text-faint)" }}>
                    {isEs ? plan.descEs : plan.descEn}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="relative z-10 mb-6">
                <p
                  className="text-2xl md:text-3xl font-bold"
                  style={{
                    fontFamily: "'Garet', sans-serif",
                    background: plan.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {isEs ? plan.priceEs : plan.priceEn}
                </p>
              </div>

              {/* Features */}
              <ul className="relative z-10 space-y-2.5 mb-6">
                {(isEs ? plan.featuresEs : plan.featuresEn).map((feat, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-dim)" }}>
                    <HiCheck className="w-4 h-4 mt-0.5 shrink-0" style={{ color: plan.accent }} />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA button */}
              <div
                className="relative z-10 w-full py-3 rounded-xl text-center text-sm font-bold transition-all duration-500 group-hover:shadow-lg"
                style={{
                  background: isDark ? `${plan.accent}10` : `${plan.accent}08`,
                  border: `1px solid ${plan.accent}25`,
                  color: plan.accent,
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  <HiOutlineRocketLaunch className="w-4 h-4" />
                  {isEs ? "Cotizar ahora" : "Get a quote"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== Quote Modal ===== */}
      <AnimatePresence>
        {selectedPlan !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: isDark ? "rgba(8,8,12,0.88)" : "rgba(250,250,250,0.92)",
                backdropFilter: "blur(20px)",
              }}
              onClick={() => { setSelectedPlan(null); setFormSent(false); }}
            />

            <motion.div
              className="relative w-full max-w-lg rounded-3xl p-8 md:p-10"
              style={{
                background: isDark ? "rgba(17,17,22,0.97)" : "rgba(255,255,255,0.98)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                boxShadow: `0 40px 100px -20px ${plans[selectedPlan].accent}15`,
              }}
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <button
                onClick={() => { setSelectedPlan(null); setFormSent(false); }}
                className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                style={{
                  background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                  color: "var(--text-muted)",
                }}
              >
                <HiXMark className="w-5 h-5" />
              </button>

              {/* Plan header */}
              <div className="flex items-center gap-4 mb-2">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${plans[selectedPlan].accent}12`,
                    border: `1px solid ${plans[selectedPlan].accent}25`,
                  }}
                >
                  {(() => {
                    const Icon = plans[selectedPlan].icon;
                    return <Icon className="text-xl" style={{ color: plans[selectedPlan].accent }} />;
                  })()}
                </div>
                <div>
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Garet', sans-serif", color: "var(--text)" }}
                  >
                    {isEs ? plans[selectedPlan].nameEs : plans[selectedPlan].nameEn}
                  </h3>
                  <p
                    className="text-sm font-bold"
                    style={{ color: plans[selectedPlan].accent }}
                  >
                    {isEs ? plans[selectedPlan].priceEs : plans[selectedPlan].priceEn}
                  </p>
                </div>
              </div>

              <p className="text-sm mb-6" style={{ color: "var(--text-faint)" }}>
                {isEs
                  ? "Completa el formulario y te enviaré una cotización personalizada en menos de 24 horas."
                  : "Fill out the form and I'll send you a personalized quote within 24 hours."}
              </p>

              {!formSent ? (
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSent(true);
                  }}
                >
                  <div>
                    <label className="text-[10px] tracking-[0.15em] uppercase mb-1.5 block font-bold" style={{ color: "var(--text-muted)" }}>
                      {isEs ? "Nombre" : "Name"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isEs ? "Tu nombre" : "Your name"}
                      className="w-full rounded-xl px-4 py-3 text-sm transition-all duration-300 focus:outline-none"
                      style={{
                        background: "var(--bg-input)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text)",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = plans[selectedPlan].accent; }}
                      onBlur={(e) => { e.target.style.borderColor = "var(--border-subtle)"; }}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-[0.15em] uppercase mb-1.5 block font-bold" style={{ color: "var(--text-muted)" }}>
                      {isEs ? "Email" : "Email"}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={isEs ? "tu@email.com" : "your@email.com"}
                      className="w-full rounded-xl px-4 py-3 text-sm transition-all duration-300 focus:outline-none"
                      style={{
                        background: "var(--bg-input)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text)",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = plans[selectedPlan].accent; }}
                      onBlur={(e) => { e.target.style.borderColor = "var(--border-subtle)"; }}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-[0.15em] uppercase mb-1.5 block font-bold" style={{ color: "var(--text-muted)" }}>
                      {isEs ? "Describe tu proyecto" : "Describe your project"}
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder={isEs ? "¿Qué necesitas? Cuéntame los detalles..." : "What do you need? Tell me the details..."}
                      className="w-full rounded-xl px-4 py-3 text-sm transition-all duration-300 focus:outline-none resize-none"
                      style={{
                        background: "var(--bg-input)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text)",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = plans[selectedPlan].accent; }}
                      onBlur={(e) => { e.target.style.borderColor = "var(--border-subtle)"; }}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-[0.15em] uppercase mb-1.5 block font-bold" style={{ color: "var(--text-muted)" }}>
                      {isEs ? "Presupuesto estimado" : "Estimated budget"}
                    </label>
                    <select
                      className="w-full rounded-xl px-4 py-3 text-sm transition-all duration-300 focus:outline-none appearance-none cursor-pointer"
                      style={{
                        background: "var(--bg-input)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text-muted)",
                      }}
                    >
                      <option value="" style={{ background: "var(--bg-card)" }}>
                        {isEs ? "Seleccionar rango..." : "Select range..."}
                      </option>
                      {(isEs
                        ? ["$5,000 - $10,000 MXN", "$10,000 - $25,000 MXN", "$25,000 - $50,000 MXN", "$50,000+ MXN"]
                        : ["$300 - $600 USD", "$600 - $1,500 USD", "$1,500 - $3,000 USD", "$3,000+ USD"]
                      ).map((opt) => (
                        <option key={opt} value={opt} style={{ background: "var(--bg-card)" }}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-full text-sm font-bold text-white cursor-pointer transition-shadow duration-300 hover:shadow-lg"
                    style={{
                      background: plans[selectedPlan].gradient,
                      boxShadow: `0 4px 20px ${plans[selectedPlan].accent}25`,
                    }}
                  >
                    {isEs ? "Solicitar cotización →" : "Request quote →"}
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  className="text-center py-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: `${plans[selectedPlan].accent}15`,
                      border: `2px solid ${plans[selectedPlan].accent}40`,
                    }}
                  >
                    <HiCheck className="w-8 h-8" style={{ color: plans[selectedPlan].accent }} />
                  </div>
                  <h4
                    className="text-xl font-bold mb-2"
                    style={{ fontFamily: "'Garet', sans-serif", color: "var(--text)" }}
                  >
                    {isEs ? "¡Solicitud enviada!" : "Request sent!"}
                  </h4>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {isEs
                      ? "Te contactaré en menos de 24 horas con tu cotización personalizada."
                      : "I'll contact you within 24 hours with your personalized quote."}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
