import { $ } from "./lib/utils";
import QrScanner from "qr-scanner";

const $form = $("#qr-upload-form");
const $fileInput = $("#qr-image");
const $previewContainer = $("#preview-container");
const $qrPreview = $("#qr-preview");
const $qrResult = $("#qr-result");
let imageUrl;

$form.addEventListener("reset", () => {
  imageUrl = undefined;
  $qrPreview.src = imageUrl;
  $qrResult.textContent = "";

  if (!$previewContainer.classList.contains("hidden")) {
    $previewContainer.classList.add("hidden");
  }
});

$form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!imageUrl) {
    alert("Por favor selecciona una imagen de codigo QR.");
    return;
  }

  $qrResult.textContent = "";

  try {
    const result = await QrScanner.scanImage(imageUrl);
    $qrResult.textContent = result;
  } catch (error) {
    console.error("Error al escanear el codigo QR:", error);
    $qrResult.textContent =
      "No se pudo leer el codigo QR. Intenta con otra imagen.";
  }
});

$fileInput.addEventListener("change", async () => {
  const file = $fileInput.files[0];
  if (!file) {
    alert("Por favor selecciona una imagen de codigo QR.");
    return;
  }

  imageUrl = URL.createObjectURL(file);
  $qrPreview.src = imageUrl;

  if ($previewContainer.classList.contains("hidden")) {
    $previewContainer.classList.remove("hidden");
  }
});
