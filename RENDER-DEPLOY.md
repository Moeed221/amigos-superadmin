# Amigos Mexican Grill V2 — dedicated new repository and Render deployment

This package is restricted to the newly created repository:
https://github.com/ahmadwaseembutt2005-eng/amigos-superadmin

## Publish source from Windows

1. Ensure Git for Windows is installed and you are signed in to the GitHub account that owns `amigos-superadmin`.
2. Extract this entire ZIP to a new folder, away from your previous Git repositories.
3. Double-click **`UPLOAD_TO_GITHUB.cmd`**. Alternatively, from PowerShell in that folder run:

   `powershell -ExecutionPolicy Bypass -File .\PUBLISH_TO_GITHUB.ps1`

4. If Git asks you to sign in, use the repository owner's account.

The publish script explicitly refuses to push to an existing remote other than the dedicated `amigos-superadmin` repository. It does not open, modify, or push to any other repository. Do not run it from inside an unrelated repo.

## Render deployment

- Workspace: **Ahmad Butt**
- New Static Site name: `amigos-superadmin-v2`
- Repository: `https://github.com/ahmadwaseembutt2005-eng/amigos-superadmin`
- Branch: `main`
- Build command: `npm ci && npm run build`
- Publish directory: `out`
- Node.js: version 22 (or >=20.9)

`render.yaml` is also supplied for a Blueprint deployment if desired; don't create an existing-service replacement.

After deployment, verify the homepage and `/admin/`. This is a static demo with browser-local admin data, **not** secure production admin authentication or persistent order management.
