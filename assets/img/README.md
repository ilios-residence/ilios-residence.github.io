# Fixed photo slots

These eight photos sit in specific places in the design and are referenced
directly from `index.html`, so they keep fixed filenames. Put them in this
folder (`assets/img/`).

**The gallery is not here.** It is generated — drop those photos into
`photos/` instead and run `npm run gallery`. See the main README.

| Filename             | Where it appears             | Aspect | Export at   |
| -------------------- | ---------------------------- | ------ | ----------- |
| `hero.jpg`           | Hero banner                  | ~16:9  | 2400 × 1400 |
| `garden-dining.jpg`  | The house — first of three   | 3:4    | 1200 × 1600 |
| `living-room.jpg`    | The house — second of three  | 3:4    | 1200 × 1600 |
| `bedroom-main.jpg`   | The house — third of three   | 3:4    | 1200 × 1600 |
| `nearby-beach.jpg`   | Nearby — Beaches card        | 4:3    | 1200 × 900  |
| `nearby-gorge.jpg`   | Nearby — Walks & gorges card | 4:3    | 1200 × 900  |
| `nearby-taverna.jpg` | Nearby — Tavernas card       | 4:3    | 1200 × 900  |
| `nearby-boat.jpg`    | Nearby — Boat trips card     | 4:3    | 1200 × 900  |

Any file that isn't here yet shows the hatched placeholder with its caption, so
you can add them one at a time without breaking the layout.

## Please resize these before uploading

Unlike the gallery, nothing resizes these for you — the browser downloads
exactly what you put here.

`hero.jpg` matters most. It is the first thing that loads and is not
lazy-loaded, so it decides how fast the page feels. Keep it **under 400 KB**;
a photo straight off a phone is 5–8 MB and will make the site feel broken on a
phone abroad. Export at the size in the table, JPEG quality ~80, sRGB.

The other seven are lazy-loaded and less critical, but aim for under 250 KB
each.

If you would rather not resize by hand, put them through the same tool the
gallery uses:

```bash
npx --yes sharp-cli -i original.jpg -o hero.jpg resize 2400 1400 --fit cover
```

## Alt text

Alt text lives next to each `<img>` in `index.html` — search for the filename.
Update it when you swap in a real photo so it describes what is actually shown;
it is what screen readers announce and what search engines read.
