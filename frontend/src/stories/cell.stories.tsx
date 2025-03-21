/* Copyright 2023 Marimo. All rights reserved. */
import type { Meta, StoryObj } from "@storybook/react";
import { Cell, CellProps } from "../components/editor/Cell";
import { TooltipProvider } from "../components/ui/tooltip";
import { CellId } from "../core/cells/ids";
import { Logger } from "@/utils/Logger";

const meta: Meta<typeof Cell> = {
  title: "Cell",
  component: Cell,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Cell>;

const props: CellProps = {
  theme: "light",
  showPlaceholder: false,
  id: "1" as CellId,
  code: "import marimo as mo",
  output: null,
  consoleOutputs: [],
  status: "idle",
  edited: false,
  interrupted: false,
  errored: false,
  stopped: false,
  updateCellCode: Logger.log,
  prepareForRun: Logger.log,
  registerRunStart: Logger.log,
  runStartTimestamp: 0,
  runElapsedTimeMs: 10,
  serializedEditorState: null,
  mode: "edit",
  appClosed: false,
  showDeleteButton: true,
  allowFocus: false,
  createNewCell: Logger.log,
  deleteCell: Logger.log,
  focusCell: Logger.log,
  moveCell: Logger.log,
  moveToNextCell: Logger.log,
  config: {},
  userConfig: {
    completion: {
      activate_on_typing: true,
      copilot: false,
    },
    save: {
      autosave: "off",
      autosave_delay: 1000,
      format_on_save: false,
    },
    display: {
      theme: "light",
    },
    runtime: {
      auto_instantiate: true,
    },
    keymap: {
      preset: "default",
    },
    experimental: {},
  },
};

export const Primary: Story = {
  render: () => (
    <div className="p-20 max-w-4xl">
      <TooltipProvider>
        <Cell {...props} />
      </TooltipProvider>
    </div>
  ),
};

export const WithOutput: Story = {
  render: () => (
    <div className="p-20 max-w-4xl">
      <TooltipProvider>
        <Cell
          {...props}
          runElapsedTimeMs={20}
          output={{
            channel: "output",
            data: "<span class='markdown'><h1>Layout</h1>\n<p><code>marimo</code> provides functions to help you lay out your output, such as\nin rows and columns, accordions, tabs, and callouts. This tutorial\nshows some examples.</p></span>",
            mimetype: "text/html",
            timestamp: 1_686_863_688,
          }}
        />
      </TooltipProvider>
    </div>
  ),
};

export const UnsavedEditsOutput: Story = {
  render: () => (
    <div className="p-20 max-w-4xl">
      <TooltipProvider>
        <Cell
          {...props}
          runElapsedTimeMs={20}
          edited={true}
          output={{
            channel: "output",
            data: "<span class='markdown'><h1>Layout</h1>\n<p><code>marimo</code> provides functions to help you lay out your output, such as\nin rows and columns, accordions, tabs, and callouts. This tutorial\nshows some examples.</p></span>",
            mimetype: "text/html",
            timestamp: 1_686_863_688,
          }}
        />
      </TooltipProvider>
    </div>
  ),
};

export const InterruptedOutput: Story = {
  render: () => (
    <div className="p-20 max-w-4xl">
      <TooltipProvider>
        <Cell
          {...props}
          runElapsedTimeMs={20}
          interrupted={true}
          output={{
            channel: "output",
            data: "<span class='markdown'><h1>Layout</h1>\n<p><code>marimo</code> provides functions to help you lay out your output, such as\nin rows and columns, accordions, tabs, and callouts. This tutorial\nshows some examples.</p></span>",
            mimetype: "text/html",
            timestamp: 1_686_863_688,
          }}
        />
      </TooltipProvider>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="p-20 max-w-4xl">
      <TooltipProvider>
        <Cell
          {...props}
          runElapsedTimeMs={20}
          errored={true}
          output={{
            channel: "output",
            data: "<span class='markdown'><h1>Layout</h1>\n<p><code>marimo</code> provides functions to help you lay out your output, such as\nin rows and columns, accordions, tabs, and callouts. This tutorial\nshows some examples.</p></span>",
            mimetype: "text/html",
            timestamp: 1_686_863_688,
          }}
        />
      </TooltipProvider>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="p-20 max-w-4xl">
      <TooltipProvider>
        <Cell
          {...props}
          runElapsedTimeMs={20}
          config={{
            disabled: true,
          }}
          output={{
            channel: "output",
            data: "<span class='markdown'><h1>Layout</h1>\n<p><code>marimo</code> provides functions to help you lay out your output, such as\nin rows and columns, accordions, tabs, and callouts. This tutorial\nshows some examples.</p></span>",
            mimetype: "text/html",
            timestamp: 1_686_863_688,
          }}
        />
      </TooltipProvider>
    </div>
  ),
};

export const DisabledTransitively: Story = {
  render: () => (
    <div className="p-20 max-w-4xl">
      <TooltipProvider>
        <Cell
          {...props}
          runElapsedTimeMs={20}
          status="disabled-transitively"
          output={{
            channel: "output",
            data: "This data is stale because a parent is disabled",
            mimetype: "text/html",
            timestamp: 1_686_863_688,
          }}
        />
      </TooltipProvider>
    </div>
  ),
};

export const StaleStatus: Story = {
  render: () => (
    <div className="p-20 max-w-4xl">
      <TooltipProvider>
        <Cell
          {...props}
          runElapsedTimeMs={20}
          status="stale"
          output={{
            channel: "output",
            data: "This data is stale because a parent is disabled",
            mimetype: "text/html",
            timestamp: 1_686_863_688,
          }}
        />
      </TooltipProvider>
    </div>
  ),
};

export const StaleAndEditedStatus: Story = {
  render: () => (
    <div className="p-20 max-w-4xl">
      <TooltipProvider>
        <Cell
          {...props}
          runElapsedTimeMs={20}
          status="stale"
          output={{
            channel: "output",
            data: "This data is stale because a parent is disabled, but this cell has been edited since.",
            mimetype: "text/html",
            timestamp: 1_686_863_688,
          }}
        />
      </TooltipProvider>
    </div>
  ),
};

export const DisabledAndStaleStatus: Story = {
  render: () => (
    <div className="p-20 max-w-4xl">
      <TooltipProvider>
        <Cell
          {...props}
          runElapsedTimeMs={20}
          config={{
            disabled: true,
          }}
          status="stale"
          output={{
            channel: "output",
            data: "<span class='markdown'><h1>Layout</h1>\n<p><code>marimo</code> provides functions to help you lay out your output, such as\nin rows and columns, accordions, tabs, and callouts. This tutorial\nshows some examples.</p></span>",
            mimetype: "text/html",
            timestamp: 1_686_863_688,
          }}
        />
      </TooltipProvider>
    </div>
  ),
};

export const Running: Story = {
  render: () => (
    <div className="p-20 max-w-4xl">
      <TooltipProvider>
        <Cell
          {...props}
          runElapsedTimeMs={20}
          status="running"
          output={{
            channel: "output",
            data: "<span class='markdown'><h1>Layout</h1>\n<p><code>marimo</code> provides functions to help you lay out your output, such as\nin rows and columns, accordions, tabs, and callouts. This tutorial\nshows some examples.</p></span>",
            mimetype: "text/html",
            timestamp: 1_686_863_688,
          }}
        />
      </TooltipProvider>
    </div>
  ),
};
