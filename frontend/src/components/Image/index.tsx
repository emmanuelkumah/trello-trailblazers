import React from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width: number | string;
  height: number | string;
  divClassName?: string;
  className?: string;
}

const Image: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  divClassName,
  className,
  loading = 'lazy',
  ...props
}) => {
  return (
    <div className={divClassName}>
      <img
        src={src}
        alt={alt}
        title={alt}
        aria-label={alt}
        aria-labelledby={alt}
        aria-braillelabel={alt}
        width={width}
        height={height}
        loading={loading}
        className={`object-cover ${className}`}
        {...props}
      />
    </div>
  );
};

export default Image;


