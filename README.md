# Bitcoin Shipshow — media

Promotional media for the Bitcoin Shipshow (bitcoinship.show): the T-shirt
gallery site deployed to Vercel, the high-resolution print files and mockups,
and the promo shorts.

## Contents

| Path | What it is |
|------|------------|
| `site/` | Static T-shirt gallery — the Vercel deployment source |
| `prints/` | Print-resolution artwork, one `<design>--<shirt>.{png,svg}` pair per colourway (120 files; PNG is print-res raster, SVG is the vector master) |
| `mockups/` | On-shirt mockup renders, same naming as `prints/` (120 files) |
| `manifest.json` | Design/shirt metadata used by the generator and site |
| `contact-sheet.png` | Overview grid of all designs |
| `TSHIRTS.md` | Design list (14 designs, 60 colourways) and credits |
| `shorts/` | Promo shorts (MP4, 1080p): `bitcoin-shipshow-short-{one,two,spyglass,wanted,pixelpirates,broadside}.mp4` plus the E02 announcement `2026nov3_bitcoinshipshow.mp4` |

## Redeploying the site

The site is deployed as Vercel project `bitcoin-shipshow-tees`
(team `bitkarrots-projects`): https://bitcoin-shipshow-tees.vercel.app

```bash
cd site
vercel link            # pick scope "bitkarrots-projects", project "bitcoin-shipshow-tees"
vercel deploy --prod --yes
```

`.vercel/` is gitignored on purpose — it holds the org/project IDs, and Vercel
recommends not sharing it. `vercel link` recreates it. The local
`.env.local` (`VERCEL_OIDC_TOKEN`) is also deliberately not committed.

## Regenerating the artwork

Prints, mockups and this site are generated in the `motion-graphics` repo:

- `scripts/generate_shipshow_tees.py` — designs + per-shirt ink palettes
- `scripts/render_shipshow_tees.sh` — renders prints, mockups, rebuilds the site

Artwork uses the official brand kit (paper-boat logo, Vinque headings — text is
outlined in the SVGs, the font file is not included, per its licence).

## Show links

- bitcoinship.show · YouTube @BitcoinShipshow · #bitcoinshipshow
- Hosted by Tomek, AJ, Bitkarrot, adpot
