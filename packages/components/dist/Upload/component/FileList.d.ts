import { FileItem } from '../Upload';
import './FileList.scss';
interface FileListProps {
    fileList: FileItem[];
    onRemoved?: (file: FileItem) => void;
    onToggleStatus?: (file: FileItem) => void;
}
export declare const FileList: ({ fileList, onRemoved, onToggleStatus, }: FileListProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FileList.d.ts.map