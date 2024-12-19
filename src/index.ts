import "module-alias/register";
import { main } from "./app";
import {
  gracefullyShutdown,
  unexpectedErrorHandler,
} from "./common/lib/exit-handler";

/*
 * Build service
 */
main()
  .then((app: any) => {
    // At this point we should be able to gracefully handle all this... We hope
    process.on("uncaughtException", (err) => unexpectedErrorHandler(app, err));
    process.on("unhandledRejection", (err) => unexpectedErrorHandler(app, err));
    process.on("SIGTERM", () => gracefullyShutdown(app));
    process.on("SIGINT", () => gracefullyShutdown(app));

    /*
     * Start me up...
     */
    app
      .listen({ port: app.config.BIND_PORT, host: app.config.BIND_ADDR })
      .then(() => {
        app.log.info(
          `Open api at http://${app.config.BIND_ADDR}:${app.config.BIND_PORT}/docs`
        );
        app.log.info("Ready, Waiting for connections...");
      })
      .catch((err: any) => {
        app.log.error(
          {
            addr: app.config.BIND_ADDR,
            port: app.config.BIND_PORT,
            error: err.message,
          },
          "Failed to start server"
        );
      });
  })
  .catch((err: any) => {
    console.log(err);
    process.exit(1);
  });
