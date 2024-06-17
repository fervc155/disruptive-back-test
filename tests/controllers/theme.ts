import request from 'supertest';
import app from '../../src'; 
import mongoose from 'mongoose'; 
import {Reader, Admin} from '../../jwt';
import Theme from '../../src/models/theme';


describe('ThemeController', () => {

 beforeAll(async () => {
    await mongoose.connection.collection('themes').deleteMany({});
  });


  let url = '/api/themes'
 

  it('obtener todas  sin login', async () => {
      const response = await request(app).get(url).send();
      expect(response.status).toBe(200);
    })
 
  it('guardar   sin login', async () => {
      const response = await request(app).post(url).send();
      expect(response.status).toBe(401);
  })
 
   it('borrar  inexistente', async () => {
      const response = await request(app).post(url+'/1').send();
      expect(response.status).toBe(404);
  })


  it('crear tematica con usuario invalido', async () => {
    const response = await request(app).post(url)
     .set('Authorization', `Bearer ${Reader()}`)
     .send({name:'nueva'});
      expect(response.status).toBe(403);
  
  })
 

   it('crear tematica con admin attributos faltantes', async () => {

    const response = await request(app).post(url)
     .set('Authorization', `Bearer ${Admin()}`)
     .send({});
      expect(response.status).toBe(400);
        
   })

 

  let tematica=  {
    name: 'nueva',
    url: '',
    images: true,
    videos: false,
    text: false,
  }

  it('crear tematica con admin', async () => {

    const response = await request(app).post(url)
     .set('Authorization', `Bearer ${Admin()}`)
     .send(tematica);
      expect(response.status).toBe(201);
        
  })



 
  it('validar name unique', async () => {

    const response = await request(app).post(url)
     .set('Authorization', `Bearer ${Admin()}`)
     .send(tematica);
      expect(response.status).toBe(500);
        
  })


  it('crear tematica con admin', async () => {
    tematica.name="otra"
    const response = await request(app).post(url)
     .set('Authorization', `Bearer ${Admin()}`)
     .send(tematica);
      expect(response.status).toBe(201);
        
  })



  it('obtener por id', async () => {

    const tem = await Theme.findOne();

    const response = await request(app).get(url+'/'+tem!._id)
     .set('Authorization', `Bearer ${Reader()}`)
     .send();
      expect(response.status).toBe(200); 
  })


  it('borrar con usuario invalido', async () => {

    const tem = await Theme.findOne();

    const response = await request(app).delete(url+'/'+tem!._id)
     .set('Authorization', `Bearer ${Reader()}`)
     .send();
      expect(response.status).toBe(403); 
  })

  it('borrar con usuario valido', async () => {

    const tem = await Theme.findOne();

    const response = await request(app).delete(url+'/'+tem!._id)
     .set('Authorization', `Bearer ${Admin()}`)
     .send();
      expect(response.status).toBe(200); 
  })


});
