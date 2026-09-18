"use strict";

// This is an offline, rule-based assistant. No API keys, storage, or message transport.
(() => {
  const ui = window.portfolioUI;
  const byId = (id) => document.getElementById(id);
  const dialog = byId("guide-dialog");
  const launcher = byId("guide-launcher");
  const log = byId("guide-log");
  const input = byId("guide-input");
  const tour = byId("tour-panel");
  let tourIndex = -1;
  const normalize = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  const contains = (text, term) =>
    ` ${normalize(text)} `.includes(` ${normalize(term)} `);

  function addMessage(text, user = false) {
    const message = ui.element("p", user ? "message user" : "message", text);
    log.append(message);
    // Keep a long conversation manageable without saving it outside this page.
    while (log.children.length > 30) log.firstElementChild.remove();
    log.scrollTop = log.scrollHeight;
    return message;
  }

  function action(message, label, callback) {
    const button = ui.element("button", "btn btn-quiet", label);
    button.type = "button";
    button.addEventListener("click", callback);
    message.append(document.createElement("br"), button);
    log.scrollTop = log.scrollHeight;
  }

  function navigate(message, label, section, category, query) {
    action(message, label, () => {
      dialog.close();
      if (section === "projects")
        ui.selectProjects(category || "all", query || "");
      ui.goToSection(section);
    });
  }

  function answer(question, topic = "") {
    const text = question.trim().slice(0, 300);
    if (!text) return;
    addMessage(text, true);
    if (
      topic === "upcoming" ||
      /\b(upcoming|incoming|future|soon|learning|rust|generative)\b|\bnext\b(?![.\s-]*js\b)/i.test(
        text,
      )
    ) {
      const message = addMessage(
        "The next chapter has a space for upcoming work. Specific projects and launch dates haven't been provided yet. Elvin's listed learning topics are system design, Rust, and generative AI patterns—not announced products.",
      );
      navigate(message, "See what's next →", "upcoming");
      return;
    }
    if (
      topic === "contact" ||
      /\b(contact|email|hire|hiring|reach|collaborat\w*|resume|cv|linkedin)\b/i.test(
        text,
      )
    ) {
      const message = addMessage(
        "You can email Elvin at elvinlazmanuel@gmail.com or explore his LinkedIn profile. The contact section links to both. A downloadable resume isn't included in this mockup.",
      );
      navigate(message, "Go to contact →", "contact");
      return;
    }
    if (
      topic === "skills" ||
      /\b(skill\w*|stack|experience|who|background)\b|\babout\s+(elvin|you|the developer)\b/i.test(
        text,
      )
    ) {
      const message = addMessage(
        "Elvin works across frontend and backend: React, Next.js, TypeScript, Tailwind CSS, PHP, Node.js, MySQL, PostgreSQL, REST APIs, and Docker. UI/UX and responsive design are also part of his portfolio.",
      );
      navigate(message, "Explore skills →", "about");
      return;
    }
    if (/\b(tour|guide|start|help)\b/i.test(text)) {
      const message = addMessage(
        "Let's take a five-stop tour: introduction, projects, skills, upcoming work, and contact. You can go back or leave the tour at any time.",
      );
      action(message, "Start my tour →", startTour);
      return;
    }
    const project = portfolioProjects.find((item) =>
      item.aliases.some((alias) => contains(text, alias)),
    );
    if (project) {
      const message = addMessage(
        `${project.title}: ${project.description}\nTech: ${project.tags.join(", ")}.`,
      );
      action(message, "Open project details →", () => {
        dialog.close();
        ui.openProject(project);
      });
      return;
    }
    const groups = [
      {
        words: /\b(game\w*|interactive|play)\b/i,
        category: "games",
        label: "Games & AR",
      },
      {
        words: /\b(mobile|phone)\b/i,
        category: "mobile",
        label: "Mobile experiences",
      },
      {
        words: /\b(system\w*|dashboard\w*)\b/i,
        category: "systems",
        label: "Management systems",
      },
      {
        words: /\b(web|registration|website\w*)\b/i,
        category: "web",
        label: "Web apps",
      },
    ];
    const group = groups.find((item) => item.words.test(text));
    const technologies = [
      ...new Set(portfolioProjects.flatMap((item) => item.tags)),
    ];
    const technology = technologies.find((tag) => contains(text, tag));
    if (technology) {
      const matches = portfolioProjects.filter((item) =>
        item.tags.includes(technology),
      );
      const message = addMessage(
        `${technology} appears in these portfolio projects: ${matches.map((item) => item.title).join(", ")}.`,
      );
      navigate(
        message,
        `Browse ${technology} projects →`,
        "projects",
        "all",
        technology,
      );
    } else if (group) {
      const matches = portfolioProjects.filter(
        (item) => item.category === group.category,
      );
      const message = addMessage(
        `${group.label}: ${matches.map((item) => item.title).join(", ")}. Use Explore project for a description and technology details.`,
      );
      navigate(
        message,
        `Browse ${group.label.toLowerCase()} →`,
        "projects",
        group.category,
      );
    } else if (
      topic === "projects" ||
      /\b(project\w*|work|portfolio|build\w*)\b/i.test(text)
    ) {
      const message = addMessage(
        "There are 10 projects to explore, including registration systems, a QR generator, equipment inventory, a digital passport, interactive games, AR Hunt, and a commitment wall. Filter by type or search by technology.",
      );
      navigate(message, "Show all projects →", "projects");
    } else if (/^(hi|hello|hey|thanks|thank you)[!. ]*$/i.test(text)) {
      addMessage(
        "You're welcome here! Choose a quick question above, ask about a project by name, or type 'tour' for a walkthrough.",
      );
    } else {
      addMessage(
        "I only have the information listed in this portfolio. Try a project name like 'AR Hunt', a technology like 'PHP', or ask about skills, upcoming work, contact, or a tour.",
      );
    }
  }

  // Edit the tour copy here. Targets are section IDs in hero-showcase.html.
  const steps = [
    {
      id: "home",
      title: "Meet Elvin",
      text: "A full-stack developer connecting thoughtful design with practical applications. Let's explore his work.",
    },
    {
      id: "projects",
      title: "Find something that interests you",
      text: "Browse all 10 projects. Filter by type, search for a technology, or select Explore project to see the details.",
    },
    {
      id: "about",
      title: "Look behind the build",
      text: "See Elvin's frontend, design, and backend skills. His LinkedIn link has more about his professional background.",
    },
    {
      id: "upcoming",
      title: "See what's on the horizon",
      text: "This area is reserved for upcoming projects. The learning topics are explorations, not promised releases.",
    },
    {
      id: "contact",
      title: "Start a conversation",
      text: "Use Say hello to open your email app, or visit LinkedIn. Thanks for exploring Elvin's portfolio!",
    },
  ];

  function showStep() {
    const step = steps[tourIndex];
    document
      .querySelectorAll(".tour-target")
      .forEach((node) => node.classList.remove("tour-target"));
    const section = byId(step.id);
    const highlight =
      section.querySelector(".section-heading, .about-copy, .hero-copy") ||
      section;
    highlight.classList.add("tour-target");
    byId("tour-step").textContent =
      `Your quick tour · ${tourIndex + 1} of ${steps.length}`;
    byId("tour-title").textContent = step.title;
    byId("tour-description").textContent = step.text;
    const backWasFocused = document.activeElement === byId("tour-back");
    byId("tour-back").disabled = tourIndex === 0;
    byId("tour-next").textContent =
      tourIndex === steps.length - 1 ? "Finish tour ✓" : "Next →";
    const offset = document.querySelector(".site-header").offsetHeight + 24;
    window.scrollTo({
      top: Math.max(
        0,
        highlight.getBoundingClientRect().top + window.scrollY - offset,
      ),
      behavior: "auto",
    });
    if (backWasFocused && tourIndex === 0)
      byId("tour-next").focus({ preventScroll: true });
  }

  function startTour() {
    if (dialog.open) dialog.close();
    ui.selectProjects();
    tourIndex = 0;
    tour.hidden = false;
    launcher.hidden = true;
    document.body.classList.add("touring");
    showStep();
    requestAnimationFrame(() =>
      byId("tour-next").focus({ preventScroll: true }),
    );
  }

  function endTour(restoreFocus = true) {
    if (tourIndex < 0) return;
    tourIndex = -1;
    tour.hidden = true;
    launcher.hidden = false;
    document.body.classList.remove("touring");
    document
      .querySelectorAll(".tour-target")
      .forEach((node) => node.classList.remove("tour-target"));
    if (restoreFocus) launcher.focus({ preventScroll: true });
  }

  launcher.hidden = false;
  launcher.addEventListener("click", () => ui.showDialog(dialog));
  document.querySelectorAll("[data-start-tour]").forEach((button) => {
    button.hidden = false;
    button.addEventListener("click", startTour);
  });
  document.querySelectorAll("[data-guide-topic]").forEach((button) => {
    button.addEventListener("click", () =>
      answer(button.textContent, button.dataset.guideTopic),
    );
  });
  byId("guide-form").addEventListener("submit", (event) => {
    event.preventDefault();
    answer(input.value);
    input.value = "";
    input.focus();
  });
  byId("tour-next").addEventListener("click", () => {
    if (tourIndex === steps.length - 1) endTour();
    else {
      tourIndex++;
      showStep();
    }
  });
  byId("tour-back").addEventListener("click", () => {
    if (tourIndex > 0) {
      tourIndex--;
      showStep();
    }
  });
  byId("tour-exit").addEventListener("click", () => endTour());
  document.addEventListener("portfolio:dialog", () => endTour(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && tourIndex >= 0) endTour();
  });
  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => link.addEventListener("click", () => endTour(false)));
})();
