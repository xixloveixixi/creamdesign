import { UploadAdapter } from './types';
interface DefaultAdapterConfig {
    action: string;
    /** 秒传检查接口 URL（可选） */
    checkUrl?: string;
    initUrl?: string;
    chunkUrl?: string;
    mergeUrl?: string;
    headers?: Record<string, string>;
    data?: Record<string, any>;
    withCredentials?: boolean;
    name?: string;
}
/**
 * 创建默认适配器
 * 基于标准的后端接口规范
 */
export declare const createDefaultAdapter: (config: DefaultAdapterConfig) => UploadAdapter;
export {};
//# sourceMappingURL=adapter.d.ts.map