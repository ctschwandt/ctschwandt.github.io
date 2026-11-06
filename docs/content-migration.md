# Content migration record

This records the material carried from the Academic Pages/Jekyll site into the React/TypeScript/Vite portfolio. Evidence came from the real About, Projects, Experience, and Skills pages and Cole’s redesign brief. Template CV data was not evidence of qualifications.

## Source mapping

| Previous source | New source | Retained content |
| --- | --- | --- |
| `_pages/about.html` | `src/content/profile.json` | Biography, education, club leadership, personal interests/links, setup, dotfiles |
| `_config.yml` author data | `src/content/profile.json` | Name, academic description, Columbia location, GitHub/LinkedIn destinations |
| `_pages/projects.html` | `src/content/projects/*.md` | Seven substantive projects, five brief projects, links and media |
| `_pages/experience.md` | `src/content/experience.json` | Five genuine roles, dates, responsibilities, photographs |
| REU experience entry | `src/content/projects/underground-mining-research.md` | Research context and existing technical contributions |
| `_pages/skills.md` | `src/content/skills.json` | Languages, systems tools, graphics, libraries, research frameworks |
| `_data/navigation.yml` | `src/content/navigation.json` | About, Projects, Experience, Skills |
| Meaningful `images/` assets | Matching `public/images/` paths | Original project/experience/profile media plus WebP display derivatives |

The brief specifies expected graduation in May 2027; original education dates remain Fall 2023–Spring 2027. Personal details, including Christian faith and preaching, remain without displacing technical content.

## Thirteen projects

| Project | Markdown filename | Existing evidence |
| --- | --- | --- |
| Underground Mining Simulation — NSF REU | `underground-mining-research.md` | Experience text and photograph; no invented repository |
| OpenGL Maze FPS | `opengl-maze-fps.md` | Implementation bullets, repository, four screenshots, three videos |
| MIPS Assembly Interpreter | `mips-interpreter.md` | Implementation bullets, repository, screenshot |
| Python-2 Interpreter | `python2-interpreter.md` | Implementation bullets and repository; text-only presentation |
| Quadtree Collision | `quadtree-collision.md` | Implementation bullets, repository, screenshot, three videos |
| Galaxian Clone | `galaxian-clone.md` | Implementation bullets, GitHub profile, two videos |
| Talbook | `talbook.md` | Collaboration/database descriptions, repository, demo destination, screenshot, three videos |
| Othello (JavaFX) | `othello-javafx.md` | Implementation bullets, repository, screenshot |
| Procedural Terrain Generator | `procedural-terrain-generator.md` | Name and OpenGL only |
| Mandelbrot Fractal | `mandelbrot-fractal.md` | Name and OpenGL only |
| IMDb Database Clone | `imdb-database-clone.md` | Name and SQL only |
| Multithreaded Webscraper for Cryptanalysis | `multithreaded-webscraper.md` | Name and Python only |
| Tic-Tac-Toe | `mips-tic-tac-toe.md` | Name and MIPS Assembly only |

The final five entries remain concise. No dates, links, benchmark numbers, or implementation choices were inferred for them. REU retains its existing 2025 date; other projects omit dates where unknown.

Quadtree’s “1000+” particles and FPS comparison come from the source; no numerical speedup was invented. Research retains PPO/PPO-LSTM, predictive D* Lite, PyBind11, and visualization descriptions without claiming unpublished results.

## Media preservation

Retained: **eight project screenshots**, **eleven Cloudinary videos**, **five experience photographs**, and the configured profile image. Migration checks compared original screenshots with their byte-identical copies. WebP files are display optimizations; originals remain available. Source images subsequently received provenance metadata without changing their pixels. A verified archive of the original Jekyll sources is retained outside the checkout at `/workspace/redesign-review/legacy-jekyll-sources.tar.gz`; Git history is unchanged.

Original screenshot paths:

```text
/images/projects/maze1.png
/images/projects/maze2.png
/images/projects/maze3.png
/images/projects/maze4.png
/images/projects/mips1.png
/images/projects/quad2.png
/images/projects/talbook4.png
/images/projects/java_othello1.png
```

Experience photos are `tutor.jpg`, `reu.jpg`, `mbs.jpg`, `mutrux.jpg`, and `construction.jpg` under `/images/experience/`.

Video URLs retain the prefix `https://res.cloudinary.com/doojblikb/video/upload/` and these paths:

| Project | Path after `/upload/` |
| --- | --- |
| Maze | `v1771344915/landon_not_allowed_perlin_elwn8y.mp4` |
| Maze | `v1771344916/robert_cube_short_so5lfj.mp4` |
| Maze | `v1771344940/liow_sphere_wu9uio.mp4` |
| Quadtree | `v1771344893/quadtree2_edit_ls4pmx.mp4` |
| Quadtree | `v1771356638/quadtree1_cmpr_vrj3ls.mp4` |
| Quadtree | `v1771356740/quadtree3_cmpr_cwelbx.mp4` |
| Galaxian | `v1771344886/galaxia2_edit_wwwsx5.mp4` |
| Galaxian | `v1771344888/galaxia1_edit_sicies.mp4` |
| Talbook | `v1771512854/recording_2026-02-19_08.41.21_tnzo3p.mp4` |
| Talbook | `v1771512854/recording_2026-02-19_08.47.04_a0wm7v.mp4` |
| Talbook | `v1771512854/recording_2026-02-19_08.52.43_b97n3w.mp4` |

Transformed poster references remain in Markdown. Native video controls and visible source links replace autoplay and the custom player. Remote availability is independent of migration completeness; this record does not claim external endpoints were network-verified.

## Experience and skills

The five experience entries retain their dates and responsibilities:

1. Computer Science & Mathematics Tutor — Columbia College, October 2025–Present.
2. Undergraduate Researcher — NSF REU, Missouri University of Science & Technology, June–August 2025.
3. Seasonal Warehouse Worker — MBS Textbook Exchange, Columbia MO, June–August 2024.
4. Fuel Attendant — Mutrux Automotive, Columbia MO, June 2022–February 2024.
5. Concrete Laborer — Cravis Custom Homes, Hallsville MO, June–August 2021.

The REU selection statement (one of ten students from 120+ applicants) comes from the existing Experience page. No additional award, publication, job, or research outcome was added.

Skills retain original values. C and C++ display separately; PyTorch, Stable-Baselines3, and PyBind11 are grouped under research. Categorization is not a proficiency rating.

## Contact and résumé

GitHub and LinkedIn destinations come from real author configuration. Galaxian’s old GitHub link was only a profile destination; it is labeled **GitHub profile**, not a verified repository.

No genuine résumé PDF was present. `/resume` led to a template CV with fictional qualifications; it must not be advertised as a résumé. No résumé is linked until Cole supplies an approved file. The public author email was blank. An address in the mixed real/template `_data/cv.json` was not treated as permission to publish contact information. Optional profile fields allow approved details to be added later, as documented in the README.

## Routes and removed examples

Main paths remain `/`, `/projects/`, `/experience/`, and `/skills/`. `/about/` and `/about.html` remain homepage aliases. The thirteen Markdown filenames generate thirteen independently accessible project pages.

Template publication, talk, teaching, blog, and CV routes are intentionally absent. They are not redirected to unrelated pages. Missing routes receive a genuine not-found page; the site does not use a 404 fallback for ordinary navigation.

Inspection identified these examples for exclusion and removal after migration verification:

- Five `_publications` examples, including the 2025 filename containing another sample GitHub Journal of Bugs paper.
- Four `_talks`, two `_teaching`, two `_portfolio`, and five `_posts` examples.
- Fictional GitHub University degrees/employment in `_pages/cv.md` and `_data/cv.json`.
- Template archives, markdown guide, talk map, comments/authors, notebooks/generators, example papers/slides, and demonstration assets.
- Jekyll layouts/includes/Sass, Ruby dependencies, obsolete Docker/devcontainer setup, CV/talk-map scripts, and legacy JavaScript dependencies.

Those examples are not migrated into `src/content` or the new publication. The explicit Vite build source prevents arbitrary repository documents from becoming public pages. Site validation rejects known sample routes and fictional GitHub University content in generated HTML.

`LICENSE` and the repository-local Impeccable installations are retained, along with meaningful media and approved product/design records.

## Validation scope

Migration checks compared all original project video URLs, verified screenshot copies and experience photos, parsed thirteen Markdown records and four JSON files, and confirmed no unapproved contact/résumé fields were populated. Reproducible application validation commands are in the README.

A local build does not establish publication, external service uptime, or a Lighthouse score. Deployment remains a separate owner-approved action.
