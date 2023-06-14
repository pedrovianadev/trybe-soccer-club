import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UsersModel';

import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect, request } = chai;

describe('Login tests', () => {
  beforeEach(sinon.restore);

  const user = new UserModel({
    id: 1,
    username: 'Pedro Viana',
    role: 'admin',
    email: 'test@test.com',
    password: '123456'
  })

  it('Must return an JWT', async () => {
    const body = { email: 'test@test.com', password: '123456'}

    sinon.stub(Model, 'findOne').resolves(user);
    
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const result = await request(app).post('/login').send(body);

    expect(result.status).to.be.equal(200);

    expect(result.body).to.haveOwnProperty('token');
  });

  it('Must return an error if password dont exists', async () => {
    const body = { email: 'test@test.com', password: ''}

    sinon.stub(Model, 'findOne').resolves(user);

    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const result = await request(app).post('/login').send(body);

    expect(result.status).to.be.equal(400);

    expect(result.body).to.deep.equal({ message: 'All fields must be filled'})
  });

  it('Must return an error if password is wrong', async () => {
    const body = { email: 'test@test.com', password: '13'}

    sinon.stub(Model, 'findOne').resolves(user);

    const result = await request(app).post('/login').send(body);

    expect(result.status).to.be.equal(401);

    expect(result.body).to.deep.equal({ message: 'Invalid email or password'})
  });

  it('Must return an error if email dont exists', async () => {
    const body = { email: '', password: '123456'}

    sinon.stub(Model, 'findOne').resolves(user);

    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const result = await request(app).post('/login').send(body);

    expect(result.status).to.be.equal(400);

    expect(result.body).to.deep.equal({ message: 'All fields must be filled'})
  });

  it('Must return an error if email is wrong', async () => {
    const body = { email: 'testetestado', password: '123456'}

    sinon.stub(Model, 'findOne').resolves(null);

    const result = await request(app).post('/login').send(body);

    expect(result.status).to.be.equal(401);

    expect(result.body).to.deep.equal({ message: 'Invalid email or password'})
  });
});