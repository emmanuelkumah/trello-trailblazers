import { UUID } from "crypto";
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
  isSmall?: boolean;
  closeModal: () => void;
  isSideModal?: boolean;
  hasBorder?: boolean;
};

export type ReuseModalTypes = {
  show: boolean;
  onClose: () => void;
};

export type ContentType = {
  id: string;
  title: string;
  price: number;
  status: "ongoing" | "ended";
  members: number;
  action: "pending contribution" | "contributed"
}

export type GroupCardType = {
  image: string;
  title: string;
  description: string;
  members: number | string;
  total: number;
  content: ContentType[];
}