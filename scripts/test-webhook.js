const data = {
  firstName: "Test",
  lastName: "User",
  email: "test@example.com",
  phone: "555-0199",
  address: "123 Test St, Testville, TX 75001"
};

fetch('https://services.leadconnectorhq.com/hooks/xS6XtHTWs9JzkVQk6iwk/webhook-trigger/4810bff5-b931-4fa1-9164-ef2df9b4dd2e', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
.then(async res => {
  console.log("Status:", res.status);
  console.log("Response:", await res.text());
})
.catch(console.error);
