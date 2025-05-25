function generateBill() {
  const billType = document.getElementById("sale-type").value;

  if (billType === "showroom") {
    generateShowroomBill();
  } else {
    generateCustomerBill();
  }
}

function generateCustomerBill() {
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
  console.log("customerName");
  newWindow.document.write(`
    <html>
    <head>
      <title>Bill</title>
      <style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    width: 210mm;
    height: 148mm;
    padding: 20px 30px;
    margin: 0;
    background: #f9fafb;
    color: #333;
    box-sizing: border-box;
  }

  /* Watermarked table wrapper */
  .table-container {
    position: relative;
    width: 100%;
  }

  .table-container::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 100px;
    background-image: url('tata-green-batteries-png.png'); /* Replace with actual path if needed */
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    opacity: 0.06;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    background: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 1;
    margin-top: 10px;
  }

  th, td {
    border: 1px solid #ccc;
    padding: 10px 12px;
    text-align: left;
    text-transform: uppercase;
  }

  th {
    background-color: #4a90e2;
    color: #fff;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.03em;
  }

  td {
    color: #444;
  }

  /* Optional extra info rows without borders */
  .bill-info td {
    border: none;
    padding: 6px 10px;
    font-weight: 500;
  }

  tbody tr:hover {
    background-color: #f0f5ff;
  }

  .header {
    text-align: center;
    margin-bottom: 20px;
  }

  .header h1 {
    font-size: 20px;
    margin: 0;
    color: #222;
  }

  .header p {
    font-size: 12px;
    margin: 5px 0;
    color: #666;
  }

  .footer {
    margin-top: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #555;
  }

  @media print {
    body {
      width: 210mm;
      height: 148mm;
      padding: 10mm;
      margin: 0;
      background: #fff;
      color: #000;
    }

    table {
      box-shadow: none;
      font-size: 12px;
    }

    .header, .footer {
      margin-bottom: 10px;
      gap: 20px;
      justify-content: space-between;
    }

    .table-container::before {
      content: none; /* Hide watermark for clean print */
    }
  }
</style>


    </head>
    <body onload="window.print(); window.close();">
    
  <div class="header">
    <h2>SRI RAGHAVENDRA AUTOMOBILES</h2>
          <h5>[A TATA BATTERIES DISTUBUTOR]</h5>

    <p>
      H NO 2-1-10/1/C OLD POWER HOUSE, MAHABUBNAGAR-509001, TG<br>
      PH NO: 7396463587, GSTIN: 36AKJPR6671H2ZL, STATE: 36-TELANGANA
    </p>
  </div>

  <div class="table-container">
    <!-- Bill Info Table (No borders) -->
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

    <!-- Product Table -->
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Quantity</th>
          <th>Name</th>
          <th>MRP</th>
          <th>Discount</th>
          <th>Amount</th>
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

    <!-- Payment Table -->
    <table>
      <tr>
        <td><strong>Payment Method:</strong> ${paymentMethod}</td>
        <td><strong>Total:</strong> ₹${totalAmount}</td>
      </tr>
    </table>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p>AUTHORIZED SIGNATORY & STAMP</p>
    <p>RECEIVER SIGNATORY</p>
  </div>
</body>

    </html>
  `);
  newWindow.document.close();
}
function generateShowroomBill() {
  const name = document.getElementById("showroom-customer").value;
  const number = document.getElementById("showroom-number").value;
  const showroomName = document.getElementById("showroom-name").value;
  const productId = document.getElementById("showroom-product-dropdown").value;
  const batteryNo = document.getElementById("showroom-battery-no").value;
  const mrp = document.getElementById("showroom-mrp").value;
  const payment = document.getElementById("showpayment").value;
  const type = document.querySelector(
    'input[name="showroomType"]:checked'
  ).value;

  const billWindow = window.open("", "", "width=800,height=600");
  billWindow.document.write(`
    <html>
      <head>
        <title>Showroom Bill</title>
        <style>
          /* Base layout and typography */
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            width: 210mm;
            height: 148mm;
            padding: 20px 30px;
            margin: 0;
            background: #fff;
            color: #333;
            box-sizing: border-box;
            text-transform: uppercase;
          }

          /* Table styling */
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            margin-top: 20px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          }

          th, td {
            border: 1px solid #ccc;
            padding: 8px 10px;
            text-align: left;
            text-transform: uppercase;
          }

          th {
            background-color: #4a90e2;
            color: #fff;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.03em;
          }

          td {
            color: #444;
          }

          /* Header styling */
          .header {
            text-align: center;
            margin-bottom: 20px;
          }

          .header h1 {
            font-size: 20px;
            margin: 0;
            color: #222;
          }

          .header p {
            font-size: 12px;
            margin: 5px 0;
            color: #666;
          }

          /* Footer styling */
          .footer {
            margin-top: 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            color: #555;
          }

          /* Optional watermark container (if needed later) */
          .table-container {
            position: relative;
          }

          .table-container::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 300px;
            height: 100px;
            background-image: url('/mnt/data/6f449538-b444-482b-8922-c93254c22959.png');
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            opacity: 0.06;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 0;
          }

          table {
            position: relative;
            z-index: 1;
          }

          @media print {
            body {
              padding: 10mm;
              background: #fff;
              color: #000;
            }

            .table-container::before {
              content: none; /* Hide watermark for clean print */
            }

            th, td {
              font-size: 11px;
              padding: 6px;
              text-transform: uppercase;
            }
          }
        </style>

      </head>
      <body onload="window.print(); window.close();">
        <div class="header">
          <h2>SRI RAGHAVENDRA AUTOMOBILES</h2>
          <h5>[A TATA BATTERIES DISTUBUTOR]</h5>
          <p>SHOWROOM BILL</p>
        </div>
        <p><strong>Customer:</strong> ${name}</p>
        <p><strong>Mobile:</strong> ${number}</p>
        <p><strong>Showroom:</strong> ${showroomName}</p>
        <div class="table-container">
        <table>
          <thead>
            <tr><th>Product ID</th><th>Battery No</th><th>MRP</th><th>Payment</th><th>Type</th></tr>
          </thead>
          <tbody>
            <tr><td>${productId}</td><td>${batteryNo}</td><td>${mrp}</td><td>${payment}</td><td>${type}</td></tr>
          </tbody>
        </table>
        </div>
        <div class="footer">
          <div>Authorized Signatory</div>
          <div>Receiver Signature</div>
        </div>
        
      </body>
    </html>
  `);
  billWindow.document.close();
}
