/* ==========================================================================
   Ilios Residence — site behaviour
   Language toggle (EN/EL), mobile menu, gallery lightbox, enquiry form,
   scroll-spy nav and graceful fallback for photos that aren't in place yet.
   No dependencies.
   ========================================================================== */

(() => {
  'use strict';

  /* ── Configuration ──────────────────────────────────────────────────── */

  // Point this at a form endpoint (Formspree, Basin, Netlify Forms, your own
  // handler …) to make the enquiry form actually send. Left empty, the form
  // stays in demo mode and only confirms on screen.
  const FORM_ENDPOINT = '';

  const STORAGE_KEY = 'ilios.lang';

  /* ── Greek copy ─────────────────────────────────────────────────────── */

  const EL = {
    'a11y.skip': 'Μετάβαση στο περιεχόμενο',
    'brand.place': 'Παλαιόχωρα · Κρήτη',

    'nav.about': 'Το σπίτι', 'nav.amenities': 'Παροχές', 'nav.gallery': 'Φωτογραφίες',
    'nav.location': 'Τοποθεσία', 'nav.nearby': 'Γύρω μας', 'nav.faq': 'Χρήσιμα', 'nav.book': 'Κρατήσεις',

    'hero.eyebrow': 'Παλαιόχωρα · Χανιά · Κρήτη',
    'hero.sub': 'Ένα φωτεινό, ιδιωτικό σπίτι με καταπράσινο κήπο και θέα στο ηλιοβασίλεμα, στην ήσυχη περιοχή Πανόραμα της Παλαιόχωρας.',
    'hero.m1k': 'Άτομα', 'hero.m1v': '4', 'hero.m2k': 'Υπνοδωμάτια', 'hero.m2v': '2',
    'hero.m3k': 'Κρεβάτια', 'hero.m3v': '2 queen size',
    'hero.m4k': 'Εξωτερικά', 'hero.m4v': 'Ιδιωτικός κήπος',
    'hero.cta1': 'Διαθεσιμότητα', 'hero.cta2': 'Δείτε το σπίτι',

    'about.label': '01 — Το σπίτι',
    'about.title': 'Καταπράσινος κήπος, σκιερή βεράντα και το ηλιοβασίλεμα πάνω από τη θάλασσα.',
    'about.p1': 'Καλώς ήρθατε στο Ilios Residence, ένα φωτεινό και ευρύχωρο ιδιωτικό σπίτι στην ήσυχη περιοχή Πανόραμα της Παλαιόχωρας, στα Χανιά. Το σπίτι διαθέτει δύο άνετα υπνοδωμάτια, πλήρως εξοπλισμένη κουζίνα, άνετο σαλόνι, ένα μπάνιο και ξεχωριστή τουαλέτα.',
    'about.p2': 'Χαλαρώστε στον καταπράσινο ιδιωτικό κήπο ή απολαύστε γεύματα στη βεράντα με έπιπλα, ενώ ο ήλιος δύει πάνω από τη θάλασσα. Μια φιλόξενη βάση για ζευγάρια, οικογένειες ή φίλους — με δωρεάν πάρκινγκ μέσα στην ιδιοκτησία.',
    'about.s1k': 'Φιλοξενεί', 'about.s1v': '4 άτομα',
    'about.s2k': 'Υπνοδωμάτια', 'about.s2v': '2 · κρεβάτια queen',
    'about.s3k': 'Μπάνιο', 'about.s3v': '1 + ξεχωριστό WC',

    'am.label': '02 — Παροχές', 'am.title': 'Όλα όσα περιλαμβάνει το σπίτι.',
    'am.g1': 'Εσωτερικά', 'am.i1': 'Κλιματισμός και θέρμανση', 'am.i2': 'Πλήρως εξοπλισμένη κουζίνα — φούρνος, ψυγείο, καταψύκτης',
    'am.i3': 'Καφετιέρα, βραστήρας, φρυγανιέρα, ποτήρια κρασιού', 'am.i4': 'Πλυντήριο ρούχων, σίδερο και απλώστρα',
    'am.i5': 'Wi-Fi και τηλεόραση', 'am.i6': 'Εσωτερικό τζάκι', 'am.i7': 'Τραπεζαρία',
    'am.g2': 'Εξωτερικά', 'am.o1': 'Καταπράσινος ιδιωτικός κήπος', 'am.o2': 'Βεράντα με έπιπλα και θέα στο ηλιοβασίλεμα',
    'am.o3': 'Υπαίθρια τραπεζαρία', 'am.o4': 'Ιδιωτικό αίθριο',
    'am.o5': 'Δωρεάν πάρκινγκ στην ιδιοκτησία', 'am.o6': 'Δωρεάν πάρκινγκ στον δρόμο',
    'am.g3': 'Μπάνιο & υπνοδωμάτια', 'am.b1': 'Μπανιέρα και ζεστό νερό', 'am.b2': 'Πιστολάκι μαλλιών',
    'am.b3': 'Σαμπουάν, μαλακτικό, σαπούνι σώματος, αφρόλουτρο', 'am.b4': 'Καθαρά σεντόνια, πετσέτες και βασικά είδη',
    'am.b5': 'Ντουλάπα και κρεμάστρες', 'am.b6': 'Δύο κρεβάτια queen size',
    'am.g4': 'Οικογένειες & πρακτικά', 'am.p1': 'Αυτόνομη άφιξη με κουτί κλειδιών',
    'am.p2': 'Βρεφική κούνια', 'am.p3': 'Καρεκλάκι μωρού κατόπιν αιτήματος',
    'am.p4': 'Είδη παραλίας — πετσέτες, καρέκλες, ομπρέλα', 'am.p5': 'Βιβλία και υλικό για ανάγνωση',
    'am.p6': 'Ανιχνευτής καπνού',

    'ga.label': '03 — Φωτογραφίες', 'ga.title': 'Το σπίτι, δωμάτιο προς δωμάτιο.',
    'ga.hint': 'Πατήστε μια φωτογραφία για μεγέθυνση',

    'lo.label': '04 — Τοποθεσία', 'lo.title': 'Παλαιόχωρα, στη νοτιοδυτική Κρήτη.',
    'lo.p1': 'Το σπίτι βρίσκεται στο Πανόραμα, την ήσυχη οικιστική περιοχή λίγο πάνω από το χωριό. Η Παλαιόχωρα έχει αμμώδη παραλία από τη μία πλευρά και βοτσαλωτή από την άλλη, λιμάνι, αγορά και πολλές ταβέρνες.',
    'lo.r1k': 'Αεροδρόμιο Χανίων', 'lo.r1v': '1 ώ 20 λ με αυτοκίνητο',
    'lo.r2k': 'Κέντρο χωριού', 'lo.r2v': '10 λεπτά με τα πόδια',
    'lo.r3k': 'Αμμώδης παραλία', 'lo.r3v': '10 λεπτά με τα πόδια',
    'lo.r4k': 'Πάρκινγκ', 'lo.r4v': 'δωρεάν, στην ιδιοκτησία',
    'lo.cta': 'Άνοιγμα στους χάρτες',

    'nb.label': '05 — Γύρω μας', 'nb.title': 'Παραλίες, φαράγγια και μεγάλα δείπνα.',
    'nb.c1t': 'Παραλίες', 'nb.c1p': 'Παχιά Άμμος από τη μία, Χαλίκια από την άλλη. Γραμμένο και Κριός δέκα λεπτά με το αυτοκίνητο.',
    'nb.c1l': 'Παραλίες στο Tripadvisor',
    'nb.c2t': 'Πεζοπορίες & φαράγγια', 'nb.c2p': 'Το παραλιακό μονοπάτι προς τη Σούγια, τα φαράγγια της Σαμαριάς και της Αγίας Ειρήνης, και μικρότερες διαδρομές στους λόφους.',
    'nb.c2l': 'Διαδρομές στο AllTrails',
    'nb.c3t': 'Ταβέρνες', 'nb.c3p': 'Ψάρι στο λιμάνι, ψητά στα σοκάκια και μερικά μαγαζιά πάνω στην άμμο.',
    'nb.c3l': 'Εστιατόρια στο Tripadvisor',
    'nb.c4t': 'Εκδρομές με καράβι', 'nb.c4p': 'Καράβια από το λιμάνι κατά μήκος της ακτής για Σούγια, Αγία Ρουμέλη, Λουτρό και Χώρα Σφακίων όλο το καλοκαίρι.',
    'nb.c4l': 'Δρομολόγια στην Ανένδυκ',

    'gt.label': '06 — Πώς θα έρθετε', 'gt.title': 'Από το αεροδρόμιο μέχρι την πόρτα.',
    'gt.s1t': 'Πτήση για Χανιά (CHQ)', 'gt.s1p': 'Και το Ηράκλειο (HER) είναι εφικτό, περίπου τρεις ώρες μακριά. Απευθείας πτήσεις από την Ευρώπη τη σεζόν.',
    'gt.s2t': 'Αυτοκίνητο, ταξί ή λεωφορείο', 'gt.s2p': 'Το ενοικιαζόμενο αυτοκίνητο είναι ο ευκολότερος τρόπος. Ιδιωτική μεταφορά κατόπιν αιτήματος και καθημερινά ΚΤΕΛ από τα Χανιά.',
    'gt.s3t': 'Άφιξη στο σπίτι', 'gt.s3p': 'Παρκάρετε δωρεάν μέσα στην ιδιοκτησία. Αυτόνομη άφιξη από τις 15:00 με κουτί φύλαξης κλειδιών — οδηγίες και κωδικός στέλνονται λίγες μέρες πριν.',


    'fq.label': '07 — Χρήσιμα', 'fq.title': 'Κανόνες του σπιτιού και συχνές ερωτήσεις.',
    'fq.r1k': 'Άφιξη', 'fq.r1v': 'από 15:00, αυτόνομη', 'fq.r2k': 'Αναχώρηση', 'fq.r2v': 'έως 11:00',
    'fq.r3k': 'Επισκέπτες', 'fq.r3v': 'έως 4', 'fq.r4k': 'Κάπνισμα', 'fq.r4v': 'μόνο σε κήπο και βεράντα',
    'fq.r5k': 'Κατοικίδια', 'fq.r5v': 'δεν επιτρέπονται', 'fq.r6k': 'Πάρτι', 'fq.r6v': 'δεν επιτρέπονται',
    'fq.r7k': 'Ελάχιστη διαμονή', 'fq.r7v': '3 νύχτες',
    'fq.q1': 'Πώς κάνω κράτηση;',
    'fq.a1': 'Οι κρατήσεις γίνονται μέσω Airbnb, οπότε η πληρωμή και οι ακυρώσεις ακολουθούν τους όρους της. Στείλτε μας μήνυμα για οποιαδήποτε ερώτηση.',
    'fq.q2': 'Χρειάζομαι αυτοκίνητο;',
    'fq.a2': 'Όχι για το χωριό, όλα γίνονται με τα πόδια. Βοηθά για τις πιο μακρινές παραλίες και τα φαράγγια.',
    'fq.q3': 'Είναι κατάλληλο για μικρά παιδιά;',
    'fq.a3': 'Ναι. Υπάρχει βρεφική κούνια στο σπίτι, καρεκλάκι κατόπιν αιτήματος, και ο κήπος είναι ιδιωτικός και μακριά από τον δρόμο.',
    'fq.q4': 'Ποια είναι η καλύτερη εποχή;',
    'fq.a4': 'Μάιος, Ιούνιος, Σεπτέμβριος και Οκτώβριος είναι ζεστοί και ήσυχοι. Ιούλιος και Αύγουστος πιο πολύκοσμοι, με τη θάλασσα στα καλύτερά της.',
    'fq.q5': 'Περιλαμβάνονται σεντόνια και καθαρισμός;',
    'fq.a5': 'Ναι. Παρέχονται σεντόνια, πετσέτες και τα βασικά — σαπούνι, σαμπουάν, χαρτί υγείας — και το σπίτι καθαρίζεται πριν από κάθε άφιξη.',

    'ct.label': '08 — Κρατήσεις', 'ct.title': 'Δείτε τις ημερομηνίες και κάντε κράτηση online.',
    'ct.p1': 'Η διαθεσιμότητα, οι τιμές και οι κρατήσεις γίνονται στο Airbnb. Για οτιδήποτε άλλο — μεγάλες διαμονές, μεταφορές, ερωτήσεις για το σπίτι — γράψτε μας απευθείας.',
    'ct.b1': 'Κράτηση στο Airbnb', 'ct.dk': 'Απευθείας',
    'ct.fh': 'Στείλτε μας μήνυμα', 'ct.f1': 'Όνομα', 'ct.f2': 'Email', 'ct.f3': 'Άφιξη',
    'ct.f4': 'Αναχώρηση', 'ct.f5': 'Μήνυμα', 'ct.f6': 'Αποστολή',

    'ft.addr': 'Παλαιόχωρα 730 01<br />Χανιά, Κρήτη, Ελλάδα',
    'ft.h1': 'Πλοήγηση', 'ft.h2': 'Κρατήσεις', 'ft.email': 'Στείλτε email',
    'ft.small': '© 2026 Ilios Residence · Παλαιόχωρα, Κρήτη · Αρ. ΜΗΤΕ 00003996449',

    'lb.hint': '— βέλη για πλοήγηση, Esc για κλείσιμο',

    'note.idle': 'Απαντάμε εντός μιας ημέρας. Οι κρατήσεις ολοκληρώνονται στο Airbnb.',
    'note.sent': 'Ευχαριστούμε — λάβαμε το μήνυμά σας και θα απαντήσουμε σύντομα.',
    'note.demo': 'Ευχαριστούμε — η φόρμα είναι ενδεικτική, δεν στάλθηκε ακόμη τίποτα.',
    'note.sending': 'Αποστολή…',
    'note.error': 'Κάτι πήγε στραβά. Στείλτε μας email στο iliosresidency@gmail.com.',
    'note.invalid': 'Συμπληρώστε το όνομα και ένα έγκυρο email.',

    'a11y.lang': 'Αλλαγή γλώσσας στα Αγγλικά',
    'a11y.menu': 'Άνοιγμα μενού',
    'a11y.close': 'Κλείσιμο φωτογραφίας',
    'a11y.prev': 'Προηγούμενη φωτογραφία',
    'a11y.next': 'Επόμενη φωτογραφία'
  };

  // English strings for keys that are not simply the markup's own text.
  const EN_EXTRA = {
    'note.sent': 'Thanks — your message reached us and we will reply shortly.',
    'note.demo': 'Thanks — this is a demo form, so nothing was sent yet.',
    'note.sending': 'Sending…',
    'note.error': 'Something went wrong. Please email iliosresidency@gmail.com.',
    'note.invalid': 'Please add your name and a valid email address.',
    'a11y.lang': 'Switch language to Greek',
    'a11y.menu': 'Open menu',
    'a11y.close': 'Close photo',
    'a11y.prev': 'Previous photo',
    'a11y.next': 'Next photo'
  };

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ── Language ───────────────────────────────────────────────────────── */

  const i18n = (() => {
    const nodes = $$('[data-i18n]');
    const ariaNodes = $$('[data-i18n-aria]');
    // Generated gallery markup carries its own Greek inline, so the build
    // script never has to write into the EL table below.
    const inlineNodes = $$('[data-i18n-el]');
    const base = {};                       // English, captured from the markup

    nodes.forEach((node) => {
      const key = node.dataset.i18n;
      if (!(key in base)) base[key] = node.innerHTML;
    });
    inlineNodes.forEach((node) => { node.dataset.i18nEn = node.innerHTML; });

    let lang = 'en';

    const t = (key) =>
      lang === 'el'
        ? (EL[key] ?? EN_EXTRA[key] ?? base[key] ?? '')
        : (EN_EXTRA[key] ?? base[key] ?? '');

    const apply = () => {
      nodes.forEach((node) => {
        const next = t(node.dataset.i18n);
        if (next && node.innerHTML !== next) node.innerHTML = next;
      });
      ariaNodes.forEach((node) => {
        const next = t(node.dataset.i18nAria);
        if (next) node.setAttribute('aria-label', next);
      });
      inlineNodes.forEach((node) => {
        const next = lang === 'el' ? node.dataset.i18nEl : node.dataset.i18nEn;
        if (next != null && node.innerHTML !== next) node.innerHTML = next;
      });
      document.documentElement.lang = lang;
      $$('[data-lang-toggle]').forEach((btn) => { btn.textContent = lang === 'en' ? 'ΕΛ' : 'EN'; });
    };

    const set = (next) => {
      if (next !== 'en' && next !== 'el') return;
      lang = next;
      try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* private mode */ }
      apply();
    };

    // Stored choice wins; otherwise fall back to the browser's language.
    let initial = null;
    try { initial = localStorage.getItem(STORAGE_KEY); } catch { /* ignore */ }
    if (!initial && (navigator.language || '').toLowerCase().startsWith('el')) initial = 'el';
    if (initial === 'el') set('el'); else apply();

    return { t, set, get current() { return lang; } };
  })();

  $$('[data-lang-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => i18n.set(i18n.current === 'en' ? 'el' : 'en'));
  });

  /* ── Mobile menu ────────────────────────────────────────────────────── */

  const menu = $('#mobile-menu');
  const menuButtons = $$('[data-menu-toggle]');

  const setMenu = (open) => {
    if (!menu) return;
    menu.hidden = !open;
    menuButtons.forEach((btn) => btn.setAttribute('aria-expanded', String(open)));
  };

  menuButtons.forEach((btn) => btn.addEventListener('click', () => setMenu(menu.hidden)));
  $$('#mobile-menu a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

  /* ── Lightbox ───────────────────────────────────────────────────────── */

  const lightbox = $('[data-lightbox-root]');
  const lbImg = $('[data-lightbox-img]');
  const lbLabel = $('[data-lightbox-label]');
  const lbCaption = $('[data-lightbox-caption]');
  const lbCounter = $('[data-lightbox-counter]');
  const lbFrame = lbImg?.closest('.ph');

  // Every gallery tile, in document order, so the lightbox can walk the whole
  // set regardless of how many groups the generator produced.
  const tiles = $$('[data-lightbox]');
  let index = -1;
  let lastFocused = null;

  const labelOf = (tile) =>
    (i18n.current === 'el' && tile.dataset.labelEl) || tile.dataset.label || 'photo';

  const show = (i) => {
    if (!lightbox || !tiles.length) return;
    index = (i + tiles.length) % tiles.length;      // wrap at both ends
    const tile = tiles[index];
    const label = labelOf(tile);
    const src = tile.dataset.src;

    if (lbLabel) lbLabel.textContent = label;
    if (lbCaption) lbCaption.textContent = label;
    if (lbCounter) lbCounter.textContent = `${index + 1} / ${tiles.length}`;

    // If the photo isn't in place yet, fall back to the hatched placeholder.
    if (lbImg) {
      lbImg.alt = label;
      if (src) {
        lbImg.hidden = false;
        lbImg.src = src;
        lbFrame?.classList.add('is-loaded');
      } else {
        lbImg.hidden = true;
        lbImg.removeAttribute('src');
        lbFrame?.classList.remove('is-loaded');
      }
    }

    // Warm the neighbours so browsing doesn't stall on each step.
    [tiles[(index + 1) % tiles.length], tiles[(index - 1 + tiles.length) % tiles.length]]
      .forEach((next) => { if (next?.dataset.src) new Image().src = next.dataset.src; });
  };

  const openLightbox = (i) => {
    if (!lightbox) return;
    lastFocused = document.activeElement;
    show(i);
    lightbox.hidden = false;
    document.body.classList.add('is-locked');
    $('[data-lightbox-close]')?.focus();
  };

  const closeLightbox = () => {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.classList.remove('is-locked');
    if (lastFocused instanceof HTMLElement) lastFocused.focus();
  };

  const step = (delta) => { if (!lightbox?.hidden) show(index + delta); };

  lbImg?.addEventListener('error', () => {
    lbImg.hidden = true;
    lbFrame?.classList.remove('is-loaded');
  });

  tiles.forEach((tile, i) => tile.addEventListener('click', () => openLightbox(i)));

  // Clicking the backdrop closes; the controls and the photo itself do not.
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.closest('.lightbox__inner') === null) closeLightbox();
  });
  $$('.lightbox__nav, .lightbox__inner').forEach((el) =>
    el.addEventListener('click', (e) => e.stopPropagation())
  );
  $('[data-lightbox-prev]')?.addEventListener('click', () => step(-1));
  $('[data-lightbox-next]')?.addEventListener('click', () => step(1));
  $('[data-lightbox-close]')?.addEventListener('click', closeLightbox);

  // Only show the controls when there is more than one photo to browse.
  if (tiles.length < 2) lightbox?.classList.add('lightbox--single');

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeLightbox(); setMenu(false); return; }
    if (lightbox?.hidden) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); step(-1); }
    if (e.key === 'Home')       { e.preventDefault(); show(0); }
    if (e.key === 'End')        { e.preventDefault(); show(tiles.length - 1); }
  });

  // Swipe, since most visitors will be on a phone.
  let touchX = null;
  lightbox?.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  lightbox?.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1);
  }, { passive: true });

  /* ── Photos ─────────────────────────────────────────────────────────── */
  /* Each figure keeps its hatched placeholder and caption until the real
     photo loads. A file that isn't in place yet is dropped, so the block
     keeps its caption instead of showing a broken-image icon. */

  const markLoaded = (el) => el.closest('.ph')?.classList.add('is-loaded');

  $$('.ph img').forEach((img) => {
    if (img === lbImg) return;
    img.addEventListener('load', () => markLoaded(img), { once: true });
    img.addEventListener('error', () => img.remove(), { once: true });
    // Finished before this script ran (preloaded or cached).
    if (img.complete && img.naturalWidth > 0) markLoaded(img);
  });

  // A file that 404'd before the listeners were attached never fires `error`,
  // so sweep once everything has settled. Deliberately not done at startup:
  // a preloaded image can report `complete` with no dimensions yet, and
  // removing it there would delete a photo that was about to appear.
  window.addEventListener('load', () => {
    $$('.ph img').forEach((img) => {
      if (img === lbImg) return;
      if (img.complete && img.naturalWidth === 0) img.remove();
      else if (img.complete) markLoaded(img);
    });
  });

  $$('.ph iframe').forEach((frame) => {
    frame.addEventListener('load', () => markLoaded(frame), { once: true });
  });

  /* ── Enquiry form ───────────────────────────────────────────────────── */

  const form = $('[data-enquiry]');
  const note = $('[data-form-note]');

  const setNote = (key) => {
    if (!note) return;
    note.dataset.i18n = key;
    note.textContent = i18n.t(key);
  };

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNote('note.invalid');
      return;
    }

    if (!FORM_ENDPOINT) {
      setNote('note.demo');
      return;
    }

    const submit = $('.enquiry__submit', form);
    if (submit) submit.disabled = true;
    setNote('note.sending');

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setNote('note.sent');
    } catch {
      setNote('note.error');
    } finally {
      if (submit) submit.disabled = false;
    }
  });

  /* ── Scroll-spy for the desktop nav ─────────────────────────────────── */

  const navLinks = $$('.nav-desktop > a[href^="#"]');
  const targets = navLinks
    .map((link) => document.getElementById(link.getAttribute('href').slice(1)))
    .filter(Boolean);

  if (targets.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) =>
            link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`)
          );
        });
      },
      { rootMargin: '-72px 0px -65% 0px', threshold: 0 }
    );
    targets.forEach((section) => observer.observe(section));
  }
})();
