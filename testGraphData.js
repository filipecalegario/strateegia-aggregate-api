const graphData = require("./graphData");

const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmY2FjQGNpbi51ZnBlLmJyIiwidWlkIjoiNWY0MTllMDZiMTE0MTYxMWIzZDg2MDZkIiwicm9sZXMiOltdLCJuYW1lIjoiRmlsaXBlIENhbGVnYXJpbyIsImV4cCI6MTY5NTE1MTQzMSwiaWF0IjoxNjk1MTM3MDMxfQ.s2hmqOLjuyoC8ZOFz9CEtH22YzKvinMbo91R5b7SDZx2q5U5lnWShp4aA9rNQ07Tkh9XIpnzfJvypUGQ4dNvWQ";

const projectId = "643d41f809fdc91e106f21bc";
const mode = "usuário";

console.log(graphData(token, projectId, mode));
