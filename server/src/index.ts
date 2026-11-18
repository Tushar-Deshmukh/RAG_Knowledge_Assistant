import createApp from "./app.js";
import { parseEnv } from "./config/env.js";
import { logger } from "./common/logging/logger.js";

const config = parseEnv(process.env);

const app = createApp();

app.listen(config.PORT, () => {
  logger.info(
    { event: "server_started", port: config.PORT },
    "Server listening",
  );
});
