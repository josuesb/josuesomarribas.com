---
slug: "jira-tools-copy-organize-open-tickets"
locale: "en"
title: "Jira Tools: copy tickets with context and open them by ID"
description: "How I designed Jira Tools to copy useful references, collect tickets and prepare status updates, with Spotlight search and local history."
date: "2026-11-11T09:00:00.000Z"
draft: false
type: "Blog"
cluster: "portfolio-projects-case-studies"
tags: ["Jira Tools", "UX engineering", "Chrome extension"]
audio: ""
sourceImage: "/assets/articles/jira-tools/cover-en.svg"
imageAlt: "Jira Tools: a ticket connected to a copy reference and a status update"
image: "/assets/articles/jira-tools/cover-en-1400.webp"
canonical: ""
featured: false
downloadUrl: ""
downloadText: ""
---

<p>Sharing a ticket should be a small task. Yet a bare link often makes the recipient open Jira just to find out what it is about. Add the title manually, and you may still need the status, the assignee or the same formatting you used in the previous message.</p>

<p>I built <a href="/jira-tools">Jira Tools</a> to handle that work around the ticket: copying a useful reference, collecting several tasks and opening an issue when you already know its ID. It is a Chrome extension that stores preferences, a ticket tray and history in your browser.</p>

<p>This article covers version 2.1.0. The extension is available in <a href="https://chromewebstore.google.com/detail/bplkoaddgjmgjaibedponhjpohnaichn">Chrome Web Store</a>. The screenshots show its Spanish interface with fictional data.</p>

<h2>A reference you can understand before opening it</h2>

<p>The starting point is simple: copy the current ticket’s linked ID and title. The person reading your message gets a recognisable reference and can decide whether they need to open Jira.</p>

<p>Where you paste also matters. A document with a visual editor, a Markdown note and a plain text field expect different content. In Jira Tools, copy format and template are separate settings: the format determines how the link is written; the template determines what information accompanies it.</p>

<p>The basic template includes the ID and title. The Slack template adds status and assignee on a second line. The documentation template prepares a fuller reference, while a custom template lets you combine variables such as <code>{link}</code>, <code>{title}</code> and <code>{status}</code> with your own text.</p>

<figure class="article-editorial-figure"><img src="/assets/articles/jira-tools/formats.webp" alt="Jira Tools settings with rich text selected, a Slack template and a preview showing the ticket’s status and assignee" loading="lazy"><figcaption>Format and template are separate choices. The preview lets you check the reference before copying it.</figcaption></figure>

<p>For example, you could use this custom template:</p>

<pre data-language="text"><code>{link} — {title}
Status: {status}
Assignee: {assignee}</code></pre>

<p>The “Copy example” button lets you test an actual paste in the destination app. The preview helps, but whether a link keeps its formatting also depends on the editor receiving it.</p>

<h2>Know the ID? Go to the ticket</h2>

<p>If someone mentions <code>ID-123</code> in a conversation, your next action can be typing that ID. Spotlight opens a search overlay on the current page, shows the destination and opens the ticket in a new tab when you press Enter.</p>

<p>First, save your instance’s domain in <strong>Settings → Jira</strong>. The search box then builds the address using that domain. It does not check whether the ticket exists or whether you have access; Jira handles that when you arrive.</p>

<figure class="article-editorial-figure"><img src="/assets/articles/jira-tools/spotlight.webp" alt="Spotlight search over a dimmed page, showing ID-123, its destination URL and a local history suggestion" loading="lazy"><figcaption>Spotlight keeps the destination visible before opening it. Suggestions come from local history, not a search of Jira.</figcaption></figure>

<p>The suggested shortcut is <code>⌘⇧O</code> on Mac and <code>Alt+Shift+O</code> on Windows and Linux. If another action already uses that combination, change it at <code>chrome://extensions/shortcuts</code>. The extension’s shortcut settings show the combinations actually assigned.</p>

<p>You can also use Chrome’s address bar: type <code>jira</code>, press Tab, enter the ID and press Enter. On protected pages where Chrome does not allow an overlay, the extension uses its popup or a compact window instead.</p>

<h2>From a few tickets to a status update</h2>

<p>To prepare a standup or a report, add tickets to the tray. There you can review their details, remove anything you no longer need and copy the full selection in your chosen format.</p>

<p>Adding a ticket that is already saved refreshes its data without creating a duplicate or changing its position. Copying tickets does not empty the tray, either: collecting information and putting it on the clipboard are separate actions.</p>

<p>The “Update by status” option turns that selection into sections such as “In progress” and “Done”, with a ticket count for each group. The preview lets you check what you will share before copying it.</p>

<figure class="article-editorial-figure"><img src="/assets/articles/jira-tools/tray.webp" alt="A tray containing two fictional tickets alongside a preview grouped into In progress and Done, with a Copy update button" loading="lazy"><figcaption>The tray holds your selection; the preview shows the report. Each ticket uses the status saved when it was added.</figcaption></figure>

<p>That last detail matters when reading the report: the data is a snapshot. If a ticket changes status in Jira, the tray does not check it in the background. Add it again to refresh the data before sharing your update.</p>

<h2>Find a ticket you already copied</h2>

<p>History keeps up to 100 distinct copied tickets, with the most recent first. Search by ID or title, open a link or copy a ticket again using your current template and format.</p>

<figure class="article-editorial-figure"><img src="/assets/articles/jira-tools/history.webp" alt="Jira Tools local history with search by ID or title and three fictional tickets, each with copy and delete actions" loading="lazy"><figcaption>History keeps references you can reuse. Their data reflects the last copy and does not update from Jira.</figcaption></figure>

<p>The tray and history have different purposes. The tray is a selection you prepare; history helps you retrieve references you have already copied. Clearing history does not change the tray, and opening a ticket without copying it does not create a history entry.</p>

<h2>The small decisions that shape the tool</h2>

<p>The interface keeps each selection close to its result: tickets beside the report, settings beside the preview and the ID beside its destination. The design lets you review the result in the same place you prepare it.</p>

<p>The lightning menu brings together seven actions and shows their shortcuts. With the menu open, keys 1 through 7 activate each option. While you type in a field or in Spotlight, those keys stop triggering menu actions.</p>

<p>The extension reads ticket information when you invoke its features. It does not modify tickets, use a token or the Jira API, or send your tray or history to a developer server. Preferences and saved tickets stay in the browser. The <a href="/jira-tools/privacy">privacy policy</a> explains the details.</p>

<p>There are specific limits. Some Jira views may need changes to the selectors that read their fields. Installations requiring a path prefix are not covered by Spotlight’s current domain settings. Keyboard shortcuts depend on conflicts within your Chrome profile. Compatibility with your instance and the editor where you paste needs checking in that environment.</p>

<h2>What you can see now</h2>

<p>The <a href="/jira-tools">Jira Tools page</a> brings together its features and publication status. You can <a href="https://chromewebstore.google.com/detail/bplkoaddgjmgjaibedponhjpohnaichn">install it from Chrome Web Store</a>.</p>

<p>The project focuses on a short journey: leave Jira with a reference someone can understand, then return to a ticket without retracing your steps. Copy formats, the tray and history keep the context between those two moments.</p>
