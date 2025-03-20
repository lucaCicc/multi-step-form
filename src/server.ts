import { createServer } from "miragejs";

export function makeServer() {
  const server = createServer({
    routes() {
      this.namespace = "api";

      this.get("/users", () => {
        return {
          users: [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" },
          ],
        };
      });
    },
  });

  return server;
}
