var network = $network;
console.log(network);

var ssid = $device.ssid
var dns = "DNS：" + network.dns;
var v4_primaryAddress = "v4_primaryAddress：" + network.v4.primaryAddress;
var v4_primaryRouter = "\nv4_primaryRouter：" + network.v4.primaryRouter;
var v6_primaryAddress = "\nv6_primaryAddress：" + network.v6.primaryAddress;
var wifi_ssid = "\nSSID：" + network.ssid;

var notice = v4_primaryAddress + v4_primaryRouter + v6_primaryAddress + wifi_bssid + wifi_ssid;
$location.fetch()
$notification.post("Network Changed", dns, notice);
$done();
