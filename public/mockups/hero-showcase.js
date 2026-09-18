"use strict";

(() => {
  const byId = (id) => document.getElementById(id);
  const grid = byId("project-grid");
  const search = byId("project-search");
  const filters = [...document.querySelectorAll("[data-filter]")];
  const menu = document.querySelector(".menu-toggle");
  const navigation = byId("navigation");
  let category = "all";

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function externalLink(url, label, className) {
    const link = element("a", className, label);
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
  }

  function showDialog(dialog) {
    document.dispatchEvent(new Event("portfolio:dialog"));
    dialog.showModal();
    document.body.classList.add("modal-open");
  }

  function openProject(project) {
    byId("detail-title").textContent = project.title;
    byId("detail-category").textContent = project.label;
    byId("detail-description").textContent = project.description;
    byId("detail-image").src = project.image;
    byId("detail-image").alt = `${project.title} interface preview`;
    byId("detail-tags").replaceChildren(...project.tags.map((tag) => element("span", "tag", tag)));
    byId("detail-link").href = project.link;
    byId("detail-link").setAttribute("aria-label", `Visit ${project.title} (opens in a new tab)`);
    showDialog(byId("project-dialog"));
  }

  portfolioProjects.forEach((project, index) => {
    const card = element("article", "project-card");
    card.dataset.projectId = project.id;
    const preview = element("div", "project-preview");
    const image = element("img");
    image.src = project.image;
    image.alt = `${project.title} interface preview`;
    image.width = 600;
    image.height = 324;
    image.loading = "lazy";
    image.decoding = "async";
    preview.append(image, element("span", "project-number", String(index + 1).padStart(2, "0")));
    const body = element("div", "project-body");
    const title = element("h3", "", project.title);
    title.id = `project-${project.id}`;
    card.setAttribute("aria-labelledby", title.id);
    const tags = element("div", "tags");
    tags.append(...project.tags.slice(0, 3).map((tag) => element("span", "tag", tag)));
    const actions = element("div", "card-actions");
    const details = element("button", "", "Explore project →");
    details.type = "button";
    details.setAttribute("aria-haspopup", "dialog");
    details.setAttribute("aria-label", `Explore ${project.title}`);
    details.addEventListener("click", () => openProject(project));
    const live = externalLink(project.link, "Live site ↗", "text-link");
    live.setAttribute("aria-label", `Visit ${project.title} (opens in a new tab)`);
    actions.append(details, live);
    body.append(element("div", "project-category", project.label), title,
      element("p", "project-description", project.description), tags, actions);
    card.append(preview, body);
    grid.append(card);
  });

  function applyFilters() {
    const query = search.value.trim().toLowerCase();
    let count = 0;
    portfolioProjects.forEach((project, index) => {
      const matches = (category === "all" || project.category === category) &&
        [project.title, project.label, project.description, ...project.tags].join(" ").toLowerCase().includes(query);
      grid.children[index].hidden = !matches;
      if (matches) count++;
    });
    filters.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.filter === category)));
    byId("result-count").textContent = `Showing ${count} of ${portfolioProjects.length} projects`;
    byId("empty-state").hidden = count !== 0;
  }

  function selectProjects(nextCategory = "all", query = "") {
    category = nextCategory;
    search.value = query;
    applyFilters();
  }

  function closeMenu() {
    navigation.classList.remove("is-open");
    menu.setAttribute("aria-expanded", "false");
  }

  function goToSection(id) {
    const section = byId(id);
    if (!section) return;
    closeMenu();
    const heading = section.querySelector("h1, h2") || section;
    heading.tabIndex = -1;
    requestAnimationFrame(() => {
      heading.focus({ preventScroll: true });
      section.scrollIntoView({ behavior: "auto", block: "start" });
    });
  }

  filters.forEach((button) => button.addEventListener("click", () => {
    category = button.dataset.filter;
    applyFilters();
  }));
  search.addEventListener("input", applyFilters);
  byId("reset-search").addEventListener("click", () => { selectProjects(); search.focus(); });
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    navigation.classList.toggle("is-open", open);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("is-open")) { closeMenu(); menu.focus(); }
  });
  document.addEventListener("click", (event) => {
    if (!navigation.contains(event.target) && !menu.contains(event.target)) closeMenu();
  });
  window.matchMedia("(max-width: 760px)").addEventListener("change", closeMenu);
  document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener("click", (event) => {
    const id = link.getAttribute("href").slice(1);
    if (!byId(id)) return;
    event.preventDefault();
    // Hash links still work without JavaScript; focus follows navigation when enabled.
    window.location.hash = id;
    goToSection(id);
  }));
  document.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", () => byId(button.dataset.close).close());
  });
  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("close", () => {
      if (!document.querySelector("dialog[open]")) document.body.classList.remove("modal-open");
    });
    dialog.addEventListener("click", (event) => {
      const bounds = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
    });
  });
  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => { image.src = "../placeholder.svg"; }, { once: true });
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navigation.querySelectorAll("a").forEach((link) => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-15% 0px -65% 0px" });
  document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
  byId("project-tools").hidden = false;
  byId("year").textContent = new Date().getFullYear();
  applyFilters();
  // Shared with the local guide; no framework, module loader, or network request needed.
  window.portfolioUI = { element, externalLink, showDialog, goToSection, selectProjects, openProject };
})();
