export type ContainerProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  flex?: boolean;
  direction?: 'column' | 'row';
  justify?: 'start' | 'center' | 'end' | 'space-between';
  align?: 'start' | 'center' | 'end';
  gap?: number;
};

export default function Container({
  flex,
  direction,
  justify,
  align,
  gap,
  style,
  children,
}: ContainerProps): React.JSX.Element {
  const containerStyle = {
    display: 'flex',
    flex: flex ? 1 : undefined,
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    gap,
    ...style,
  };

  return <div style={containerStyle}>{children}</div>;
}
