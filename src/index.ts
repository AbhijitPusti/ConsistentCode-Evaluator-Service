import express from "express";
import bodyParser from "body-parser";

import serverConfig from "./config/serverConfig";
import apiRouter from "./routes";
import sampleQueueProducer from "./producers/sampleQueueProducer";
import SampleWorker from "./workers/SampleWorker";

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api', apiRouter);

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at *:${serverConfig.PORT}`);

    SampleWorker('SampleQueue');
    sampleQueueProducer('SampleJob',{
        name: "Abhijit",
        company: "TCS",
        position: "ASE",
        location: "Mumbai"
    },2);

    sampleQueueProducer('SampleJob',{
        name: "Manya",
        company: "Taj",
        position: "Head Chef",
        location: "Mumbai"
    },1);
});