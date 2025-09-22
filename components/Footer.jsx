import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
{/* About Section */}
<div className="aboutBlock" style={{ marginBottom: "1.5rem" }}>
<h3
  style={{
    fontSize: "2rem",
    fontWeight: "bold",
    marginTop: 0,               // <-- add this
    marginBottom: "0.5rem",
  }}
>
    About Barrels & Backroads
  </h3>
  <p
    style={{
      fontSize: "01.25rem",
      lineHeight: "1.5",
      maxWidth: "800px",
      margin: "0 auto",
    }}
  >
    Road trips, scenic routes, and great whiskey. We’re mapping the best drives, tasting
    rooms, and cozy spots to land for the night.
  </p>
</div>
      <p className={styles.copy}>
        © {new Date().getFullYear()} Barrels &amp; Backroads
      </p>
      <p className={styles.location}>Loveland, CO</p>

      {/* Social Icons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          marginTop: 10,
        }}
      >
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          style={{ display: "inline-flex" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            aria-hidden="true"
          >
            <path d="M22 12.07C22 6.478 17.523 2 11.93 2 6.338 2 1.86 6.478 1.86 12.07c0 4.994 3.657 9.136 8.438 9.93v-7.02H7.898v-2.91h2.4V9.845c0-2.371 1.413-3.68 3.575-3.68 1.036 0 2.12.185 2.12.185v2.33h-1.195c-1.178 0-1.545.73-1.545 1.479v1.777h2.63l-.42 2.91h-2.21v7.02C18.343 21.206 22 17.064 22 12.07z" />
          </svg>
        </a>

        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          style={{ display: "inline-flex" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            aria-hidden="true"
          >
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11.001A5.5 5.5 0 0 1 12 7.5zm0 2a3.5 3.5 0 1 0 .001 7.001A3.5 3.5 0 0 0 12 9.5zm5.25-3a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
          </svg>
        </a>

        <a
          href="https://www.tiktok.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          style={{ display: "inline-flex" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            aria-hidden="true"
          >
            <path d="M16.5 3.5c.7 1.3 1.9 2.3 3.3 2.7v3.1a7.7 7.7 0 0 1-3.3-.9v5.9a6.9 6.9 0 1 1-6.9-6.9c.5 0 1 .1 1.5.2v3.2a3.7 3.7 0 1 0 2.7 3.6V2h2.7v1.5z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
