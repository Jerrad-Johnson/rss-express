exports.setHeaders = (res) => {
    res.append('Access-Control-Allow-Origin', 'https://rss.jerradjohnson.com');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    res.append('Access-Control-Allow-Credentials', 'true');
}