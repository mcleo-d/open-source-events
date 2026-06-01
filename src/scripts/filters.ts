interface EventItem {
  id: string;
  title: string;
  city: string;
  month: string;
  topics: string[];
  format: string;
  price: string;
  venue: string;
  summary: string;
}

function matches(
  ev: EventItem,
  cities: string[],
  months: string[],
  topics: string[],
  format: string,
  price: string,
  q: string,
): boolean {
  if (cities.length && !cities.includes(ev.city)) return false;
  if (months.length && !months.includes(ev.month)) return false;
  if (topics.length && !topics.some(t => ev.topics.includes(t))) return false;
  if (format && ev.format !== format) return false;
  if (price && ev.price !== price) return false;
  if (q) {
    const hay = `${ev.title} ${ev.summary} ${ev.venue}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

function init(): void {
  const indexEl = document.getElementById('event-index');
  if (!indexEl) return;

  const events: EventItem[] = JSON.parse(indexEl.textContent ?? '[]');
  const form = document.getElementById('filters-form') as HTMLFormElement | null;
  const resultCount = document.getElementById('result-count');
  const upcomingList = document.getElementById('upcoming-events');

  if (!form || !upcomingList) return;

  // Hydrate from URL on load
  const params = new URLSearchParams(location.search);
  for (const cb of form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')) {
    if (params.getAll(cb.name).includes(cb.value)) cb.checked = true;
  }
  for (const sel of form.querySelectorAll<HTMLSelectElement>('select')) {
    const val = params.get(sel.name);
    if (val) sel.value = val;
  }
  const searchInput = form.querySelector<HTMLInputElement>('input[name="q"]');
  if (searchInput) {
    const q = params.get('q');
    if (q) searchInput.value = q;
  }

  applyFilters();
  form.addEventListener('input', applyFilters);
  form.addEventListener('change', applyFilters);

  function applyFilters(): void {
    const fd = new FormData(form!);
    const cities = fd.getAll('city') as string[];
    const months = fd.getAll('month') as string[];
    const topics = fd.getAll('topic') as string[];
    const format = (fd.get('format') as string) || '';
    const price = (fd.get('price') as string) || '';
    const q = ((fd.get('q') as string) || '').toLowerCase().trim();

    // Persist to URL without pushing a history entry
    const sp = new URLSearchParams();
    for (const c of cities) sp.append('city', c);
    for (const m of months) sp.append('month', m);
    for (const t of topics) sp.append('topic', t);
    if (format) sp.set('format', format);
    if (price) sp.set('price', price);
    if (q) sp.set('q', q);
    const qs = sp.toString();
    history.replaceState(null, '', qs ? `?${qs}` : location.pathname);

    // Show / hide list items
    let visible = 0;
    for (const li of upcomingList!.querySelectorAll<HTMLLIElement>('li[data-event-id]')) {
      const ev = events.find(e => e.id === li.dataset.eventId);
      const show = !!ev && matches(ev, cities, months, topics, format, price, q);
      li.hidden = !show;
      if (show) visible++;
    }

    if (resultCount) {
      resultCount.textContent = `${visible} event${visible === 1 ? '' : 's'} shown`;
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
