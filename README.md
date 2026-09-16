# MFN Designs Website

Cloudflare Pages deployment for mfnspaceplanning.com.

## Local build

```text
pnpm install --frozen-lockfile
pnpm build
```

Cloudflare Pages settings:

- Build command: `pnpm install --frozen-lockfile && pnpm build`
- Build output directory: `artifacts/mfn-designs/dist/public`
- Root directory: `/`
- Environment variable: `NODE_VERSION` = `22` (Vite 7 needs Node 20+; the Pages default is older)

The contact form is handled by `functions/api/contact.ts`. Configure these Pages secrets before testing it:

- `RESEND_API_KEY`: Resend API key
- `RESEND_FROM`: verified sender, for example `MFN Designs <contact@mfnspaceplanning.com>`

Contact submissions are sent to `maura@mfnspaceplanning.com` and are not stored by this application.
