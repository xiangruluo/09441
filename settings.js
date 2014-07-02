module.exports = {
    id: '09441',
    name: '09441blog',
    creator: 'feivorid',
    secretKey: 'feivorid',
    mongodb:{
        host: 'localhost',
        user: 'root',
        password: '',
        database:'09441',
        port: 27017
    },
    redis:{
        host: 'localhost',
        port: 6379
    },
    session: {
        expires: 60 // minutes
    },
    logging: {
        reloadSecs: 0, //INFO: set 0 could let nodeunit tests which use log4js exit properly
        level: 'DEBUG'
    },
    file: {
        public: 'public',
        components: 'public/components',
        upload: 'public/upload'
    },
    resources: {
        appName: '09441',
        appTitle: '09441',
        appCreator: 'feivorid',
        errorUnknown: '不好意思，系统出了点小问题'
    }
};
