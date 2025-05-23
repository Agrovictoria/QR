// Generador QR
function generarQR() {
  const dniInput = document.getElementById('dni');
  const dni = dniInput.value.trim();
  const qrCanvas = document.getElementById('qrcode');
  const barcodeSvg = document.getElementById('barcode');

  if (!/^[0-9]{8}$/.test(dni)) {
    dniInput.classList.add('is-invalid');
    qrCanvas.classList.add('d-none');
    barcodeSvg.classList.add('d-none');
    return;
  }

  dniInput.classList.remove('is-invalid');
  qrCanvas.classList.remove('d-none');
  barcodeSvg.classList.add('d-none');

  QRCode.toCanvas(qrCanvas, dni, {
    width: 280,
    margin: 1
  }, function (error) {
    if (error) {
      console.error("Error generando QR:", error);
    }
  });
}

// Generador de código de barras
function generarBarra() {
  const dniInput = document.getElementById('dni');
  const dni = dniInput.value.trim();
  const qrCanvas = document.getElementById('qrcode');
  const barcodeSvg = document.getElementById('barcode');

  if (!/^[0-9]{8}$/.test(dni)) {
    dniInput.classList.add('is-invalid');
    barcodeSvg.classList.add('d-none');
    qrCanvas.classList.add('d-none');
    return;
  }

  dniInput.classList.remove('is-invalid');
  qrCanvas.classList.add('d-none');
  barcodeSvg.classList.remove('d-none');
  barcodeSvg.innerHTML = "";

  JsBarcode("#barcode", dni, {
    format: "CODE128",
    lineColor: "#000",
    width: 2,
    height: 80,
    displayValue: true
  });
}

// Generador de carné
const formCarnet = document.getElementById('formCarnet');
formCarnet.addEventListener('submit', function (event) {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const cargo = document.getElementById('cargo').value.trim();
  const dni = document.getElementById('dni-carnet').value.trim();
  const fotoInput = document.getElementById('foto');
  const carnetFoto = document.getElementById('carnet-foto');
  const carnetNombre = document.getElementById('carnet-nombre');
  const carnetCargo = document.getElementById('carnet-cargo');
  const carnetDni = document.getElementById('carnet-dni');
  const carnetQr = document.getElementById('carnet-qr');
  const carnetContainer = document.getElementById('preview-carnet');
  const carnet = document.getElementById('carnet');
  const btnDescargar = document.getElementById('btnDescargar');

  if (!fotoInput.files[0]) {
    fotoInput.classList.add('is-invalid');
    return;
  } else {
    fotoInput.classList.remove('is-invalid');
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
      if (!error) {
        carnetContainer.classList.remove('d-none');
        btnDescargar.classList.remove('d-none');
      }
    });
  };
  reader.readAsDataURL(fotoInput.files[0]);
});

// Botón Descargar
const btnDescargar = document.getElementById('btnDescargar');
btnDescargar.addEventListener('click', () => {
  const carnet = document.getElementById('carnet');
  const nombre = document.getElementById('nombre').value.trim().replace(/\s+/g, '_');
  const cargo = document.getElementById('cargo').value.trim().replace(/\s+/g, '_');
  const aleatorio = Math.random().toString(36).substring(2, 8);
  const nombreArchivo = `carne-${nombre}-${cargo}-${aleatorio}.png`;

  html2canvas(carnet).then(canvas => {
    const link = document.createElement('a');
    link.download = nombreArchivo;
    link.href = canvas.toDataURL();
    link.click();
    alert("✅ Carné descargado. Ábrelo desde tu galería o administrador de archivos.");
  });
});

// Cierre del menú hamburguesa al hacer clic en enlaces
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
      toggle: false
    });
    bsCollapse.hide();
  });
});
