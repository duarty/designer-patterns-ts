import express, { type Application } from 'express'
import { env } from './config/env'

class Server {
  private readonly app: Application
  private readonly port: number

  constructor (port: number) {
    this.app = express()
    this.port = port
    this.configure()
  }

  private configure (): void {
    // Configurações do servidor Express
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))

    // Rotas
    this.app.get('/healthycheck', (req, res) => {
      res.send('Olá, mundo!')
    })
  }

  public startServer (): void {
    this.app.listen(this.port, () => {
      console.log(`🛸 Server is running at port: ${this.port}`)
    })
  }
}

const server = new Server(env.PORT)
server.startServer()
