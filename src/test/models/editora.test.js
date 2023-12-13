/* eslint-disable linebreak-style */
import {
  describe, expect, it, jest,
} from '@jest/globals';
import Editora from '../../models/editora.js';

describe('Teste editora', () => {
  const objetoEditora = {
    nome: 'CDC',
    cidade: 'sao paulo',
    email: 'c@c.com',
  };

  it('Deve conter o objeto na editora', () => {
    const editora = new Editora(objetoEditora);

    expect(editora).toEqual(
      expect.objectContaining(objetoEditora),
    );
  });

  it.skip('Deve conter a editora no BD', () => {
    const editora = new Editora(objetoEditora);

    editora.salvar().then((dados) => {
      expect(dados.nome).toBe('CDC');
    });
  });

  it('Deve salvar no BD com a sintaxe moderna', async () => {
    const editora = new Editora(objetoEditora);

    const salvaEditora = await editora.salvar();

    const retornado = await Editora.pegarPeloId(salvaEditora.id);

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });

  it('Deve retornar o teste em um mock do BD', () => {
    const editora = new Editora(objetoEditora);

    editora.salvar = jest.fn().mockReturnValue({
      id: 10,
      nome: 'CDC',
      cidade: 'sao paulo',
      email: 'c@c.com',
      created_at: '2023-12-11',
      updated_at: '2023-12-11',
    });

    const retornado = editora.salvar();

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });
});
