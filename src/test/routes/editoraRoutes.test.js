/* eslint-disable linebreak-style */
import {
  afterEach, beforeEach, describe, expect, it, jest, test,
} from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';

let server;

beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /editoras', () => {
  it('Deve retornar uma lista de editoras', async () => {
    await request(app)
      .get('/editoras')
      .set('accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });

  it('Não pode criar uma editora Vazia', async () => {
    await request(app)
      .post('/editoras')
      .send({})
      .expect(400);
  });
});

let idResposta;

describe('POST em /editoras', () => {
  it('Deve adicionar uma editora', async () => {
    const resultado = await request(app)
      .post('/editoras')
      .send({
        nome: 'CDC',
        cidade: 'sao paulo',
        email: 'c@c.com',
      })
      .expect(201);

    idResposta = resultado.body.content.id;
  });
});

describe('PUT em /editoras', () => {
  test.each([
    ['o nome', { nome: 'Casa do código' }],
    ['a cidade', { cidade: 'SP' }],
    ['o email', { email: 'cdc@cdc.com' }],
  ])('Deve atualizar %s', async (chave, params) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao.request(app)
      .put(`/editoras/${idResposta}`)
      .send(params)
      .expect(204);

    expect(spy).toHaveBeenCalled();
  });
});

describe('GET em /editoras', () => {
  it('Deve buscar a editora pedida', async () => {
    await request(app)
      .get(`/editoras/${idResposta}`)
      .expect(200);
  });
});

describe('DELETE em /editoras', () => {
  it('Deve deletar a editora pedida', async () => {
    await request(app)
      .delete(`/editoras/${idResposta}`)
      .expect(200);
  });
});
