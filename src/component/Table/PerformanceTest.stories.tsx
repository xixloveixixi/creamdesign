/**
 * Table 组件性能测试 Story
 * 用于测量虚拟滚动的性能数据
 */

import React, { useState, useEffect, useRef } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Table, { TableProps } from './TableContainer';
import Button from '../Button';
import { ButtonSize, ButtonType } from '../Button/Button';

const meta: Meta<typeof Table> = {
  title: 'Table组件/性能测试',
  component: Table,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
  email: string;
  phone: string;
  department: string;
}

// 生成测试数据
function generateData(count: number): DataType[] {
  return Array.from({ length: count }, (_, i) => ({
    key: String(i + 1),
    name: `用户 ${i + 1}`,
    age: 20 + (i % 30),
    address: `地址 ${i + 1} 号，这是一个比较长的地址信息用于测试响应式布局和性能表现`,
    tags: i % 2 === 0 ? ['nice', 'developer'] : ['cool', 'teacher'],
    email: `user${i + 1}@example.com`,
    phone: `138${String(i).padStart(8, '0')}`,
    department: ['技术部', '产品部', '运营部', '市场部'][i % 4],
  }));
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 120,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
    width: 300,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    width: 200,
  },
  {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
    width: 150,
  },
  {
    title: '部门',
    dataIndex: 'department',
    key: 'department',
    width: 120,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    width: 150,
    render: (tags: string[]) => tags.join(', '),
  },
];

// 性能测量工具
interface PerformanceMetrics {
  initialRenderTime: number; // 初始渲染时间 (ms)
  domNodes: number; // DOM 节点数量
  renderedRows: number; // 实际渲染的行数（tr）
  totalRows: number; // 总数据行数
  memoryUsage?: number; // 内存使用 (MB)
  scrollFPS: number; // 滚动帧率
}

function measurePerformance(
  containerRef: React.RefObject<HTMLDivElement | null>,
  dataLength: number,
  useVirtual: boolean
): Promise<PerformanceMetrics> {
  return new Promise(resolve => {
    // 清理之前的测量
    if (performance.getEntriesByName('table-render-start').length > 0) {
      performance.clearMarks('table-render-start');
      performance.clearMarks('table-render-end');
      performance.clearMeasures('table-render');
    }

    // 标记开始
    performance.mark('table-render-start');

    // 等待下一帧开始测量
    requestAnimationFrame(() => {
      const startTime = performance.now();

      // 等待渲染完成
      setTimeout(() => {
        const endTime = performance.now();
        const renderTime = endTime - startTime;

        // 计算 DOM 节点数和实际渲染的行数
        let domNodes = 0;
        let renderedRows = 0;
        if (containerRef.current) {
          const table = containerRef.current.querySelector('table');
          if (table) {
            if (useVirtual) {
              // 虚拟滚动：只计算实际渲染的数据行（嵌套table内的tbody）
              const virtualTable = containerRef.current.querySelector(
                '.cream-table-virtual-container table'
              );
              if (virtualTable) {
                const virtualTbody = virtualTable.querySelector('tbody');
                if (virtualTbody) {
                  // 计算实际渲染的行数（tr）
                  const rows = virtualTbody.querySelectorAll('tr');
                  renderedRows = rows.length;
                  // 只计算数据行（tr）及其子节点的DOM节点数
                  domNodes = virtualTbody.querySelectorAll('*').length;
                }
              }
            } else {
              // 普通渲染：只计算 tbody 内的数据行
              const tbody = table.querySelector('tbody');
              if (tbody) {
                // 计算实际渲染的行数（tr）
                const rows = tbody.querySelectorAll('tr');
                renderedRows = rows.length;
                // 只计算数据行（tr）及其子节点的DOM节点数
                domNodes = tbody.querySelectorAll('*').length;
              }
            }
          }
        }

        // 获取内存使用（如果可用）
        let memoryUsage: number | undefined;
        if ('memory' in performance) {
          const perfMemory = (performance as any).memory;
          if (perfMemory && perfMemory.usedJSHeapSize) {
            memoryUsage = parseFloat(
              (perfMemory.usedJSHeapSize / 1024 / 1024).toFixed(2)
            );
          }
        }

        // 标记结束
        performance.mark('table-render-end');
        performance.measure(
          'table-render',
          'table-render-start',
          'table-render-end'
        );

        resolve({
          initialRenderTime: Math.round(renderTime * 100) / 100,
          domNodes,
          renderedRows,
          totalRows: dataLength,
          memoryUsage: memoryUsage
            ? parseFloat(memoryUsage.toString())
            : undefined,
          scrollFPS: 0, // 滚动 FPS 需要单独测量
        });
      }, 100); // 给足够的时间让 React 完成渲染
    });
  });
}

// 测量滚动性能
function measureScrollPerformance(
  containerRef: React.RefObject<HTMLDivElement | null>
): Promise<number> {
  return new Promise(resolve => {
    if (!containerRef.current) {
      resolve(0);
      return;
    }

    const virtualContainer = containerRef.current.querySelector(
      '.cream-table-virtual-container'
    ) as HTMLElement;

    if (!virtualContainer) {
      resolve(0);
      return;
    }

    let frameCount = 0;
    let startTime = performance.now();
    const duration = 1000; // 测量 1 秒

    function onScroll() {
      frameCount++;
      const currentTime = performance.now();
      if (currentTime - startTime >= duration) {
        const fps = Math.round((frameCount / duration) * 1000);
        resolve(fps);
        virtualContainer.removeEventListener('scroll', onScroll);
      }
    }

    virtualContainer.addEventListener('scroll', onScroll);

    // 触发滚动
    let scrollTop = 0;
    const scrollInterval = setInterval(() => {
      scrollTop += 10;
      virtualContainer.scrollTop = scrollTop;
      if (
        scrollTop >=
        virtualContainer.scrollHeight - virtualContainer.clientHeight
      ) {
        clearInterval(scrollInterval);
      }
    }, 16); // 约 60fps

    // 超时保护
    setTimeout(() => {
      clearInterval(scrollInterval);
      const fps = Math.round((frameCount / duration) * 1000);
      resolve(fps);
      virtualContainer.removeEventListener('scroll', onScroll);
    }, duration + 100);
  });
}

// 批量测试结果
interface BatchTestResult {
  dataCount: number;
  withVirtual: PerformanceMetrics;
  withoutVirtual: PerformanceMetrics;
  improvement: {
    renderTime: number; // 渲染时间提升百分比
    domNodes: number; // DOM节点减少百分比
    memory: number; // 内存减少百分比
  };
}

// 性能测试组件
function PerformanceTestComponent() {
  const [dataCount, setDataCount] = useState(1000);
  const [useVirtual, setUseVirtual] = useState(true);
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // 批量测试相关
  const [batchResults, setBatchResults] = useState<BatchTestResult[]>([]);
  const [isBatchTesting, setIsBatchTesting] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 });

  // 生成数据
  useEffect(() => {
    setData(generateData(dataCount));
  }, [dataCount]);

  // 测量性能
  const handleMeasure = async () => {
    setIsMeasuring(true);
    setMetrics(null);

    // 等待数据更新
    await new Promise(resolve => setTimeout(resolve, 100));

    // 测量初始渲染
    const renderMetrics = await measurePerformance(
      containerRef,
      dataCount,
      useVirtual
    );

    // 如果启用虚拟滚动，测量滚动性能
    let scrollFPS = 0;
    if (useVirtual) {
      scrollFPS = await measureScrollPerformance(containerRef);
    }

    setMetrics({
      ...renderMetrics,
      scrollFPS,
    });
    setIsMeasuring(false);
  };

  // 批量测试
  const handleBatchTest = async () => {
    setIsBatchTesting(true);
    setBatchResults([]);

    const testDataCounts = [100, 500, 1000, 5000, 10000, 50000];
    const results: BatchTestResult[] = [];

    setBatchProgress({ current: 0, total: testDataCounts.length * 2 });

    for (const count of testDataCounts) {
      // 测试关闭虚拟滚动
      setDataCount(count);
      setUseVirtual(false);
      setData(generateData(count));
      await new Promise(resolve => setTimeout(resolve, 200));

      const withoutVirtual = await measurePerformance(
        containerRef,
        count,
        false
      );
      setBatchProgress(prev => ({ ...prev, current: prev.current + 1 }));

      // 测试开启虚拟滚动
      setUseVirtual(true);
      await new Promise(resolve => setTimeout(resolve, 200));

      const withVirtualMetrics = await measurePerformance(
        containerRef,
        count,
        true
      );

      const scrollFPS = await measureScrollPerformance(containerRef);
      const withVirtual = {
        ...withVirtualMetrics,
        scrollFPS,
      };

      setBatchProgress(prev => ({ ...prev, current: prev.current + 1 }));

      // 计算优化效果
      const improvement = {
        renderTime:
          withoutVirtual.initialRenderTime > 0
            ? Math.round(
                ((withoutVirtual.initialRenderTime -
                  withVirtual.initialRenderTime) /
                  withoutVirtual.initialRenderTime) *
                  100
              )
            : 0,
        domNodes:
          withoutVirtual.domNodes > 0
            ? Math.round(
                ((withoutVirtual.domNodes - withVirtual.domNodes) /
                  withoutVirtual.domNodes) *
                  100
              )
            : 0,
        memory:
          withoutVirtual.memoryUsage && withVirtual.memoryUsage
            ? Math.round(
                ((withoutVirtual.memoryUsage - withVirtual.memoryUsage) /
                  withoutVirtual.memoryUsage) *
                  100
              )
            : 0,
      };

      results.push({
        dataCount: count,
        withVirtual,
        withoutVirtual,
        improvement,
      });

      setBatchResults([...results]);
    }

    setIsBatchTesting(false);
    setBatchProgress({ current: 0, total: 0 });
  };

  return (
    <div
      style={{
        padding: '20px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          marginBottom: '20px',
          padding: '16px',
          background: '#f5f5f5',
          borderRadius: '8px',
        }}
      >
        <h2 style={{ marginTop: 0 }}>Table 虚拟滚动性能测试</h2>

        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '16px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <label style={{ marginRight: '8px' }}>数据量:</label>
            <select
              value={dataCount}
              onChange={e => setDataCount(Number(e.target.value))}
              style={{ padding: '4px 8px' }}
            >
              <option value={100}>100 条</option>
              <option value={500}>500 条</option>
              <option value={1000}>1,000 条</option>
              <option value={5000}>5,000 条</option>
              <option value={10000}>10,000 条</option>
              <option value={50000}>50,000 条</option>
            </select>
          </div>

          <div>
            <label style={{ marginRight: '8px' }}>
              <input
                type="checkbox"
                checked={useVirtual}
                onChange={e => setUseVirtual(e.target.checked)}
                style={{ marginRight: '4px' }}
              />
              启用虚拟滚动
            </label>
          </div>

          <Button
            btnType={ButtonType.Primary}
            size={ButtonSize.Normal}
            onClick={handleMeasure}
            disabled={isMeasuring || isBatchTesting}
          >
            {isMeasuring ? '测量中...' : '开始测量'}
          </Button>

          <Button
            btnType={ButtonType.Secondary}
            size={ButtonSize.Normal}
            onClick={handleBatchTest}
            disabled={isMeasuring || isBatchTesting}
          >
            {isBatchTesting
              ? `批量测试中... (${batchProgress.current}/${batchProgress.total})`
              : '批量测试（对比）'}
          </Button>
        </div>

        {metrics && (
          <div
            style={{
              padding: '12px',
              background: '#fff',
              borderRadius: '4px',
              border: '1px solid #ddd',
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: '12px' }}>性能指标:</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
              }}
            >
              <div>
                <strong>初始渲染时间:</strong>
                <div
                  style={{
                    fontSize: '24px',
                    color: '#1890ff',
                    fontWeight: 'bold',
                  }}
                >
                  {metrics.initialRenderTime} ms
                </div>
              </div>
              <div>
                <strong>DOM 节点数:</strong>
                <div
                  style={{
                    fontSize: '24px',
                    color: '#52c41a',
                    fontWeight: 'bold',
                  }}
                >
                  {metrics.domNodes.toLocaleString()}
                </div>
                <div style={{ fontSize: '12px', color: '#999' }}>
                  {useVirtual
                    ? `(渲染 ${metrics.renderedRows} 行，总数据: ${metrics.totalRows.toLocaleString()} 行)`
                    : `(渲染 ${metrics.renderedRows} 行，全部渲染)`}
                </div>
              </div>
              {metrics.memoryUsage && (
                <div>
                  <strong>内存使用:</strong>
                  <div
                    style={{
                      fontSize: '24px',
                      color: '#722ed1',
                      fontWeight: 'bold',
                    }}
                  >
                    {metrics.memoryUsage} MB
                  </div>
                </div>
              )}
              {useVirtual && metrics.scrollFPS > 0 && (
                <div>
                  <strong>滚动帧率:</strong>
                  <div
                    style={{
                      fontSize: '24px',
                      color: '#fa8c16',
                      fontWeight: 'bold',
                    }}
                  >
                    {metrics.scrollFPS} FPS
                  </div>
                </div>
              )}
            </div>

            {useVirtual && (
              <div
                style={{
                  marginTop: '12px',
                  padding: '8px',
                  background: '#e6f7ff',
                  borderRadius: '4px',
                }}
              >
                <strong>优化效果:</strong>
                <div style={{ fontSize: '14px', marginTop: '4px' }}>
                  • 仅渲染 {metrics.domNodes} 个 DOM 节点，而非 {dataCount} 个
                  <br />• 内存占用降低约{' '}
                  {metrics.domNodes > 0
                    ? Math.round(
                        ((dataCount - metrics.domNodes) / dataCount) * 100
                      )
                    : 0}
                  %
                </div>
              </div>
            )}
          </div>
        )}

        {/* 批量测试结果 */}
        {batchResults.length > 0 && (
          <div
            style={{
              marginTop: '20px',
              padding: '16px',
              background: '#fff',
              borderRadius: '4px',
              border: '1px solid #ddd',
              maxHeight: '400px',
              overflow: 'auto',
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: '12px' }}>
              批量测试结果对比
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '12px',
                }}
              >
                <thead>
                  <tr style={{ background: '#f5f5f5' }}>
                    <th
                      style={{
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'left',
                      }}
                    >
                      数据量
                    </th>
                    <th
                      style={{
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center',
                      }}
                    >
                      渲染时间 (ms)
                    </th>
                    <th
                      style={{
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center',
                      }}
                    >
                      DOM 节点数 / 渲染行数
                    </th>
                    <th
                      style={{
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center',
                      }}
                    >
                      内存 (MB)
                    </th>
                    <th
                      style={{
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center',
                      }}
                    >
                      优化效果
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {batchResults.map((result, index) => (
                    <React.Fragment key={index}>
                      <tr style={{ background: '#fff5f5' }}>
                        <td
                          style={{
                            padding: '8px',
                            border: '1px solid #ddd',
                            fontWeight: 'bold',
                          }}
                          rowSpan={2}
                        >
                          {result.dataCount.toLocaleString()}
                        </td>
                        <td
                          style={{ padding: '8px', border: '1px solid #ddd' }}
                        >
                          普通:{' '}
                          {result.withoutVirtual.initialRenderTime.toFixed(2)}
                        </td>
                        <td
                          style={{ padding: '8px', border: '1px solid #ddd' }}
                        >
                          {result.withoutVirtual.domNodes.toLocaleString()} /{' '}
                          {result.withoutVirtual.renderedRows}
                        </td>
                        <td
                          style={{ padding: '8px', border: '1px solid #ddd' }}
                        >
                          {result.withoutVirtual.memoryUsage?.toFixed(2) ||
                            'N/A'}
                        </td>
                        <td
                          style={{ padding: '8px', border: '1px solid #ddd' }}
                        >
                          -
                        </td>
                      </tr>
                      <tr style={{ background: '#f6ffed' }}>
                        <td
                          style={{ padding: '8px', border: '1px solid #ddd' }}
                        >
                          虚拟:{' '}
                          {result.withVirtual.initialRenderTime.toFixed(2)}
                          {result.improvement.renderTime > 0 && (
                            <span
                              style={{ color: '#52c41a', marginLeft: '4px' }}
                            >
                              ↓{result.improvement.renderTime}%
                            </span>
                          )}
                        </td>
                        <td
                          style={{ padding: '8px', border: '1px solid #ddd' }}
                        >
                          {result.withVirtual.domNodes.toLocaleString()} /{' '}
                          {result.withVirtual.renderedRows}
                          {result.improvement.domNodes > 0 && (
                            <span
                              style={{ color: '#52c41a', marginLeft: '4px' }}
                            >
                              ↓{result.improvement.domNodes}%
                            </span>
                          )}
                          {result.withVirtual.renderedRows <
                            result.withoutVirtual.renderedRows && (
                            <div
                              style={{
                                fontSize: '11px',
                                color: '#52c41a',
                                marginTop: '2px',
                              }}
                            >
                              行数减少:{' '}
                              {result.withoutVirtual.renderedRows -
                                result.withVirtual.renderedRows}
                            </div>
                          )}
                        </td>
                        <td
                          style={{ padding: '8px', border: '1px solid #ddd' }}
                        >
                          {result.withVirtual.memoryUsage?.toFixed(2) || 'N/A'}
                          {result.improvement.memory > 0 && (
                            <span
                              style={{ color: '#52c41a', marginLeft: '4px' }}
                            >
                              ↓{result.improvement.memory}%
                            </span>
                          )}
                        </td>
                        <td
                          style={{ padding: '8px', border: '1px solid #ddd' }}
                        >
                          <div style={{ fontSize: '11px' }}>
                            {result.withVirtual.scrollFPS > 0 && (
                              <div>FPS: {result.withVirtual.scrollFPS}</div>
                            )}
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
              <strong>说明：</strong>
              <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
                <li>红色行：普通渲染（全部渲染）</li>
                <li>绿色行：虚拟滚动（仅渲染可见区域）</li>
                <li>优化效果百分比：相对于普通渲染的提升</li>
              </ul>
            </div>
            <div style={{ marginTop: '12px' }}>
              <Button
                btnType={ButtonType.Secondary}
                size={ButtonSize.Small}
                onClick={() => {
                  const report = batchResults
                    .map(
                      r =>
                        `${r.dataCount}条: 渲染时间 ${r.improvement.renderTime}%↓, DOM节点 ${r.improvement.domNodes}%↓, 内存 ${r.improvement.memory}%↓`
                    )
                    .join('\n');
                  console.log('批量测试报告:\n' + report);
                  navigator.clipboard.writeText(report);
                  alert('测试报告已复制到剪贴板！');
                }}
              >
                复制测试报告
              </Button>
            </div>
          </div>
        )}

        <div style={{ marginTop: '12px', fontSize: '12px', color: '#999' }}>
          <strong>测试说明:</strong>
          <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
            <li>初始渲染时间：从组件挂载到首次渲染完成的时间</li>
            <li>DOM 节点数：实际渲染的 DOM 元素数量</li>
            <li>内存使用：JavaScript 堆内存使用量（Chrome 浏览器）</li>
            <li>滚动帧率：滚动时的平均帧率（仅虚拟滚动）</li>
            <li>
              <strong>批量测试</strong>
              ：自动测试多个数据量，对比虚拟滚动与普通渲染的性能差异
            </li>
          </ul>
        </div>
      </div>

      <div ref={containerRef} style={{ flex: 1, overflow: 'auto' }}>
        <Table
          columns={columns}
          dataSource={data}
          virtual={
            useVirtual
              ? { enabled: true, rowHeight: 50, containerHeight: 600 }
              : false
          }
          pagination={false}
        />
      </div>
    </div>
  );
}

export const PerformanceTest: Story = {
  render: () => <PerformanceTestComponent />,
};
