/* Copyright 2023 Marimo. All rights reserved. */
import { HotkeyAction } from "@/core/hotkeys/hotkeys";

/**
 * Shared interface to render a user action in the editor.
 * This can be in a dropdown menu, context menu, or toolbar.
 */
export interface ActionButton {
  label: string;
  variant?: "danger";
  hotkey?: HotkeyAction;
  icon?: React.ReactNode;
  hidden?: boolean;
  rightElement?: React.ReactNode;
  handle: () => void;
}
