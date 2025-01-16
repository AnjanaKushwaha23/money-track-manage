import "./Operation.css";

const Operation = ({ title, inputs, buttonText, onSubmit }) => {
  return (
    <div className={`operation operation--${title.toLowerCase()}`}>
      <h2>{title}</h2>
      <form className={`form form--${title.toLowerCase()}`} onSubmit={onSubmit}>
        {inputs.map((input, index) => (
          <div key={index}>
            <input
              type={input.type}
              className={`form__input ${input.className}`}
              {...input.attributes}
              value={input.value} // Ensure value is set here
              onChange={input.onChange} // Ensure onChange is set here
            />
            {input.label && (
              <label className={`form__label ${input.labelClass || ""}`}>
                {input.label}
              </label>
            )}
          </div>
        ))}
        <button className={`form__btn form__btn--${title.toLowerCase()}`}>
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default Operation;
