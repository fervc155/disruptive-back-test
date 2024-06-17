import request from 'supertest';
import app from '../../src'; 
import mongoose from 'mongoose';
import {Reader, Admin} from '../../jwt';
import User from '../../src/models/user';


describe('UserController', () => {

 beforeAll(async () => {
    await mongoose.connection.collection('users').deleteMany({});
  });


  let url = '/api/users'
 

  it('obtener todas  sin login', async () => {
      const response = await request(app).get(url).send();
      expect(response.status).toBe(401);
    })
 
  it('guardar   sin login', async () => {
      const response = await request(app).post(url).send();
      expect(response.status).toBe(401);
  })
 
   it('borrar  inexistente', async () => {
      const response = await request(app).post(url+'/1').send();
      expect(response.status).toBe(404);
  })


  it('crear usuario con usuario invalido', async () => {
    const response = await request(app).post(url)
     .set('Authorization', `Bearer ${Reader()}`)
     .send({name:'nueva'});
      expect(response.status).toBe(403);
  
  })
 

   it('crear usuario con admin attributos faltantes', async () => {

    const response = await request(app).post(url)
     .set('Authorization', `Bearer ${Admin()}`)
     .send({});
      expect(response.status).toBe(400);
        
   })

 

  let usuario=  {
    username: 'nueva',
    email: 'nueva@nueva.com',
    role:'reader',
    password:'1234'
  }

  it('crear usuario min 6 caracteres', async () => {

    const response = await request(app).post(url)
     .set('Authorization', `Bearer ${Admin()}`)
     .send(usuario);
      expect(response.status).toBe(400);

        
  })


  it('crear usuario con admin', async () => {

    usuario.password='12341234'
    const response = await request(app).post(url)
     .set('Authorization', `Bearer ${Admin()}`)
     .send(usuario);
      expect(response.status).toBe(201);

        
  })



 
  it('validar username unique', async () => {

    usuario.email='fer@fer.com'
    const response = await request(app).post(url)
     .set('Authorization', `Bearer ${Admin()}`)
     .send(usuario);
      expect(response.status).toBe(500);
        
  })


 
  it('validar email unique', async () => {

    usuario.email='nueva@nueva.com'
    const response = await request(app).post(url)
     .set('Authorization', `Bearer ${Admin()}`)
     .send(usuario);
      expect(response.status).toBe(500);
        
  })


  it('crear otro con admin', async () => {

    usuario.email='otro@otro.com'
    usuario.username='otro@otro.com'
    const response = await request(app).post(url)
     .set('Authorization', `Bearer ${Admin()}`)
     .send(usuario);
      expect(response.status).toBe(201);

        
  })



  it('borrar con usuario invalido', async () => {

    const tem = await User.findOne();

    const response = await request(app).delete(url+'/'+tem!._id)
     .set('Authorization', `Bearer ${Reader()}`)
     .send();
      expect(response.status).toBe(403); 
  })

  it('borrar con usuario valido', async () => {

    const tem = await User.findOne();

    const response = await request(app).delete(url+'/'+tem!._id)
     .set('Authorization', `Bearer ${Admin()}`)
     .send();
      expect(response.status).toBe(200); 
  })


});
