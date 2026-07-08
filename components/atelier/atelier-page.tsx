"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "lenis";

import styles from "@/app/atelier.module.css";
import { IntroCurtain } from "./intro-curtain";
import { SiteNav } from "./site-nav";
import { Hero } from "./hero";
import { Marquee } from "./marquee";
import { Manifesto } from "./manifesto";
import { SignatureScale } from "./signature-scale";
import { Journey } from "./journey";
import { Certificates } from "./certificates";
import { Projects } from "./projects";
import { Shop } from "./shop";
import { CraftStory } from "./craft-story";
import { Contact } from "./contact";
import { SiteFooter } from "./site-footer";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function AtelierPage() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const cleanups: Array<() => void> = [];
      let heroStart = 0.3;

      // ---- Lenis smooth scroll, driven by GSAP's ticker ----
      // duration+easing (rather than the snappier default lerp: 0.1) is the
      // config Lenis's own docs use for a slower, buttery deceleration curve.
      let lenis: Lenis | null = null;
      if (!reducedMotion) {
        lenis = new Lenis({
          autoRaf: false,
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          wheelMultiplier: 1,
          touchMultiplier: 2,
        });
        const onLenisScroll = () => ScrollTrigger.update();
        lenis.on("scroll", onLenisScroll);
        const rafCallback = (time: number) => lenis?.raf(time * 1000);
        gsap.ticker.add(rafCallback);
        gsap.ticker.lagSmoothing(0);
        cleanups.push(() => {
          gsap.ticker.remove(rafCallback);
          lenis?.destroy();
        });
      }

      const scrollTo = (target: string) => {
        if (lenis) lenis.scrollTo(target, { offset: -20 });
        else {
          const el = root.ownerDocument.querySelector(target);
          el?.scrollIntoView({ behavior: "auto" });
        }
      };

      // ---- Intro curtain ----
      const curtain = root.querySelector<HTMLElement>("[data-intro-curtain]");
      document.body.classList.toggle(styles.loading, !reducedMotion);
      if (reducedMotion) {
        if (curtain) curtain.style.display = "none";
      } else {
        heroStart = 2.05;
        const introTl = gsap.timeline({
          onComplete: () => {
            if (curtain) curtain.style.display = "none";
            document.body.classList.remove(styles.loading);
            ScrollTrigger.refresh();
          },
        });
        introTl
          .to(
            root.querySelector("[data-intro-mark]"),
            { opacity: 1, duration: 0.5, ease: "power2.out" },
            0.1
          )
          .to(
            root.querySelectorAll("[data-intro-name] span"),
            { y: "0%", duration: 0.9, ease: "power4.out", stagger: 0.08 },
            0.25
          )
          .to(
            root.querySelector("[data-intro-sub]"),
            { opacity: 1, duration: 0.6, ease: "power2.out" },
            0.6
          )
          .fromTo(
            root.querySelector("[data-intro-progress]"),
            { width: "0%" },
            { width: "100%", duration: 1.1, ease: "power1.inOut" },
            0.35
          )
          .to(curtain, { yPercent: -100, duration: 1.0, ease: "power4.inOut" }, 1.5)
          .to(
            [
              root.querySelector("[data-intro-mark]"),
              root.querySelectorAll("[data-intro-name] span"),
              root.querySelector("[data-intro-sub]"),
            ],
            { opacity: 0, duration: 0.4, ease: "power1.in" },
            1.5
          );
      }

      // ---- Nav scroll state ----
      const nav = root.querySelector<HTMLElement>("[data-site-nav]");
      const onScroll = () => {
        nav?.classList.toggle(styles.scrolled, window.scrollY > 50);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", onScroll));

      // ---- Hero headline per-character reveal ----
      const headline = root.querySelector<HTMLElement>("[data-hero-headline]");
      if (headline) {
        const walker = document.createTreeWalker(headline, NodeFilter.SHOW_TEXT);
        const textNodes: Text[] = [];
        let node: Node | null;
        while ((node = walker.nextNode())) {
          if (node.textContent && node.textContent.trim()) {
            textNodes.push(node as Text);
          }
        }
        textNodes.forEach((textNode) => {
          const text = textNode.textContent || "";
          const frag = document.createDocumentFragment();
          const words = text.split(" ");
          words.forEach((word, wi) => {
            if (word) {
              const wordSpan = document.createElement("span");
              wordSpan.style.display = "inline-block";
              wordSpan.style.whiteSpace = "nowrap";
              [...word].forEach((char) => {
                const charSpan = document.createElement("span");
                charSpan.className = "char";
                charSpan.textContent = char;
                wordSpan.appendChild(charSpan);
              });
              frag.appendChild(wordSpan);
            }
            if (wi < words.length - 1) {
              frag.appendChild(document.createTextNode(" "));
            }
          });
          textNode.parentNode?.replaceChild(frag, textNode);
        });
      }

      const inlinePhoto = root.querySelector("[data-inline-photo]");
      const chars = root.querySelectorAll(".char");
      if (!reducedMotion) {
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 0.7,
          stagger: 0.018,
          ease: "power3.out",
          delay: heroStart,
        });
        if (inlinePhoto) {
          gsap.to(inlinePhoto, {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1,
            ease: "power3.out",
            delay: heroStart + 0.6,
          });
        }
      } else {
        gsap.set(chars, { opacity: 1, y: 0, rotate: 0 });
        if (inlinePhoto) gsap.set(inlinePhoto, { opacity: 1, scale: 1, rotate: 0 });
      }

      // ---- Floating memory polaroids ----
      const memories = gsap.utils.toArray<HTMLElement>("[data-memory]", root);
      const baseRots = [-7, 5, -3, 9];
      if (!reducedMotion && window.matchMedia("(min-width: 1025px)").matches) {
        memories.forEach((m, i) => gsap.set(m, { rotation: baseRots[i] || 0 }));
        const xTo = memories.map((m) =>
          gsap.quickTo(m, "x", { duration: 1.2, ease: "power3" })
        );
        const yTo = memories.map((m) =>
          gsap.quickTo(m, "y", { duration: 1.2, ease: "power3" })
        );
        const onMouseMove = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 2;
          const y = (e.clientY / window.innerHeight - 0.5) * 2;
          memories.forEach((m, i) => {
            const depth = parseFloat(m.dataset.depth || "0.3");
            xTo[i](x * depth * 30);
            yTo[i](y * depth * 30);
          });
        };
        window.addEventListener("mousemove", onMouseMove, { passive: true });
        cleanups.push(() => window.removeEventListener("mousemove", onMouseMove));

        const heroSection = root.querySelector("[data-hero-section]");
        memories.forEach((m) => {
          const depth = parseFloat(m.dataset.depth || "0.3");
          gsap.to(m, {
            yPercent: -depth * 80,
            ease: "none",
            scrollTrigger: {
              trigger: heroSection,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      } else if (reducedMotion) {
        memories.forEach((m, i) => {
          m.style.transform = `rotate(${baseRots[i]}deg)`;
        });
      }

      // ---- Manifesto word-by-word ----
      const manifestoText = root.querySelector<HTMLElement>("[data-manifesto-text]");
      const manifestoSig = root.querySelector<HTMLElement>("[data-manifesto-sig]");
      if (manifestoText && manifestoSig) {
        const words = (manifestoText.textContent || "").trim().split(/\s+/);
        manifestoText.innerHTML = words
          .map((w) => `<span class="word">${w}</span>`)
          .join(" ");
        let manifestoTriggered = false;
        const timeouts: number[] = [];
        const triggerManifesto = () => {
          if (manifestoTriggered) return;
          manifestoTriggered = true;
          const wordEls = manifestoText.querySelectorAll(".word");
          wordEls.forEach((w, i) => {
            timeouts.push(
              window.setTimeout(() => w.classList.add("inked"), i * 55)
            );
          });
          timeouts.push(
            window.setTimeout(
              () => manifestoSig.classList.add(styles.in),
              wordEls.length * 55 + 200
            )
          );
        };
        const manifestoObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                triggerManifesto();
                manifestoObserver.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
        );
        manifestoObserver.observe(manifestoText);
        const fallback = window.setTimeout(() => {
          if (!manifestoTriggered) triggerManifesto();
        }, 3000);
        cleanups.push(() => {
          manifestoObserver.disconnect();
          clearTimeout(fallback);
          timeouts.forEach((t) => clearTimeout(t));
        });
      }

      // ---- Signature scale moment ----
      const scaleImage = root.querySelector<HTMLElement>("[data-scale-image]");
      const scaleCaption = root.querySelector<HTMLElement>("[data-scale-caption]");
      if (scaleImage && scaleCaption) {
        if (!reducedMotion) {
          gsap.to(scaleImage, {
            width: "100%",
            height: "100%",
            borderRadius: "0%",
            ease: "none",
            scrollTrigger: {
              trigger: root.querySelector("[data-scale-section]"),
              start: "top top",
              end: "+=100%",
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              onUpdate: (self) => {
                scaleCaption.classList.toggle(styles.in, self.progress > 0.7);
              },
              onLeaveBack: () => scaleCaption.classList.remove(styles.in),
            },
          });
        } else {
          gsap.set(scaleImage, { width: "100%", height: "100%", borderRadius: "0%" });
          scaleCaption.classList.add(styles.in);
        }
      }

      // ---- Horizontal pinned scroll (journey + shop) ----
      const setupHorizontalScroll = (
        pinSelector: string,
        trackSelector: string,
        progressSelector?: string
      ) => {
        const trackEl = root.querySelector<HTMLElement>(trackSelector);
        const pinEl = root.querySelector<HTMLElement>(pinSelector);
        const progressEl = progressSelector
          ? root.querySelector<HTMLElement>(progressSelector)
          : null;
        if (!trackEl || !pinEl) return;

        const getScrollDistance = () =>
          Math.max(0, trackEl.scrollWidth - window.innerWidth + 200);

        gsap.to(trackEl, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinEl,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            pin: pinEl,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressEl) {
                progressEl.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });
      };

      if (!reducedMotion && window.matchMedia("(min-width: 1024px)").matches) {
        setupHorizontalScroll(
          "[data-journey-pin]",
          "[data-journey-track]",
          "[data-progress-bar]"
        );
        setupHorizontalScroll("[data-shop-pin]", "[data-shop-track]");
      }

      // ---- Certificates staggered reveal ----
      const certificates = root.querySelectorAll<HTMLElement>("[data-certificate]");
      const certTimeouts: number[] = [];
      const certObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const i = Array.from(certificates).indexOf(entry.target as HTMLElement);
              certTimeouts.push(
                window.setTimeout(
                  () => entry.target.classList.add(styles.in),
                  i * 140
                )
              );
              certObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      certificates.forEach((c) => certObserver.observe(c));
      cleanups.push(() => {
        certObserver.disconnect();
        certTimeouts.forEach((t) => clearTimeout(t));
      });

      // ---- Project sticky stack (gentle dimming) ----
      const projectCards = root.querySelectorAll<HTMLElement>("[data-project-card]");
      if (!reducedMotion && window.matchMedia("(min-width: 901px)").matches) {
        projectCards.forEach((card, i) => {
          if (i < projectCards.length - 1) {
            gsap.fromTo(
              card,
              { filter: "brightness(1)" },
              {
                opacity: 0.9,
                scale: 0.995,
                filter: "brightness(0.94)",
                ease: "none",
                scrollTrigger: {
                  trigger: projectCards[i + 1],
                  start: "top 80%",
                  end: "top 30%",
                  scrub: 1,
                },
              }
            );
          }
        });
      }

      // ---- Craft story crossfade + tint shift ----
      const storySection = root.querySelector<HTMLElement>("[data-craft-story]");
      const storyImages = root.querySelectorAll<HTMLElement>("[data-story-img]");
      const chapters = root.querySelectorAll<HTMLElement>("[data-chapter-section]");
      const chapterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
              const target = entry.target as HTMLElement;
              const num = target.dataset.chapter;
              const tint = target.dataset.tint;
              storyImages.forEach((img) => {
                img.classList.toggle(styles.active, img.dataset.chapter === num);
              });
              if (storySection && tint) storySection.style.backgroundColor = tint;
            }
          });
        },
        { threshold: [0.4, 0.6] }
      );
      chapters.forEach((ch) => chapterObserver.observe(ch));
      cleanups.push(() => chapterObserver.disconnect());

      // ---- Generic reveal on scroll ----
      const revealEls = root.querySelectorAll<HTMLElement>("[data-reveal]");
      const revealTimeouts: number[] = [];
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
              revealTimeouts.push(
                window.setTimeout(
                  () => entry.target.classList.add(styles.in),
                  i * 70
                )
              );
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      revealEls.forEach((el) => revealObserver.observe(el));
      cleanups.push(() => {
        revealObserver.disconnect();
        revealTimeouts.forEach((t) => clearTimeout(t));
      });

      // ---- Smooth anchor scroll ----
      const anchors = root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
      const onAnchorClick = (e: Event) => {
        const a = e.currentTarget as HTMLAnchorElement;
        const hash = a.getAttribute("href") || "";
        if (hash.length <= 1) return;
        const target = root.ownerDocument.querySelector(hash);
        if (target) {
          e.preventDefault();
          scrollTo(hash);
        }
      };
      anchors.forEach((a) => a.addEventListener("click", onAnchorClick));
      cleanups.push(() => {
        anchors.forEach((a) => a.removeEventListener("click", onAnchorClick));
      });

      // ---- Refresh ScrollTrigger on resize / load ----
      let resizeTimer: number;
      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
      };
      window.addEventListener("resize", onResize);
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      cleanups.push(() => {
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("load", onLoad);
      });

      return () => {
        cleanups.forEach((fn) => fn());
      };
    },
    { scope }
  );

  return (
    <div className={styles.page} ref={scope}>
      <IntroCurtain />
      <SiteNav />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <SignatureScale />
        <Journey />
        <Certificates />
        <Projects />
        <Shop />
        <CraftStory />
        <Contact />
        <SiteFooter />
      </main>
    </div>
  );
}
