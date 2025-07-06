// MeasurementForm.js
import React, { useState } from "react";

const MeasurementForm = ({ onSubmit }) => {
  const [height, setHeight] = useState(170);
  const [bust, setBust] = useState(90);
  const [waist, setWaist] = useState(70);
  const [hips, setHips] = useState(95);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ height, bust, waist, hips });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Height (cm):
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </label>
      <br />
      <label>
        Bust (cm):
        <input
          type="number"
          value={bust}
          onChange={(e) => setBust(e.target.value)}
        />
      </label>
      <br />
      <label>
        Waist (cm):
        <input
          type="number"
          value={waist}
          onChange={(e) => setWaist(e.target.value)}
        />
      </label>
      <br />
      <label>
        Hips (cm):
        <input
          type="number"
          value={hips}
          onChange={(e) => setHips(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit Measurements</button>
    </form>
  );
};

export default MeasurementForm;
