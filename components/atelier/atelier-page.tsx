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
import { HeroBleed } from "./hero-bleed";
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
      } else {
        gsap.set(chars, { opacity: 1, y: 0, rotate: 0 });
      }

      // ---- Hero image: reveal + scroll parallax ----
      const heroImage = root.querySelector<HTMLElement>("[data-hero-image]");
      const heroImagePhoto = heroImage?.querySelector("img") ?? null;
      if (heroImage && heroImagePhoto) {
        if (!reducedMotion) {
          gsap.to(heroImage, {
            clipPath: "inset(0% 0 0 0 round 4px)",
            duration: 1.3,
            ease: "power3.out",
            delay: heroStart + 0.35,
          });
          gsap.to(heroImagePhoto, {
            scale: 1,
            duration: 1.3,
            ease: "power3.out",
            delay: heroStart + 0.35,
          });

          const heroSection = root.querySelector("[data-hero-section]");
          gsap.to(heroImage, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: heroSection,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        } else {
          gsap.set(heroImage, { clipPath: "inset(0% 0 0 0 round 4px)" });
          gsap.set(heroImagePhoto, { scale: 1 });
        }
      }

      // ---- Manifesto word-by-word (scroll-scrubbed) ----
      const manifestoText = root.querySelector<HTMLElement>("[data-manifesto-text]");
      const manifestoSig = root.querySelector<HTMLElement>("[data-manifesto-sig]");
      if (manifestoText && manifestoSig) {
        const words = (manifestoText.textContent || "").trim().split(/\s+/);
        manifestoText.innerHTML = words
          .map((w) => `<span class="word">${w}</span>`)
          .join(" ");
        const wordEls = manifestoText.querySelectorAll(".word");

        if (reducedMotion) {
          wordEls.forEach((w) => w.classList.add("inked"));
          manifestoSig.classList.add(styles.in);
        } else {
          const manifestoTrigger = ScrollTrigger.create({
            trigger: manifestoText,
            start: "top 80%",
            end: "bottom 45%",
            scrub: 1,
            onUpdate: (self) => {
              const litCount = Math.round(self.progress * wordEls.length);
              wordEls.forEach((w, i) => w.classList.toggle("inked", i < litCount));
              manifestoSig.classList.toggle(styles.in, self.progress > 0.92);
            },
          });
          cleanups.push(() => manifestoTrigger.kill());
        }
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
                scaleCaption.classList.toggle(styles.in, self.progress > 0.85);
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

      // ---- Project sticky stack (recede as the next card arrives) ----
      const projectCards = root.querySelectorAll<HTMLElement>("[data-project-card]");
      if (!reducedMotion && window.matchMedia("(min-width: 901px)").matches) {
        projectCards.forEach((card, i) => {
          if (i < projectCards.length - 1) {
            gsap.fromTo(
              card,
              { filter: "brightness(1)" },
              {
                opacity: 0.9,
                scale: 0.9,
                filter: "brightness(0.9)",
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
      // Driven by ScrollTrigger (same clock as the rest of the page) instead of
      // IntersectionObserver: with Lenis's eased scroll, a fast flick can move
      // several viewport-heights in one frame, so IO's threshold-crossing
      // entries for multiple chapters land in the same batch. Applying them
      // via forEach in DOM order (not scroll order) let a stale earlier-chapter
      // entry win over the correct later one, producing the flash/jump-back.
      // ScrollTrigger re-derives the active chapter from the real scroll
      // position on every tick, so there's no batching order to get wrong.
      const storySection = root.querySelector<HTMLElement>("[data-craft-story]");
      const storyImages = root.querySelectorAll<HTMLElement>("[data-story-img]");
      const chapters = root.querySelectorAll<HTMLElement>("[data-chapter-section]");
      const chapterTriggers = Array.from(chapters).map((chapterEl) =>
        ScrollTrigger.create({
          trigger: chapterEl,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (!self.isActive) return;
            const num = chapterEl.dataset.chapter;
            const tint = chapterEl.dataset.tint;
            storyImages.forEach((img) => {
              img.classList.toggle(styles.active, img.dataset.chapter === num);
            });
            if (storySection && tint) storySection.style.backgroundColor = tint;
          },
        })
      );
      cleanups.push(() => chapterTriggers.forEach((st) => st.kill()));

      // ---- Craft story image wipe (scroll-scrubbed clip-path reveal) ----
      // Each chapter's image sits above the previous one (DOM order = stacking
      // order) and wipes up from the bottom as its chapter scrolls into view,
      // instead of crossfading. The reduced-motion fallback above still swaps
      // visibility via the .active class untouched by this.
      if (!reducedMotion) {
        const storyImagesArr = Array.from(storyImages);
        // Opacity is set once and left alone: clip-path is the sole visibility
        // control from here on, overriding the .active class's opacity toggle.
        gsap.set(storyImagesArr, { opacity: 1, scale: 1 });
        storyImagesArr.forEach((img, i) => {
          if (i === 0) return;
          gsap.fromTo(
            img,
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              ease: "none",
              scrollTrigger: {
                trigger: chapters[i],
                start: "top 90%",
                end: "top 30%",
                scrub: 0.3,
              },
            }
          );
        });
      }

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
        <HeroBleed />
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
