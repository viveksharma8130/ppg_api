import { Server } from "./server";

let server = new Server().app;

let port =  process.env.PORT || 5200;

server.listen(port, () => {
    console.log(`PujyapanditG : PORT ${port}`);
});


