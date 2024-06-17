import request from 'supertest';
import app from '../../src'; 
import mongoose from 'mongoose'; 
import {Reader, Admin} from '../../jwt';
import Category from '../../src/models/category';


describe('CategoryController', () => {

 beforeAll(async () => {
    await mongoose.connection.collection('categories').deleteMany({});
  });


  let url = '/api/categories'
 

  it('obtener todas  sin login', async () => {
      const response = await request(app).get(url).send();
      expect(response.status).toBe(401);
    })
 
  it('guardar   sin login', async () => {
      const response = await request(app).post(url).send();
      expect(response.status).toBe(401);
  })
 
   it('borrar inexistente', async () => {
      const response = await request(app).post(url+'/1').send();
      expect(response.status).toBe(404);
  })
 
  it('obtener todas ', async () => {
    const response = await request(app).get(url)
     .set('Authorization', `Bearer ${Reader()}`)
     .send();
      expect(response.status).toBe(200);
  })
 
  it('crear categoria con usuario invalido', async () => {
    const response = await request(app).post(url)
     .set('Authorization', `Bearer ${Reader()}`)
     .send({name:'nueva'});
      expect(response.status).toBe(403);
  
  })
 

   it('crear categoria con admin attributos faltantes', async () => {

    const response = await request(app).post(url)
     .set('Authorization', `Bearer ${Admin()}`)
     .send({});
      expect(response.status).toBe(400);
        
  })

 
  it('crear categoria con admin', async () => {

    const response = await request(app).post(url)
     .set('Authorization', `Bearer ${Admin()}`)
     .send({name:'nueva'});
      expect(response.status).toBe(201);
        
  })



 
  it('validar name unique', async () => {

    const response = await request(app).post(url)
     .set('Authorization', `Bearer ${Admin()}`)
     .send({name:'nueva'});
      expect(response.status).toBe(500);
        
  })


  it('crear otra categoria con admin', async () => {

    const response = await request(app).post(url)
     .set('Authorization', `Bearer ${Admin()}`)
     .send({name:'otra'});
      expect(response.status).toBe(201);
        
  })


  it('borrar sin login', async () => {

    const cat = await Category.findOne();

    const response = await request(app).delete(url+'/'+cat!._id)
    // .set('Authorization', `Bearer ${Reader()}`)
     .send();
      expect(response.status).toBe(401); 
  })


  it('borrar con usuario invalido', async () => {

    const cat = await Category.findOne();

    const response = await request(app).delete(url+'/'+cat!._id)
     .set('Authorization', `Bearer ${Reader()}`)
     .send();
      expect(response.status).toBe(403); 
  })

  it('borrar con usuario valido', async () => {

    const cat = await Category.findOne();

    const response = await request(app).delete(url+'/'+cat!._id)
     .set('Authorization', `Bearer ${Admin()}`)
     .send();
      expect(response.status).toBe(200); 
  })


});
