<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep all stage-one travel content in `src/data/content.ts` and client-only interactions in route/components; this allows future data replacement without coupling UI to a backend.
- Use TanStack Router file routes for every public page; it is the project's supported routing architecture.
