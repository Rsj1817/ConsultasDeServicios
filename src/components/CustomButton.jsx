
function CustomButton({children, action}) {
  return (
    <button className="app-button" onClick={action} type="button">
        {children}
    </button>
  );
}

export default CustomButton;
