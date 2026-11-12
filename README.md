# giuseppe-testa.github.io

Personal website built with [Quarto](https://quarto.org) and published to GitHub Pages.

## Setup (once)

Requires only [uv](https://docs.astral.sh/uv/): Quarto is installed inside the project's `.venv` (PyPI package `quarto-cli`).

```bash
uv sync          # creates .venv with Python 3.12, Quarto and the packages in pyproject.toml
```

## Everyday use

- Write notebooks: `uv run jupyter lab`
- Preview the site: `uv run quarto preview`
- Add a package: `uv add <package>` (updates `pyproject.toml` and `uv.lock`; commit both)
- Add a post: create `blog/posts/<yyyy-mm-slug>/index.ipynb` (first cell: raw YAML front matter), run it, save it, push.

## Publishing

Every push to `master` builds the site with GitHub Actions (`.github/workflows/publish.yml`).
Notebooks are rendered from their saved outputs, so the build does not need the Python environment.
