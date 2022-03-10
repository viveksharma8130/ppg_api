import * as  express from 'express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import { getEnvironmentVariables } from './environments/env';
import AdminRouter from './routers/AdminRouter';
import UserRouter from './routers/UserRouter';
import CategoryRouter from './routers/CategoryRouter';
import EventRouter from './routers/EventRouter';
import ArticleRouter from './routers/ArticleRouter';
import CourseRouter from './routers/CourseRouter';
import BannerRouter from './routers/BannerRouter';
import PujaVidhiRouter from './routers/PujaVidhiRouter';
import StotraRouter from './routers/StotraRouter';
import OrderRouter from './routers/OrderRouter';
import razorpayRouter from './routers/razorpayRouter';
import PaperRouter from './routers/PaperRouter';
import PujaRouter from './routers/PujaRouter';
import ProductRouter from './routers/ProductRouter';
import PujaPackageRouter from './routers/PujaPackageRouter';
import FilterRouter from './routers/FilterRouter';

export class Server {
    public app: express.Application = express();

    constructor() {
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }

    setConfigurations(){
        this.connectMongodb();
        this.configureBodyParser();
    }

    connectMongodb(){
        const databaseUrl = getEnvironmentVariables().db_url;
        mongoose.connect(databaseUrl, {useNewUrlParser: true, useUnifiedTopology:true}).then(()=>{
            console.log('mongoDb Connected');
        });
    }

    configureBodyParser(){
        this.app.use(express.json({limit: '1000mb'}));
        this.app.use(express.urlencoded({limit: '1000mb', extended: true, parameterLimit: 1000000 }));
    }

    setRoutes(){
        this.app.use(cors());
        this.app.use('/api/src/uploads', express.static('src/uploads'));
        this.app.use('/api/admin', AdminRouter);
        this.app.use('/api/user', UserRouter);
        this.app.use('/api/banner', BannerRouter);
        this.app.use('/api/category', CategoryRouter);
        this.app.use('/api/filter', FilterRouter);
        this.app.use('/api/event', EventRouter);
        this.app.use('/api/article', ArticleRouter);
        this.app.use('/api/course', CourseRouter);
        this.app.use('/api/pujavidhi', PujaVidhiRouter);
        this.app.use('/api/stotra', StotraRouter);
        this.app.use('/api/order', OrderRouter);
        this.app.use('/api/razorpay', razorpayRouter);
        this.app.use('/api/paper', PaperRouter);
        this.app.use('/api/puja', PujaRouter);
        this.app.use('/api/product', ProductRouter);
        this.app.use('/api/puja_packages', PujaPackageRouter);
    }

    error404Handler(){
        this.app.use((req,res)=>{
            res.status(200).json({      // By Default 200 else 404
                message:'Not Found !'+ getEnvironmentVariables().jwt_secret,
                status_code:404
            });
        }) 
    }

    handleErrors(){
        this.app.use((error, req, res, next)=>{
            const errorStatus = req.errorStatus || 500;
            res.status(200).json({                  // By Default 200 else errorStatus
                message: error.message || 'Something Went Wrong. Please Try Again',
                status_code:errorStatus
            });
        })
    }

}