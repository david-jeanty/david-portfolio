"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import DesktopWindow, { type WindowGeometry } from "./DesktopWindow";
import styles from "./WindowManager.module.css";
import { portfolioData, type DesktopIconId, type PortfolioData } from "@/data/portfolio";
import AboutContent from "@/components/windows/AboutWindowContent";
import ExperienceContent from "@/components/windows/ExperienceWindowContent";
import WorkbenchContent from "@/components/windows/WorkbenchWindowContent";
import ResumeContent from "@/components/windows/ResumeWindowContent";
import ContactContent from "@/components/windows/ContactWindowContent";
import GamesContent from "@/components/windows/GamesWindowContent";
import InternalOnlyContent from "@/components/windows/InternalOnlyWindowContent";

export type WindowId = DesktopIconId;

type WindowState = {
  id: WindowId;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  geometry: WindowGeometry;
  restoreGeometry: WindowGeometry | null;
};

type OpenWindowOptions = {
  centered?: boolean;
};

type WindowManagerApi = {
  openWindow: (id: WindowId, options?: OpenWindowOptions) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  restoreWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  updateWindowGeometry: (id: WindowId, geometry: WindowGeometry) => void;
  toggleMaximizeWindow: (id: WindowId) => void;
  activeWindowId: WindowId | null;
  windows: WindowState[];
  isMobile: boolean;
};

const WindowManagerContext = createContext<WindowManagerApi | null>(null);

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error("useWindowManager must be used within WindowManager");
  return ctx;
}

function getInitialGeometry(params: {
  id: WindowId;
  isMobile: boolean;
  existingCount: number;
}): WindowGeometry {
  const { id, isMobile, existingCount } = params;
  const taskbarH = isMobile ? 48 : 42;

  const wDesktop = id === "games" ? 400 : 560;
  const hDesktop = id === "games" ? 320 : 420;
  const mobileMargin = 6;
  const wMobile = Math.max(280, window.innerWidth - mobileMargin * 2);
  const hMobile = Math.max(220, window.innerHeight - taskbarH - mobileMargin * 2);

  const w = isMobile ? wMobile : wDesktop;
  const h = isMobile ? hMobile : hDesktop;

  const offsetX = isMobile ? mobileMargin : 22 + existingCount * 16;
  const offsetY = isMobile ? mobileMargin : 22 + existingCount * 14;

  const maxLeft = Math.max(8, window.innerWidth - w - 8);
  const maxTop = Math.max(8, window.innerHeight - taskbarH - h - 8);

  const x = Math.min(maxLeft, offsetX);
  const y = Math.min(maxTop, offsetY);

  return { x, y, w, h };
}

function getCenteredGeometry(params: {
  id: WindowId;
  isMobile: boolean;
}): WindowGeometry {
  const { id, isMobile } = params;
  const taskbarH = getTaskbarHeight(isMobile);

  if (isMobile) {
    return getInitialGeometry({ id, isMobile, existingCount: 0 });
  }

  const geometry = clampWindowGeometry(
    {
      x: 0,
      y: 0,
      w: id === "about" ? 620 : 560,
      h: id === "about" ? 460 : 420,
    },
    isMobile
  );

  const visibleDesktopHeight = window.innerHeight - taskbarH;

  return {
    ...geometry,
    x: Math.max(0, Math.round((window.innerWidth - geometry.w) / 2)),
    y: Math.max(0, Math.round((visibleDesktopHeight - geometry.h) / 2)),
  };
}

function getTaskbarHeight(isMobile: boolean) {
  return isMobile ? 48 : 42;
}

function getMaximizedGeometry(isMobile: boolean): WindowGeometry {
  return {
    x: 0,
    y: 0,
    w: window.innerWidth,
    h: window.innerHeight - getTaskbarHeight(isMobile),
  };
}

function clampWindowGeometry(geometry: WindowGeometry, isMobile: boolean): WindowGeometry {
  const taskbarH = getTaskbarHeight(isMobile);
  const minW = isMobile ? 280 : 320;
  const minH = isMobile ? 220 : 240;
  const maxW = Math.max(minW, window.innerWidth - 8);
  const maxH = Math.max(minH, window.innerHeight - taskbarH - 8);
  const w = Math.min(maxW, Math.max(minW, geometry.w));
  const h = Math.min(maxH, Math.max(minH, geometry.h));
  const maxLeft = Math.max(0, window.innerWidth - w);
  const maxTop = Math.max(0, window.innerHeight - taskbarH - h);
  return {
    x: Math.min(maxLeft, Math.max(0, geometry.x)),
    y: Math.min(maxTop, Math.max(0, geometry.y)),
    w,
    h,
  };
}

function getTopVisibleWindowId(windows: WindowState[], excludedId?: WindowId) {
  return windows
    .filter((w) => !w.isMinimized && w.id !== excludedId)
    .sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null;
}

function getWindowTitle(id: WindowId, data: PortfolioData) {
  const icon = data.desktop.icons.find((i) => i.id === id);
  return icon?.label ?? id;
}

function createWindowState(params: {
  id: WindowId;
  isMobile: boolean;
  existingCount: number;
  zIndex: number;
  centered?: boolean;
}): WindowState {
  const { id, isMobile, existingCount, zIndex, centered = false } = params;

  return {
    id,
    isMinimized: false,
    isMaximized: false,
    zIndex,
    geometry: centered
      ? getCenteredGeometry({ id, isMobile })
      : getInitialGeometry({ id, isMobile, existingCount }),
    restoreGeometry: null,
  };
}

function WindowContentById({ id }: { id: WindowId }) {
  switch (id) {
    case "resume":
      return <ResumeContent />;
    case "about":
      return <AboutContent />;
    case "experience":
      return <ExperienceContent />;
    case "workbench":
      return <WorkbenchContent />;
    case "contact":
      return <ContactContent />;
    case "games":
      return <GamesContent />;
    case "internal-only":
      return <InternalOnlyContent />;
    default:
      return <div>Unknown window</div>;
  }
}

export default function WindowManager({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>(null);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const nextZRef = useRef(100);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();

    // Safari fallback for older add/removeEventListener patterns
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }

    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  const focusWindow = useCallback(
    (id: WindowId) => {
      setWindows((prev) => {
        const target = prev.find((w) => w.id === id);
        if (!target) return prev;

        const nextZ = nextZRef.current + 1;
        nextZRef.current = nextZ;
        return prev.map((w) =>
          w.id === id ? { ...w, zIndex: nextZ } : w
        );
      });
      setActiveWindowId(id);
    },
    [setWindows]
  );

  const openWindow = useCallback(
    (id: WindowId, options?: OpenWindowOptions) => {
      setWindows((prev) => {
        const existing = prev.find((w) => w.id === id);
        if (existing) {
          // Restore if needed and bring to front
          const nextZ = nextZRef.current + 1;
          nextZRef.current = nextZ;
          return prev.map((w) =>
            w.id === id
              ? { ...w, isMinimized: false, zIndex: nextZ }
              : w
          );
        }

        const nextZ = nextZRef.current + 1;
        nextZRef.current = nextZ;
        return [
          ...prev,
          createWindowState({
            id,
            isMobile,
            existingCount: prev.length,
            zIndex: nextZ,
            centered: options?.centered,
          }),
        ];
      });
      setActiveWindowId(id);
    },
    [isMobile]
  );

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const next = prev.filter((w) => w.id !== id);
      setActiveWindowId((current) => (
        current === id ? getTopVisibleWindowId(next) : current
      ));
      return next;
    });
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const next = prev.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      );
      setActiveWindowId((current) => (
        current === id ? getTopVisibleWindowId(next, id) : current
      ));
      return next;
    });
  }, []);

  const restoreWindow = useCallback(
    (id: WindowId) => {
      setWindows((prev) => {
        const target = prev.find((w) => w.id === id);
        if (!target) return prev;
        const nextZ = nextZRef.current + 1;
        nextZRef.current = nextZ;
        return prev.map((w) =>
          w.id === id ? { ...w, isMinimized: false, zIndex: nextZ } : w
        );
      });
      setActiveWindowId(id);
    },
    []
  );

  const updateWindowGeometry = useCallback(
    (id: WindowId, geometry: WindowGeometry) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? {
                ...w,
                geometry: clampWindowGeometry(geometry, isMobile),
                restoreGeometry: w.isMaximized ? clampWindowGeometry(geometry, isMobile) : w.restoreGeometry,
              }
            : w
        )
      );
    },
    [isMobile]
  );

  const toggleMaximizeWindow = useCallback(
    (id: WindowId) => {
      setWindows((prev) =>
        prev.map((w) => {
          if (w.id !== id) return w;
          if (w.isMaximized) {
            return {
              ...w,
              isMaximized: false,
              geometry: clampWindowGeometry(
                w.restoreGeometry ?? getInitialGeometry({ id, isMobile, existingCount: 0 }),
                isMobile
              ),
              restoreGeometry: null,
            };
          }

          return {
            ...w,
            isMaximized: true,
            isMinimized: false,
            geometry: getMaximizedGeometry(isMobile),
            restoreGeometry: w.geometry,
          };
        })
      );
      focusWindow(id);
    },
    [focusWindow, isMobile]
  );

  const api = useMemo<WindowManagerApi>(
    () => ({
      openWindow,
      closeWindow,
      minimizeWindow,
      restoreWindow,
      focusWindow,
      updateWindowGeometry,
      toggleMaximizeWindow,
      activeWindowId,
      windows,
      isMobile,
    }),
    [
      openWindow,
      closeWindow,
      minimizeWindow,
      restoreWindow,
      focusWindow,
      updateWindowGeometry,
      toggleMaximizeWindow,
      activeWindowId,
      windows,
      isMobile,
    ]
  );

  useEffect(() => {
    const handleResize = () => {
      setWindows((prev) =>
        prev.map((w) => {
          if (w.isMaximized) {
            return {
              ...w,
              geometry: getMaximizedGeometry(isMobile),
            };
          }

          return {
            ...w,
            geometry: clampWindowGeometry(w.geometry, isMobile),
          };
        })
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  useEffect(() => {
    const sessionKey = "portfolio-about-autoloaded";

    if (sessionStorage.getItem(sessionKey)) return;

    sessionStorage.setItem(sessionKey, "true");

    const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;
    const nextZ = nextZRef.current + 1;
    nextZRef.current = nextZ;

    setWindows((prev) => {
      if (prev.some((w) => w.id === "about")) return prev;

      return [
        ...prev,
        createWindowState({
          id: "about",
          isMobile: isMobileViewport,
          existingCount: prev.length,
          zIndex: nextZ,
          centered: true,
        }),
      ];
    });
    setActiveWindowId("about");
  }, []);

  return (
    <WindowManagerContext.Provider value={api}>
      {children}
      <div className={styles.windowLayer} aria-label="Open windows layer">
        {windows.map((w) => {
          const title = getWindowTitle(w.id, portfolioData);
          return (
            <DesktopWindow
              key={w.id}
              title={title}
              iconId={w.id}
              isActive={w.id === activeWindowId}
              isMinimized={w.isMinimized}
              isMaximized={w.isMaximized}
              canDrag={!isMobile}
              canResize={!isMobile}
              zIndex={w.zIndex}
              geometry={w.geometry}
              onFocus={() => focusWindow(w.id)}
              onClose={() => closeWindow(w.id)}
              onDrag={(geometry) => updateWindowGeometry(w.id, geometry)}
              onResize={(geometry) => updateWindowGeometry(w.id, geometry)}
              onToggleMinimize={() => {
                if (w.isMinimized) restoreWindow(w.id);
                else minimizeWindow(w.id);
              }}
              onToggleMaximize={() => toggleMaximizeWindow(w.id)}
            >
              <WindowContentById id={w.id} />
            </DesktopWindow>
          );
        })}
      </div>
    </WindowManagerContext.Provider>
  );
}
