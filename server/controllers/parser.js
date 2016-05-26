var request = require('request'),
		cheerio = require('cheerio');

var wrap = {
	parseGoogle: function(payload, callback){
		console.log(payload.query);
		var encoding = payload.query.split(' ').join('+'),
				url = 'https://www.google.com/#q=' + encoding;
		console.log('Parsing ' + payload.query);
		console.log('Requesting ' + url);

		request(url, function (error, response, body) {
			if (!error && response.statusCode == 200) {
	  	  callback( body );
			}
		});
	},
	scrapGoogle: function(bodyString, callback){
		var $ = cheerio.load(bodyString),
				response = [];
		console.log('Before parsing links...');
		console.log($('.srg').length)
		$('.srg .g').each(function(index, element){
			console.log(element);
			response.push({
				text: $(this).find('h3 a').html(),
				url: $(this).find('h3 a').attr('data-href'),
			});
		});
		return bodyString;
	},
	parseYTS: function(payload, callback){
		console.log(payload.query);
		var encoding = encodeURIComponent(payload.query) + "/all/all/0/latest",
				url = 'https://yts.ag/browse-movies/' + encoding;
		console.log('Parsing ' + payload.query);
		console.log('Requesting ' + url);

		request(url, function (error, response, body) {
			if (!error && response.statusCode == 200) {
	  	  callback( wrap.scrapYTS(body) );
			}
		});
	},
	scrapYTS: function(bodyString, callback){
		//console.log(bodyString);
		var $ = cheerio.load(bodyString),
						response = [];
		console.log('Before parsing links...');
		$('.browse-movie-wrap').each(function(index, element){
			var torrents = []; 
			$(this).find('.browse-movie-tags a').each(function(index,element){
				torrents.push({
					quality: $(this).html(),
					url: $(this).attr('href')
				});
			}); 
			response.push({
				text: $(this).find('.browse-movie-bottom > a').html(),
				image: $(this).find('figure img').attr('data-cfsrc'),
				year: $(this).find('.browse-movie-year').html(),
				torrents: torrents
			});
		});
		return wrap.renderYTS(response);
	},
	renderYTS: function(listObj){
		var render = '';
		for(var i = 0; i < listObj.length; i++){
			render += wrap.htmlYTS(listObj[i]);
		}
		if (render != '')
			return render;
		else
			return 'Nothing to show';
	},
	htmlYTS: function(item){
		var torrents = '';

		for(var i=0; i < item.torrents.length; i++){
			torrents += '<a href="' + item.torrents[i].url + '" class="btn btn-default">' + item.torrents[i].quality + '</a>';	
		}

		return 	'<div class="col-xs-12 col-sm-6 col-md-3">' +
              '<div class="result-item">' +
               	'<div class="result-text">' +
                  '<h3>' + item.text + '</h3>' +
               	'</div>' +
               	'<div class="result-image text-center">' +
                  '<img src="' + item.image + '" class="img-responsive">' +
               	'</div>' +
               	'<div class="result-year">' +
                  '<strong>' + item.year + '</strong>' +
               	'</div>' +
               	'<div class="result-torrents">' +
                  torrents + 
               	'</div>' +
            	'</div>' +
           	'</div>';
	}
};

module.exports = wrap;