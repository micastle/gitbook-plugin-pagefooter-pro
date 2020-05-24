var moment = require('moment');
module.exports = {
  book: {
    assets: './assets',
    css: [
      'footer.css'
    ],
  },
  hooks: {
    'page:before': function (page) {
      var _label = 'File Modify: ',
        _format = 'YYYY-MM-DD HH:mm:ss',
        _copy = '作者：' + this.options.author,
        _islocal = true,
        _showAuthor = true;
      if (this.options.pluginsConfig['pagefooter-pro']) {
        _label = this.options.pluginsConfig['pagefooter-pro']['modify_label'] || _label;
        _format = this.options.pluginsConfig['pagefooter-pro']['modify_format'] || _format;
        _showAuthor = this.options.pluginsConfig['pagefooter-pro']['show_author'];

        var _c = this.options.pluginsConfig['pagefooter-pro']['copyright'];
        if (_showAuthor) {
          _copy = _c ? '' + _c + ', ' + _copy : _copy;
        } else {
          _copy = _c ? _c : '';
        }
      }
      var _copy = '<span class="copyright">' + _copy + '</span>'
      var str = ' \n\n<footer class="page-footer">' + _copy +
        '<span class="footer-modification">' +
        _label +
        '\n{{file.mtime | date("' + _format +
        '")}}\n</span></footer>'
      page.content = page.content + str;
      return page;
    }
  },
  filters: {
    date: function (d, format) {
      var _islocal = this.options.pluginsConfig['pagefooter-pro']['islocal'] || _islocal;
      var time = '';
      if (_islocal) {
        time = moment(d).local().format(format)
      } else {
        time = moment(d).format(format)
      }
      return time
    }
  }
};