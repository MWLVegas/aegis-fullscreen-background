class AegisIframeBackgroundCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._reloadTimer = null;
  }

  setConfig(config) {
    if (!config || typeof config.url !== "string" || config.url.trim() === "") {
      throw new Error("Aegis Iframe Background Card requires a url configuration value.");
    }

    this._clearReloadTimer();

    const opacity = Number(config.opacity ?? 1);
    const zIndex = Number(config.z_index ?? 0);
    const reloadInterval = Number(config.reload_interval ?? 0);

    this._config = {
      url: config.url.trim(),
      z_index: Number.isFinite(zIndex) ? zIndex : 0,
      opacity: Number.isFinite(opacity) ? Math.min(1, Math.max(0, opacity)) : 1,
      pointer_events: config.pointer_events === true,
      background: config.background ?? "black",
      reload_interval: Number.isFinite(reloadInterval) && reloadInterval > 0 ? reloadInterval : 0,
      allow: typeof config.allow === "string" ? config.allow : undefined,
      sandbox: typeof config.sandbox === "string" ? config.sandbox : undefined,
      title: typeof config.title === "string" && config.title.trim() !== ""
        ? config.title
        : "Aegis iframe background",
    };

    this._render();
    this._startReloadTimer();
  }

  connectedCallback() {
    this._startReloadTimer();
  }

  disconnectedCallback() {
    this._clearReloadTimer();
  }

  getCardSize() {
    return 1;
  }

  _render() {
    if (!this._config) {
      return;
    }

    const iframeAttributes = [
      `src="${this._escapeAttribute(this._config.url)}"`,
      `title="${this._escapeAttribute(this._config.title)}"`,
    ];

    if (this._config.allow) {
      iframeAttributes.push(`allow="${this._escapeAttribute(this._config.allow)}"`);
    }

    if (this._config.sandbox) {
      iframeAttributes.push(`sandbox="${this._escapeAttribute(this._config.sandbox)}"`);
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          height: 1px;
          min-height: 1px;
        }

        ha-card.layout-anchor {
          height: 1px;
          min-height: 1px;
          padding: 0;
          margin: 0;
          background: transparent;
          box-shadow: none;
          border: 0;
          overflow: hidden;
        }

        .aegis-bg {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: var(--aegis-bg-background, black);
          opacity: var(--aegis-bg-opacity, 1);
          z-index: var(--aegis-bg-z-index, 0);
          pointer-events: none;
        }

        .aegis-bg.pointer-events {
          pointer-events: auto;
        }

        .aegis-bg iframe {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
        }
      </style>
      <div
        class="aegis-bg${this._config.pointer_events ? " pointer-events" : ""}"
        style="
          --aegis-bg-background: ${this._escapeStyleValue(this._config.background)};
          --aegis-bg-opacity: ${this._config.opacity};
          --aegis-bg-z-index: ${this._config.z_index};
        "
      >
        <iframe ${iframeAttributes.join(" ")}></iframe>
      </div>
      <ha-card class="layout-anchor"></ha-card>
    `;
  }

  _startReloadTimer() {
    if (!this.isConnected || !this._config || this._config.reload_interval <= 0 || this._reloadTimer) {
      return;
    }

    this._reloadTimer = window.setInterval(() => {
      const iframe = this.shadowRoot?.querySelector("iframe");
      if (iframe) {
        iframe.src = this._config.url;
      }
    }, this._config.reload_interval * 1000);
  }

  _clearReloadTimer() {
    if (this._reloadTimer) {
      window.clearInterval(this._reloadTimer);
      this._reloadTimer = null;
    }
  }

  _escapeAttribute(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  _escapeStyleValue(value) {
    return String(value).replace(/[;"{}]/g, "");
  }
}

if (!customElements.get("aegis-iframe-background-card")) {
  customElements.define("aegis-iframe-background-card", AegisIframeBackgroundCard);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === "aegis-iframe-background-card")) {
  window.customCards.push({
    type: "aegis-iframe-background-card",
    name: "Aegis Iframe Background Card",
    description: "Displays an iframe as a full-dashboard background layer.",
  });
}
