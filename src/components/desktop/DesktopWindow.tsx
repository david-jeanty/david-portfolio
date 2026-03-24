"use client";

import { ReactNode, useRef } from "react";
import styles from "./DesktopWindow.module.css";
import { type DesktopIconId } from "@/data/portfolio";
import { TitleBarIcon } from "./XPIcons";

export type WindowGeometry = {
  x: number;
  y: number;
  w: number;
  h: number;
};

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

export default function DesktopWindow({
  title,
  iconId,
  isActive,
  isMinimized,
  isMaximized,
  canDrag,
  canResize,
  zIndex,
  geometry,
  onFocus,
  onClose,
  onDrag,
  onResize,
  onToggleMinimize,
  onToggleMaximize,
  children,
}: {
  title: string;
  iconId?: DesktopIconId;
  isActive: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  canDrag: boolean;
  canResize: boolean;
  zIndex: number;
  geometry: WindowGeometry;
  onFocus: () => void;
  onClose: () => void;
  onDrag: (geometry: WindowGeometry) => void;
  onResize: (geometry: WindowGeometry) => void;
  onToggleMinimize: () => void;
  onToggleMaximize: () => void;
  children: ReactNode;
}) {
  const dragStateRef = useRef<{
    pointerId: number;
    startPointerX: number;
    startPointerY: number;
    startGeometry: WindowGeometry;
    isDragging: boolean;
  } | null>(null);
  const resizeStateRef = useRef<{
    direction: ResizeDirection;
    startPointerX: number;
    startPointerY: number;
    startGeometry: WindowGeometry;
  } | null>(null);

  if (isMinimized) return null;

  const handleTitlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    onFocus();

    if (!canDrag || isMaximized || event.button !== 0) return;
    if ((event.target as HTMLElement).closest("button")) return;

    dragStateRef.current = {
      pointerId: event.pointerId,
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startGeometry: geometry,
      isDragging: false,
    };

    const pointerId = event.pointerId;
    event.currentTarget.setPointerCapture(pointerId);
    const dragThreshold = 4;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const dragState = dragStateRef.current;
      if (!dragState || dragState.pointerId !== moveEvent.pointerId) return;

      const deltaX = moveEvent.clientX - dragState.startPointerX;
      const deltaY = moveEvent.clientY - dragState.startPointerY;

      if (!dragState.isDragging) {
        if (Math.abs(deltaX) < dragThreshold && Math.abs(deltaY) < dragThreshold) {
          return;
        }

        dragState.isDragging = true;
      }

      onDrag({
        ...dragState.startGeometry,
        x: dragState.startGeometry.x + deltaX,
        y: dragState.startGeometry.y + deltaY,
      });
    };

    const stopDragging = (endEvent: PointerEvent) => {
      if (dragStateRef.current?.pointerId !== endEvent.pointerId) return;
      dragStateRef.current = null;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
  };

  const handleResizePointerDown =
    (direction: ResizeDirection) => (event: React.PointerEvent<HTMLSpanElement>) => {
      onFocus();

      if (!canResize || isMaximized || event.button !== 0) return;

      event.preventDefault();
      event.stopPropagation();
      resizeStateRef.current = {
        direction,
        startPointerX: event.clientX,
        startPointerY: event.clientY,
        startGeometry: geometry,
      };

      const handlePointerMove = (moveEvent: PointerEvent) => {
        const resizeState = resizeStateRef.current;
        if (!resizeState) return;

        const deltaX = moveEvent.clientX - resizeState.startPointerX;
        const deltaY = moveEvent.clientY - resizeState.startPointerY;
        const nextGeometry = { ...resizeState.startGeometry };

        if (resizeState.direction.includes("e")) {
          nextGeometry.w = resizeState.startGeometry.w + deltaX;
        }
        if (resizeState.direction.includes("s")) {
          nextGeometry.h = resizeState.startGeometry.h + deltaY;
        }
        if (resizeState.direction.includes("w")) {
          nextGeometry.x = resizeState.startGeometry.x + deltaX;
          nextGeometry.w = resizeState.startGeometry.w - deltaX;
        }
        if (resizeState.direction.includes("n")) {
          nextGeometry.y = resizeState.startGeometry.y + deltaY;
          nextGeometry.h = resizeState.startGeometry.h - deltaY;
        }

        onResize(nextGeometry);
      };

      const stopResizing = () => {
        resizeStateRef.current = null;
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", stopResizing);
        window.removeEventListener("pointercancel", stopResizing);
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", stopResizing);
      window.addEventListener("pointercancel", stopResizing);
    };

  return (
    <section
      className={`${styles.window} ${isActive ? styles.windowActive : ""}`}
      style={{
        left: geometry.x,
        top: geometry.y,
        width: geometry.w,
        height: geometry.h,
        zIndex,
      }}
      onPointerDown={onFocus}
      tabIndex={0}
      onFocus={onFocus}
      aria-label={title}
      role="dialog"
    >
      <header
        className={`${styles.titleBar} ${
          isActive ? "" : styles.titleBarInactive
        }`}
        onPointerDown={handleTitlePointerDown}
        onDoubleClick={() => {
          if (canDrag) onToggleMaximize();
        }}
      >
        <div className={styles.titleLeft}>
          {iconId
            ? <TitleBarIcon id={iconId} />
            : <span className={styles.titleBadge} aria-hidden="true" />}
          <span className={styles.titleText}>{title}</span>
        </div>

        <div className={styles.windowControls} aria-label="Window controls">
          <button
            type="button"
            className={styles.controlButton}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onToggleMinimize();
            }}
            aria-label="Minimize window"
          >
            <span aria-hidden="true">—</span>
          </button>

          <button
            type="button"
            className={styles.controlButton}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onToggleMaximize();
            }}
            aria-label={isMaximized ? "Restore window" : "Maximize window"}
          >
            <span aria-hidden="true">{isMaximized ? "❐" : "□"}</span>
          </button>

          <button
            type="button"
            className={`${styles.controlButton} ${styles.controlButtonClose}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close window"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </header>

      <div className={styles.windowBody}>{children}</div>

      {canResize && !isMaximized
        ? ([
            ["n", styles.resizeHandleN],
            ["s", styles.resizeHandleS],
            ["e", styles.resizeHandleE],
            ["w", styles.resizeHandleW],
            ["ne", styles.resizeHandleNE],
            ["nw", styles.resizeHandleNW],
            ["se", styles.resizeHandleSE],
            ["sw", styles.resizeHandleSW],
          ] as Array<[ResizeDirection, string]>).map(([direction, className]) => (
            <span
              key={direction}
              className={`${styles.resizeHandle} ${className}`}
              onPointerDown={handleResizePointerDown(direction)}
              aria-hidden="true"
            />
          ))
        : null}
    </section>
  );
}
