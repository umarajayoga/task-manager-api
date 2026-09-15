
import express from 'express';


const app = express();

app.use(express.json());


let tasks = [
  { id: 1, title: 'Learn Express.js', completed: true },
  { id: 2, title: 'Build Task Manager API', completed: false },
  { id: 3, title: 'Prepare for Interview', completed: false },
];

app.get('/',(req,res)=>{

    res.json({message:'Task-Manager API is running..'})

})

app.get('/tasks',(req,res)=>{
    res.status(200).json(tasks)
})

app.get('/tasks/:id',(req,res)=>{

const { id } = req.params;

const task = tasks.find(t=>t.id==id)

if(!task){
    return res.status(404).json({error:'Task not found'})
}

res.status(200).json(task)

})


app.post('/tasks',(req,res)=>{

    const { id,title,completed } = req.body;

    if(!title){

        return res.status(400).json({error:'Title is required'})

    }
        
    tasks.push({ id, title, completed });

    res.status(201).json({message:'Task added successfully',task:{ id, title, completed }})

})


app.put('/tasks/:id',(req,res)=>{

    const { id } = req.params;

    const task = tasks.find((t)=>t.id == id)

    if(!task){

        return res.status(404).json({error:'Task not found'})
    }

   
    task.title=req.body.title
    task.completed=req.body.completed

    res.status(200).json({message:'Task updated successfully',task})
})

app.delete('/tasks/:id',(req,res)=>{

const { id } = req.params;

const task = tasks.find(t=>t.id==id)

if(!task){
    return res.status(404).json({error:'Task not found'})   

}

tasks = tasks.filter(t=>t.id!=id)

res.status(200).json({message:'Task deleted successfully'})     


}
)




app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})