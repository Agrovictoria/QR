// logica.js actualizado

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
    width: 280,
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

function mostrarFormularioCarnet() {
  document.getElementById('formulario-carnet').classList.remove('d-none');
}

function generarCarnet() {
  const nombre = document.getElementById('nombre').value.trim();
  const cargo = document.getElementById('cargo').value.trim();
  const dni = document.getElementById('dni').value.trim();
  const fotoInput = document.getElementById('foto');
  const preview = document.getElementById('preview-carnet');
  const carnet = document.getElementById('carnet');
  const carnetFoto = document.getElementById('carnet-foto');
  const carnetNombre = document.getElementById('carnet-nombre');
  const carnetCargo = document.getElementById('carnet-cargo');
  const carnetDni = document.getElementById('carnet-dni');
  const carnetQr = document.getElementById('carnet-qr');

  if (!fotoInput.files[0]) {
    alert('Por favor, sube una foto.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    carnetFoto.src = e.target.result;
    carnetNombre.textContent = nombre;
    carnetCargo.textContent = cargo;
    carnetDni.textContent = `DNI: ${dni}`;

    QRCode.toCanvas(carnetQr, dni, {
      width: 100,
      margin: 1
    }, function (error) {
      if (error) {
        console.error("Error generando QR del carnet:", error);
      } else {
        preview.classList.remove('d-none');
        setTimeout(() => {
          html2canvas(carnet).then(canvas => {
            const link = document.createElement('a');
            link.download = `carnet_${nombre.replace(/\s+/g, '_')}.png`;
            link.href = canvas.toDataURL();
            link.click();
          });
        }, 500);
      }
    });
  };
  reader.readAsDataURL(fotoInput.files[0]);
}
