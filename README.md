# 💼 CV Online — Alejandro Abad Noriega

Este repositorio contiene mi **Currículum Vitae en formato web** con soporte de **i18n (ES/EN)** sin duplicar estructura.

## 📂 Estructura
```
cv/
├── index.html
├── assets/
│   ├── yo.jpg
│   └── i18n/
│       ├── es.json
│       └── en.json
└── README.md
```

## 🌐 Ver online (GitHub Pages)
- Español: `https://abanoral.github.io/cv/?lang=es`
- English: `https://abanoral.github.io/cv/?lang=en`

## 🛠️ Notas técnicas
- HTML + CSS puro, con **claves `data-i18n`**.
- Script mínimo que lee `?lang=es|en`, `localStorage` y `navigator.language`.
- Impresión optimizada (`@media print`) con foto y márgenes correctos.