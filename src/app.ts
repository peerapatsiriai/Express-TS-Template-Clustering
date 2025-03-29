import "dotenv/config";
import express from "express";
import cors from "cors";
import appConfig from './appConfig';
import { availableParallelism } from "os";
import cluster from "cluster";
import http from "http";
import showLogo from "./utils/showLogo";
import router from "./routes/index"
import { exampleMiddleware } from "./middlewares//example"
import { responseHandler } from './middlewares/responseHandler';

const main = async () => {
    const cpu = availableParallelism();
    const processCounts = appConfig.CPU_COUNT || cpu;

    const primaryWorker = async () => {
        showLogo();
        console.info(
            `Server ${process.pid} running on http://localhost:${appConfig.PORT}`
        );
    };

    const forkWorker = () => {

        const app = express();
    
        app.use(cors());

        app.use(express.urlencoded({ 
            limit: '1gb', 
            extended: true 
        }));

        app.use(exampleMiddleware);

        app.use(responseHandler);

        app.use("/api",router);

        const server = http.createServer(app);

        server.listen(appConfig.PORT, async () => {
            console.info(
                `Worker ${process.pid} running on http://localhost:${appConfig.PORT}`
            );
        });

    };

    if (process.env.DEBUG === "1" || process.env.NODE_ENV == 'development') {
        console.log("Debug mode is on...");
        primaryWorker();
        forkWorker();
    } else {
        if (cluster.isPrimary && appConfig.CPU_COUNT > 0) {
            console.log(
                `Number of Process per CPUs is ${processCounts}/${cpu} = ${processCounts / cpu}.`
            );
            console.log(`Primary process ${process.pid} is running`);

            primaryWorker();

            for (let i = 0; i < processCounts; i++) {
                const worker = cluster.fork();
                console.log(`Start worker: ${worker.process.pid}.`);
            }
            cluster.on("exit", (worker, code, signal) => {
                console.log(
                    `Worker ${worker.process.pid} died by ${signal}, code ${code}.`
                );
                const newWorker = cluster.fork();
                console.log(
                    `Replace worker: ${worker.process.pid} by new worker: ${newWorker.process.pid}.`
                );
            });
        } else {
            forkWorker();
        }
    }
};

main();
