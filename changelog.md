# changelog

## v0.0.6
- SyncObjects are displayed more compactly (VRIK no longer takes up the whole screen)
- Fix: Number inputs used to complain about non-integer values when hovered
- Fix: Enums in syncObjects now are also dropdowns.
- Component try to use their short name from the reflection API. This doesn't work if they have a generic and fallbacks to the previous method. 

## v0.0.5
- All enums should now use a dropdown menu. Their options are found using the Reflection API.
- Added BoundingBox and color32 fields.
- Nullable enums can be now be reenabled.
- The selected slot name is now clickable to update it without having to scroll to the top.

## v0.0.4
- Inspector buttons (Object Root, Destroy Preserving Assets, Duplicate, Create Pivot At Center, and user dependant buttons dont actually work)
- Mouse notification (mostly for telling you that a button doesnt work)
- Added RectField

## v0.0.3
- Added TypeField
- Fix: Fixed the SlotView content spreading to fill it
- Fix: Clicking on a slot's name correctly logs its data
- Switched from Svelte+Vite to SvelteKit (for path aliasing)

## v0.0.2
- SyncLists, SyncObjects, and remaining primitive types (e.g. number4x4, boolean2, ...) can now be displayed and edited in the component view

## v0.0.1:
- First version