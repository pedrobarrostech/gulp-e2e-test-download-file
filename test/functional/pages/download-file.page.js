'use strict';

import fs from 'fs';

class PageDownloadFile{

  constructor(){
    this.url = '/';
    this.buttons = {
      download: $('#download-link')
    };
  }
  

  //////////////////////////////////////////////

  isDownloaded(fileLocation){
    if(fs.statSync(fileLocation).isFile()){
      return true;
    }
    return false;
  }

}

export default PageDownloadFile; 