export default function useMousePosition() {
    const [
      mousePosition,
      setMousePosition
    ] = React.useState({ x: null, y: null, z:0 });
  
    React.useEffect(() => {
      const updateMousePosition = ev => {
        setMousePosition({ x: ev.clientX, y: ev.clientY, z:0 });
      };
      
      window.addEventListener('mousemove', updateMousePosition);
  
      return () => {
        window.removeEventListener('mousemove', updateMousePosition);
      };
    }, []);
  
    return (JSON.stringify(mousePosition));
  };

  