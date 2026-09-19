export const developmentStages = [
  { title: "Ideation", subtitle: "Start with the right problem.", description: "Understand the audience, the workflow, and what a useful outcome looks like. Registration, inventory, or an interactive experience: the goal comes before the stack.", artifact: "brief.md", snippet: "Audience → Event participants\nProblem  → Registration friction\nOutcome  → A clear sign-up journey", projectIds: ["papp", "ultramega"] },
  { title: "Design", subtitle: "Give the logic a human interface.", description: "Map screens, states, and the small details that make a product feel intuitive. Think about mobile layouts, feedback, and the path from first visit to completion.", artifact: "experience.flow", snippet: "Landing → Form → Validation\n                 ↓\n          Confirmation state", projectIds: ["palawan", "rcbc"] },
  { title: "Code", subtitle: "Connect the whole stack.", description: "Bring interfaces, application logic, and data together. React and Vue on the surface; PHP, Node.js, and databases behind the experience.", artifact: "application.ts", snippet: "const input = validate(form)\nconst record = await save(input)\nreturn confirmation(record)", projectIds: ["inventory", "papp"] },
  { title: "Test", subtitle: "Question the happy path.", description: "Check incomplete forms, repeat submissions, missing data, and small screens. Use reproducible checks to turn an assumption into something that can be verified.", artifact: "validation.checklist", snippet: "[ ] Empty and invalid input\n[ ] Authentication boundaries\n[ ] Keyboard and mobile flows", projectIds: ["qr", "grab"] },
  { title: "Deploy", subtitle: "Make the output usable.", description: "Bring the experience online, verify the end-to-end journey, and keep improving it. The final output is something people can actually use.", artifact: "release.checklist", snippet: "Build → Configure → Publish\nVerify key journeys\nObserve → Learn → Improve", projectIds: ["papp", "rcbc", "ultramega"] },
]

export const stackNodes = [
  { name: "React", group: "Frontend", description: "Component-based interfaces, interactive state, and reusable UI patterns.", tags: ["React"] },
  { name: "Next.js", group: "Applications", description: "React applications with routing and server-side capabilities.", tags: ["Next.js"] },
  { name: "TypeScript", group: "Logic", description: "Typed interfaces and clearer contracts between parts of an application.", tags: ["TypeScript"] },
  { name: "MySQL", group: "Data", description: "Structured information for registrations, equipment records, and application workflows.", tags: ["MySQL"] },
  { name: "PHP", group: "Backend", description: "Server-side logic and database-backed web applications.", tags: ["PHP"] },
  { name: "Vue.js", group: "Frontend", description: "Reactive interfaces for focused web tools and interactive experiences.", tags: ["Vue.js"] },
]

export const networkNodes = [
  { id: "gateway", label: "Gateway", focus: "Network edge", description: "Start at the boundary: verify the WAN link, gateway configuration, and intended access rules before tracing traffic inward." },
  { id: "switch", label: "Core switch", focus: "Connectivity", description: "Trace the physical link and switching path. Check ports, addressing, and segmentation to isolate where communication stops." },
  { id: "server", label: "Server", focus: "Services", description: "Check service health, storage, access permissions, and application logs. Protect data before making configuration changes." },
  { id: "workstation", label: "Workstation", focus: "User experience", description: "Reproduce the user’s issue, inspect the device and operating system, and verify the fix in the original workflow." },
  { id: "wireless", label: "Access point", focus: "Wireless", description: "Inspect signal coverage, client connectivity, and configuration. Separate wireless problems from upstream network issues." },
] as const

export const troubleshootingCases = [
  { id: "NET-01", category: "Network", title: "Connected, but no internet", symptom: "A sample workstation has a network link but cannot reach a website. Follow the evidence instead of immediately changing settings.", steps: ["Confirm the scope: one device or multiple devices; wired or wireless.", "Inspect the address, subnet, and default gateway configuration.", "Compare gateway reachability, external IP reachability, and DNS resolution.", "Correct the isolated configuration issue and repeat the original test."], result: "Example resolution: correct the DNS configuration after confirming IP connectivity. Verify name resolution and the user’s website access." },
  { id: "HW-02", category: "Hardware", title: "A workstation keeps restarting", symptom: "A sample workstation restarts during sustained use. Preserve the user’s work and isolate the failing layer before replacing parts.", steps: ["Record when the restart occurs and whether an error is shown.", "Inspect power connections, cooling, airflow, and temperature readings.", "Review system events and run appropriate memory and storage diagnostics.", "Address the confirmed cause and verify stability under a comparable workload."], result: "Example resolution: restore adequate cooling after confirming overheating. Retest temperatures and stability; document the maintenance." },
  { id: "APP-03", category: "Software", title: "An application will not launch", symptom: "A sample application fails at startup after a change. Find a reproducible cause without risking user data.", steps: ["Capture the exact error and review recent software or configuration changes.", "Check the application logs, dependencies, and required permissions.", "Test a targeted repair in a controlled way, keeping a rollback path.", "Relaunch with the user and confirm the original workflow is restored."], result: "Example resolution: repair the missing dependency identified in the logs. Verify startup and the user’s normal tasks." },
]

export const aiExamples = {
  developer: [
    { label: "Plan", prompt: "Help me break an event registration feature into small, testable steps.", response: "Outline the input contract, form states, server validation, and persistence. Suggest tests for missing fields and duplicate submissions before implementing the happy path.", output: "Brief → Small tasks → Reviewed implementation" },
    { label: "Debug", prompt: "A form submits twice. How should I investigate?", response: "Reproduce the behavior and inspect the network requests. Check event bindings and submission state, then consider server-side idempotency. Verify the cause before applying a fix.", output: "Reproduce → Inspect → Fix → Regression test" },
    { label: "Local AI", prompt: "Where does a local model fit in a development workflow?", response: "Explore local inference through Ollama for code explanations and drafting. Evaluate model limits, inspect generated code, and keep tool actions behind human approval.", output: "Local inference → Human review → Verified result" },
  ],
  it: [
    { label: "Triage", prompt: "How could AI help organize a troubleshooting report?", response: "Summarize the symptoms, recent changes, and evidence already collected. Suggest the next read-only checks, but do not diagnose a hardware failure from a summary alone.", output: "Symptoms → Evidence → Human-approved next step" },
    { label: "Log analysis", prompt: "How could I use AI to understand a recurring application error?", response: "Redact sensitive values, group repeated errors, and build a timeline. Compare the suggested explanation with the original logs before taking corrective action.", output: "Redact → Group → Correlate → Verify" },
    { label: "Knowledge base", prompt: "Turn a resolved issue into a reusable support note.", response: "Capture the environment, symptom, root cause, verified fix, and rollback path. Remove credentials and personal information; have a person review the note before sharing.", output: "Resolved issue → Reviewed runbook → Reusable knowledge" },
  ],
}
