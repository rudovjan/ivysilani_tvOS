import ATV from 'atvjs'
import template from './template.hbs'

import API from 'lib/ivysilani.js'
import fastXmlParser from 'fast-xml-parser'

const AlphabetLetterPage = ATV.Page.create({
  name: 'alphabet-letter',
  template: template,
  ready: function (options, resolve, reject) {
    ATV.Navigation.showLoading({
      data: {
        message: 'Načítání',
        class: 'darkBackgroundColor'
      },
      type: 'document'
    })

    // get data from multiple requests

    if (options.link.length === 1) {

    } else {
      // let getShows = ATV.Ajax.get(API.listGenre(options.link));
    }

    let getShows = ATV.Ajax.post(API.url.programmeList, API.xhrOptions({letter: options.link}))
    // Then resolve them at once
    Promise
      .all([getShows])
      .then((xhrs) => {
        let letter = options
        let shows = fastXmlParser.parse(xhrs[0].response).programmes
        console.log(shows)

        resolve({
          shows: shows.programme,
          letter: letter
        })
      }, (xhr) => {
        // error
        reject()
      })

    /*
                    // get the unique id of the asset
                    let letterLink = options.link;

                    // load data and then resolve promise
                    ATV.Ajax
                    //.get(API.listLetter(letterLink))
                        .get('http://hd-tech.cz/most.php?url=http://hbbtv.ceskatelevize.cz/ivysilani/services/letter.php?letter=a')
                        .then((xhr) => {
                            let shows = xhr.response;

                            resolve({
                                shows: shows.programme
                            });
                        }, (xhr) => {
                            // error
                            reject();
                        });
                    // for demo using static content
            //      resolve(staticData());
                    */
  }
/* afterReady(doc) {
    //ATV.Navigation.removeActiveDocument();
    //ATV.Navigation.replaceDocument(doc,getActiveDocument());
    //navigationDocument.removeDocument(ATV.currentDocument);
    //navigationDocument.replaceDocument(doc, getActiveDocument());
}, */
})

export default AlphabetLetterPage
