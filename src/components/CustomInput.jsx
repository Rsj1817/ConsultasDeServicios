

function CustomInput({label, type, name, value, onChange}){
  return (
    <div className="input-group">
        <label className="input-label" htmlFor={name}>{label}</label>
        <input
            className="input-control"
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
        />
    </div>
  );
}

export default CustomInput;
