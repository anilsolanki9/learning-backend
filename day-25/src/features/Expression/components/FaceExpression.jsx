import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function FaceExpressionDetector() {
  const videoRef = useRef(null);
  const [expression, setExpression] = useState("");

  useEffect(() => {
    loadModels();
  }, []);

  async function loadModels() {
    const MODEL_URL = "/models";

    await Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL), faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)]);

    startVideo();
  }

  async function startVideo() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;
    } catch (err) {
      console.log(err);
    }
  }

  async function detectExpression() {
    if (!videoRef.current) return;

    const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();

    if (detections?.expressions) {
      const expressions = detections.expressions;

      const highest = Object.entries(expressions).reduce((prev, current) => (current[1] > prev[1] ? current : prev));

      setExpression(highest[0]);
    }
  }

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        muted
        width="500"
        onPlay={() => {
          setInterval(detectExpression, 300);
        }}
      />

      <h2>Expression: {expression}</h2>
    </div>
  );
}
