import { Key } from "react";
/**
 * 根据 key 和 dataIndex 生成唯一 id
 *
 * @param key 用户设置的 key
 * @param dataIndex 在对象中的数据
 * @param index 序列号，理论上唯一
 */
export const genColumnKey = (key?: Key, index?: number | string): string => {
  if (key) {
    return Array.isArray(key) ? key.join("-") : key.toString();
  }
  return `${index}`;
};

/** 如果是个方法执行一下它 */
export function runFunction<T extends any[]>(valueEnum: any, ...rest: T) {
  if (typeof valueEnum === "function") {
    return valueEnum(...rest);
  }
  return valueEnum;
}
