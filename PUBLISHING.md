# Publish Boma’s skills

The skill collection and landing page live in the same repository. There is no npm package to publish: the `skills` CLI reads `skills/<name>/SKILL.md` directly from GitHub.

## First release

The proposed public repository is `bomajosiah/skills`. It does not exist as part of this local setup yet. If you choose a different name, change `repository` in `site/config.json` before building.

1. Authenticate GitHub: `gh auth login`.
2. From this folder, initialize and publish:

   ```sh
   git init -b main
   git add .
   git commit -m "Publish initial skill collection and landing page"
   gh repo create bomajosiah/skills --public --source=. --remote=origin --push
   ```

3. Confirm discovery without installing anything:

   ```sh
   npx skills add bomajosiah/skills --list
   ```

4. Authenticate Cloudflare in the account that owns `bomajosiah.com`:

   ```sh
   npx wrangler login
   npx wrangler whoami
   npm run check
   npm run deploy
   ```

`wrangler.jsonc` attaches `skill.bomajosiah.com` as a Worker Custom Domain. Cloudflare creates the DNS record and certificate. If that exact hostname already has a DNS record, resolve the conflict before deploying. The site serves only `dist/`; research, evals, and build scripts are not exposed as website assets.

For automatic updates, connect this repository in Cloudflare Workers Builds. Set the build command to `npm run build` and deployment command to `npx wrangler deploy`. Keep the repository’s root as the project root.

## Installation

```sh
# Choose skills and an agent interactively
npx skills add bomajosiah/skills

# Install one skill
npx skills add bomajosiah/skills --skill do-ia

# Install all skills for Codex globally
npx skills add bomajosiah/skills --skill '*' --agent codex --global
```

The repository must be published before these commands work for other people.

## Add a skill

1. Add `skills/<skill-name>/SKILL.md` with YAML `name` and `description`. Keep supporting references inside its own skill folder so it installs independently. Files shared by several skills live in `shared/` and are listed in `shared/manifest.json`; the build copies them in, so edit the `shared/` copy and commit the copies the build produces.
2. Run `npm run build` (and `npm test` if you touched the scanner). New folders appear under “More skills” automatically.
3. To group it, add a category or an entry in `site/config.json`. Keys must match skill folder names; values are the short descriptions on the page.
4. Commit and push. Deploy manually with `npm run deploy`, or let Workers Builds deploy.

## Local preview

```sh
npm ci
npm run dev
```

The page uses plain HTML, CSS, and a small clipboard script. No frontend framework or runtime service is needed.

## License

Choose a license before the public release. No license has been added on your behalf. If you want people to reuse and modify the skills freely, MIT is a common choice; check that any incorporated third-party material allows it.

## References

- Skills CLI: https://github.com/vercel-labs/skills
- Static hosting: https://developers.cloudflare.com/workers/static-assets/
- Custom domains: https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
