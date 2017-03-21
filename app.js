// 使用 mongodb 的 driver  
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

// 在 Azure 的連接字串
var url = 'mongodb://<endpoint>:<password>@<endpoint>.documents.azure.com:10250/?ssl=true';

// 連接到mongodb主機
MongoClient.connect(url, function(err, db) {

    var data1 = {
        "type": "晚餐",
        "cost": 300,
        "date": new Date(2017, 03, 22, 15, 17),
        "update": Date.now(),
    };

    // 插入資料
    db.collection('books').insertOne(data1, function(err, result) {
        console.log("插入資料成功");
    });

    var data2 = {
        "type": "午餐",
        "cost": 150,
        "date": new Date(2017, 03, 22, 15, 17),
        "update": Date.now(),
    };
    // 插入資料
    db.collection('books').insertOne(data2, function(err, result) {
        console.log("插入資料成功");
    });


    // 查詢books中的資料
    var cursor = db.collection('books').find();
    // 列出所有資料
    cursor.each(function(err, doc) {
        if (doc != null) {
            console.dir(doc);
        }
    });

    // 更新資料
    db.collection('books').updateOne({ 'type': '晚餐' }, {
        $set: {
            'cost': 500
        },
        $currentDate: { "lastModified": true }
    }, function(err, results) {
        console.log(results);
    });

    // 刪除資料
    db.collection('books').deleteMany({ 'type': '午餐', 'cost': 150 },
        function(err, results) {
            console.log(results);
        }
    );


});
