import "dotenv/config";

import app from "./src/app.js";

const PORTA = process.env.DB_CONNECTION_PORT || 3000;

app.listen(PORTA, () => {
  console.log(`Servidor executando em http://localhost:${PORTA}`);
});
