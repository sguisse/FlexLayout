# 🔁 FlexLayout - dnd-kit Integration

## 🧭 Overview

This repository demonstrates a Strangler-Fig style integration of `dnd-kit` (v0.3.2) into the FlexLayout project. The goal was to add a modern drag/drop system without breaking the existing code: new behaviour lives in an isolated folder and is opt-in so the legacy dragging/resizing remains available.

## 🧩 Modifications : Strangler-Fig pattern

**Added integration folder**: `src/dnd-kit-integration` — all new dnd-kit-specific components and provider live here so they can be grown around the existing app and removed or extended independently.

**Provider**: `src/dnd-kit-integration/FlexDndProvider.tsx` — provides dnd-kit context, listens for dnd-kit events and translates them into FlexLayout model actions (for example using `model.doAction(Actions.moveNode(...))`). The provider is the bridge between dnd-kit events and the FlexLayout model.

**Wrappers**: `src/dnd-kit-integration/DndKitTabWrapper.tsx` and `src/dnd-kit-integration/DndKitTabSetWrapper.tsx` — small components that attach `useDraggable` / `useDroppable` behaviour. Note: to avoid layout regressions the final integration avoids adding extra DOM wrappers into the layout chain; instead the droppable `ref` is composed onto the existing tabset container element.

**`useDndKit` flag**: `src/view/Layout.tsx` was extended with an optional `useDndKit?: boolean` prop. When true, `Layout` is wrapped with the `FlexDndProvider`. This allows opt-in activation of the new behaviour while keeping the original drag system available.

`b` **changes**: `src/view/TabSet.tsx` now composes dnd-kit's `useDroppable` ref with the component's existing `selfRef` so we do not insert an extra DOM wrapper that would break flex sizing and the panel resize behavior.

**TypeScript and runtime fixes**: During implementation we fixed a few type mismatches (use the `ref` returned from the dnd-kit hooks and use `DockLocation.CENTER` rather than a literal string). The project types build (`pnpm run build:types`) passes after these fixes.

**Resizing preservation**: A key decision was to avoid adding wrapper elements between the layout's flex containers and the tabset DOM nodes — inserting elements there changed computed sizes and regressed splitter/resizer behaviour. Composing refs keeps the DOM structure intact and preserves resizing.

**Demo changes**: `demo/App.tsx` was updated to include a toolbar checkbox labelled "Use dnd-kit" which toggles the `useDndKit` mode at runtime. Toggling remounts the top-level `Layout` (via a `key`) to reinitialize drag behaviour.

## 📌 How to use

🧭 Pass `useDndKit={true}` or `{false}` to the top-level `<Layout />` to enable or disable the dnd-kit integration. The demo toolbar checkbox toggles this state and forces a remount so the change is applied immediately.

## 🧰 Files added / modified (summary)

- `src/dnd-kit-integration/FlexDndProvider.tsx` — provider and event translation layer.
- `src/dnd-kit-integration/DndKitTabWrapper.tsx` — draggable wrapper (kept small and opt-in).
- `src/dnd-kit-integration/DndKitTabSetWrapper.tsx` — initial droppable wrapper (integration evolved to use ref composition instead of inserting wrappers).
- `src/view/Layout.tsx` — added `useDndKit` prop and conditional provider wrapping.
- `src/view/TabSet.tsx` — composed droppable `ref` with existing `selfRef` to avoid extra DOM nodes and preserve resizing.
- `demo/App.tsx` — added toolbar toggle `Use dnd-kit` and remount logic (via `key`) so the demo can switch between legacy and dnd-kit modes.

## 📝 Development notes

🔧 To build types and run the demo locally:

```bash
pnpm install
pnpm run build:types
pnpm run dev
```

## 🔚 That's it

The integration is intentionally non-invasive: the legacy drag system remains available, new behaviour is isolated under `src/dnd-kit-integration`, and demos provide a runtime toggle to compare both modes.
