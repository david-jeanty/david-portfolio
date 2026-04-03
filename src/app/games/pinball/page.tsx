import Link from "next/link";
import styles from "./PinballPage.module.css";

export default function PinballPage() {
  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <header className={styles.topBar}>
          <div className={styles.headingBlock}>
            <p className={styles.eyebrow}>Games folder</p>
            <h1 className={styles.title}>3D Pinball Space Cadet</h1>
            <p className={styles.subtitle}>
              A browser-playable local vendored build, wrapped in its own route so the desktop stays clean.
            </p>
          </div>

          <Link href="/" className={styles.backButton}>
            Back to desktop
          </Link>
        </header>

        <div className={styles.frameWrap}>
          <iframe
            src="/vendor/space-cadet/index.html"
            title="3D Pinball Space Cadet"
            className={styles.frame}
            allowFullScreen
          />
        </div>

        <div className={styles.statusBar}>
          <span>Local vendor: `/public/vendor/space-cadet`</span>
          <span>Keyboard controls live inside the game</span>
        </div>
      </section>
    </main>
  );
}
