"use client";

import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Menu, X, Home, Info, Phone, Sun, Moon, LogIn } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CONSTANTS = {
  itemSize: 48,
  containerSize: 230,
  openStagger: 0.02,
  closeStagger: 0.07,
};

const STYLES: Record<string, Record<string, string>> = {
  trigger: {
    container:
      "z-50 flex cursor-pointer items-center justify-center rounded-full bg-foreground text-background outline-none ring-0 transition-all duration-100 hover:brightness-110",
    active: "bg-foreground",
  },
  item: {
    wrapper: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    container:
      "flex items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--foreground)_8%,var(--background))] text-foreground hover:bg-[color-mix(in_srgb,var(--foreground)_14%,var(--background))] cursor-pointer",
    label:
      "absolute left-1/2 top-full mt-1 -translate-x-1/2 text-xs text-foreground/80",
  },
};

const pointOnCircle = (i: number, n: number, r: number, cx = 0, cy = 0) => {
  const theta = (2 * Math.PI * i) / n - Math.PI / 2;
  const x = cx + r * Math.cos(theta);
  const y = cy + r * Math.sin(theta);
  return { x, y };
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  index: number;
  totalItems: number;
  isOpen: boolean;
}

const MenuItem = ({
  icon,
  label,
  href,
  onClick,
  index,
  totalItems,
  isOpen,
}: MenuItemProps) => {
  const { x, y } = pointOnCircle(index, totalItems, CONSTANTS.containerSize / 2);
  const [hovering, setHovering] = useState(false);

  if (href) {
    return (
      <Link href={href} className={STYLES.item.wrapper}>
        <motion.div
          animate={{ x: isOpen ? x : 0, y: isOpen ? y : 0 }}
          whileHover={{ scale: 1.1, transition: { duration: 0.1, delay: 0 } }}
          transition={{
            delay: isOpen ? index * CONSTANTS.openStagger : index * CONSTANTS.closeStagger,
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          style={{ height: CONSTANTS.itemSize - 2, width: CONSTANTS.itemSize - 2 }}
          className={STYLES.item.container}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {icon}
          {hovering && <p className={STYLES.item.label}>{label}</p>}
        </motion.div>
      </Link>
    );
  }

  return (
    <div className={STYLES.item.wrapper}>
      <motion.button
        animate={{ x: isOpen ? x : 0, y: isOpen ? y : 0 }}
        whileHover={{ scale: 1.1, transition: { duration: 0.1, delay: 0 } }}
        transition={{
          delay: isOpen ? index * CONSTANTS.openStagger : index * CONSTANTS.closeStagger,
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        style={{ height: CONSTANTS.itemSize - 2, width: CONSTANTS.itemSize - 2 }}
        className={STYLES.item.container}
        onClick={onClick}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        type="button"
      >
        {icon}
        {hovering && <p className={STYLES.item.label}>{label}</p>}
      </motion.button>
    </div>
  );
};

interface MenuTriggerProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  itemsLength: number;
  closeAnimationCallback: () => void;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
}

const MenuTrigger = ({
  setIsOpen,
  isOpen,
  itemsLength,
  closeAnimationCallback,
  openIcon,
  closeIcon,
}: MenuTriggerProps) => {
  const animate = useAnimationControls();
  const shakeAnimation = useAnimationControls();

  const scaleTransition = Array.from({ length: itemsLength - 1 })
    .map((_, index) => index + 1)
    .reduce((acc, _, index) => {
      const increasedValue = index * 0.15;
      acc.push(1 + increasedValue);
      return acc;
    }, [] as number[]);

  const closeAnimation = async () => {
    shakeAnimation.start({
      translateX: [0, 2, -2, 0, 2, -2, 0],
      transition: {
        duration: CONSTANTS.closeStagger,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
    for (let i = 0; i < scaleTransition.length; i++) {
      await animate.start({
        height: Math.min(
          CONSTANTS.itemSize * scaleTransition[i],
          CONSTANTS.itemSize + CONSTANTS.itemSize / 2,
        ),
        width: Math.min(
          CONSTANTS.itemSize * scaleTransition[i],
          CONSTANTS.itemSize + CONSTANTS.itemSize / 2,
        ),
        backgroundColor: `color-mix(in srgb, var(--foreground) ${Math.max(
          100 - i * 10,
          40,
        )}%, var(--background))`,
        transition: { duration: CONSTANTS.closeStagger / 2, ease: "linear" },
      });
      if (i !== scaleTransition.length - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, CONSTANTS.closeStagger * 1000),
        );
      }
    }

    shakeAnimation.stop();
    shakeAnimation.start({ translateX: 0, transition: { duration: 0 } });

    animate.start({
      height: CONSTANTS.itemSize,
      width: CONSTANTS.itemSize,
      backgroundColor: "var(--foreground)",
      transition: { duration: 0.1, ease: "backInOut" },
    });
  };

  return (
    <motion.div animate={shakeAnimation} className="z-50">
      <motion.button
        animate={animate}
        style={{ height: CONSTANTS.itemSize, width: CONSTANTS.itemSize }}
        className={cn(STYLES.trigger.container, isOpen && STYLES.trigger.active)}
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
            closeAnimationCallback();
            closeAnimation();
          } else {
            setIsOpen(true);
          }
        }}
      >
        <AnimatePresence mode="popLayout">
          {isOpen ? (
            <motion.span
              key="menu-close"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.2 }}
            >
              {closeIcon}
            </motion.span>
          ) : (
            <motion.span
              key="menu-open"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.2 }}
            >
              {openIcon}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

function CircleMenu({
  openIcon = <Menu size={18} className="text-background" />,
  closeIcon = <X size={18} className="text-background" />,
  onOpenChange,
}: {
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  onOpenChange?: (isOpen: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") return storedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const animate = useAnimationControls();

  const applyTheme = (nextTheme: "light" | "dark") => {
    const htmlEl = document.documentElement;
    htmlEl.classList.remove("light", "dark");
    htmlEl.classList.add(nextTheme);
  };

  const setThemePreference = (nextTheme: "light" | "dark") => {
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const items = [
    { label: "Home", icon: <Home size={16} />, href: "/home" },
    { label: "About", icon: <Info size={16} />, href: "/about" },
    { label: "Contacts", icon: <Phone size={16} />, href: "/contacts" },
    { label: "Login", icon: <LogIn size={16} />, href: "/login" },
    {
      label: theme === "dark" ? "Light" : "Dark",
      icon: theme === "dark" ? <Sun size={16} /> : <Moon size={16} />,
      onClick: () => setThemePreference(theme === "dark" ? "light" : "dark"),
    },
  ];

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  const closeAnimationCallback = async () => {
    await animate.start({
      rotate: -360,
      filter: "blur(1px)",
      transition: {
        duration: CONSTANTS.closeStagger * (items.length + 2),
        ease: "linear",
      },
    });
    await animate.start({
      rotate: 0,
      filter: "blur(0px)",
      transition: { duration: 0 },
    });
  };

  return (
    <div
      style={{ width: CONSTANTS.containerSize, height: CONSTANTS.containerSize }}
      className="relative flex items-center justify-center place-self-center"
    >
      <MenuTrigger
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        itemsLength={items.length}
        closeAnimationCallback={closeAnimationCallback}
        openIcon={openIcon}
        closeIcon={closeIcon}
      />
      <motion.div
        animate={animate}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        {items.map((item, index) => (
          <MenuItem
            key={`menu-item-${item.label}`}
            icon={item.icon}
            label={item.label}
            href={item.href}
            onClick={item.onClick}
            index={index}
            totalItems={items.length}
            isOpen={isOpen}
          />
        ))}
      </motion.div>
    </div>
  );
}

export { CircleMenu };
