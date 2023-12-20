import DATA from "./data";

export function get(endpoint) {
  const delay = Math.floor(Math.random() * 1000) + 500;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!DATA.hasOwnProperty(endpoint)) {
        const validEndpoints = Object.keys(DATA)
          .map((endpoint) => ` - "${endpoint}"`)
          .join("\n ");
        reject(
          `"${endpoint}" is an invalid endpoint. Try getting data from: \n ${validEndpoints}`
        );
      }

      const response = { status: 200, data: DATA[endpoint] };

      resolve(response);
    }, delay);
  });
}
