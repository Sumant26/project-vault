# System Architecture & Design Decisions

This document details the architectural layout, state management, and rendering pipeline of **Project Vault**.

---

## 🏛️ High-Level Architecture Diagram

```text
+--------------------------------------------------------------------------------+
|                                  Browser / User                                |
+--------------------------------------------------------------------------------+
                                       │
                                       ▼
+--------------------------------------------------------------------------------+
|                               App Root & Theme Provider                         |
+--------------------------------------------------------------------------------+
                                       │
                                       ▼
+--------------------------------------------------------------------------------+
|                               ProjectContext (State)                           |
|  - Projects List (default + custom localStorage)                               |
|  - Active View Mode (Launchpad | Viewport | Deck)                              |
|  - Active Project ID & Filter Query / Category Tag                             |
|  - Device Frame (Desktop: 1440px | Tablet: 768px | Mobile: 375px)              |
|  - Modals (Add Project | Quick Preview | Export/Import | Shortcuts)             |
+--------------------------------------------------------------------------------+
          │                                 │                               │
          ▼                                 ▼                               ▼
+--------------------+            +--------------------+          +--------------------+
| ▦ Launchpad View   |            | ◫ Viewport View    |          | 🎴 Deck View       |
| - Compact Tiles    |            | - Split Navigation |          | - Rich 3D Cards    |
| - Status Lights    |            | - Live Iframe Bezel|          | - Tech Stack Tags  |
| - Instant Launcher |            | - Device Switcher  |          | - Modal Previewer  |
+--------------------+            +--------------------+          +--------------------+
```

---

## ⚙️ Core Technical Decisions

### 1. View Mode Decoupling
Rather than forcing a single presentation style, the 3 view modes (`Launchpad`, `Viewport`, `Deck`) are isolated into independent, pure functional components. Switching views is an instantaneous $O(1)$ state transition with zero layout jitter.

### 2. Live Iframe Security & Isolation
The interactive viewport hosts live Vercel deployments using sandboxed iframes:
```html
<iframe
  src="{project.vercelUrl}"
  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
  loading="lazy"
  referrerPolicy="no-referrer"
/>
```
If an external site disallows iframes via `X-Frame-Options`, the viewport automatically falls back to an elegant interactive card with an instant **"Open Full Experience ↗"** button.

### 3. State Management & Storage Layer
All user-added projects are saved to `localStorage` under the key `project_vault_user_data_v1`. On initial load, the app hydrates custom user entries alongside default system seeds, ensuring custom projects remain persistent across reloads.
