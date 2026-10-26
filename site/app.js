// Gallery + viewer. Data comes from data.js (window.TEES), built by scripts/build_shipshow_tee_site.py.
(() => {
  const designs = window.TEES;
  const grid = document.getElementById("grid");
  const count = document.querySelector(".toolbar__count");
  const viewer = document.getElementById("viewer");
  const img = document.getElementById("viewer-img");
  const figure = img.parentElement;
  const swatches = document.getElementById("viewer-swatches");
  const labels = { front: "Front print", back: "Back print", chest: "Left chest" };
  let filter = "all";
  let visible = designs;
  let state = { index: 0, shirt: null, view: "mockup" };

  const card = (d) => {
    const hero = d.variants[0];
    const li = document.createElement("li");
    li.innerHTML = `
      <button class="card" type="button" id="card-${d.slug}">
        <div class="card__img"><img src="${hero.mockup}" alt="${d.title} on a ${hero.shirtName.toLowerCase()} T-shirt" width="900" height="900" loading="lazy"></div>
        <div class="card__meta"><span class="card__title">${d.title}</span><span class="card__tag">${labels[d.placement]}</span></div>
        <div class="dots" aria-label="${d.variants.length} shirt colours">${d.variants.map((v) => `<span class="dot" style="background:${v.shirtHex}" title="${v.shirtName}"></span>`).join("")}</div>
      </button>`;
    li.querySelector("button").addEventListener("click", () => open(visible.indexOf(d), hero.shirt));
    return li;
  };

  const render = () => {
    visible = designs.filter((d) => filter === "all" || d.placement === filter);
    grid.replaceChildren(...visible.map(card));
    count.textContent = `${visible.length} design${visible.length === 1 ? "" : "s"} · ${visible.reduce((n, d) => n + d.variants.length, 0)} colourways`;
  };

  const show = () => {
    const d = visible[state.index];
    const v = d.variants.find((x) => x.shirt === state.shirt) || d.variants[0];
    state.shirt = v.shirt;
    const asDesign = state.view === "design";
    img.src = asDesign ? v.design : v.mockup;
    img.alt = asDesign ? `${d.title} artwork, ${v.shirtName} colourway` : `${d.title} on a ${v.shirtName.toLowerCase()} T-shirt`;
    figure.classList.toggle("is-design", asDesign);
    figure.style.setProperty("--shirt", v.shirtHex);
    document.getElementById("viewer-title").textContent = d.title;
    document.getElementById("viewer-tag").textContent = `${labels[d.placement]} · ${d.size}`;
    document.getElementById("viewer-desc").textContent = d.description;
    document.getElementById("viewer-shirt").textContent = `${v.shirtName} shirt`;
    swatches.innerHTML = d.variants
      .map((x) => `<label class="swatch" title="${x.shirtName}"><input type="radio" name="shirt" value="${x.shirt}" aria-label="${x.shirtName}" ${x.shirt === v.shirt ? "checked" : ""}><span style="background:${x.shirtHex}"></span></label>`)
      .join("");
    const dl = document.getElementById("viewer-download");
    dl.innerHTML = v.print
      ? `<a class="button" href="${v.print}" download id="download-print">Download print file</a><p class="viewer__note">${v.printNote}</p>`
      : `<a class="button" href="${v.design}" download id="download-preview">Download preview</a><p class="viewer__note">Full-resolution print files are included for the lead colourway (${d.variants[0].shirtName}).</p>`;
    history.replaceState(null, "", `#${d.slug}/${v.shirt}/${state.view}`);
  };

  const open = (index, shirt, view = state.view) => {
    state = { index, shirt, view };
    viewer.querySelector(`input[name=view][value=${view}]`).checked = true;
    show();
    if (!viewer.open) viewer.showModal();
  };

  const step = (dir) => {
    state.index = (state.index + dir + visible.length) % visible.length;
    state.shirt = null;
    show();
  };

  document.querySelectorAll("input[name=filter]").forEach((r) => r.addEventListener("change", () => { filter = r.value; render(); }));
  viewer.querySelectorAll("input[name=view]").forEach((r) => r.addEventListener("change", () => { state.view = r.value; show(); }));
  swatches.addEventListener("change", (e) => { state.shirt = e.target.value; show(); });
  viewer.querySelector(".viewer__nav--prev").addEventListener("click", () => step(-1));
  viewer.querySelector(".viewer__nav--next").addEventListener("click", () => step(1));
  viewer.querySelector(".viewer__close").addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", (e) => { if (e.target === viewer) viewer.close(); });
  viewer.addEventListener("close", () => history.replaceState(null, "", location.pathname));
  document.addEventListener("keydown", (e) => {
    if (!viewer.open) return;
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  render();
  const [slug, shirt, view] = location.hash.slice(1).split("/");
  const i = visible.findIndex((d) => d.slug === slug);
  if (i >= 0) open(i, shirt, view === "design" ? "design" : "mockup");
})();
