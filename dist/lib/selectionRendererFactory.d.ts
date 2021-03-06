// Type definitions for ag-grid v4.1.3
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ceolter/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
import { RowNode } from "./entities/rowNode";
export declare class SelectionRendererFactory {
    createSelectionCheckbox(rowNode: RowNode, addRenderedRowEventListener: Function): HTMLInputElement;
}
