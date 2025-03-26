import { HTMLAttributes, ReactNode } from "react";

export type TypographyProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLHeadingElement>;

export type ParagraphProps = {
  children: ReactNode;
  className?: string;
  isGray?: boolean;
} & HTMLAttributes<HTMLParagraphElement>;

export interface Column<T> {
  title: string;
  key: keyof T;
  render?: (rowData: T, index: number) => ReactNode;
}

export interface TableProps {
  columns: Column<any>[];
  data: any[];
  onRowClick?: (rowData: any) => void;
  isLoading?: boolean;
  isUppercase?: boolean;
  isGray?: boolean;
}

export type ModalProps = {
  children: ReactNode;
  title?: string;
  desc?: string;
  show: boolean;
  closeModal: () => void;
  isSideModal?: boolean;
  hasBorder?: boolean;
};

export type ReuseModalTypes = {
  show: boolean;
  onClose: () => void;
};

