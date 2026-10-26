# Bitcoin Shipshow T-shirts

Live gallery: https://bitcoin-shipshow-tees.vercel.app (Vercel project `bitcoin-shipshow-tees`, team bitkarrots-projects)

Built on the official brand kit (tomek-k.notion.site, "Asety - logo, wordmark, background,
social graphics"): the paper boat folded from the genesis-block Times front page, Vinque
headings, ocean blue / navy / cream / gold. Raw kit: `research/shipshow/brand/`.

## Designs (14 designs, 60 colourways; first colour = lead)

| # | Design | Placement | Shirts |
|---|--------|-----------|--------|
| 01 | A Pirate's Tears (teardrop) | front | white, yellow, red, black |
| 10 | A Pirate's Tears: Jolly Roger | front | black, white, red, yellow |
| 02 | Pixel Mutiny | front | black, yellow, red, white |
| 03 | We Don't Sink, We Swim | front | navy, yellow, red, black |
| 11 | Not Your Keys, Not Your Ship | front | black, white, yellow, red |
| 12 | X Marks the Block | front | natural, black, red, navy |
| 13 | Wanted: Builders | front | black, charcoal, red, navy |
| 14 | Sail the Seven Relays | front | navy, black, white, yellow |
| 04 | Show What You Shipped | front | natural, yellow, red, black |
| 05 | Fold the Bailout | front | ocean, yellow, red, black |
| 06 | Pirates' Community Call emblem | front | charcoal, yellow, red, black |
| 07 | Left-chest emblem (4 x 4 in) | chest | charcoal, yellow, red, black, white, navy |
| 08 | Crew Manifest | back | black, yellow, red, white, navy |
| 09 | Ship's Log | back | black, yellow, red, white, navy |

Ink colours switch per shirt via `inks()` in the generator (dark inks on white / natural /
yellow, light inks on red / black / navy / ocean / charcoal).

## Files

- `prints/<design>--<shirt>.png`: transparent print file at 300 dpi. 3600 x 4800 px (12 x 16 in)
  for front/back, 1200 x 1200 px (4 x 4 in) for the left chest
- `prints/<design>--<shirt>.svg`: master; all type outlined, boat logo embedded at 3x
- `mockups/<design>--<shirt>.png`: shirt previews (transparent background)
- `site/`: the static gallery deployed to Vercel. It carries web previews of every colourway and
  the full-resolution print PNG of each lead colourway (Hobby CLI uploads are capped at 100 MB)

Screen printing: 02 is flat spot colour; the rest contain the halftone engraving of the boat
and need a halftone separation, or print them DTG / DTF.

## Rebuild and deploy

```bash
uv run --python 3.13 --with fonttools --with brotli --with uharfbuzz --with pillow --with numpy --with scipy \
  python scripts/generate_shipshow_tees.py prints
scripts/render_shipshow_tees.sh            # prints -> mockups -> site (ONLY=<regex> limits prints/mockups)
cd shipshow/tshirts/site && vercel deploy --prod --yes
```

Requires Vinque Regular installed at `~/Library/Fonts/Vinque Rg.otf` (or `VINQUE_OTF`).
Its free Typodermic Desktop EULA covers merchandise but not embedding or redistributing the
font, so it is outlined in every print and never copied into the repo or the site (the site
uses Pirata One + IM Fell English from Google Fonts, the same faces as bitcoinship.show).

Superdesign canvas: project "Bitcoin Shipshow T-Shirt Designs", drafts prefixed "v2 ·" / "v3 ·".
