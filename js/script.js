(function() {
    var App = function() {
        /*
         * ?Action=ScriptsList
         * &Version=2.0.0
         * &KeyID=<Your Scalr API Key ID>
         * &TimeStamp=2009-06-19T05%3A13%3A00.000Z
         * &Signature=<URLEncode(Base64Encode(Signature))>
         *
         * ?Action=ScriptExecute
         * &FarmID=126
         * &ScriptID=100
         * &Timeout=30
         * &Revision=3
         * &ConfigVariables[var1]=/home/www
         * &ConfigVariables[var2]=test
         * &Async=1
         * &Version=2.0.0
         * &AuthVersion=2
         * &KeyID=<Your Scalr API Key ID>
         * &TimeStamp=2009-06-19T05:13:00.000Z
         * &Signature=<URLEncode(Base64Encode(Signature))>

        this.start = function() {
            if (!this.isLoggedIn()) {
                this.render('login');
            }
        }.bind(this);

        this.genSignature = function(action, keyid, timestamp) {
            
        };
        
        this.isLoggedIn = function() {
            return false;
        };

        this.render = function(tmpl) {
            this.get('tmpl/'+tmpl+'.html', function(data) {
                this.html('main', data);
            }.bind(this));
        }.bind(this);

        this.get = function(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.addEventListener('load', function() {
                callback(xhr.responseText);
            });
            xhr.open('GET', url, true);
            xhr.send();
        };

        this.html = function(elems, data) {
            var domElems = document.querySelectorAll(elems);
            for (i = 0; i < domElems.length; i++) {
                domElems[i].innerHTML = data;
            }
        };
    },
    app = new App();
    app.start();
})();
