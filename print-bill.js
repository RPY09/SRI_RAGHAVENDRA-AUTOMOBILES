function generateBill() {
  const billType = document.getElementById("sale-type").value;
  const customerName = document.getElementById("name").value;
  const mobileNumber = document.getElementById("number").value;
  const productIdRaw = document.getElementById("product-dropdown").value;
  const productName = document.getElementById("product-name").value;
  const mrp = document.getElementById("product-mrp").value;
  const quantity = document.getElementById("quantity").value;
  const totalAmount = document.getElementById("total-amount").value;
  const paymentMethod = document.getElementById("payment").value;
  const billNo = Math.floor(1000 + Math.random() * 9000);
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format ID based on type
  const productId =
    billType === "charging" ? `CH-${productIdRaw}` : productIdRaw;

  const newWindow = window.open("", "", "width=800,height=600");
  newWindow.document.write(`
    <html>
    <head>
      <title>Bill</title>
      <style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 20px;
    background: #f9fafb;
    color: #333;
  }

  /* Container for table to hold watermark */
  .table-container {
    position: relative;
    width: 100%;
  }

  /* Watermark styling */
  .table-container::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;  /* Adjust size as needed */
    height: 100px; /* Adjust size as needed */
    background-image: url('tata-green-batteries-png.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    opacity: 0.1;  /* Light transparency */
    transform: translate(-50%, -50%);
    pointer-events: none; /* So it doesn't interfere with clicks */
    z-index: 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    margin-bottom: 30px;
    position: relative;
    z-index: 1; /* Put table content above watermark */
    border-radius: 8px;
    overflow: hidden;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 12px 15px;
    text-align: left;
  }

  th {
    background-color: #4a90e2;
    color: #fff;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  td {
    color: #555;
  }

  .header, .footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 60px;
    margin-bottom: 40px;
  }

  .footer {
    margin-top: 100px;
    gap: 120px;
    font-size: 13px;
    color: #666;
  }

  .bill-info td {
    border: none;
    padding: 6px 12px;
    font-weight: 500;
  }

  tbody tr:hover {
    background-color: #f0f5ff;
  }

  @media print {
    body {
      width: 210mm;
      height: 148mm;
      padding: 0;
      margin: 0;
      background: #fff;
      color: #000;
    }
    table {
      box-shadow: none;
      margin-bottom: 0;
      font-size: 12px;
    }
    .header, .footer {
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 10px;
    }
    /* Hide watermark in print for clarity */
    .table-container::before {
      content: none;
    }
  }
</style>

    </head>
    <body onload="window.print(); window.close();">
      <div class="header">
        <h2>SRI RAGHAVENDRA AUTOMOBILES (${billType.toUpperCase()})</h2>
        <p>H NO 2-1-10/1/C OLD POWER HOUSE, MAHABUBNAGAR-509001, TG<br>
           PH NO: 7396463587, GSTIN: 36AKJPR6671H2ZL, STATE: 36-TELANGANA</p>
      </div>
      <table class="bill-info">
        <tr>
          <td><strong>Bill No:</strong> ${billNo}</td>
          <td><strong>Date:</strong> ${currentDate}</td>
        </tr>
        <tr>
          <td><strong>Billed To:</strong> ${customerName}</td>
          <td><strong>Mobile:</strong> ${mobileNumber}</td>
        </tr>
      </table>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Quantity</th><th>Name</th><th>MRP</th><th>Discount</th><th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${productId}</td>
            <td>${quantity}</td>
            <td>${productName}</td>
            <td>${mrp}</td>
            <td>0</td>
            <td>${totalAmount}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <tr>
          <td><strong>Payment:</strong> ${paymentMethod}</td>
          <td><strong>Total:</strong> ${totalAmount}</td>
        </tr>
      </table>
      <div class="footer">
        <p>AUTHORIZED SIGNATORY & STAMP</p><br>
        <br>
        <br>
        <br>
        <p>RECEIVER SIGNATORY</p>
      </div>
    </body>
    </html>
  `);
  newWindow.document.close();
}
