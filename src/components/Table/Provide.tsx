import { createContext, useEffect, useMemo, useRef, useState } from "react";
import type {
  ProTableProps,
  UseContainerProps,
  ColumnsState,
  ProColumns,
  CustomRecordType,
} from "./data";
import { genColumnKey } from "@/utils/help";

function useContainer(props: UseContainerProps<CustomRecordType>) {
  const rootDomRef = useRef<HTMLDivElement>(null);
  const prefixNameRef = useRef<any>();
  const propsRef = useRef<ProTableProps<CustomRecordType>>();
  // 用于排序的数组
  const sortKeyColumns = useRef<string[]>();
  const [defaultSortKeys, setDefaultSortKeys] = useState<any[]>([]);

  /** 默认全选中 */
  const defaultColumnKeyMap = useMemo(() => {
    const columnKeyMap = {} as Record<string, any>;
    const defaultSortKeys: any[] = [];
    props.columns?.forEach(({ key, dataIndex, fixed, disable }, index) => {
      const columnKey = genColumnKey(key ?? (dataIndex as React.Key), index);
      if (columnKey) {
        columnKeyMap[columnKey] = {
          show: true,
          fixed,
          disable,
          order: index,
        };
        defaultSortKeys.push(columnKey);
      }
    });
    setDefaultSortKeys(defaultSortKeys);
    return columnKeyMap;
  }, [props.columns]);

  const [columnsMap, setColumnsMap] =
    useState<Record<string, ColumnsState>>(defaultColumnKeyMap);

  /**  配置或列更改时对columnsMap重新赋值 */
  useEffect(() => setColumnsMap(defaultColumnKeyMap), [defaultColumnKeyMap]);

  const renderValue = {
    sortKeyColumns: sortKeyColumns.current || defaultSortKeys,
    setSortKeyColumns: (keys: string[]) => {
      sortKeyColumns.current = keys;
    },
    propsRef,
    columnsMap,
    setColumnsMap,
    columns: props.columns,
    rootDomRef,
    defaultColumnKeyMap,
  };

  Object.defineProperty(renderValue, "prefixName", {
    get: (): string => prefixNameRef.current,
  });

  Object.defineProperty(renderValue, "sortKeyColumns", {
    get: (): string[] => sortKeyColumns.current || defaultSortKeys,
  });

  return renderValue;
}
type ContainerReturnType = ReturnType<ContainerType>;

const TableContext = createContext<ContainerReturnType>({} as any);

export type ContainerType = typeof useContainer;

type ContainerProps<T> = {
  columns?: ProColumns<T>;
  children?: React.ReactNode;
};

const Container: React.FC<ContainerProps<CustomRecordType>> = (props) => {
  const { columns, children } = props;
  const value = useContainer({ columns });
  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

export { Container, TableContext };
