import { useState } from "react";

const metricSystems = [
  { label: "Select a metric system", value: "" },
  { label: "Decimal", value: "decimal" },
  { label: "Anglosajón", value: "imperial" },
];

const valuePounds = 2.21;
const valueInch = 39.37;
const onlyNumberDecimalRegex = /^[0-9]*[.]?[0-9]*$/;

function App() {
  const [mestricSystemSelect, setMetricSystemSelect] = useState(
    metricSystems[0]
  );

  const [age, setAge] = useState("");
  const [stature, setStature] = useState("");
  const [weight, setWeight] = useState("");

  const [touchedField, setTouchedField] = useState({
    age: false,
    stature: false,
    weight: false,
  });

  function handleChange(ev) {
    let value = ev.target.value;
    let name = ev.target.name;
    if (value === "" || onlyNumberDecimalRegex.test(value)) {
      switch (name) {
        case "age":
          setAge(value);
          break;
        case "stature":
          setStature(value);
          break;
        case "weight":
          setWeight(value);
          break;
        default:
          break;
      }
    }
  }

  function validateFields(name, value) {
    let currentMestricSystem = mestricSystemSelect.value === "decimal";
    const minStature = 1.4 * valueInch;
    const maxStature = 2.25 * valueInch;
    const minWeight = 40.5 * valuePounds;
    const maxWeight = 300 * valuePounds;
    switch (name) {
      case "age":
        if (value < 16 || value > 105) {
          return "Age must be greater than or equal to 16 and less than or equal to 105";
        }
        return "";
      case "stature":
        if (currentMestricSystem) {
          value = value * valueInch;
        }
        console.log(value, minStature, maxStature);
        if (value < minStature || value > maxStature) {
          return `The height must be greater than or equal to ${
            currentMestricSystem ? "1.4mts" : `${minStature.toFixed(2)}in`
          }  and less than or equal to ${
            currentMestricSystem ? "2.25mts" : `${maxStature.toFixed(2)}in`
          }`;
        }
        return "";
      case "weight":
        if (currentMestricSystem) {
          value = value * valuePounds;
        }

        if (value < Number(minWeight.toFixed(2)) || value > maxWeight) {
          return `The weight must be greater than or equal to ${
            currentMestricSystem ? "40.50kg" : `${minWeight.toFixed(2)}lb`
          } and less than or equal to ${
            currentMestricSystem ? "300kg" : `${maxWeight.toFixed(2)}lb`
          }`;
        }
        return "";
      default:
        return "";
    }
  }

  function handleTouched(ev) {
    const name = ev.target.name;
    setTouchedField((touchedField) => ({
      ...touchedField,
      [name]: true,
    }));
  }

  function handleMetricSystemSelect(value = "") {
    setMetricSystemSelect(
      metricSystems.find((metric) => metric.value === value)
    );
  }

  function calculateFactor(weightPounds) {
    if (weightPounds < 165) return 1.6;
    if (weightPounds >= 165 && weightPounds <= 200) return 1.4;
    if (weightPounds > 200 && weightPounds <= 220) return 1.2;
    if (weightPounds > 220) return 1;
  }

  function calculateCalories(age = 0, stature = 0, weight = 0) {
    if (mestricSystemSelect.value === "" || (!age && !stature && !weight)) {
      return 0;
    }

    if (
      validateFields("age", age) ||
      validateFields("stature", stature) ||
      validateFields("weight", weight)
    ) {
      return 0;
    }

    if (mestricSystemSelect.value === "decimal") {
      weight = weight * valuePounds;
      stature = stature * valueInch;
    }

    return (
      (10 * weight + 6.25 * stature - 10 * age + 5) * calculateFactor(weight)
    );
  }

  return (
    <>
      <main className="container">
        <h1>Logical Challenge</h1>
        <h3>
          Calculate the amount of calories a person should consume per day.
        </h3>

        <form className="form-container">
          <div className="field-container">
            <label htmlFor="metric-system">Metric System</label>
            <select
              className="field-select"
              name="metric-system"
              id="metric-system"
              onChange={(ev) => {
                handleMetricSystemSelect(ev.target.value);
              }}
            >
              {metricSystems.map((metric, index) => (
                <option hidden={!metric.value} key={index} value={metric.value}>
                  {metric.label}
                </option>
              ))}
            </select>
          </div>

          <div className="field-container">
            <label htmlFor="age">Age:</label>
            <input
              type="text"
              name="age"
              id="age"
              placeholder="0"
              className="field-text"
              value={age}
              onChange={handleChange}
              onBlur={handleTouched}
              disabled={!mestricSystemSelect.value}
            />
            {touchedField.age && validateFields("age", age) && (
              <span className="field-error">{validateFields("age", age)}</span>
            )}
          </div>
          <div className="field-container">
            <label htmlFor="stature">Stature:</label>
            <input
              type="text"
              name="stature"
              id="stature"
              placeholder="0"
              className="field-text"
              value={stature}
              onChange={handleChange}
              onBlur={handleTouched}
              disabled={!mestricSystemSelect.value}
            />
            {touchedField.stature && validateFields("stature", stature) && (
              <span className="field-error">
                {validateFields("stature", stature)}
              </span>
            )}
          </div>
          <div className="field-container">
            <label htmlFor="weight">Weight:</label>
            <input
              type="text"
              name="weight"
              id="weight"
              placeholder="0"
              className="field-text"
              value={weight}
              onChange={handleChange}
              onBlur={handleTouched}
              disabled={!mestricSystemSelect.value}
            />
            {touchedField.weight && validateFields("weight", weight) && (
              <span className="field-error">
                {validateFields("weight", weight)}
              </span>
            )}
          </div>
        </form>

        <section>
          <h4>
            All Calories:{" "}
            <b>{calculateCalories(age, stature, weight).toFixed(4)}</b>
          </h4>
        </section>
      </main>
      <footer className="footer-container">
        <blockquote className="">Autor: José Daniel Pumarejo García</blockquote>
      </footer>
    </>
  );
}

export default App;
