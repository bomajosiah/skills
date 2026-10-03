# Information Architecture Glossary

This glossary mixes broadly established IA/UX terms with a small set of explicitly labeled **working terms** that are useful when directing AI agents.

## Core structure and modeling

### Information architecture (IA)
The organization and relationships of content, functionality, objects, and navigation that determine how users understand and move through a product.

### Domain object
A meaningful thing in the user's world with identity, attributes, state, lifecycle, or relationships — for example Customer, Order, Project, Location.

Close term: **Entity**. "Domain object" is often more useful in product work because it emphasizes the user-facing model rather than storage.

### Entity
A distinct identifiable thing represented by the system. Often used more technically than domain object.

### Object model
A representation of the important objects in a product and the relationships/actions that connect them.

### Mental model
The user's internal expectation of how a system is organized and how it should behave.

### Taxonomy
A system for categorizing and labeling things.

Use when: "How should these reports/features/articles be grouped and named?"

### Ontology
A model of what kinds of things exist in a domain and how they relate.

Use when: "What are the core objects and relationships in this product?"

### Hierarchy
A parent-child structure in which information or destinations sit at different levels.

### Flat hierarchy
A hierarchy with relatively few levels and more choices visible at each level.

### Deep hierarchy
A hierarchy with more nested levels and fewer choices at each level.

Neither is inherently better; choose based on findability and domain structure.

### Polyhierarchy
Allowing the same item to be reachable under more than one category/path when users reasonably expect it in multiple places.

### Heterarchy
A non-tree structure where items may have multiple peer-to-peer relationships rather than one strict parent-child hierarchy.

### Parent / child
A hierarchical relationship where one destination or object contains/subordinates another.

### Sibling / peer
Items that share the same parent or conceptual level.

### Canonical destination
The primary, authoritative place where an object or capability is managed or understood.

Useful when a feature appears in summaries/shortcuts elsewhere but should still have one true home.

### Page responsibility
The dominant job a page exists to support.

Prompt framing:
> "Give every major page one clear page responsibility."

### Surface
A distinct product destination or interaction context such as a dashboard, collection, detail view, workflow, or settings page.

### Route boundary
The architectural decision that a responsibility deserves a durable page/URL rather than being embedded inside another surface.

## Organizational schemes

### Object-based IA
Organization around the main domain objects users manage, such as Customers, Orders, Projects, Locations.

### Task-based IA
Organization around user goals/actions, such as Review applications, Reconcile payments, Schedule staff.

### Topic-based IA
Organization around subject matter or content themes.

### Audience-based IA
Organization around different user groups or audiences.

Use cautiously in products where users belong to several audiences at once.

### Faceted classification
Organizing/filtering items using multiple independent attributes rather than one rigid hierarchy.

Example: products by category, price, brand, size, and availability.

### Chunking
Grouping related information into meaningful units to reduce cognitive load.

Chunking is presentation plus structure; it is not a substitute for proper page boundaries.

## Navigation

### Global navigation
Stable navigation to the product's major high-level destinations.

### Local navigation
Navigation scoped to the current section or object, showing nearby/sibling destinations.

Example: inside a Project: Overview, Tasks, Files, Activity.

### Contextual navigation
Links or actions whose relevance comes from the current object, record, task, or state.

Example: from an Order, navigate to its Customer or Refund workflow.

### Utility navigation
Cross-cutting destinations such as Account, Help, Notifications, Search, Workspace switcher.

### Primary navigation
The main navigation mechanism for the product's core destinations.

Often overlaps with global navigation.

### Secondary navigation
A supporting navigation level beneath or alongside the primary navigation.

### Breadcrumb
A visible hierarchical path showing the user's location and allowing movement to parent levels.

Do not use breadcrumbs as a progress indicator for a linear workflow.

### Object subnavigation
A practical term for local navigation inside one first-class object.

Example: Customer → Overview / Orders / Notes / Billing.

### Hub-and-spoke
A structure where users repeatedly return to a central hub to enter separate destinations/spokes.

Useful for some portals; inefficient when users need to move laterally between spokes.

### Lateral navigation
Movement between peer destinations at the same conceptual level.

### Drill-down
Moving from a summary or aggregate view into more detailed information.

### Drill-up
Moving from detail back toward a broader summary/parent context.

### Cross-link
A direct link connecting related destinations outside the strict hierarchy.

### Deep link
A URL that lands directly on a specific nested destination, record, view, or state.

### Wayfinding
The cues and mechanisms that help users understand where they are, where they can go, and how to return.

### Information scent
How strongly a label/link suggests that it leads to the information or function the user wants.

Strong labels increase confidence before clicking.

### Orphan page
A destination that exists but is not meaningfully connected into navigation or contextual paths.

### Dead end
A surface that leaves users without an obvious next/return path for the task they are doing.

## Surface types

### Dashboard / overview
A surface for orientation, monitoring, change, exceptions, triage, and useful next actions.

Not synonymous with "home for every feature."

### Collection / index
A surface for browsing, searching, filtering, sorting, comparing, or managing many objects of one type.

Examples: Customers, Orders, Projects.

### Detail view
A surface focused on understanding one object.

### Workspace
A richer detail surface where users both understand and perform substantial work on one object.

### Collection → detail pattern
A common structure where users browse many objects in a collection and open one into its detail/workspace.

### Master-detail / split view
A layout showing a collection/list and the selected object's detail at the same time.

Use when rapid switching/comparison is central and screen space supports it.

### Queue / inbox
A surface for a stream of actionable items that need review, triage, assignment, or resolution.

Examples: approvals, incidents, support tickets.

### Workflow
A task/process with sequence, dependencies, branching, status, or commitment.

### Wizard
A UI pattern that guides users through a task in discrete sequential steps.

A wizard is one way to implement a workflow.

### Create / edit surface
A focused context for entering or modifying information.

### Report / exploration
A surface whose primary purpose is analysis, comparison, slicing, or interpretation rather than operational management.

### Settings / administration
A surface for lower-frequency configuration such as billing, integrations, permissions, policies, preferences, and system behavior.

### Utility surface
A cross-cutting area such as notifications, help, global search, account, or workspace switching.

## Disclosure and complexity

### Progressive disclosure
Showing essential/common information first and revealing secondary or advanced complexity when needed.

### Progressive engagement
Introducing capability as the user becomes more involved, rather than presenting every possible feature at first contact.

### Inline disclosure
Revealing more information or controls in the current context without leaving the surface.

### Disclosure control
A control that expands/collapses secondary content.

### Tabs
A navigation/control pattern for switching between peer views of the same context.

Tabs are not an IA strategy for unrelated product areas.

### Accordion
A disclosure pattern for expanding/collapsing sections.

Useful for content; weak as a substitute for a coherent product hierarchy.

### Overlay
A modal, drawer, popover, sheet, or similar layer displayed above the current context.

Best for bounded contextual tasks.

### Modal workflow
A workflow contained inside modal/dialog surfaces.

Not inherently wrong, but risky when long, revisitable, multi-step, or dependent on surrounding context.

## Search, filtering, and views

### Global search
Search across multiple major object/content types in the product.

### Scoped search
Search limited to the current collection, section, object type, or context.

### Faceted navigation
Navigation/refinement using several independent attributes or filters.

### Filter
A control that narrows a set of results based on criteria.

### Filter scope
The exact region/dataset affected by a filter.

### Sort
Changing the ordering of a result set without changing membership.

### Saved view
A reusable combination of filters, sorting, columns, grouping, or scope.

### Query builder
A more advanced interface for composing complex search/filter conditions.

### Result set
The collection of items produced by a search, filter, or query.

## Roles and permissions

### Role-based navigation
Navigation visibility/prioritization that changes based on meaningful user permissions or responsibilities.

Avoid duplicating the whole IA per role unless mental models truly differ.

### Permission-aware IA
A structure that accounts for what users can see/do while preserving a coherent overall model.

### Restricted destination
A destination that exists in the architecture but is unavailable to the current user due to permissions.

## Validation and research

### Card sorting
A research method where participants group labeled items to reveal possible categories and mental models.

Use primarily to generate or explore groupings.

### Open card sort
Participants create their own groups and often name them.

### Closed card sort
Participants place items into predefined categories.

### Tree testing
A task-based method for evaluating whether users can find destinations in a proposed text-only navigation hierarchy.

### First-click testing
Testing whether the user's first navigation/action choice points toward the correct path.

### Findability
How easily users can locate a known piece of content or functionality.

### Discoverability
How readily users notice that a capability/content exists in the first place.

### Directness
In tree testing, how directly participants reach the correct destination without backtracking.

### Path analysis
Studying navigation behavior through analytics to identify backtracking, dead ends, loops, or common shortcuts.

## AI-oriented diagnostic working terms

The terms below are **working terms** in this skill. They are useful shorthand, but should not be presented as universal formal IA terminology.

### Everything Dashboard *(working term)*
The failure mode where the landing dashboard becomes the home for metrics, full management tables, forms, settings, reports, alerts, and unrelated functions.

### Cardification *(working term)*
Turning every requirement into a card instead of deciding conceptual grouping and page boundaries first.

### Tab Dump *(working term)*
Using many tabs to hide unrelated product areas that should have clearer route/navigation separation.

### Modal Application *(working term)*
Building substantial, navigable, revisitable product experiences inside nested modals/drawers.

### Feature-List Navigation *(working term)*
Making global navigation mirror a requirements list rather than the user's jobs/domain model.

### Database IA *(working term)*
Making product navigation mirror backend tables/entities rather than the user's mental model.

### Org-Chart IA *(working term)*
Organizing the product by the company's internal departments rather than user needs.

### Settings Leakage *(working term)*
Allowing configuration/admin capabilities to spill into everyday operational surfaces.

### Dashboard Duplication *(working term)*
Putting near-complete copies of collections/reports on the dashboard while also maintaining dedicated destinations.

### Filter Soup *(working term)*
A screen with many filters whose scopes and interactions are hard to predict.

### More-as-Architecture *(working term)*
Using "More", "Tools", "Miscellaneous", or similar vague containers to hide unresolved categorization.

### Premature Minimalism *(working term)*
Hiding labels, navigation, or frequent actions to achieve visual simplicity before reducing conceptual complexity.

### Click Compression *(working term)*
Combining too much onto one screen solely to reduce the number of clicks.

### Disconnected Actions *(working term)*
Selecting or understanding an object in one area but having to navigate elsewhere to perform actions on it.

## Reverse-lookup cues

If the user says...

- "the nav stays the same everywhere" → **Global navigation**
- "the nav changes when I'm inside a project" → **Local navigation / object subnavigation**
- "a link appears because I'm viewing this order" → **Contextual navigation**
- "see all customers, then open one" → **Collection → detail pattern**
- "list and selected record side by side" → **Master-detail / split view**
- "one place for stuff that needs attention" → **Queue / inbox**
- "summary first, click for details" → **Drill-down**
- "hide advanced things until needed" → **Progressive disclosure**
- "same item belongs in two categories" → **Polyhierarchy**
- "filter by several attributes at once" → **Faceted navigation / faceted classification**
- "how users naturally group these things" → **Card sorting**
- "test whether people can find things in this menu tree" → **Tree testing**
- "what users think the system looks like" → **Mental model**
- "what objects exist and how they relate" → **Ontology / object model**
- "how things are categorized/named" → **Taxonomy**
- "the whole app is on the dashboard" → **Everything Dashboard** *(working term)*
- "everything became a card" → **Cardification** *(working term)*
- "too many unrelated tabs" → **Tab Dump** *(working term)*
- "a whole app inside drawers/modals" → **Modal Application** *(working term)*
- "the sidebar mirrors the PRD" → **Feature-List Navigation** *(working term)*
- "the sidebar mirrors database tables" → **Database IA** *(working term)*
- "billing/integrations mixed into daily work" → **Settings Leakage** *(working term)*
- "everything is on one page to reduce clicks" → **Click Compression** *(working term)*
