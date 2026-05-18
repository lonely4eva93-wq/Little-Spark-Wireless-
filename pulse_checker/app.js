const startBtn = document.getElementById("startBtn");
const video = document.getElementById("video");
const bpmEl = document.getElementById("bpm");
const qualityEl = document.getElementById("quality");
const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");

let samples = [];
let running = false;

startBtn.onclick = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "environment",
      width: { ideal: 640 },
      height: { ideal: 480 }
    },
    audio: false
  });

  video.srcObject = stream;

  const track = stream.getVideoTracks()[0];
  const capabilities = track.getCapabilities?.();

  if (capabilities && capabilities.torch) {
    await track.applyConstraints({ advanced: [{ torch: true }] });
  }

  running = true;
  scanLoop();
};

function scanLoop() {
  if (!running) return;

  const temp = document.createElement("canvas");
  temp.width = 80;
  temp.height = 60;
  const tctx = temp.getContext("2d");

  tctx.drawImage(video, 0, 0, temp.width, temp.height);
  const frame = tctx.getImageData(0, 0, temp.width, temp.height).data;

  let red = 0;

  for (let i = 0; i < frame.length; i += 4) {
    red += frame[i];
  }

  red = red / (frame.length / 4);

  const now = performance.now();
  samples.push({ time: now, value: red });

  samples = samples.filter(s => now - s.time < 12000);

  drawGraph();
  calculateBPM();

  requestAnimationFrame(scanLoop);
}

function drawGraph() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (samples.length < 2) return;

  const values = samples.map(s => s.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  ctx.beginPath();

  samples.forEach((s, i) => {
    const x = (i / (samples.length - 1)) * canvas.width;
    const y = canvas.height - ((s.value - min) / range) * canvas.height;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.lineWidth = 3;
  ctx.strokeStyle = "white";
  ctx.stroke();
}

function calculateBPM() {
  if (samples.length < 120) return;

  const values = samples.map(s => s.value);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;

  const peaks = [];

  for (let i = 1; i < values.length - 1; i++) {
    const isPeak =
      values[i] > values[i - 1] &&
      values[i] > values[i + 1] &&
      values[i] > avg;

    if (isPeak) {
      const peakTime = samples[i].time;

      if (
        peaks.length === 0 ||
        peakTime - peaks[peaks.length - 1] > 350
      ) {
        peaks.push(peakTime);
      }
    }
  }

  if (peaks.length < 3) {
    qualityEl.textContent = "Signal: weak";
    return;
  }

  const intervals = [];

  for (let i = 1; i < peaks.length; i++) {
    intervals.push(peaks[i] - peaks[i - 1]);
  }

  const avgInterval =
    intervals.reduce((a, b) => a + b, 0) / intervals.length;

  const bpm = Math.round(60000 / avgInterval);

  if (bpm > 40 && bpm < 200) {
    bpmEl.textContent = bpm;
    qualityEl.textContent = "Signal: good";
  } else {
    qualityEl.textContent = "Signal: unstable";
  }
}
