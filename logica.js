function generarQR() {
  const dni = document.getElementById('dni').value.trim();
  const qrCanvas = document.getElementById('qrcode');
  const barcodeSvg = document.getElementById('barcode');

  qrCanvas.classList.remove('d-none');
  barcodeSvg.classList.add('d-none');

  if (!/^\d{8}$/.test(dni)) {
    alert("El DNI debe tener exactamente 8 números.");
    return;
  }

  QRCode.toCanvas(qrCanvas, dni, {
    width: 280, // tamaño reducido sin deformar
    margin: 1
  }, function (error) {
    if (error) {
      console.error("Error generando QR:", error);
      alert("Hubo un problema al generar el código QR.");
    }
  });
}

function generarBarra() {
  const dni = document.getElementById('dni').value.trim();
  const qrCanvas = document.getElementById('qrcode');
  const barcodeSvg = document.getElementById('barcode');

  qrCanvas.classList.add('d-none');
  barcodeSvg.classList.remove('d-none');
  barcodeSvg.innerHTML = "";

  if (!/^\d{8}$/.test(dni)) {
    alert("El DNI debe tener exactamente 8 números.");
    return;
  }

  JsBarcode("#barcode", dni, {
    format: "CODE128",
    lineColor: "#000",
    width: 2,
    height: 80,
    displayValue: true
  });
}
