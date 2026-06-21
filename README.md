# Aegis Iframe Background Card

Aegis Iframe Background Card is a HACS-compatible Home Assistant Lovelace frontend card that displays a configured URL as a full-dashboard iframe background.

It does not fetch image lists, rotate slides, require entities, call Home Assistant backend APIs, or provide a slideshow engine. The iframe source is responsible for its own content and slideshow behavior.

## Installation With HACS

1. In Home Assistant, open HACS.
2. Go to **Frontend**.
3. Open the menu and choose **Custom repositories**.
4. Add this repository URL.
5. Select **Dashboard** as the category.
6. Install **Aegis Iframe Background Card**.
7. Restart Home Assistant or refresh your browser cache if needed.

## Manual Resource Registration

If HACS does not add the resource automatically, add it manually in Home Assistant:

- URL: `/hacsfiles/aegis-fullscreen-background/aegis-iframe-background-card.js`
- Type: `JavaScript module`

## Example YAML

```yaml
type: custom:aegis-iframe-background-card
url: https://raumhub.us/kiosk/slideshow.php?noclock
z_index: 0
opacity: 1
pointer_events: false
background: black
```

## Options

| Option | Required | Default | Description |
| --- | --- | --- | --- |
| `url` | Yes | | URL loaded in the iframe. |
| `z_index` | No | `0` | CSS z-index for the fixed background layer. |
| `opacity` | No | `1` | Background layer opacity from `0` to `1`. |
| `pointer_events` | No | `false` | Allows iframe interaction when `true`. |
| `background` | No | `black` | Background color behind the iframe. |
| `reload_interval` | No | `0` | Reload interval in seconds. Disabled when `0`. |
| `allow` | No | | Optional iframe `allow` attribute. |
| `sandbox` | No | | Optional iframe `sandbox` attribute. Omitted when unset. |
| `title` | No | `Aegis iframe background` | iframe title attribute. |

## Recommended Lovelace Usage

Place this card as the first card in the dashboard or view.

Other dashboard cards may need transparent backgrounds or z-index styling if the theme or card layout covers the background.

## What The Card Renders

The card creates a fixed-position iframe layer that fills the browser viewport and a tiny invisible Lovelace card anchor so the dashboard accepts the card without showing normal card chrome.

```html
<div class="aegis-bg">
  <iframe></iframe>
</div>
<ha-card class="layout-anchor"></ha-card>
```
