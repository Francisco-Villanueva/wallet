import React from "react";

function ComprobantePago(props) {
  const downloadFile = () => {
    const link = document.createElement("a");
    link.href = props.src;
    link.download = "comprobante.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <img src={props.src} alt="Comprobante de pago" />
      <button onClick={downloadFile}>Descargar</button>
    </div>
  );
}

export default ComprobantePago;
