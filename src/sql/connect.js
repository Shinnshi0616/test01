// import sql from 'mssql'
// import db from './config'




// const config = {
//     user: 'sa',

//     password: '123456',

//     server: '127.0.0.1',

//     database: 'sql_node',

//     port: 53254,
//     options: {
//         encrypt: false //使用windows azure，需要设置次配置。
//     }
// }

// const con = sql.connect(config).then(() => {
//     return sql.query`select * from Userinfo`
// }).then(result => {
//     console.log(result.recordset);
//     //请求成功
// }).catch(err => {
//     //err 处理
//     console.log(err);
// })
// sql.on('error', err => {
//     //error 处理
// })
// export default con;

