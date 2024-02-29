// @ts-nocheck
declare global {
  interface TagView {
    fullPath: string;
    path: string;
    name: string;
    title: string;
    affix?: boolean;
  }
}

export {}; // export {} 的主要目的是确保 .d.ts 文件被视为一个模块，而不是全局脚本，从而避免意外地将声明加入到全局命名空间。
