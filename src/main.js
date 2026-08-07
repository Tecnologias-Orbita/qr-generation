import { $ } from "./lib/utils";
import QRCode from "qrcode";

const $form = $("#new-qr-form");
const $canvas = $("#qr-canvas");
const $downloadBtn = $("#download-btn");

let lastText = "";

/**
 * Calcula el tamaño óptimo del canvas según el ancho de la pantalla.
 * Mantiene un tamaño máximo de 300px y un mínimo de 200px.
 */
function getCanvasSize() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 640) {
    return Math.min(screenWidth - 32, 250);
  }
  if (screenWidth < 768) {
    return Math.min(screenWidth - 48, 300);
  }
  return 300;
}

/**
 * Ajusta el tamaño del canvas y redibuja el código QR si ya existe texto.
 */
function resizeCanvas() {
  const size = getCanvasSize();
  $canvas.width = size;
  $canvas.height = size;

  if (lastText) {
    QRCode.toCanvas($canvas, lastText, {
      width: size,
      errorCorrectionLevel: "H",
      scale: 16,
    }).catch((err) => {
      console.error(err);
    });
  }
}

// Ajustar el canvas al cargar la página
resizeCanvas();

// Redibujar el QR al cambiar el tamaño de la pantalla
window.addEventListener("resize", resizeCanvas);

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = $form.text.value;
  lastText = text;

  const size = getCanvasSize();
  $canvas.width = size;
  $canvas.height = size;

  QRCode.toCanvas($canvas, text, {
    width: size,
    errorCorrectionLevel: "H",
    scale: 16,
  }).catch((err) => {
    console.error(err);
  });

  $downloadBtn.classList.remove("hidden");
});

$downloadBtn.addEventListener("click", () => {
  const canvas = $canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = `qr-code-${Date.now()}.png`;
  link.href = canvas;
  link.click();
});
