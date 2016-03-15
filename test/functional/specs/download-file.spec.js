'use strict';

import 'babel-polyfill';
import chai from 'chai';
import assert from 'assert';
import PageDownloadFile from '../pages/download-file.page';

chai.should();

describe('Download', () => {
  const pageDownloadFile = new PageDownloadFile();
  const fileLocation = '/tmp/'+ process.pid +'/go.png';

  beforeEach(() => {
    browser.ignoreSynchronization = true;
    browser.get(pageDownloadFile.url);
  });

  it('Deve fazer download do arquivo go.png', () => {
    pageDownloadFile.buttons.download.click();
    browser.sleep(1000).then(function() {
      chai.expect(pageDownloadFile.isDownloaded(fileLocation)).to.equal(true);
    });
  });
  	
});