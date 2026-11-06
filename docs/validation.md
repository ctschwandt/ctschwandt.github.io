# Validation record

Local validation of the React migration on November 6, 2026. These results describe the prepared checkout, not a deployed GitHub Pages release.

- Clean `npm ci` installation passed using the committed lockfile.
- `npm run check:content` passed: 13 Markdown projects, five experience entries, five skill groups, profile, and navigation.
- `npm run build` passed TypeScript, client compilation, React static rendering, and generated-site validation: 20 independent HTML pages and 13 project-detail routes. The final media-fallback build checked 431 internal link/asset references.
- `npm run test:browser` passed all eight tests on Chromium, including no-JavaScript content and navigation, direct project navigation and refresh, absence of application/internal-resource errors, keyboard gallery opening/Escape/focus return, deferred full-size images, native non-autoplay video controls, simulated video-error recovery, theme preference persistence/system changes, and 24 page/viewport overflow checks across 320, 390, 768, and 1440px.
- Twelve axe-core scans (six representative routes in light and dark themes) found no automated WCAG A/AA violations. Automated checks do not establish comprehensive WCAG conformance.
- Desktop, tablet, mobile, and dark-mode screenshots were inspected. A fresh Impeccable reviewer requested a local-poster and playback-error-state fix; the subsequent verdict scored that fix resolved, with no visible introduced regressions (`ship` at that scope).
- Lighthouse on the local production homepage measured performance **97**, accessibility **100**, best practices **100**, and SEO **100**. Mobile simulation: FCP 0.8s, LCP 2.6s, total blocking time 30ms, CLS 0.009. This is one local lab run, not field performance or a guarantee of deployed scores. The run preceded the project-only video-fallback patch.
- Impeccable’s source detector returned no findings. Provenance metadata scan passed for all 43 shipping raster files.
- `git diff --check` passed. No push, commit, history rewrite, or website deployment was performed.

Cloudinary and the external Talbook demo could not be network-verified: the running environment’s proxy rejected their hosts with HTTP 403. Their original URLs remain intact. Browser tests do not mock remote media; a synthetic error event tests the UI recovery state and does not claim remote playback works. Required host additions (`res.cloudinary.com`, `talbook.pythonanywhere.com`) and React install/startup instructions were saved to the environment draft for review. Draft saving does not apply or publish network changes.

The original Jekyll sources were archived outside the checkout at `/workspace/redesign-review/legacy-jekyll-sources.tar.gz` and archive member hashes checked before obsolete sources were removed. Git history retains the original files. The media migration inventory is in [content-migration.md](content-migration.md).
