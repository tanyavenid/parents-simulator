# Working assets

This folder contains application-ready assets used by the MVP runtime.

- `references/` stays a source/reference library and is not imported by the app.
- `src/assets/images/scenarios/` contains optimized or selected images per scenario.
- `src/assets/images/ui/` is reserved for small interface assets if CSS is not enough.

Temporary MVP images may be copied from `references/`, but app code should import from `src/assets`.
