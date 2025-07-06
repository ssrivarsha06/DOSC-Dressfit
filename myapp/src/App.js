import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import AvatarModel from "./components/AvatarModel";
import DressModel from "./components/DressModel";
import MeasurementForm from "./components/MeasurementForm";

import {
  calculateAvatarScale,
  dressPresets,
  isDressFit,
  dressFiles,
  dressScales
} from "./utils/scaleUtils";
import "./App.css";

function App() {
  const [measurements, setMeasurements] = useState({
    height: 170,
    bust: 90,
    waist: 70,
    hips: 95,
  });

  const [avatarScale, setAvatarScale] = useState(calculateAvatarScale(measurements));
  const [selectedDressSize, setSelectedDressSize] = useState(null);
  const [fitStatus, setFitStatus] = useState(null);
  const [dressColor, setDressColor] = useState("#ff69b4");
  const [selectedPattern, setSelectedPattern] = useState("solid");
  const [selectedDressType, setSelectedDressType] = useState("");

  useEffect(() => {
    const newAvatarScale = calculateAvatarScale(measurements);
    setAvatarScale(newAvatarScale);
  }, [measurements]);

  const handleMeasurementSubmit = (newMeasurements) => {
    const updated = {
      height: parseFloat(newMeasurements.height),
      bust: parseFloat(newMeasurements.bust),
      waist: parseFloat(newMeasurements.waist),
      hips: parseFloat(newMeasurements.hips),
    };
    setMeasurements(updated);
    setFitStatus(null);
    setSelectedDressSize(null);
  };

  const handleDressTypeChange = (e) => {
    const type = e.target.value;
    setSelectedDressType(type);
    setSelectedDressSize(null);
    setFitStatus(null);
  };

  const handleDressSelect = (sizeKey) => {
    const dress = dressPresets[sizeKey];
    setSelectedDressSize(sizeKey);
    const fit = isDressFit(measurements, dress);
    setFitStatus(fit);
  };

  const handleColorChange = (e) => {
    setDressColor(e.target.value);
  };

  const handlePatternSelect = (e) => {
    setSelectedPattern(e.target.value);
  };

  const getDressScale = (type, size) => {
    if (!type || !size) return [0, 0, 0];
    return dressScales[type]?.[size] || [1, 1, 1];
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h2>Enter Your Measurements (cm)</h2>
        <MeasurementForm onSubmit={handleMeasurementSubmit} />

        <div style={{ marginTop: "10px" }}>
          <label>Choose Dress Type:</label>
          <select value={selectedDressType} onChange={handleDressTypeChange}>
            <option value="">-- Select Dress --</option>
            <option value="Cindrella">Cindrella</option>
            <option value="skirt">One-piece Skirt</option>
            <option value="pant">One-piece Pant</option>
          </select>
        </div>

        {selectedDressType && (
          <>
            <h3 style={{ marginTop: "20px" }}>Select Dress Size</h3>
            <div style={{ display: "flex", gap: "10px" }}>
              {["small", "medium", "large"].map((size) => (
                <button key={size} onClick={() => handleDressSelect(size)}>
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>

            <div style={{ marginTop: "10px" }}>
              <label>Choose Dress Color:</label>
              <input type="color" value={dressColor} onChange={handleColorChange} />
            </div>

            <div style={{ marginTop: "10px" }}>
              <label>Choose Dress Pattern:</label>
              <select onChange={handlePatternSelect} value={selectedPattern}>
                <option value="solid">Solid</option>
                <option value="striped">Striped</option>
                <option value="floral">Floral</option>
              </select>
            </div>
          </>
        )}

        {fitStatus !== null && (
          <p
            style={{
              marginTop: "10px",
              color: fitStatus ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {fitStatus ? "✅ The dress fits!" : "❌ The dress does NOT fit."}
          </p>
        )}
      </div>

      <div className="canvas-container">
        <Canvas camera={{ position: [0, 1.5, 3], near: 0.1, far: 1000 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 5, 2]} intensity={1} />
          <OrbitControls target={[0, 1, 0]} />
          <group position={[0, -0.8, 0]}>
            <AvatarModel scale={avatarScale} position={[0, 0.8, 0]} />
            {selectedDressType && selectedDressSize && (
              <DressModel
                url={dressFiles[selectedDressType]}
                scale={getDressScale(selectedDressType, selectedDressSize)}
                position={[0, 0.7, 0.05]}
                color={dressColor}
                pattern={selectedPattern}
              />
            )}
          </group>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
