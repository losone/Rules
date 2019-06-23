/*****************************************************************
* 由于脚本内包含登陆账号密码，须将脚本放置在本地，请勿随意分享
* 需要修改的信息有名称、域名、邮箱、密码，域名必须直连可访问，否则可能会发生错误
* 此脚本不保证对所有机场有效
*****************************************************************/


/****************************************************************/

const sitename = "老板娘";                        //站点名称
const site = "https://www.cordcloud.fun";        //站点首页
const email = "mail@zhuangzhuang.ml";            //登录邮箱
const passwd = "12345678";                       //登录密码

/****************************************************************/

const login= site + "/auth/login"
const checkin = site + "/user/checkin"
const user = site + "/user"
const table = {
    url: login,
    header: {
         "Content-Type": "application/json"
    },
    body: {
        email,passwd,
        "rumber-me": "week"
    }
}

$httpClient.post(table, function (error, response, data) {
    if (error) {
        console.log(error);
        $notification.post('机场签到', error, "");
        $done();
    } else {
        $httpClient.post(checkin, function (error, response, data) {
            var checkinMsg = JSON.parse(data).msg
            $httpClient.get(user, function (error, response, data) {
                var usedData = data.match(/(已用\s\d.+?%|>已用(里程|流量)|>\s已用流量)[^B]+/)
                if (usedData) {
                    usedData = usedData[0].match(/\d\S*(K|G|M|T)/)
                    var restData = data.match(/(剩余\s\d.+?%|>剩余(里程|流量)|>\s剩余流量)[^B]+/)
                    restData = restData[0].match(/\d\S*(K|G|M|T)/)
                    //var allData = checkinMsg + "已用流量：" + usedData[0] + "B" + "剩余流量：" + restData[0] + "B"
                    $notification.post(sitename, checkinMsg, "已用流量：" + usedData[0] + "B" + "\n剩余流量：" + restData[0] + "B");
                }
                $done();
            });
        });
    }
}
);
