(function() {
    "use strict";
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
         * &Async=1
         * &Version=2.0.0
         * &AuthVersion=2
         * &KeyID=<Your Scalr API Key ID>
         * &TimeStamp=2009-06-19T05:13:00.000Z
         * &Signature=<URLEncode(Base64Encode(Signature))>
        */
        this.start = function() {
            if (!this.isLoggedIn()) {
                this.login();
            }
        }.bind(this);

        this.genSignature = function(action, keyid, timestamp) {
            
        };

        this.login = function() {
            this.render('login').then(function() {
                document.getElementById('frmLogin');
            });

        }.bind(this);
        
        this.isLoggedIn = function() {
            return false;
        };

        this.render = function(tmpl) {
            return this.get('tmpl/'+tmpl+'.html')
                .then(
                    function(data) {
                        this.html('main', data);
                        return 'it worked';
                    }.bind(this),
                    function(data) {
                        this.html('main', 'Failed');
                        return 'it did not work';
                    }.bind(this)
                );
        }.bind(this);

        this.get = function(url) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.addEventListener('load', function() {
                    if (200 === xhr.status) {
                        resolve(xhr.responseText);
                    } else {
                        reject('Error');
                    }
                });
                
                xhr.addEventListener('error', function() {
                    reject('Error');
                });

                xhr.open('GET', url, true);
                xhr.send();
            });
        };

        this.html = function(elems, data) {
            var domElems = document.querySelectorAll(elems);
            for (var i = 0; i < domElems.length; i++) {
                domElems[i].innerHTML = data;
            }
        };
    },
    Promise = function(cb) {
        this.status = 'pending';
        this.value = null;
        this.returned = null;

        this.then = function(success, failure) {

            if ('resolved' == this.status) {
                success(this.value);
                return;
            }
            if ('rejected' == this.status) {
                failure(this.value);
                return;
            }

            cb(
                function(value) {
                   success(this.resolve(value));
                }.bind(this),
                function(value) {
                    failure(this.reject(value));
                }.bind(this)
            );
            return;          

        }.bind(this);

        this.resolve = function(value) {
            this.value = value;
            this.status = 'resolved';
            return value;
        }.bind(this);

        this.reject = function(value) {
            this.value = value;
            this.status = 'rejected';
            return value;
        }.bind(this);
    },
    app = new App();
    app.start();
})();
