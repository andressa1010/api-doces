import { PrismaClient } from "@prisma/client"
import express from "express"
import cors from "cors"

const app= express()
const prisma= new PrismaClient()


app.use(express.json())
app.use(express.static("public"))
app.use(cors())


app.get("/", (req,res)=>{
   res.send("loja de bolos")
})


app.get("/produtos" , async (req, res)=>{
    const listaDeBolos = await prisma.produtos.findMany()

    res.status(200).json(listaDeBolos)
})

app.post("/produtos", async(req,res)=>{
 const{name, image, price, description }= req.body

 const criacaoDeProdutos= await prisma.produtos.create({
    data:{
        name, image, price, description
    }
 })

 res.status(201).json(criacaoDeProdutos)

})

 


app.put("/produtos/:id", async (req,res)=>{
    const{id}=req.params
    const{name,image,price,description}=req.body

    const editandoProdutos= await prisma.produtos.update({
        where:{
            id: id
        },
        data:{
            name, image, price, description
        }
    })
    res.status(200).json(editandoProdutos)
})


app.get("/produtos/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      // Busca pelo id diretamente no MongoDB
      const produto = await prisma.produtos.findUnique({
        where: { id: id }, // ID como string
      });
  
      if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
  
      res.status(200).json(produto); // Retorna o produto encontrado
    } catch (error) {
      console.error("Erro ao buscar o produto:", error);
      res.status(500).json({ error: "Erro ao buscar o produto" });
    }
  });
  


app.delete("/produtos/:id", async (req,res)=>{
    const{id}=req.params
    const{name,image,price,description}=req.body

    const editandoProdutos= await prisma.produtos.delete({
        where:{
            id: id
        },
        data:{
            name, image, price, description
        }
    })
    res.status(200).json(editandoProdutos)
})




app.listen(3000, ()=>{
 console.log( "Servidor em execução na porta http://localhost:3000" );
 
})