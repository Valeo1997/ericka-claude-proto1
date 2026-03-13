const url = 'https://services.leadconnectorhq.com/hooks/xS6XtHTWs9JzkVQk6iwk/webhook-trigger/af0d3f11-c4fd-4159-969a-5596484152ff';

const payload1 = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "555-0101",
  address: "123 Main St, Anytown, CA 90210"
};

const payload2 = {
  firstName: "Jane",
  lastName: "Smith",
  email: "jane.smith@example.com",
  phone: "555-0202",
  address: "456 Oak Ave, Somewhere, NY 10001"
};

async function sendTests() {
  console.log("Sending payload 1...");
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload1)
  });
  console.log("Payload 1 sent.");

  console.log("Sending payload 2...");
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload2)
  });
  console.log("Payload 2 sent.");
}

sendTests();
