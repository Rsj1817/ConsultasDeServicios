
function CustomButton({children, action}) {
  return (

    <button onClick={action}>
        {children}
    </button>
    
  );
}

export default CustomButton;