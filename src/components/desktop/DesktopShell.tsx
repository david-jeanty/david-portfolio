"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { portfolioData, type DesktopIconId } from "@/data/portfolio";
import WindowManager, { useWindowManager } from "@/components/desktop/WindowManager";
import { DesktopIconArt } from "./XPIcons";
import styles from "./DesktopShell.module.css";

function windowLabel(id: DesktopIconId) {
  return portfolioData.desktop.icons.find((i) => i.id === id)?.label ?? id;
}

function DesktopIcons({
  selectedIconId,
  onSelectIcon,
  onClearSelection,
}: {
  selectedIconId: DesktopIconId | null;
  onSelectIcon: (id: DesktopIconId) => void;
  onClearSelection: () => void;
}) {
  const { openWindow } = useWindowManager();

  return (
    <div
      className={styles.desktopSelectionLayer}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClearSelection();
      }}
    >
      <ul className={styles.iconGrid} aria-label="Desktop icons">
        {portfolioData.desktop.icons.filter((icon) => !icon.hidden).map((icon) => {
          const isSelected = icon.id === selectedIconId;
          const handleIconActivate = () => {
            onSelectIcon(icon.id);
            openWindow(icon.id);
          };

          return (
            <li key={icon.id} className={styles.iconItem}>
              <button
                className={`${styles.iconButton} ${isSelected ? styles.iconButtonSelected : ""}`}
                type="button"
                onClick={handleIconActivate}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleIconActivate();
                  }
                }}
                aria-label={`Open ${icon.label}`}
                aria-pressed={isSelected}
              >
                <span className={styles.iconArt} aria-hidden="true">
                  <DesktopIconArt id={icon.id} />
                </span>
                <span className={styles.iconLabel}>{icon.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function StartMenu({
  onOpenWindow,
  onClose,
}: {
  onOpenWindow: (id: DesktopIconId) => void;
  onClose: () => void;
}) {
  const publicItems = portfolioData.desktop.icons.filter((item) => !item.hidden);
  const primaryItems = publicItems.filter(
    (item) => item.id !== "games" && item.id !== "internal-only"
  );
  const secondaryItems = publicItems.filter(
    (item) => item.id === "games" || item.id === "internal-only"
  );
  const handleWindowLaunch = (id: DesktopIconId) => () => {
    onClose();
    onOpenWindow(id);
  };

  const handleMenuActionClick = () => {
    onClose();
  };

  return (
    <div
      className={styles.startMenu}
      role="menu"
      aria-label="Start menu"
      data-shell-popover="start-menu"
    >
      <div className={styles.startMenuHeader}>
        <div className={styles.startMenuUserFrame} aria-hidden="true">
          <Image
            src="/start-menu-user.jpg"
            alt=""
            width={48}
            height={48}
            className={styles.startMenuUserImage}
            unoptimized
          />
        </div>
        <div className={styles.startMenuUserMeta}>
          <span className={styles.startMenuBrand}>David Jeanty</span>
          <span className={styles.startMenuSubtitle}>Portfolio</span>
        </div>
      </div>

      <div className={styles.startMenuPanel}>
        <div className={styles.startMenuPrimaryColumn}>
          <div className={styles.startMenuSection}>
            {primaryItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={styles.startMenuItem}
                onClick={handleWindowLaunch(item.id)}
                role="menuitem"
              >
                <span className={styles.startMenuItemIcon} aria-hidden="true">
                  <DesktopIconArt id={item.id} size={20} />
                </span>
                <span>{item.label.replace(".pdf", "")}</span>
              </button>
            ))}
          </div>

          {secondaryItems.length > 0 ? (
            <>
              <div className={styles.startMenuDivider} />
              <div className={styles.startMenuSection}>
                {secondaryItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={styles.startMenuItem}
                    onClick={handleWindowLaunch(item.id)}
                    role="menuitem"
                  >
                    <span className={styles.startMenuItemIcon} aria-hidden="true">
                      <DesktopIconArt id={item.id} size={20} />
                    </span>
                    <span>{item.label.replace(".pdf", "")}</span>
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>

        <div className={styles.startMenuSecondaryColumn}>
          <div className={styles.startMenuSection}>
            <a
              href={`/${portfolioData.desktop.resumeFileName}`}
              download
              className={styles.startMenuAction}
              role="menuitem"
              onClick={handleMenuActionClick}
            >
              Download Resume
            </a>
            <a
              href={`https://${portfolioData.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.startMenuAction}
              role="menuitem"
              onClick={handleMenuActionClick}
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${portfolioData.contact.email}`}
              className={styles.startMenuAction}
              role="menuitem"
              onClick={handleMenuActionClick}
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClockPopover({ now }: { now: Date }) {
  const dateParts = useMemo(
    () =>
      new Intl.DateTimeFormat([], {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).formatToParts(now),
    [now]
  );

  const month = dateParts.find((part) => part.type === "month")?.value ?? "";
  const day = dateParts.find((part) => part.type === "day")?.value ?? "";

  return (
    <div
      className={styles.clockPopover}
      role="dialog"
      aria-label="Date and time"
      data-shell-popover="clock-panel"
    >
      <div className={styles.clockPopoverTime}>
        {now.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })}
      </div>
      <div className={styles.clockPopoverDate}>
        {now.toLocaleDateString([], {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>
      <div className={styles.calendarCard}>
        <div className={styles.calendarHeader}>{month}</div>
        <div className={styles.calendarDate}>{day}</div>
      </div>
    </div>
  );
}

function DesktopTaskbar({
  timeLabel,
  now,
  isStartMenuOpen,
  isClockOpen,
  onToggleStartMenu,
  onToggleClock,
  onAfterWindowOpen,
  onTaskbarInteract,
}: {
  timeLabel: string;
  now: Date;
  isStartMenuOpen: boolean;
  isClockOpen: boolean;
  onToggleStartMenu: () => void;
  onToggleClock: () => void;
  onAfterWindowOpen: (id: DesktopIconId) => void;
  onTaskbarInteract: () => void;
}) {
  const {
    windows,
    activeWindowId,
    openWindow,
    focusWindow,
    minimizeWindow,
    restoreWindow,
  } = useWindowManager();

  return (
    <>
      <button
        className={styles.startButton}
        type="button"
        aria-label="Open start menu"
        aria-expanded={isStartMenuOpen}
        onClick={onToggleStartMenu}
      >
        <span className={styles.startOrb} aria-hidden="true" />
        <span className={styles.startText}>start</span>
      </button>

      {isStartMenuOpen ? (
        <StartMenu
          onOpenWindow={(id) => {
            openWindow(id);
            onAfterWindowOpen(id);
          }}
          onClose={() => onTaskbarInteract()}
        />
      ) : null}

      <div className={styles.taskbarWindowButtons} aria-label="Open windows">
        {windows.map((w) => (
          <button
            key={w.id}
            type="button"
            className={[
              styles.taskbarWindowButton,
              w.id === activeWindowId && !w.isMinimized
                ? styles.taskbarWindowButtonActive
                : "",
              w.isMinimized ? styles.taskbarWindowButtonMinimized : "",
            ].join(" ")}
            onClick={() => {
              onTaskbarInteract();
              if (w.isMinimized) restoreWindow(w.id);
              else if (w.id === activeWindowId) minimizeWindow(w.id);
              else focusWindow(w.id);
            }}
            aria-label={`Switch to ${windowLabel(w.id)}`}
          >
            {windowLabel(w.id).replace(".pdf", "")}
          </button>
        ))}
      </div>

      <div className={styles.taskbarSpacer} />

      <button
        type="button"
        className={styles.systemTray}
        aria-label="System tray"
        aria-expanded={isClockOpen}
        onClick={onToggleClock}
      >
        <span className={styles.trayDot} aria-hidden="true" />
        <span className={styles.trayDot} aria-hidden="true" />
        <span className={styles.clock}>{timeLabel}</span>
      </button>

      {isClockOpen ? <ClockPopover now={now} /> : null}
    </>
  );
}

export default function DesktopShell() {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [now, setNow] = useState(() => new Date());
  const [selectedIconId, setSelectedIconId] = useState<DesktopIconId | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isClockOpen, setIsClockOpen] = useState(false);

  useEffect(() => {
    const updateClock = () => setNow(new Date());
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!shellRef.current?.contains(event.target as Node)) return;

      const target = event.target as HTMLElement;
      if (!target.closest("[data-shell-popover]")) {
        setIsStartMenuOpen(false);
        setIsClockOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsStartMenuOpen(false);
      setIsClockOpen(false);
      setSelectedIconId(null);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const timeLabel = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div ref={shellRef} className={styles.desktop}>
      <div className={styles.wallpaperLayer} />

      <WindowManager>
        <main className={styles.workspace} aria-label="Desktop workspace">
          <DesktopIcons
            selectedIconId={selectedIconId}
            onSelectIcon={(id) => {
              setSelectedIconId(id);
              setIsStartMenuOpen(false);
              setIsClockOpen(false);
            }}
            onClearSelection={() => setSelectedIconId(null)}
          />
        </main>

        <footer className={styles.taskbar} aria-label="Taskbar" data-shell-popover="taskbar">
          <DesktopTaskbar
            timeLabel={timeLabel}
            now={now}
            isStartMenuOpen={isStartMenuOpen}
            isClockOpen={isClockOpen}
            onToggleStartMenu={() => {
              setIsStartMenuOpen((current) => !current);
              setIsClockOpen(false);
            }}
            onToggleClock={() => {
              setIsClockOpen((current) => !current);
              setIsStartMenuOpen(false);
            }}
            onAfterWindowOpen={(id) => {
              setSelectedIconId(id);
              setIsStartMenuOpen(false);
              setIsClockOpen(false);
            }}
            onTaskbarInteract={() => {
              setIsStartMenuOpen(false);
              setIsClockOpen(false);
            }}
          />
        </footer>
      </WindowManager>
    </div>
  );
}
