import { startApp } from "./app"

const main = async () => {
  try {
    await startApp();
  } catch (error) {
    console.error("Error starting the application:", error);
    process.exit(1);
  }
};

main();