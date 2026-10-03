import { createMemoryHistory, RouterProvider } from "@tanstack/react-router";
import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { getRouter } from "@/router";

async function renderAt(path: string) {
  const router = getRouter();
  router.update({ ...router.options, history: createMemoryHistory({ initialEntries: [path] }) });
  await router.load();
  return render(<RouterProvider router={router} />);
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// Assert only that the router mounts and paints, never page content:
// routes are rewritten as the app is built and this must keep passing.
// The root shell renders <html>, so React mounts into the document, not the test container.
describe("App routing", () => {
  it("renders the index route", async () => {
    await renderAt("/");

    await waitFor(() => expect(document.body.textContent).not.toBe(""));
  });

  it("renders the not-found route", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);

    await renderAt("/this-route-does-not-exist");

    await waitFor(() => expect(document.body.textContent).not.toBe(""));
  });
});
