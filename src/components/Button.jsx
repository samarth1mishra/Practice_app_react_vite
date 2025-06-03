export const Button = ({onClick,children,className="",size="default"}) => {
  const sizeClass={
  default:"px-4 py-2", small:"px-2 py-1"
  }
  return (
    <button onClick={onClick} className={`${sizeClass[size]} bg-blue-500 text-white hover:bg-blue-600 rounded transition-colors ${className}`}>
      {children}
    </button>
  );
};