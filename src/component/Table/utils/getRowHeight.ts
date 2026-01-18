/**
 * 获取表格行高的工具函数
 * 支持多种方式：
 * 1. 从配置中获取（优先级最高）
 * 2. 从 CSS 变量或计算样式中获取
 * 3. 动态测量（首次渲染后）
 */

export interface RowHeightOptions {
  // 用户配置的固定行高（优先级最高）
  itemHeight?: number;
  // 是否允许动态测量
  enableDynamicMeasure?: boolean;
  // 测量用的表格元素 ref
  tableRef?: React.RefObject<HTMLTableElement | null>;
  // 测量用的 tbody ref
  tbodyRef?: React.RefObject<HTMLTableSectionElement | null>;
}

/**
 * 从 CSS 计算样式中估算行高
 * 基于 padding + line-height + border
 */
export function estimateRowHeightFromCSS(): number {
  if (typeof window === 'undefined') {
    return 50; // 默认值
  }

  try {
    // 创建一个临时的 td 元素来测量
    const tempTd = document.createElement('td');
    tempTd.style.visibility = 'hidden';
    tempTd.style.position = 'absolute';
    tempTd.style.padding = '0.875rem 1rem'; // 从 tableStyle.scss 中获取
    tempTd.style.lineHeight = '1.5'; // 默认 line-height
    tempTd.style.fontSize = '14px'; // 默认 font-size
    tempTd.textContent = '测量文本';

    document.body.appendChild(tempTd);
    const computedStyle = window.getComputedStyle(tempTd);

    // 获取实际高度
    const height = tempTd.offsetHeight;

    document.body.removeChild(tempTd);

    return height || 50; // 如果测量失败，返回默认值
  } catch (error) {
    console.warn('无法从 CSS 估算行高，使用默认值 50px', error);
    return 50;
  }
}

/**
 * 动态测量表格行的实际高度
 * 需要表格已经渲染至少一行
 */
export function measureRowHeight(
  tableRef?: React.RefObject<HTMLTableElement | null>,
  tbodyRef?: React.RefObject<HTMLTableSectionElement | null>
): number | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    // 优先使用 tbody 中的第一行
    if (tbodyRef?.current) {
      const firstRow = tbodyRef.current.querySelector(
        'tr'
      ) as HTMLElement | null;
      if (firstRow) {
        return firstRow.offsetHeight;
      }
    }

    // 其次使用 table 中的第一行
    if (tableRef?.current) {
      const firstRow = tableRef.current.querySelector(
        'tbody tr'
      ) as HTMLElement | null;
      if (firstRow) {
        return firstRow.offsetHeight;
      }
    }

    // 尝试从 DOM 中查找
    const table = document.querySelector('.cream-table');
    if (table) {
      const firstRow = table.querySelector('tbody tr') as HTMLElement | null;
      if (firstRow) {
        return firstRow.offsetHeight;
      }
    }

    return null;
  } catch (error) {
    console.warn('动态测量行高失败', error);
    return null;
  }
}

/**
 * 获取行高的主函数
 * 按优先级：配置 > 动态测量 > CSS 估算 > 默认值
 */
export function getRowHeight(options: RowHeightOptions = {}): number {
  const {
    itemHeight,
    enableDynamicMeasure = true,
    tableRef,
    tbodyRef,
  } = options;

  // 1. 如果用户配置了固定高度，直接使用
  if (itemHeight && itemHeight > 0) {
    return itemHeight;
  }

  // 2. 尝试动态测量（如果允许且表格已渲染）
  if (enableDynamicMeasure) {
    const measuredHeight = measureRowHeight(tableRef, tbodyRef);
    if (measuredHeight && measuredHeight > 0) {
      return measuredHeight;
    }
  }

  // 3. 从 CSS 估算
  const estimatedHeight = estimateRowHeightFromCSS();
  if (estimatedHeight > 0) {
    return estimatedHeight;
  }

  // 4. 默认值
  return 50;
}
