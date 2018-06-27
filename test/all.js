var core = require('../index');

var mysql = {
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'test_db',
    connectionLimit: 2,
    queueLimit: 10
};

async function test() {
    core.mysql.debug = true;
    await core.mysql.connect(mysql);
    var dao = new core.MysqlDao(core.mysql, "test_table");
    var list = await dao.list();
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        await dao.update({
            UpdateDate: new Date()
        }, {
            ID: item.ID
        });
    }
    console.log('end');
    return 'ok';
}

test()
    .then(v => console.log(v))
    .catch(err => console.error(err));