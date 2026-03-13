const url = 'https://services.leadconnectorhq.com/hooks/xS6XtHTWs9JzkVQk6iwk/webhook-trigger/af0d3f11-c4fd-4159-969a-5596484152ff';

const payload = {
  firstName: "Live",
  lastName: "Test",
  email: "live.test.published@example.com",
  phone: "555-123-4567",
  address: "123 Published Ave, Cloud City, NY 10001"
};

async function sendTest() {
  console.log("Sending published live test payload...");
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log("Status:", response.status);
    const text = await response.text();
    console.log("Response:", text);
  } catch (e) {
    console.error("Error:", e);
  }
}

sendTest();
