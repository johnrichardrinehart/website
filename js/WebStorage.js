var WebStorageModule = {
   storageAvailable : function(type) {
      try {
         var storage = window[type],
            x = '__storage_test__';
         storage.setItem(x, x);
         storage.removeItem(x);
         return true;
      }
      catch(e) {
         return false;
      }
   }
   ,
   mySessionStorage : sessionStorage,
   myLocalStorage : localStorage,
   hasVisited: function() {
      if (this.storageAvailable('sessionStorage')) {
         if (!this.mySessionStorage.getItem('has_visited')) {
            this.mySessionStorage.setItem('has_visited','1');
            return false }
         else if (this.mySessionStorage.getItem('has_visited') == "1") {
            return true
         }
         else {
            throw "sessionStorage item has_visited is invalid!"
         }
      }
   }
   ,
   countVisits : function() {
      if (this.storageAvailable('localStorage')) {
         num_visits = this.myLocalStorage.getItem('num_visits');
         if ( !num_visits ) {
            this.myLocalStorage.setItem('num_visits','1');
            return 1;
         }
         else {
            return parseInt(num_visits);
         }
      }
   }
}
