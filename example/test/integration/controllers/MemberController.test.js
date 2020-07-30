var supertest = require('supertest');
var assert = require('assert');

describe('api/MemberController', function (params) {

  describe('#signup()', function () {
    let mobile = '';
    for (var i = 0; i < 10; i++) {
      mobile += Math.floor(Math.random(0, 9) * 10);
    } //随机生成号码，方便测试
    it('注册发送验证码成功', function (done) {
      supertest(sails.hooks.http.app)
        .post('/api/member/send_verification_code')
        .send({
          area_code: '1',
          mobile_num: mobile,
          feature: 'signup'
        })
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          // expect(res.body.errCode).to.be.equal(0);
          assert.equal(res.body.errCode, 0);
          done();

        });
    });
    it('发送验证码feature错误', function (done) {
      supertest(sails.hooks.http.app)
        .post('/api/member/send_verification_code')
        .send({
          area_code: '1',
          mobile_num: mobile,
          feature: 'signup2'
        })
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          // expect(res.body.errCode).to.be.equal(0);
          assert.equal(res.body.errCode, 1);
          done();
        });
    });
    it('找回密码发送验证码未注册', function (done) {
      supertest(sails.hooks.http.app)
        .post('/api/member/send_verification_code')
        .send({
          area_code: '1',
          mobile_num: mobile + '1',
          feature: 'forget_pwd'
        })
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          // expect(res.body.errCode).to.be.equal(0);
          assert.equal(res.body.errCode, 1);
          done();
        });
    });
    it('密码错误', function (done) {
      supertest(sails.hooks.http.app)
        .post('/api/member/signup')
        .send({
          area_code: '1',
          mobile_num: '6046116234',
          password: '12345',
          registry_way: 'ios',
          code: '123456'
        })
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          // expect(res.body.errCode).to.be.equal(0);
          assert.equal(res.body.errCode, 1);
          done();
        });
    });
    it('注册方式错误', function (done) {
      supertest(sails.hooks.http.app)
        .post('/api/member/signup')
        .send({
          area_code: '1',
          mobile_num: '6046116234',
          password: '12345',
          registry_way: 'web',
          code: '123456'
        })
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          // expect(res.body.errCode).to.be.equal(0);
          assert.equal(res.body.errCode, 1);
          done();
        });
    });
    it('验证码错误', function (done) {
      supertest(sails.hooks.http.app)
        .post('/api/member/signup')
        .send({
          area_code: '1',
          mobile_num: '6046116234',
          password: '12345',
          registry_way: 'web',
          code: '123'
        })
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          // expect(res.body.errCode).to.be.equal(0);
          assert.equal(res.body.errCode, 1);
          done();
        });
    });
    it('注册成功', async function (done) {
      supertest(sails.hooks.http.app)
        .post('/api/member/signup')
        .send({
          area_code: '1',
          mobile_num: mobile,
          password: '12345678',
          registry_way: 'ios',
          code: '111111'
        })
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          // expect(res.body.errCode).to.be.equal(0);
          assert.equal(res.body.errCode, 0);
          done();
        });
    });
  });

});

