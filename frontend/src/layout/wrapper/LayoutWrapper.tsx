import { ReactNode } from 'react';

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  return <div className='min-h-screen flex flex-col'>{children}</div>;
};

export default LayoutWrapper;
