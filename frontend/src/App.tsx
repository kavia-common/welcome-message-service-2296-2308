import React from "react";
import { fetchWelcomeMessage } from "./api";

type LoadState =
  | { status: "idle" | "loading" }
  | { status: "loaded"; message: string }
  | { status: "error"; error: string };

export default function App() {
  const [state, setState] = React.useState<LoadState>({ status: "idle" });

  const load = React.useCallback(async () => {
    const controller = new AbortController();
    setState({ status: "loading" });

    try {
      const data = await fetchWelcomeMessage(controller.signal);
      setState({ status: "loaded", message: data.message });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setState({ status: "error", error: msg });
    }

    return () => controller.abort();
  }, []);

  React.useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <div className="brandMark" aria-hidden="true" />
          <div className="brandText">
            <div className="brandTitle">Welcome Message Service</div>
            <div className="brandSubtitle">React (Vite) frontend</div>
          </div>
        </div>

        <a className="docsLink" href="/docs" target="_blank" rel="noreferrer">
          API Docs
        </a>
      </header>

      <main className="content" role="main">
        <section className="card" aria-label="Welcome message">
          <h1 className="cardTitle">Welcome</h1>
          <p className="cardBody">
            {state.status === "loading" || state.status === "idle"
              ? "Loading message from the backend…"
              : state.status === "loaded"
                ? state.message
                : "Could not load the welcome message."}
          </p>

          {state.status === "error" ? (
            <pre className="errorBox" role="alert">
              {state.error}
            </pre>
          ) : null}

          <div className="actions">
            <button className="primaryButton" type="button" onClick={() => void load()}>
              Refresh
            </button>

            <div className="hint">
              Calls <code>GET /welcome</code>. Configure API base URL via{" "}
              <code>VITE_API_BASE_URL</code>.
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>
          Theme: <strong>Ocean Professional</strong> (primary: #2563EB, accent: #F59E0B)
        </span>
      </footer>
    </div>
  );
}
