/* Copyright 2023 Marimo. All rights reserved. */
import { RuntimeState } from "@/core/RuntimeState";
import { CellId } from "@/core/cells/ids";
import { sendRun } from "@/core/network/requests";
import { staleCellIds, useNotebook } from "@/core/cells/cells";
import { derefNotNull } from "@/utils/dereference";
import useEvent from "react-use-event-hook";

/**
 * Creates a function that runs all cells that have been edited or interrupted.
 */
export function useRunStaleCells() {
  const notebook = useNotebook();
  const runCells = useRunCells();
  const runStaleCells = useEvent(() => runCells(staleCellIds(notebook)));
  return runStaleCells;
}

/**
 * Creates a function that runs the cell with the given id.
 */
export function useRunCell(cellId: CellId) {
  const runCells = useRunCells();
  const runCell = useEvent(() => runCells([cellId]));
  return runCell;
}

/**
 * Creates a function that runs the given cells.
 */
function useRunCells() {
  const notebook = useNotebook();

  const runCells = useEvent(async (cellIds: CellId[]) => {
    if (cellIds.length === 0) {
      return;
    }

    const { cellHandles } = notebook;

    const codes: string[] = [];
    for (const cellId of cellIds) {
      const ref = derefNotNull(cellHandles[cellId]);
      codes.push(ref.editorView.state.doc.toString());
      ref.registerRun();
    }

    RuntimeState.INSTANCE.registerRunStart();
    await sendRun(cellIds, codes);
  });

  return runCells;
}
