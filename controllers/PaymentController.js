const braintree = require("braintree");
// Configure Braintree
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "5mfrbgphbmv98v6r",
  publicKey: "nfwybtvyqp4rvnxr",
  privateKey: "698172d01d496946ceae60b6820ee53b",
});
  // Create a client token endpoint
exports.client_token= async (req, res) => {
    const clientToken = await gateway.clientToken.generate({});
    res.send(clientToken);
  };
  // Create a payment endpoint
exports.payment= async (req, res) => {
    const { amount, nonce } = req.body;
    
    // Create a new transaction using Braintree API
    try {
      const result = await gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true
        }
      });
      if (result.success) {
        res.send('Payment successful!');
      } else {
        res.status(500).send({ error: result.message });
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };