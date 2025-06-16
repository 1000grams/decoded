// Lambda handler for dashboardAccounting
exports.handler = async (event) => {
  // Example: return a static accounting summary
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Decoded Music Dashboard Accounting Lambda is working!",
      accountingSummary: {
        totalRevenue: 12345.67,
        outstandingInvoices: 3,
        lastPaymentDate: "2025-06-01"
      }
    })
  };
};
