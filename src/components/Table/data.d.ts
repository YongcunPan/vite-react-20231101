import type { ColumnsType, TableProps, ColumnType } from "antd/es/table";

export type CustomRecordType = { [key: string]: any };

export type ColumnsState = {
  show?: boolean;
  fixed?: "right" | "left" | undefined;
  order?: number;
  disable?:
    | boolean
    | {
        checkbox: boolean;
      };
  [key: string]: any;
};

export type ProTableProps<T> = TableProps<T> & { [key: string]: any };
export type ProTableColumn<T> = ColumnsState & ColumnType<T>;
export type ProColumns<T> = ProTableColumn<T>[];
export type UseContainerProps<T> = { columns?: ProColumns<T> };

export type SettingOptionType<T> = {
  draggable?: boolean;
  checkable?: boolean;
  showListItemOption?: boolean;
  checkedReset?: boolean;
  listsHeight?: number;
  extra?: React.ReactNode;
  children?: React.ReactNode;
  settingIcon?: React.ReactNode;
  columns?: ProTableColumn<T>;
};
