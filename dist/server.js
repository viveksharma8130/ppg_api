"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const env_1 = require("./environments/env");
const AdminRouter_1 = require("./routers/AdminRouter");
const UserRouter_1 = require("./routers/UserRouter");
const CategoryRouter_1 = require("./routers/CategoryRouter");
const EventRouter_1 = require("./routers/EventRouter");
const ArticleRouter_1 = require("./routers/ArticleRouter");
const CourseRouter_1 = require("./routers/CourseRouter");
const BannerRouter_1 = require("./routers/BannerRouter");
const PujaVidhiRouter_1 = require("./routers/PujaVidhiRouter");
const StotraRouter_1 = require("./routers/StotraRouter");
const OrderRouter_1 = require("./routers/OrderRouter");
const razorpayRouter_1 = require("./routers/razorpayRouter");
const PaperRouter_1 = require("./routers/PaperRouter");
const PujaRouter_1 = require("./routers/PujaRouter");
const ProductRouter_1 = require("./routers/ProductRouter");
const PujaPackageRouter_1 = require("./routers/PujaPackageRouter");
const FilterRouter_1 = require("./routers/FilterRouter");
class Server {
    constructor() {
        this.app = express();
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }
    setConfigurations() {
        this.connectMongodb();
        this.configureBodyParser();
    }
    connectMongodb() {
        const databaseUrl = env_1.getEnvironmentVariables().db_url;
        mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log('mongoDb Connected');
        });
    }
    configureBodyParser() {
        this.app.use(express.json({ limit: '1000mb' }));
        this.app.use(express.urlencoded({ limit: '1000mb', extended: true, parameterLimit: 1000000 }));
    }
    setRoutes() {
        this.app.use(cors());
        this.app.use('/api/src/uploads', express.static('src/uploads'));
        this.app.use('/api/admin', AdminRouter_1.default);
        this.app.use('/api/user', UserRouter_1.default);
        this.app.use('/api/banner', BannerRouter_1.default);
        this.app.use('/api/category', CategoryRouter_1.default);
        this.app.use('/api/filter', FilterRouter_1.default);
        this.app.use('/api/event', EventRouter_1.default);
        this.app.use('/api/article', ArticleRouter_1.default);
        this.app.use('/api/course', CourseRouter_1.default);
        this.app.use('/api/pujavidhi', PujaVidhiRouter_1.default);
        this.app.use('/api/stotra', StotraRouter_1.default);
        this.app.use('/api/order', OrderRouter_1.default);
        this.app.use('/api/razorpay', razorpayRouter_1.default);
        this.app.use('/api/paper', PaperRouter_1.default);
        this.app.use('/api/puja', PujaRouter_1.default);
        this.app.use('/api/product', ProductRouter_1.default);
        this.app.use('/api/puja_packages', PujaPackageRouter_1.default);
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(200).json({
                message: 'Not Found !' + env_1.getEnvironmentVariables().jwt_secret,
                status_code: 404
            });
        });
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(200).json({
                message: error.message || 'Something Went Wrong. Please Try Again',
                status_code: errorStatus
            });
        });
    }
}
exports.Server = Server;
