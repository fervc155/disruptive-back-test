import request from 'supertest';
import app from '../../src'; 
import mongoose from 'mongoose'

describe('AuthController', () => {

 beforeAll(async () => {
    await mongoose.connection.collection('users').deleteMany({});
  });

describe('register', () => {

  let url = '/api/register'
  it('registro con campos faltantes', async () => {

    let expect400 = [
      {},
      {username:'username'},
      {username:'username', email:'email@email.com'},
      {username:'username', email:'email@email.com', password:'root1234'},
    ]

    for(let e400 of expect400) {
      const response = await request(app).post(url).send(e400);
      expect(response.status).toBe(400);
    } 
  });

  it('registro ok', async () => {

    let user1 = {username:'username', email:'email@email.com', password:'root1234', role:'creator'};

      const response = await request(app).post(url).send(user1);
      expect(response.status).toBe(201);
      expect(response.body.token).toBeDefined();
     
  });
  
  it('registro username repetido', async () => {

    let user1 = {username:'username', email:'email2@email.com', password:'root1234', role:'creator'};

      const response = await request(app).post(url).send(user1);
      expect(response.status).toBe(400);     
  });

    it('registro email repetido', async () => {

    let user1 = {username:'usern2ame', email:'email@email.com', password:'root1234', role:'creator'};

      const response = await request(app).post(url).send(user1);
      expect(response.status).toBe(400);
    
  });

});





describe('login', () => {


  let url = '/api/login'
  it('login ok', async () => {
    const loginRequest = {
      email: 'email@email.com',
      password: 'root1234',
    };

    const response = await request(app)
      .post(url)
      .send(loginRequest);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('login fail', async () => {
    const credencialesIncorrectas = {
      email: 'usuarioIncorrecto',
      password: 'contraseñaIncorrecta',
    };

    const response = await request(app)
      .post(url)
      .send(credencialesIncorrectas);

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

});
