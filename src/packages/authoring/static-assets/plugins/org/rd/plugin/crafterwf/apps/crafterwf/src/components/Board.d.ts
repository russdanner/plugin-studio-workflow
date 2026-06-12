export interface BoardProps {
    /** Widget config may still pass boardId; treated as workflowId */
    boardId?: string;
    workflowId?: string;
    /** When set, opens the package card details after the board loads */
    openPackageId?: string;
}
declare const Board: ({ boardId, workflowId: workflowIdProp, openPackageId: initialOpenPackageId }: BoardProps) => JSX.Element;
export default Board;
