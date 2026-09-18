"use strict";

// Edit project titles, descriptions, screenshots, and links here.
// Images are relative to this HTML file, so double-clicking it works offline.
// Categories: web, systems, mobile, games. The guide uses this same data.
const portfolioProjects = [
  {
    id: "papp",
    title: "PAPP Registration",
    category: "web",
    label: "Web application",
    image: "../papp-registration-preview.jpg",
    description:
      "Convention registration for BREATHE 2026, with online sign-up and participant information management.",
    tags: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "React"],
    link: "https://papp-registration.com/landing/",
    aliases: ["papp", "breathe", "convention"],
  },
  {
    id: "qr",
    title: "QR Code Generator",
    category: "web",
    label: "Web application",
    image: "../qrcode-generator-preview.jpg",
    description:
      "Custom QR codes for links and Wi-Fi networks, with logo integration for easy access to digital content.",
    tags: ["JavaScript", "PHP", "HTML/CSS", "QR Code", "Vue.js"],
    link: "https://qrcode.virtual-registration.com/",
    aliases: ["qr", "qrcode", "qr code"],
  },
  {
    id: "inventory",
    title: "Equipment Inventory",
    category: "systems",
    label: "Management system",
    image: "../inventory-system-preview.jpg",
    description:
      "Equipment tracking for Wildfire IT, bringing inventory, user authentication, and reporting into one place.",
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap", "Next.js"],
    link: "https://inventory.wildfirexstream.com/login.php",
    aliases: ["inventory", "equipment", "wildfire"],
  },
  {
    id: "ultramega",
    title: "Ultra Mega Registration",
    category: "web",
    label: "Web application",
    image: "../ultramega-registration-preview.jpg",
    description:
      "An online event registration system with form validation and participant data management.",
    tags: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "React"],
    link: "https://ultramega.virtual-registration.com/",
    aliases: ["ultra", "ultramega", "mega"],
  },
  {
    id: "palawan",
    title: "Palawan Digital Passport",
    category: "mobile",
    label: "Mobile experience",
    image: "../palawan-passport-preview.jpg",
    description:
      "A mobile-based digital passport with authentication and secure access management for Palawan.",
    tags: ["PHP", "MySQL", "JavaScript", "Mobile", "Vue.js"],
    link: "https://40taonpalawan.com/login.php",
    aliases: ["palawan", "passport"],
  },
  {
    id: "viatris",
    title: "Viatris Virtual Registration",
    category: "games",
    label: "Interactive game",
    image: "../viatris-game-preview.jpg",
    description:
      "An interactive registration experience with game mechanics and user progression tracking.",
    tags: ["JavaScript", "HTML5", "CSS", "Game Mechanics", "Next.js"],
    link: "https://virtual-registration.com/startup/viatris-vr/",
    aliases: ["viatris"],
  },
  {
    id: "grab",
    title: "Grab Game",
    category: "games",
    label: "Interactive game",
    image: "../grab-game-preview.jpg",
    description:
      "A memory-based browser game combining JavaScript gameplay with an engaging interactive interface.",
    tags: [
      "JavaScript",
      "HTML5",
      "Game Development",
      "Interactive UI",
      "React",
    ],
    link: "https://virtual-registration.com/startup/grab-game/",
    aliases: ["grab", "memory"],
  },
  {
    id: "mcdo",
    title: "McDonald's Game",
    category: "games",
    label: "Interactive game",
    image: "../mcdo-game-preview.jpg",
    description:
      "A responsive slime-stacking game for McDonald's, built with JavaScript-based gameplay.",
    tags: [
      "JavaScript",
      "HTML5",
      "Game Development",
      "Responsive Design",
      "Vue.js",
    ],
    link: "https://virtual-registration.com/startup/mcdo-game/",
    aliases: ["mcdonald", "mcdonalds", "mcdonald's", "mcdo", "slime"],
  },
  {
    id: "ar",
    title: "AR Hunt",
    category: "games",
    label: "Augmented reality",
    image: "../ar-hunt-preview.jpg",
    description:
      "An augmented reality treasure hunt using marker-based tracking and interactive clues.",
    tags: ["JavaScript", "AR", "Marker Detection", "Interactive UI", "Next.js"],
    link: "https://virtual-registration.com/startup/ar-hunt/",
    aliases: ["ar", "ar hunt", "augmented reality", "treasure"],
  },
  {
    id: "rcbc",
    title: "RCBC Commitment Wall",
    category: "web",
    label: "Web application",
    image: "../rcbc-wall-preview.jpg",
    description:
      "An interactive digital commitment wall for RCBC, with fullscreen presentation and audience engagement.",
    tags: ["JavaScript", "HTML5", "Fullscreen", "Interactive UI", "React"],
    link: "https://virtual-registration.com/startup/rcbc/wall.php",
    aliases: ["rcbc", "commitment", "wall"],
  },
];
