import express, {Application, Request, Response} from "express" ; 
 import carRoutes from './routes/cars'
const PORT = process.env.PORT || 5555; 
 
const app: Application = express(); 
 
app.get("/ping", async (_req : Request, res: Response) => { res.json({  message: "hello from Borys Moskalenko S00274025 " }); }); 

app.get('/bananas', async (_req : Request, res: Response) => {res.json({message: "this is bananas",});});

app.get('/BorysWeb', async (_req : Request, res: Response) => { res.json({ message: "Borys Moskalenko page",});}); 


app.use('/api/v1/cars', carRoutes); 
app.use((req, _res, next) => {   
console.log(`${req.method} ${req.originalUrl}`); 
next(); 
});
app.use(express.json()); 


app.listen(PORT, () => { 
console.log("Server is running on port", PORT); 
}); 
