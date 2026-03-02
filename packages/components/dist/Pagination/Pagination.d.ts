import React from 'react';
import './Pagination.scss';
export interface PaginationProps {
    current?: number;
    total: number;
    pageSize?: number;
    onChange?: (page: number, pageSize: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
    showSizeChanger?: boolean;
    pageSizeOptions?: number[];
    showTotal?: boolean;
    showPrevNext?: boolean;
    className?: string;
    disabled?: boolean;
}
export declare const Pagination: React.FC<PaginationProps>;
export default Pagination;
//# sourceMappingURL=Pagination.d.ts.map