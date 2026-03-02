import { ReactNode } from 'react';
import './Table.scss';
export interface ColumnType<T = any> {
    key: string;
    title: string | ReactNode;
    dataIndex?: string | string[];
    width?: number;
    render?: (value: any, record: T, index: number) => ReactNode;
    align?: 'left' | 'center' | 'right';
    fixed?: 'left' | 'right';
}
export interface PaginationConfig {
    current?: number;
    defaultCurrent?: number;
    pageSize?: number;
    defaultPageSize?: number;
    total?: number;
    showSizeChanger?: boolean;
    showTotal?: boolean;
    onChange?: (page: number, pageSize: number) => void;
    onShowSizeChange?: (current: number, size: number) => void;
}
export interface VirtualScrollConfig {
    enabled?: boolean;
    rowHeight?: number;
    containerHeight?: number;
    overscan?: number;
}
export interface RowSelectionConfig<T = any> {
    type?: 'checkbox' | 'radio';
    selectedRowKeys?: (string | number)[];
    defaultSelectedRowKeys?: (string | number)[];
    onChange?: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void;
    onSelect?: (record: T, selected: boolean, selectedRows: T[]) => void;
    onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
    getCheckboxProps?: (record: T) => {
        disabled?: boolean;
    };
    hideSelectAll?: boolean;
    fixed?: boolean;
    columnWidth?: number;
    columnTitle?: ReactNode;
}
export interface TableContextType<T = any> {
    columns: ColumnType<T>[];
    tableData: T[];
    setTableData?: (data: T[]) => void;
    total: number;
    paginatedData: T[];
    setPaginatedData?: (data: T[]) => void;
    pagination?: PaginationConfig | false | true;
    virtual?: VirtualScrollConfig | boolean;
    virtualItems?: T[];
    totalHeight?: number;
    startOffset?: number;
    measureRowElement?: (node: HTMLDivElement | null, index: number) => void;
    containerRef?: React.RefObject<HTMLDivElement | null>;
    handleScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
    rowSelection?: RowSelectionConfig<T>;
    selectedRowKeys?: (string | number)[];
    setSelectedRowKeys?: (keys: (string | number)[]) => void;
    isRowSelected?: (record: T) => boolean;
    toggleRowSelection?: (record: T, selected?: boolean) => void;
    toggleAllRowsSelection?: (selected?: boolean) => void;
    isAllRowsSelected?: () => boolean;
    isSomeRowsSelected?: () => boolean;
}
export declare const TableContext: import("react").Context<TableContextType<any> | undefined>;
export interface TableProps<T = any> {
    columns: ColumnType<T>[];
    dataSource?: T[];
    pagination?: PaginationConfig | false | true;
    virtual?: VirtualScrollConfig | boolean;
    rowSelection?: RowSelectionConfig<T>;
}
declare const TableContainer: <T extends Record<string, any> = any>(props: TableProps<T>) => import("react/jsx-runtime").JSX.Element;
export default TableContainer;
//# sourceMappingURL=TableContainer.d.ts.map