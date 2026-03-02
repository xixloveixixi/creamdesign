export interface UseVirtualScrollOptions<T> {
    data: T[];
    estimateSize: number;
    containerHeight: number;
    overscan?: number;
    onScroll?: (scrollTop: number) => void;
}
export interface UseVirtualScrollReturn<T> {
    virtualItems: T[];
    totalHeight: number;
    startOffset: number;
    containerRef: React.RefObject<HTMLDivElement | null>;
    scrollTop: number;
    setScrollTop: (top: number) => void;
    measureElement: (node: HTMLDivElement | null, index: number) => void;
    startIndex: number;
    endIndex: number;
    handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}
export declare function useVirtualScroll<T>({ data, estimateSize, containerHeight, overscan, onScroll, }: UseVirtualScrollOptions<T>): UseVirtualScrollReturn<T>;
//# sourceMappingURL=useVirtualScroll.d.ts.map