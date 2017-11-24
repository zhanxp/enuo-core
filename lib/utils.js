var u = {
    //baseTime: 1508225619000,
    baseTime: 1420041600000,
    autoId: function() {
        var timestamp = Date.parse(new Date());
        var n = 8;
        var num = (timestamp - this.baseTime) + '';
        console.log(num);
        var i = num.length;
        while (i++ < n)
            num = num + '0';
        num = num + this.randNum(1000, 9999);
        return parseInt(num);
    },
    randNum: function(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    },
    randStr: function(n) {
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var res = "";
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 35);
            res += chars[id];
        }
        return res;
    }
}
module.exports = u;